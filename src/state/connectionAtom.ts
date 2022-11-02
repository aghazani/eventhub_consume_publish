import { atom } from 'recoil'
import * as config from '../utils/config'

type TConnectionAtom = {
  isSetted: boolean
  config: {
    consumerGroup: string
    connectionString: string
    eventHubName: string
  }
  state: {
    isConnecting: boolean
    isConnected: boolean
    isError: boolean
    error: string
  }
}

const connectionAtom = atom<TConnectionAtom>({
  key: 'connectionStateAtom',
  default: {
    isSetted: false,
    config: {
      consumerGroup: config.CONSUMER_GROUP,
      connectionString: config.CONNECTION_STRING,
      eventHubName: config.EVENT_HUB_NAME,
    },
    state: {
      isConnected: false,
      isConnecting: true,
      isError: false,
      error: '',
    },
  },
})

export default connectionAtom
