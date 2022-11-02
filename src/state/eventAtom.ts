import { ReceivedEventData } from '@azure/event-hubs'
import { atom } from 'recoil'

const eventAtom = atom<ReceivedEventData>({
  key: 'eventAtom',
  default: null,
})

export default eventAtom
