import useStore from './store'

const AddToCartSection = () => {
  const addToCart = useStore((state) => state.addToCart)
  console.log('add to cart ')
  return (
    <div>
      <button onClick={addToCart}>Add To Cartttt</button>
    </div>
  )
}

export default AddToCartSection
