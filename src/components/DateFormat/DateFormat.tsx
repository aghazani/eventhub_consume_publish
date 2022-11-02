import { formatDistance } from 'date-fns'
import React, { useEffect, useState } from 'react'

const DateFormat = ({ date }: { date: Date }) => {
  const [formattedDate, setFormattedDate] = useState(
    formatDistance(date, new Date(), {
      addSuffix: true,
      includeSeconds: true,
    })
  )

  useEffect(() => {
    setInterval(() => {
      setFormattedDate(
        formatDistance(date, new Date(), {
          addSuffix: true,
          includeSeconds: true,
        })
      )
    }, 10000)
  }, [date])

  return <>{formattedDate}</>
}

export default DateFormat
