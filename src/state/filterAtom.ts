import { atom } from 'recoil'
import { getFilterCache } from '../utils/filterCache'

const filterAtom = atom({
  key: 'filterAtom',
  default: getFilterCache(),
})

export default filterAtom
