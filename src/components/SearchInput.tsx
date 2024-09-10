'use client'

import { useEffect, useState } from "react"

type Props = {
  defaultValue: string
}
function SearchInput({ defaultValue }: Props) {
  const [search, setSearch] = useState(defaultValue)

  useEffect(() => {
    setSearch(defaultValue)
  }, [defaultValue])

  return (
    <input type="text" className="w-full py-2 pl-10 px-4 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500" name='q' onChange={e => setSearch(e.target.value)} value={search} placeholder="Cari di TokoPakEdi" />
  )
}

export default SearchInput
