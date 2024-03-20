import { useContext } from 'react'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Stripe from 'stripe'
import { stripe } from '../lib/stripe'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import { Handbag } from '@phosphor-icons/react'
import { HomeContainer, Product, ProductDetails } from '../styles/pages/home'
import { CartContext, Product as ProductType } from '../contexts/CartContext'
import { priceFormatter } from '../utils/priceFormatter'

interface HomeProps {
  products: ProductType[]
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  })

  const { addProduct } = useContext(CartContext)

  function handleAddProductToCart(product: ProductType) {
    addProduct(product)
  }

  return (
    <>
      <Head>
        <title>Home - Ignite Shop</title>
      </Head>

      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map((product) => {
          return (
            <Product className="keen-slider__slide" key={product.id}>
              <Link href={`/product/${product.id}`} prefetch={false}>
                <Image src={product.imageUrl} width={520} height={400} alt="" />
              </Link>

              <footer>
                <ProductDetails>
                  <strong>{product.name}</strong>
                  <span>{product.price}</span>
                </ProductDetails>

                <button onClick={() => handleAddProductToCart(product)}>
                  <Handbag weight="bold" />
                </button>
              </footer>
            </Product>
          )
        })}
      </HomeContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  })

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      description: product.description,
      price: priceFormatter(price.unit_amount! / 100),
      defaultPriceId: price.id,
    }
  })

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2,
  }
}
