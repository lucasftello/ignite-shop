import { useContext } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Stripe from 'stripe'
import { stripe } from '@/src/lib/stripe'
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from '@/src/styles/pages/product'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { DefaultButton } from '@/src/components/DefaultButton'
import { CartContext, Product } from '@/src/contexts/CartContext'
import { priceFormatter } from '@/src/utils/priceFormatter'

interface ProductProps {
  product: Product
}

export default function Product({ product }: ProductProps) {
  const { isFallback } = useRouter()

  const { addProduct } = useContext(CartContext)

  function handleAddProductToCart(product: Product) {
    addProduct(product)
  }

  if (isFallback) {
    return <p>Loading...</p>
  }

  return (
    <>
      <Head>
        <title>{product.name} - Ignite Shop</title>
      </Head>

      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={400} alt="" />
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.price}</span>

          <p>{product.description}</p>

          <DefaultButton
            text="Colocar na sacola"
            onClick={() => handleAddProductToCart(product)}
          />
        </ProductDetails>
      </ProductContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: 'prod_PiajsGIOFCaNBN' } }],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params!.id

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  })

  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        description: product.description,
        price: priceFormatter(price.unit_amount! / 100),
        defaultPriceId: price.id,
      },
    },
    revalidate: 60 * 60 * 1,
  }
}
