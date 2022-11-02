import React from 'react'

import style from './style.module.css'

const Title = () => {
  return (
    <div className={style.title}>
      <h1>
        EventHub - <strong>Consumer</strong>
      </h1>
      <a
        className={style.link}
        href="https://github.com/azgskull/eventhub_consume_publish"
        target="_blank"
        rel="noreferrer"
      >
        Github repo
      </a>
    </div>
  )
}

export default Title
