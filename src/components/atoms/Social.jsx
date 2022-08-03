import { ReactComponent as Lin } from 'assets/icon/lin.svg';
import { ReactComponent as Ins } from 'assets/icon/ins.svg';
import { ReactComponent as Fb } from 'assets/icon/fb.svg';
import { ReactComponent as Tw } from 'assets/icon/tw.svg';
import React from 'react'

function Social() {
  return (
    <div className="social__bar">
      <Fb />
      <Lin />
      <Tw />
      <Ins />
    </div>
  )
}

export default Social