import React from 'react'
import ReactJson from 'react-json-view'
import { useRecoilValue } from 'recoil'
import eventAtom from '../../state/eventAtom'
import DateFormat from '../DateFormat'

import style from './style.module.css'

const Preview = () => {
  const event = useRecoilValue(eventAtom)

  if (!event) return null

  return (
    <div key={'preview' + event.sequenceNumber} className={style.preview}>
      <div className={style.wrapper}>
        <div className={style.head}>
          <div className={style.code}>{event.sequenceNumber}</div>
          <div className={style.date}>
            <DateFormat date={event.enqueuedTimeUtc} />
          </div>
        </div>
        <div className={style.body}>
          <ReactJson
            src={event}
            sortKeys={false}
            displayDataTypes={false}
            enableClipboard={false}
          />
        </div>
      </div>
    </div>
  )
}

export default Preview
