import { EventHubProducerClient } from '@azure/event-hubs'
import { useCallback, useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import connectionAtom from '../state/connectionAtom'

const useProducerClient = () => {
  const [canPublish, setCanPublish] = useState(false)
  const [producerClient, setProducerClient] = useState<EventHubProducerClient>()

  const { config } = useRecoilValue(connectionAtom)

  const publishTest = useCallback(async () => {
    if (!producerClient) return false

    const eventDataBatch = await producerClient.createBatch()

    eventDataBatch.tryAdd({
      body: {
        test: 'Test',
      },
    })

    await producerClient.sendBatch(eventDataBatch)

    return true
  }, [producerClient])

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
