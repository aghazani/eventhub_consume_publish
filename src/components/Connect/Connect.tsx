import React, { useCallback } from 'react'
import { useRecoilState } from 'recoil'
import connectionAtom from '../../state/connectionAtom'
import filterAtom from '../../state/filterAtom'
import { saveConfigCache } from '../../utils/configCache'
import { saveFilterCache } from '../../utils/filterCache'
import Publish from './Publish'

import style from './style.module.css'

const Connect = () => {
  const [filterState, setFilterState] = useRecoilState(filterAtom)
  const [state, setState] = useRecoilState(connectionAtom)

  const onChangeConfigProp = useCallback(
    (
      prop: 'eventHubName' | 'consumerGroup' | 'connectionString',
      value: string
    ) => {
      setState(current => {
        const o = {
          ...current,
          config: {
            ...current.config,
            [prop]: value,
          },
        }

        saveConfigCache(o.config)

        return o
      })
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
    (key: string, value: string) =>
      setFilterState(current => {
        const a = {
          ...current,
          [key]: value,
        }
        saveFilterCache(a)
        return a
      }),
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
                value={filterState.eventTitle}
                onChange={e => setFilter('eventTitle', e.target.value)}
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
            <div>
              <label>Events history : </label>
              <select
                onChange={e => setFilter('history', e.target.value)}
                value={filterState.history}
              >
                <option value="new">Only New</option>
                <option value="hour">Last Hour</option>
                <option value="today">Today</option>
              </select>
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
