import { useRef, useState, createContext } from 'react'

export const AppContext = createContext(null)

export default function ContextProvider({ children }) {
  const [tagId, setTagId] = useState('')
  const [text, setText] = useState('')
  const [authorId, setAuthorId] = useState('')
  const [slug, setSlug] = useState('')
  const [renderedData, setRenderedData] = useState({})
  const inputRef = useRef(null)
  return (
    <AppContext.Provider
      value={{
        tagId,
        setTagId,
        text,
        setText,
        authorId,
        setAuthorId,
        slug,
        setSlug,
        renderedData,
        setRenderedData,
        inputRef,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
