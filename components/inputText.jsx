import { useContext } from 'react'
import { AppContext } from './contextProvider'

export default function InputText() {
  const { inputRef } = useContext(AppContext)

  return (
    <>
      <input
        ref={inputRef}
        type="text"
        placeholder="search..."
        className="bg-background text-textsecond p-2"
        name="search"
      />
    </>
  )
}
