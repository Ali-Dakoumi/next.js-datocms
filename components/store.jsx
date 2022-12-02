import create from 'zustand'

const useStore = create((set) => ({
  tagId: '',
  text: '',
  authorId: '',
  slug: '',
  renderedData: {},
  searchVariable: '',
  searchBool: false,
  setTagId: (newTagID) => set(() => ({ tagId: newTagID })),
  setText: (text) => set(() => ({ text: text })),
  setAuthorId: (authorId) => set(() => ({ authorId: authorId })),
  setSlug: (slug) => set(() => ({ slug: slug })),
  setRenderedData: (renderedData) => set(() => ({ renderedData: renderedData })),
  setSearchVariable: (searchVariable) => set(() => ({ searchVariable: searchVariable })),
  setSearchBool: (newBool) => set(() => ({ searchBool: newBool })),
}))

// export const useTagId = useStore((state) => state.tagId)
export const useTagId = () => useStore((state) => state.tagId)
export const useText = () => useStore((state) => state.text)
export const useAuthorId = () => useStore((state) => state.authorId)
export const useSlug = () => useStore((state) => state.slug)
export const useRenderedData = () => useStore((state) => state.renderedData)
export const useSearchVariable = () => useStore((state) => state.searchVariable)
export const useSearchBool = () => useStore((state) => state.searchBool)

export const useSetTagId = () => useStore((state) => state.setTagId)
export const useSetText = () => useStore((state) => state.setText)
export const useSetAuthorId = () => useStore((state) => state.setAuthorId)
export const useSetSlug = () => useStore((state) => state.setSlug)
export const useSetRenderedData = () => useStore((state) => state.setRenderedData)
export const useSetSearchVariable = () => useStore((state) => state.setSearchVariable)
export const useSetSearchBool = () => useStore((state) => state.setSearchBool)
