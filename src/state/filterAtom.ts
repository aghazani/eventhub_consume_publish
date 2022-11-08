import { atom } from 'recoil'

const filterAtom = atom({
  key: 'filterAtom',
  default: {
    eventTitle:
      'body.header.type+" : "+body.header.partitionKey+" ["+body.header.source+"]"',
  },
})

export default filterAtom
