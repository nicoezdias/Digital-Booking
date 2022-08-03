import { ReactComponent as Wifi } from 'assets/icon/features/wifi.svg';
import { ReactComponent as Swim } from 'assets/icon/features/swim.svg';
import { ReactComponent as Tv } from 'assets/icon/features/tv.svg';
import { ReactComponent as Pet } from 'assets/icon/features/pet.svg';
import { ReactComponent as Air } from 'assets/icon/features/air.svg';
import { ReactComponent as Car } from 'assets/icon/features/car.svg';
import { ReactComponent as Kitchen } from 'assets/icon/features/kitchen.svg';
import React from 'react'

function Features({iconName}) {

  const selectIcon = (icon) => {
    switch (icon) {
      case "IconWifi":
        return <Wifi/>
      case "IconAptoMascotas":
        return <Pet/>
      case "IconTelevisor":
        return <Tv/>
      case "IconPileta":
        return <Swim/>
      case "IconoAireAcondicionado":
        return <Air/>
      case "IconEstacionamiento":
        return <Car/>
      case "IconCocina":
        return <Kitchen/>
      default:
        return null
    }
  }

  return (
    <>
      {selectIcon(iconName)}
    </>
  )
}

export default Features