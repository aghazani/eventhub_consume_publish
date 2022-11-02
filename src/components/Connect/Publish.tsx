import React, { useState } from 'react'
import useProducerClient from '../../hooks/usePublishEvent'

import style from './publish.module.css'

const Publish = () => {
  const [publishing, setPublishing] = useState(false)

  const { publishTest, canPublish } = useProducerClient()

  if (!canPublish) {
    return null
  }

  const doPublish = async () => {
    setPublishing(true)
    await publishTest()
    setPublishing(false)
  }

  return (
    <button
      type="button"
      className={style.test}
      onClick={doPublish}
      disabled={publishing}
    >
      Publish test {publishing && '...'}
    </button>
  )
}

export default Publish
