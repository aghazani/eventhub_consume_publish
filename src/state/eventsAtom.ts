import { ReceivedEventData } from '@azure/event-hubs'
import { atom } from 'recoil'

const eventsAtom = atom<ReceivedEventData[]>({
  key: 'eventsAtom',
  default: [],
})

export default eventsAtom
