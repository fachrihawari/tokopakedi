import { getProductBySlug } from '@/lib/actions/products'
import { IoMdStar } from 'react-icons/io'
import { formatCompactNumber, formatCurrency } from '@/lib/utils/number'
import ProductImages from './components/ProductImages'
import { Metadata, ResolvingMetadata } from 'next'
import AddToCartButton from '@/components/AddToCartButton'

export async function generateMetadata({ params }: ProductPageProps, parentPromise: ResolvingMetadata): Promise<Metadata> {
  const product = await getProductBySlug(params.slug)
  const parent = await parentPromise
  return {
    title: product.name + ' | ' + parent.title?.absolute,
    description: product.description,
    openGraph: {
      images: [product.thumbnail, ...product.images],
    },
  }
}

type ProductPageProps = {
  params: { slug: string }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductBySlug(params.slug)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ProductImages images={[product.thumbnail, ...product.images]} name={product.name} />
        <div className="product-info space-y-6">
          <div className="bg-white rounded-lg px-6">
            <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center space-x-2 mb-4">
              <IoMdStar className="text-yellow-400 text-2xl" />
              <span className="font-medium">{product.rating.value}</span>
              <span className="text-gray-300">|</span>
              <span className="text-gray-500">{formatCompactNumber(product.sales)} Terjual</span>
            </div>
            {product.discount ? (
              <div>
                <p className="text-3xl font-bold text-green-600 mb-2">
                  {formatCurrency(product.price * (1 - product.discount / 100))}
                </p>
                <div className="flex items-center space-x-2">
                  <p className="text-lg text-gray-500 line-through">
                    {formatCurrency(product.price)}
                  </p>
                  <span className="bg-red-100 text-red-800 text-xs font-semibold px-2 py-1 rounded">
                    {product.discount}% OFF
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-3xl font-bold text-green-600">
                {formatCurrency(product.price)}
              </p>
            )}
          </div>
          <div className="bg-white rounded-lg px-6">
            <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200">Description</h2>
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
          </div>
          <div className="bg-white rounded-lg px-6">
            <h3 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200">Product Details</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center">
                <span className="font-medium w-24">Category:</span>
                <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">{product.category}</span>
              </li>
              <li className="flex flex-wrap items-center">
                <span className="font-medium w-24">Tags:</span>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">{tag}</span>
                  ))}
                </div>
              </li>
              <li className="flex items-center">
                <span className="font-medium w-24">Stock:</span>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  product.stock > 10 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}
                </span>
              </li>
            </ul>
          </div>
          <div className="bg-white rounded-lg px-6">
            <AddToCartButton product={product} size="large" />
          </div>
        </div>
      </div>
    </div>
  )
}
