import { ReactComponent as Back } from "assets/icon/back.svg";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { listCategories, listCity } from "service/Home";
import Button from "components/atoms/Button";
import { getPolicies, listFeatures, postProduct } from "service/ServiceAuth";
import Features from "components/atoms/Features";
import { Form, Input, Checkbox } from "antd";
const { TextArea } = Input;

function Admin() {
  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);
  const [features, setFeatures] = useState([]);
  const [checked, setChecked] = useState([]);
  const [policies, setPolicies] = useState([])
  const [countImage, setCountImage] = useState(new Array(1).fill(''))
  const [policies1, setPolicies1] = useState([])
  const [policies2, setPolicies2] = useState([])
  const [policies3, setPolicies3] = useState([])
  const navigate = useNavigate()

  //Forms
  const [basicForm] = Form.useForm();
  const [imageForm] = Form.useForm();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const loadCategories = async () => {
      const [error, data] = await listCategories();
      if (error) {
        console.log(error);
        return;
      }
      if (data) {
        const newData = [...data];
        newData.forEach((item) => {
          delete item.urlImage;
          delete item.text_alt;
          delete item.productQuantity;
        });
        setCategories(newData);
      }
    };
    const loadCities = async () => {
      const [error, data] = await listCity();
      if (error) {
        console.log(error);
        return;
      }
      if (data) {
        setCities(data);
      }
    };
    const loadFeatures = async () => {
      const [error, data] = await listFeatures();
      if (error) {
        console.log(error);
        return;
      }
      if (data) {
        const newData = [...data].map(item => {
          item['value'] = item.id
          item['label'] = <Features iconName={item.icon}/>
          return item
        })
        setFeatures(newData);
        console.log(newData);
      }
    };
    const loadPolicies = async ()=>{
      const [error, data] = await getPolicies()
      if(error){
        console.log(error);
        return
      }
      if(data){
        const objPolicy = {}
        data.forEach(item => {
          if(objPolicy[item.type]){
            objPolicy[item.type].push({
              label: item.description,
              value: item.id
            })
          } else {
            objPolicy[item.type] = [{
              label: item.description,
              value: item.id
            }]
          }
        })
        //console.log(objPolicy);
        setPolicies(objPolicy)
      }
    }

    loadPolicies();
    loadCategories();
    loadCities();
    loadFeatures();
  };

  const createProduct = async () => {
    const info = basicForm.getFieldsValue();
    const images = imageForm.getFieldsValue();
    const numberImages = Object.keys(images).length/3
    const payload = {...info}
    payload['category'] = {
      id: parseInt(payload.category)
    }
    payload['city'] = {
      id: parseInt(payload.city)
    }
    payload['features'] = [...checked].map(item => {
      return {id: item}
    })
    payload['policies'] = [...policies1,...policies2,...policies3].map(item => {
      return {id: item}
    })
    payload['imagesDto'] = new Array(numberImages).fill('').map((item,i) => {
      return {
        title: images[`${i}title`],
        url: images[`${i}url`],
        textAlt: images[`${i}textAlt`],
        profile: i === 0
      }
    })

    const [error, data] = await postProduct(payload)
    if(error){
      console.log(error);
      return
    }
    if(data){
      console.log(data);
      navigate('/')
    }
  };

  const loadTime = () => {
    let z = new Array(24).fill().map((_,i) =>{
      let x = `0${i}`
      return x.length === 2 ? `${x}:00` : `${x.slice(1)}:00`
    })
    return z
  }

  const addImage =() =>{
    const newData = [...countImage, '']
    setCountImage(newData)
  }

  const lessImage =()=>{
    const newData = [...countImage].slice(0,countImage.length -1)
    setCountImage(newData)
  }

  return (
    <div className="admin_content">
      <div className="admin_content--back">
        <div className="container container--justify-between container--align-center">
          <div className="hotels__details__back__name">
            <h2>Administracion</h2>
          </div>

          <div className="hotels__details__back__button">
            <Link to="/">
              <Back />
            </Link>
          </div>
        </div>
      </div>

      <div className="admin_content--form">
        <div className="container container--flex-column">
          <h3>Crear propiedad</h3>

          <section className="admin_content--card">
            <Form className="form form--admin" form={basicForm} layout="vertical">
              <Form.Item label="Nombre de la propiedad" name="name">
                <Input style={{ width: "100%" }} />
              </Form.Item>

              <Form.Item label="Categoria" name="category">
                 <select name="category" id="category" style={{ width: "100%" }}>
                  {categories.map((item) => {
                    return (
                      <option value={item.id} key={item.id}>
                        {item.title}
                      </option>
                    );
                  })}
                </select> 
              </Form.Item>

              <Form.Item label="Dirección" name="direction">
                <Input style={{ width: "100%" }} />
              </Form.Item>

              <Form.Item label="Ciudad" name="city">
                <select name="city" id="city" style={{ width: "100%" }}>
                  {cities.map((item) => {
                    return (
                      <option value={item.id} key={item.id}>
                        {item.name}
                      </option>
                    );
                  })}
                </select>
              </Form.Item>

              <Form.Item label="Latitud" name="latitude">
                <Input style={{ width: "100%" }} />
              </Form.Item>

              <Form.Item label="Longitud" name="longitude">
                <Input style={{ width: "100%" }} />
              </Form.Item>

              <Form.Item label="CheckIn minimo" name="checkInMin">
                <select name="checkInMin" id="checkInMin" style={{ width: "100%" }}>
                  {loadTime().map((item) => {
                    return (
                      <option value={item} key={item}>
                        {item}
                      </option>
                    );
                  })}
                </select>
              </Form.Item>

              <Form.Item label="CheckIn maximo" name="checkInMax">
                <select name="checkInMax" id="checkInMax" style={{ width: "100%" }}>
                  {loadTime().map((item) => {
                    return (
                      <option value={item} key={item}>
                        {item}
                      </option>
                    );
                  })}
                </select>
              </Form.Item>

              <Form.Item label="Description" name="description" className="colspan">
                <TextArea rows={3} style={{width: '100%'}}/>
              </Form.Item>
            </Form>
          </section>

          <h3>Atributos</h3>

          <section className="admin_content--card">
            <Checkbox.Group options={features} onChange={(e)=> setChecked(e)}/>
          </section>

          <h3>Políticas del producto</h3>

          <section className="admin_content--card" style={{display: 'grid', gridTemplateColumns: '1fr 1fr'}}>
            <div>
              <h3>Normas de la casa</h3>
              <Checkbox.Group options={policies['Normas de la casa']} onChange={(e)=>setPolicies1(e)} style={{display: 'flex', flexDirection: 'column'}}/>
            </div>
            <div>
              <h3>Politica de cancelacion</h3>
              <Checkbox.Group options={policies['Politica de cancelacion']} onChange={(e)=>setPolicies2(e)} style={{display: 'flex', flexDirection: 'column'}}/>
            </div>
            <div>
              <h3>Salud y seguridad</h3>
              <Checkbox.Group options={policies['Salud y seguridad']} onChange={(e)=>setPolicies3(e)} style={{display: 'flex', flexDirection: 'column'}}/>
            </div>
          </section>

          <h3>Cargar imagen</h3>

          <section className="admin_content--card">
            <Form form={imageForm} className="form" style={{width: '100%'}}>
              {countImage.map((i, item) =>{
                return (
                  <div key={item} style={{display: 'flex', gap: '10px', width: '100%', justifyContent: 'space-between'}}>
                    <Form.Item label='Titulo' name={item + 'title'} style={{width: '100%'}}>
                      <Input style={{width: '100%'}}/>
                    </Form.Item>
                    <Form.Item label='URL imagen' name={item + 'url'} style={{width: '100%'}}>
                      <Input placeholder="https://....." style={{width: '100%'}}/>
                    </Form.Item>
                    <Form.Item label='Texto alternativo' name={item + 'profile'} style={{width: '100%'}}>
                      <Input style={{width: '100%'}}/>
                    </Form.Item>
                  </div>
                )
              })}
            </Form>
            <div style={{display: 'flex', gap: '10px'}}>
              {countImage.length < 5 && <Button text='+' fill onClick={addImage}/>}
              {countImage.length > 1 && <Button text='-' onClick={lessImage}/>}
            </div>
          </section>
        </div>

        <div
          style={{
            display: "flex",
            width: "100%",
            padding: "10px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button fill text="Crear"onClick={createProduct} />
        </div>
      </div>
    </div>
  );
}

export default Admin;
