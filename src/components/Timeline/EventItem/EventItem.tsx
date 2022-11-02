import React, { useCallback } from 'react'
import classnames from 'classnames'

import { differenceInSeconds } from 'date-fns'
import { ReceivedEventData } from '@azure/event-hubs'

import style from './eventItem.css'
import DateFormat from '../../DateFormat'
import { useSetRecoilState } from 'recoil'
import eventAtom from '../../../state/eventAtom'

type TEventItemProps = {
  event: ReceivedEventData
}

const EventItem = ({ event }: TEventItemProps) => {
  const setEvent = useSetRecoilState(eventAtom)
  const isNew = differenceInSeconds(event.enqueuedTimeUtc, new Date()) > -10

  const onClick = useCallback(() => {
    setEvent(event)
  }, [event, setEvent])

  return (
    <div className={classnames(style.item, { [style.item__new]: isNew })}>
      <div className={style.dot} onClick={onClick}>
        <span />
      </div>
      <div className={style.about}>
        <div className={style.date}>
          <p onClick={onClick}>
            <DateFormat date={event.enqueuedTimeUtc} />
          </p>
        </div>
        <div className={style.code}>
          <span onClick={onClick}>{event.sequenceNumber}</span>
        </div>
      </div>
    </div>
  )
}

export default React.memo(EventItem)
