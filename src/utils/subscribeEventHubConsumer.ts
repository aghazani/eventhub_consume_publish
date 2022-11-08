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
  const date = new Date()
  let latest = false
  switch (startPosition) {
    case 'hour':
      date.setHours(new Date().getHours() - 1)
      break
    case 'today':
      date.setHours(0, 0, 0)
      break
    default:
      latest = true
      break
  }

  const subscription = client.subscribe(
    partitionIds[0],
    {
      processEvents,
      processError,
    },
    {
      startPosition: latest
        ? latestEventPosition
        : {
            enqueuedOn: date,
          },
    }
  )

  return async () => {
    await subscription.close()
    await client.close()
  }
}

export default subscribeEventHubConsumer
