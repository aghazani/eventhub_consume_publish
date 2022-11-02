import { selector } from 'recoil'
import eventsAtom from './eventsAtom'

const eventsSortedSelector = selector({
  key: 'eventsSortedSelector',
  get: ({ get }) => {
    const events = get(eventsAtom)

    return [...events].sort((a, b) => b.sequenceNumber - a.sequenceNumber)
  },
})

export default eventsSortedSelector
