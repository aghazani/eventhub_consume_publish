import React, { useCallback } from 'react'
import { useRecoilState } from 'recoil'
import connectionAtom from '../../state/connectionAtom'
import Publish from './Publish'

import style from './style.module.css'

const Connect = () => {
  const [state, setState] = useRecoilState(connectionAtom)

  const onChangeConfigProp = useCallback(
    (
      prop: 'eventHubName' | 'consumerGroup' | 'connectionString',
      value: string
    ) => {
      setState(current => ({
        ...current,
        config: {
          ...current.config,
          [prop]: value,
        },
      }))
    },
    [setState]
  )

  const setConfig = useCallback(
    (value: boolean) => {
      setState(current => ({
        ...current,
        isSetted: value,
      }))
    },
    [setState]
  )

  return (
    <div className={style.wrapper}>
      {state.isSetted ? (
        <div className={style.actions}>
          <button type="button" onClick={() => setConfig(false)}>
            Change Connection
          </button>
          <Publish />
        </div>
      ) : (
        <>
          <div className={style.form}>
            <label>Connect to an EventHub :</label>
            <input
              placeholder="EvenHub name"
              value={state.config.eventHubName}
              onChange={e => onChangeConfigProp('eventHubName', e.target.value)}
            />
            <input
              placeholder="Consumer group"
              value={state.config.consumerGroup}
              onChange={e =>
                onChangeConfigProp('consumerGroup', e.target.value)
              }
            />
            <input
              placeholder="Connection string"
              value={state.config.connectionString}
              onChange={e =>
                onChangeConfigProp('connectionString', e.target.value)
              }
            />
            <button type="button" onClick={() => setConfig(true)}>
              Connect
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default Connect
