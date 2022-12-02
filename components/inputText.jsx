import { useSearchVariable, useSetSearchVariable, useSetSearchBool } from './store'
export default function InputText() {
  const searchVariable = useSearchVariable()
  const setSearchVariable = useSetSearchVariable()
  const setSearchBool = useSetSearchBool()
  return (
    <>
      <input
        type="text"
        placeholder="search..."
        className="bg-background text-textsecond p-2"
        name="search"
        onChange={(e) => {
          setSearchVariable(e.target.value)
          setSearchBool(false)
          // console.log(e.target.value)
        }}
        value={searchVariable}
      />
    </>
  )
}
