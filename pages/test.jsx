import React from 'react'
import useStore from '../components/store'
import AddToCartSection from '../components/addToCart'
import Test from '../components/test'
function test() {
  const tagId = useStore((state) => state.tagId)
  const setTagId = useStore((state) => state.setTagId)
  const cartCount = useStore((state) => state.cartCount)
  console.log('🚀 ~ file: test.jsx:11 ~ test ~ setTagId', setTagId)

  // const Test = () => {
  //   return <div className="h-20 w-20 ">Test</div>
  // }

  return (
    <div className=" flex flex-col w-full h-full justify-around">
      <Test />
      <button onClick={() => setTagId('23456')}> setTagId </button>
      <button onClick={() => setTagId('')}> Reset </button>
      <h1> tagId: {tagId} </h1>
      <AddToCartSection />
      <p> {cartCount} </p>
    </div>
  )
}

export default test
