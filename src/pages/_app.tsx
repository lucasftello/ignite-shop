import type { AppProps } from 'next/app'
import { globalStyles } from '../styles/global'
import 'react-toastify/dist/ReactToastify.css'
import { CartContextProvider } from '../contexts/CartContext'
import { DefaultLayout } from '../layouts/DefaultLayout'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartContextProvider>
      <DefaultLayout>
        <Component {...pageProps} />
      </DefaultLayout>
    </CartContextProvider>
  )
}
