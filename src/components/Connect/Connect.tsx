import React, { useCallback } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import connectionAtom from '../../state/connectionAtom'
import filterAtom from '../../state/filterAtom'
import Publish from './Publish'

import style from './style.module.css'

const Connect = () => {
  const setFilterState = useSetRecoilState(filterAtom)
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

  const setFilter = useCallback(
    (value: string) =>
      setFilterState(current => ({
        ...current,
        eventTitle: value,
      })),
    [setFilterState]
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
              placeholder="EventHub name"
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
            <div className={style.chain}>
              <input
                placeholder="Property to show as title"
                onChange={e => setFilter(e.target.value)}
              />
              <label>
                Exemple :<br />
                <strong>
                  body.header.type+" : "+body.header.partitionKey+"
                  ["+body.header.source+"]"
                </strong>
                <br />
                <strong> body.header.type</strong>
                <br />
                <strong> sequenceNumber</strong>
                <br /> if the chain is not compatible, it falls back to
                sequenceNumber
              </label>
            </div>
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
