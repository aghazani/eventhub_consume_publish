import { atom } from 'recoil'
import { getConfigCache } from '../utils/configCache'

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

const config = getConfigCache()

const connectionAtom = atom<TConnectionAtom>({
  key: 'connectionStateAtom',
  default: {
    isSetted: false,
    config,
    state: {
      isConnected: false,
      isConnecting: true,
      isError: false,
      error: '',
    },
  },
})

export default connectionAtom
