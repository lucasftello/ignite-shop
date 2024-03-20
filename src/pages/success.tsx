import Head from 'next/head'
import Link from 'next/link'
import {
  ImageContainer,
  SuccessContainer,
  ImagesContainer,
} from '../styles/pages/success'
import { GetServerSideProps } from 'next'
import { stripe } from '../lib/stripe'
import Image from 'next/image'

interface PurchasedProducts {
  name: string
  imageUrl: string
}

interface SuccessProps {
  customerName: string
  products: PurchasedProducts[]
}

export default function Success({ customerName, products }: SuccessProps) {
  return (
    <>
      <Head>
        <title>Compra efetuada - Ignite Shop</title>

        <meta name="robots" content="noindex" />
      </Head>

      <SuccessContainer>
        <h1>Compra efetuada!</h1>

        <ImagesContainer>
          {products.map((product) => (
            <ImageContainer key={product.name}>
              <Image src={product.imageUrl} width={120} height={110} alt="" />
            </ImageContainer>
          ))}
        </ImagesContainer>

        <p>
          Uhuul <strong>{customerName}</strong>, sua compra de{' '}
          <strong>{products.length} camisetas</strong> já está a caminho da sua
          casa.
        </p>

        <Link href="/">Voltar ao catálogo</Link>
      </SuccessContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const sessionId = String(query.session_id)

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product'],
  })

  const customerName = session.customer_details?.name
  const products: PurchasedProducts[] = []

  session.line_items?.data.map((item) =>
    products.push({
      name: item.price!.product.name,
      imageUrl: item.price!.product.images[0],
    }),
  )

  return {
    props: {
      customerName,
      products,
    },
  }
}
