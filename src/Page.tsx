import React from 'react'
import { useRecoilValue } from 'recoil'
import Preview from './components/Preview'
import Timeline from './components/Timeline'
import Title from './components/Title'
import WaitingForEvent from './components/WaitingForEvent'

import style from './app.module.css'
import connectionAtom from './state/connectionAtom'
import Connect from './components/Connect'

const Page = () => {
  const { isSetted } = useRecoilValue(connectionAtom)

  return (
    <>
      <Title />
      <Connect />
      {isSetted && (
        <>
          <WaitingForEvent />
          <div className={style.body}>
            <Timeline />
            <Preview />
          </div>
        </>
      )}
    </>
  )
}

export default Page
