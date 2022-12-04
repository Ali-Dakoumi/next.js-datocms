import { useSearchVariable, useSetSearchVariable, useSetSearchBool } from './store'
export default function InputText() {
  const searchVariable = useSearchVariable()
  const setSearchVariable = useSetSearchVariable()
  const setSearchBool = useSetSearchBool()
  return (
    <>
      <input
        type="text"
        placeholder=" ...بحث"
        className="bg-background text-textsecond text-xs p-2 text-right"
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
