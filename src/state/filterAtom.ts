import { atom } from 'recoil'

const filterAtom = atom({
  key: 'filterAtom',
  default: {
    eventTitle: 'sequenceNumber',
  },
})

export default filterAtom
