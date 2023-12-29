import React, { useState } from 'react'
import useProducerClient from '../../hooks/usePublishEvent'

import style from './publish.module.css'

const Publish = () => {
  const [publishing, setPublishing] = useState(false)
  const [body, setBody] = useState('{"att":"value"}')
  const [showPopup, setShowPopup] = useState(false)

  const { publishTest, canPublish } = useProducerClient()

  if (!canPublish) {
    return null
  }

  const doPublish = async () => {
    setPublishing(true)
    await publishTest(body)
    setShowPopup(false)
    setPublishing(false)
  }

  return (
    <div className={style.container}>
      <button onClick={() => setShowPopup(s => !s)}>Publish a test</button>
      {showPopup && (
        <div className={style.popup}>
          <textarea
            value={body}
            onChange={e => setBody(e.target.value)}
          ></textarea>
          <div className={style.actions}>
            <button
              type="button"
              className={style.publish}
              onClick={doPublish}
              disabled={publishing}
            >
              Publish {publishing && '...'}
            </button>

            <button onClick={() => setShowPopup(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Publish
