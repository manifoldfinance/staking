import { useState } from 'react'

import { classNames } from 'kindelia/react/classNames'

export default function Searchbar(props: { className: any }) {
  const [search, setSearch] = useState('')
  return (
    <input
      onChange={(e) => setSearch(e.currentTarget.value)}
      value={search}
      placeholder="🔎 Search"
      className={classNames('themeDefault2 px-3 py-2', props.className)}
    />
  )
}
