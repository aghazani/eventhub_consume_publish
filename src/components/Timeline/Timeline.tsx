import React from 'react'
import { useRecoilValue } from 'recoil'
import useSubscribeEventhub from '../../hooks/useSubscribeEventhub'
import connectionStateAtom from '../../state/connectionAtom'
import eventsSortedSelector from '../../state/eventsSortedSelector'
import EventItem from './EventItem'

import style from './timeline.module.css'

const Timeline = () => {
  const events = useRecoilValue(eventsSortedSelector)
  const { state } = useRecoilValue(connectionStateAtom)
  useSubscribeEventhub()

  return (
    <div className={style.timeline}>
      {events.map((event, index) => (
        <React.Fragment key={event.sequenceNumber}>
          <EventItem key={event.sequenceNumber} event={event} />
          {events[index + 1] ? <div className={style.separator} /> : null}
        </React.Fragment>
      ))}

      {state.isConnected && events.length === 0 && (
        <div className={style.empty}>(( Waiting for event ))</div>
      )}
    </div>
  )
}

export default Timeline
