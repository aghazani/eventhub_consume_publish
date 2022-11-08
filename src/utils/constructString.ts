import { ReceivedEventData } from '@azure/event-hubs'

type o = {
  [key: string]: unknown
}

const constructString = (s: string, object: ReceivedEventData) => {
  const c = s.split('+').map((a: string) => {
    if (/[a-b.]/gi.test(a)) {
      return getPropFromObject(a, object)
    } else {
      return a.replace(/"/g, '')
    }
  })

  return c
}

const getPropFromObject = (chain: string, object: ReceivedEventData) => {
  try {
    const prop = chain
      .replace(/\s/g, '')
      .split('.')
      .reduce((acc: o, cur: string) => {
        return acc[cur]
      }, object)

    if (prop === undefined) throw new Error()

    if (prop instanceof Object) throw new Error()

    return String(prop)
  } catch (e) {
    return object.sequenceNumber
  }
}

export default constructString
