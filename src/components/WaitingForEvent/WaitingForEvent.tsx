import React from 'react'
import { useRecoilValue } from 'recoil'
import connectionStateAtom from '../../state/connectionAtom'

import style from './style.module.css'

const WaitingForEvent = () => {
  const { state, config } = useRecoilValue(connectionStateAtom)

  return (
    <div className={style.container}>
      {state.isConnecting && (
        <div className={style.connecting}>Connecting ...</div>
      )}
      {state.isError && (
        <div className={style.error}>
          <div>
            Could not connect to the EventHub
            <p className={style.message}>{state.error}</p>
          </div>
        </div>
      )}
      {state.isConnected && (
        <div className={style.connected}>
          Connected to {config.eventHubName}
        </div>
      )}
    </div>
  )
}

export default WaitingForEvent
