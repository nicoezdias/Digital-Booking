import { ReactComponent as IconCalendar } from 'assets/icon/calendar.svg';
import React, {  useEffect, useRef, useState } from 'react'
import { Calendar } from 'react-calendar';
import { capitalize } from 'util/fns';
import Button from './Button';

export function TextSuggestion({ Icon, IconItem, placeholder, cities, idCity, setIdCity}) {
  const contentData = useRef(null)
  const [value, setValue] = useState('')
  const [dataList, setDataList] = useState([])

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setValue(searchWord);
    const filter = cities.filter((value) => {
      let text = value.name.toLowerCase() + " " + value.nameCountry.toLowerCase();
      return text.includes(searchWord.toLowerCase());
    });
    if (searchWord === "") {
      setDataList([]);
    } else {
      setDataList(filter);
    }
  };

  const handleItemClick = (item) => {
    const [city, country, id] = item.currentTarget.children[1].children
    const concat = city.innerText + " " + country.innerText
    setValue(concat);
    setIdCity(id.innerText);
    setDataList([]);
  }

  const handleOnBlur = (e) => {
    if (e.relatedTarget !== contentData.current) {
      setDataList([]);
    }
  }

  return (
    <div className='text__suggestion'>
      <Icon className="icon__suggestion" />
      <input className='input__suggestion' type="text" placeholder={placeholder} value={value} onFocus={handleFilter} onChange={handleFilter} onBlur={handleOnBlur} name="city"/>
      <input type="text" className='input__suggestion__id' name='id' value={idCity} onChange={handleItemClick}/>
      <div className='data__suggestion' tabIndex="0" ref={contentData}>
        {dataList.map((info, key) => {
          return <DataItem IconItem={IconItem} info={info} handleClick={handleItemClick} handleBlur={handleOnBlur} key={key} />
        })}
      </div>
    </div>
  )
}

function DataItem({ IconItem, info, handleClick, handleBlur }) {
  return (
    <>
      <div className='data__item' onClick={handleClick} onBlur={handleBlur}>
        {<IconItem className="icon__item" />}
        <div>
          <p>{info.name}</p>
          <p>{info.nameCountry}</p>
          <p className='data__item__id'>{info.id}</p>
        </div>
      </div>
      <hr className='data__divisor' />
    </>
  )
}

export function InputIcon({ Icon, placeholder, readonly, onBlur, onChange, onFocus, value, name }) {
  const isReadOnly = (readonly) => {
    if (readonly) {
      return <input name={name} className='input__inputicon' type="text" placeholder={placeholder} readOnly onFocus={onFocus} onBlur={onBlur} onChange={onChange} value={value}/>
    } else {
      return <input name={name} className='input__inputicon' type="text" placeholder={placeholder} onFocus={onFocus} onBlur={onBlur} onChange={onChange} value={value}/>
    }
  }
  return (
    <div className='input__icon'>
      <Icon className="icon__input" />
      {isReadOnly(readonly)}
    </div>
  )
}

export function InputCalendar() {
  const [value, setValue] = useState(()=> new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef(null);
  const [controllerCalendar, setControllerCalendar] = useState(()=> window.innerWidth > 1024)
  const [value2, setValue2] = useState('')

  useEffect(() => {
    const handleSize = ()=>{
      if(window.innerWidth > 1024){
        setControllerCalendar(true)
      }
      if(window.innerWidth < 1024){
        setControllerCalendar(false)
      }
    }

    window.addEventListener('resize', handleSize)

    return () => {
      window.removeEventListener('resize', handleSize)
    }
  }, [])

  const openCalendar = () => {
    setShowCalendar(true);
  }

  const log =(e) =>{
    const arr = value.map(e => new Date(e).toLocaleString().split(",")[0]).join(" - ")
    setValue2(arr)
    setShowCalendar(false);
  }

  return (
    <div className='input__calendar'>
      {/* onBlur={handleOnBlur} */}
      <InputIcon Icon={IconCalendar} placeholder="Check in - Check out" readonly onFocus={openCalendar} value={value2} name='date'/>
      <div className={`calendar ${showCalendar && "calendar--show"}`} tabIndex="0" ref={calendarRef}>
        <Calendar
          value={value}
          onChange={(date) => setValue(date)}
          calendarType='US' // Sunday = 0, Monday = 1, Tuesday = 2, etc.
          view='month'
          minDate={new Date()}
          locale='es-ES'
          navigationLabel={({ date, label, locale, view }) => `${capitalize(date.toLocaleDateString(locale, { month: 'long' }))}`}
          formatShortWeekday={(locale, date) => date.toLocaleDateString(locale, { weekday: 'short' })[0]}
          prev2Label={null} // label for previous month button
          next2Label={null} // label for next month button
          showNeighboringMonth={false} // show previous/next month buttons
          showDoubleView={controllerCalendar} // show two months in view
          selectRange={true} // allow range selection
          showFixedNumberOfWeeks={false}
        />
        <Button text="Aplicar" fill className="calendar__button" type="button" onClick={log}/>
      </div>
    </div>
  )
}