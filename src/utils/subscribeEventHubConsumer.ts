import {
  EventHubConsumerClient,
  latestEventPosition,
  ProcessErrorHandler,
  ProcessEventsHandler,
} from '@azure/event-hubs'

type TConfigConnection = {
  consumerGroup: string
  connectionString: string
  eventHubName: string
}

const subscribeEventHubConsumer = async (
  configConnection: TConfigConnection,
  processEvents: ProcessEventsHandler,
  processError: ProcessErrorHandler,
  startPosition: string
): Promise<() => void> => {
  const client = new EventHubConsumerClient(
    configConnection.consumerGroup,
    configConnection.connectionString,
    configConnection.eventHubName
  )

  const partitionIds = await client.getPartitionIds()
  let t
  switch (startPosition) {
    case 'hour':
      t = new Date().setHours(new Date().getHours() - 1)
      break
    case 'today':
      t = new Date().setHours(0, 0, 0)
      break
    default:
      t = 0
      break
  }

  const subscription = client.subscribe(
    partitionIds[0],
    {
      processEvents,
      processError,
    },
    {
      startPosition:
        t === 0
          ? latestEventPosition
          : {
              enqueuedOn: t,
            },
    }
  )

  return async () => {
    await subscription.close()
    await client.close()
  }
}

export default subscribeEventHubConsumer
