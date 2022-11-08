import * as config from './config'

type TConfig = {
  consumerGroup: string
  connectionString: string
  eventHubName: string
}

const key = 'configCache'

const defaultConfig = {
  consumerGroup: config.CONSUMER_GROUP,
  connectionString: config.CONNECTION_STRING,
  eventHubName: config.EVENT_HUB_NAME,
}

export const saveConfigCache = (config: TConfig) => {
  localStorage.setItem(key, JSON.stringify(config))
}

export const getConfigCache = (): TConfig => {
  try {
    const newConfig = JSON.parse(localStorage.getItem(key))

    return {
      ...defaultConfig,
      ...newConfig,
    }
  } catch (e) {
    return {
      consumerGroup: config.CONSUMER_GROUP,
      connectionString: config.CONNECTION_STRING,
      eventHubName: config.EVENT_HUB_NAME,
    }
  }
}
