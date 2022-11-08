import { useEffect, useCallback } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import {
  ProcessErrorHandler,
  ProcessEventsHandler,
  ReceivedEventData,
} from '@azure/event-hubs'
import subscribeEventHubConsumer from '../utils/subscribeEventHubConsumer'
import eventsAtom from '../state/eventsAtom'
import connectionAtom from '../state/connectionAtom'
import eventAtom from '../state/eventAtom'
import filterAtom from '../state/filterAtom'

const useSubscribeEventhub = () => {
  const filterState = useRecoilValue(filterAtom)
  const setEvents = useSetRecoilState(eventsAtom)
  const setEvent = useSetRecoilState(eventAtom)
  const setConnection = useSetRecoilState(connectionAtom)
  const { config: connectionConfig } = useRecoilValue(connectionAtom)

  const processEvent: ProcessEventsHandler = useCallback(
    async (events: ReceivedEventData[]) => {
      setEvents(current => {
        return [...current, ...events]
      })
    },
    [setEvents]
  )

  const processError: ProcessErrorHandler = useCallback(
    async error => {
      setConnection(current => ({
        ...current,
        state: {
          isConnected: false,
          isConnecting: false,
          isError: true,
          error: error.message,
        },
      }))
    },
    [setConnection]
  )

  useEffect(() => {
    let closeConnection: () => void

    setEvents([])

    setEvent(null)

    setConnection(current => ({
      ...current,
      state: {
        isConnected: false,
        isConnecting: true,
        isError: false,
        error: '',
      },
    }))

    subscribeEventHubConsumer(
      connectionConfig,
      processEvent,
      processError,
      filterState.history
    )
      .then(closeConnection_ => {
        closeConnection = closeConnection_
        setConnection(current => ({
          ...current,
          state: {
            isConnected: true,
            isConnecting: false,
            isError: false,
            error: '',
          },
        }))
      })
      .catch(err => {
        setConnection(current => ({
          ...current,
          state: {
            isConnected: false,
            isConnecting: false,
            isError: true,
            error: err.toString(),
          },
        }))
      })

    return () => {
      closeConnection && closeConnection()
    }
  }, [
    connectionConfig,
    filterState.history,
    processError,
    processEvent,
    setConnection,
    setEvent,
    setEvents,
  ])
}

export default useSubscribeEventhub
