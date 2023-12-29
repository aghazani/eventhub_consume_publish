import { EventHubProducerClient } from '@azure/event-hubs'
import { useCallback, useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import connectionAtom from '../state/connectionAtom'

const useProducerClient = () => {
  const [canPublish, setCanPublish] = useState(false)
  const [producerClient, setProducerClient] = useState<EventHubProducerClient>()

  const { config } = useRecoilValue(connectionAtom)

  const publishTest = useCallback(
    async (body: string) => {
      if (!producerClient) return false

      let json = {}

      try {
        json = JSON.parse(body)
      } catch (e) {
        json = body
      }

      const eventDataBatch = await producerClient.createBatch()

      eventDataBatch.tryAdd({
        body: json,
      })

      await producerClient.sendBatch(eventDataBatch)

      return true
    },
    [producerClient]
  )

  useEffect(() => {
    try {
      setCanPublish(false)
      const pc = new EventHubProducerClient(
        config.connectionString,
        config.eventHubName
      )

      setProducerClient(pc)
      setCanPublish(true)

      return () => {
        pc.close()
      }
    } catch (e) {
      setCanPublish(false)
    }
  }, [config.connectionString, config.eventHubName])

  return { publishTest, canPublish }
}

export default useProducerClient
