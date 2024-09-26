import CartPlaceholder from "./components/CartPlaceholder";

export default function CartLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
      <CartPlaceholder />
    </div>
  )
}