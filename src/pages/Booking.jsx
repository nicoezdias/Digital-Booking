import React, { useEffect, useState } from "react";
import { ReactComponent as Back } from "assets/icon/back.svg";
import { Link, useNavigate, useParams } from "react-router-dom";
import { createBookings, getInfoReserve, listCity } from "service/Home";
import Policy from "components/atoms/Policy";
import { CardDetail } from "components/atoms/Card";
import Calendar from "react-calendar";
import { capitalize } from "util/fns";
import { Form, Input } from "antd";
import { useContext } from "react";
import { UserContext } from "context/UserContext";

function Booking() {
  const [valueData, setValueData] = useState(null);
  const [valueData2, setValueData2] = useState(null);
  const [controllerCalendar, setControllerCalendar] = useState(
    () => window.innerWidth > 1024
  );
  const [hotel, setHotel] = useState({});
  const [cities, setCities] = useState([])
  const [citySelect, setCitySelect] = useState(0)
  const params = useParams().id;
  const { user } = useContext(UserContext);
  const [userForm] = Form.useForm();
  const [timeForm] = Form.useForm();
  const navigate = useNavigate()

  useEffect(() => {
    console.log(user);
    if (user) {
      userForm.setFieldsValue({
        name: user.name,
        lastname: user.surname,
        email: user.email
      });
    }
  }, [userForm, user]);

  useEffect(() => {
    const loadData = async () => {
      const idUser = JSON.parse(localStorage.getItem("user"));
      const payload = {
        productId: params,
        userId: idUser.id,
      };
      const [error, data] = await getInfoReserve(payload);
      if (error) {
        console.log(error);
        return;
      }
      setHotel(data);
      console.log(data);
    };

    const loadCities = async () =>{
      const [error,data]=await listCity()
      if(error){
        console.log(error);
        return
      }
      if(data){
        console.log(data);
        setCities(data)
      }
    }

    loadData();
    loadCities()
  }, [params]);

  useEffect(() => {
    const handleSize = () => {
      if (window.innerWidth > 1024) {
        setControllerCalendar(true);
      }
      if (window.innerWidth < 1024) {
        setControllerCalendar(false);
      }
    };

    window.addEventListener("resize", handleSize);

    return () => {
      window.removeEventListener("resize", handleSize);
    };
  }, []);

  const formatterDate = (value) => {
    setValueData(value);
    const arr = value.map((e) => new Date(e).toLocaleString().split(",")[0]);
    setValueData2(arr);
  };

  const listHours =()=>{
    let min = (hotel.productCheckInMin).split(":")
    let max = (hotel.productCheckInMax).split(":")
    let result = []
    for (let i = min[0]; i <= max[0]; i++) {
      result.push(<option key={i} value={`${i}:${min[1]}`}>{`${i}:${min[1]}`}</option>)
    }
    return result
  }

  const tileDisabledHandler=(date, view)=>{
    if(hotel.disabled){
    const dateDisabled = [...hotel.disabled]
    const dateCalendar = new Date(date).toISOString().split("T")[0]
    return dateDisabled.includes(dateCalendar)
    }
    return
  }

  const reserva = async()=>{
    const date1 = new Date(valueData[0]).toISOString().split("T")[0]
    const date2 = new Date(valueData[1]).toISOString().split("T")[0]
    const payload = {
      reservationTime: timeForm.getFieldValue("reservationTime"),
      arrival: date1,
      departure: date2,
      covidVaccine: true,
      additionalInformation: userForm.getFieldValue('additionalInformation'),
      product: {
        id: parseInt(params)
      },
      user: {
        id: user.id,
        city: {
          id: citySelect
        }
      }
   }
    //Update city
      const [error, data] = await createBookings(payload)
      if(error){
        console.log(error);
        return
      }
      if(data){
        console.log("Reversa realizada");
        navigate("/bookingconfirm")
        return
      } 

  }

  return (
    <section className="booking__container">
      <div className="booking__container__back">
        <div className="container container--justify-between container--align-center">
          <div className="booking__container__back__name">
            <p>{hotel.categoryName}</p>
            <h2>{hotel.productName}</h2>
          </div>
          <div className="booking__container__back__button">
            <Link to="/">
              <Back />
            </Link>
          </div>
        </div>
      </div>

      <div className="booking__container__detail__layout">
        <div className="booking__container__detail2">
          <h1>Completa tus datos</h1>
          <div className="booking__container__detail2__form">
            <Form layout="vertical" form={userForm}>
              <div style={{ display: "flex", gap: "10px", marginBottom: '10px' }}>
                <Form.Item label="Nombre" name="name" style={{ width: "50%" }}>
                  <Input style={{ width: "100%" }} disabled />
                </Form.Item>
                <Form.Item
                  label="Apellido"
                  name="lastname"
                  style={{ width: "50%" }}
                >
                  <Input style={{ width: "100%" }} disabled />
                </Form.Item>
              </div>
              <div style={{ display: "flex", gap: "10px", marginBottom: '10px' }}>
                <Form.Item
                  label="Correo electronico"
                  name="email"
                  style={{ width: "50%" }}
                >
                  <Input style={{ width: "100%" }} disabled/>
                </Form.Item>
                <Form.Item label="Ciudad" name='city' style={{ width: "50%" }}>
                  <select name="city" id="city" style={{ width: "100%" }} value={citySelect} onChange={(e)=>setCitySelect(e.target.value)}>
                    <option value="0">Seleccionar</option>
                    {cities.map(item =>{
                      return <option key={item.id} value={item.id}>{item.name}</option>
                    })}
                  </select>
                </Form.Item>
              </div>
              <div style={{ display: "flex", gap: "10px", marginBottom: '10px' }}>
                <Form.Item
                  label="Informacion adicional"
                  name="additionalInformation"
                  style={{ width: "100%" }}
                >
                  <textarea name="additionalInformation" id="additionalInformation" style={{width: '100%'}}></textarea>
                </Form.Item>
              </div>
            </Form>
          </div>
        </div>

        <div className="booking__container__detail3">
          <h2>Selecciona tu fecha de reserva</h2>
          <div
            className="booking__container__detail3--calendar"
            style={{ padding: "10px", minHeight: "350px" }}
          >
            <Calendar
              value={valueData}
              onChange={(date) => formatterDate(date)}
              calendarType="US" // Sunday = 0, Monday = 1, Tuesday = 2, etc.
              view="month"
              minDate={new Date()}
              locale="es-ES"
              navigationLabel={({ date, label, locale, view }) =>
                `${capitalize(
                  date.toLocaleDateString(locale, { month: "long" })
                )}`
              }
              formatShortWeekday={(locale, date) =>
                date.toLocaleDateString(locale, { weekday: "short" })[0]
              }
              prev2Label={null} // label for previous month button
              next2Label={null} // label for next month button
              showNeighboringMonth={false} // show previous/next month buttons
              showDoubleView={controllerCalendar} // show two months in view
              selectRange={true} // allow range selection
              showFixedNumberOfWeeks={false}
              tileDisabled={({ date, view }) => tileDisabledHandler(date, view)}
            />
          </div>
        </div>

        <div className="booking__container__detail4">
          <h1>Tu horario de llegada</h1>
          <div className="booking__container__detail2__form">
            <h4>{`Tu habitación va a estar lista para el check-in entre las ${hotel.productCheckInMin}
              y las ${hotel.productCheckInMax}`}</h4>
            <Form layout="vertical" form={timeForm}>
              <div style={{ display: "flex", gap: "10px" }}>
                <Form.Item label="Indicá tu horario estimado de llegada" name='reservationTime' style={{ width: "50%" }}>
                  <select name="reservationTime" id="reservationTime" style={{ width: "100%" }}>
                    {hotel.productCheckInMin && listHours()}
                  </select>
                </Form.Item>
              </div>
            </Form>
          </div>
        </div>

        <div className="booking__container__detail1">
          <div className="">
            {hotel && <CardDetail info={hotel} dateValue={valueData2} onClick={reserva} />}
          </div>
        </div>
      </div>

      <div className="booking__container__policy">
        <div className="container container--flex-column">
          <h2 className="booking__container__policy__title">
            Qué tenés que saber
          </h2>
          <hr className="booking__container__policy__separator" />
          <div className="booking__container__policy__list">
            {hotel.productPolicies && <Policy info={hotel.productPolicies} />}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Booking;
