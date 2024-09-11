import { getProductBySlug } from '@/actions/products'
import { IoMdStar } from 'react-icons/io'
import { formatCompactNumber, formatCurrency } from '@/utils/number'
import ProductImages from './components/ProductImages'
import { Metadata, ResolvingMetadata } from 'next'

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
        <div className="product-info space-y-4">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <div className="flex items-center space-x-2">
            <IoMdStar className="text-yellow-400 text-2xl" />
            <span className="font-medium">{product.rating.value}</span>
            <span className="text-gray-300">|</span>
            <span className="text-gray-500">{formatCompactNumber(product.sales)} Terjual</span>
          </div>
          {product.discount ? (
            <div>
              <p className="text-3xl font-bold text-green-600">
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
          <div>
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="text-gray-600">{product.description}</p>
          </div>
          <button type="submit" className="w-full bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors font-semibold">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}
