import React, { useEffect, useState } from 'react'

function Policy({info}) {
  const [policy, setPolicy] = useState({})

  useEffect(() => {
    const objPolicy = {}
    info.forEach(item => {
      if(objPolicy[item.type]){
        objPolicy[item.type].push(item.description)
      } else {
        objPolicy[item.type] = [item.description]
      }
    })
    setPolicy(objPolicy)
  },[info])

  const renderPolicy = () => {
    return Object.keys(policy).map(key => {
      return (
        <div className="policy__item" key={key}>
          <h3>{key}</h3>
          <div className="list__plicy">
            {policy[key].map(item => {
              return (
                <p key={item}>{item}</p>
              )
            })}
          </div>
        </div>
      )
    })
  }


  return (
    <>
      {renderPolicy()}
    </>
  )
}

export default Policy