const key = 'filterCache'
type TFilter = {
  eventTitle: string
  history: string
}

const defaultFilter = {
  history: 'hour',
  eventTitle:
    'body.header.type+" : "+body.header.partitionKey+" ["+body.header.source+"]"',
}

export const getFilterCache = (): TFilter => {
  try {
    const c = JSON.parse(localStorage.getItem(key))
    return {
      ...defaultFilter,
      ...c,
    }
  } catch (e) {
    return defaultFilter
  }
}

export const saveFilterCache = (filter: TFilter) => {
  localStorage.setItem(key, JSON.stringify(filter))
}
