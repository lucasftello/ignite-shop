import { ReactNode, useState, useContext } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Container, Header } from './styles'
import { Handbag } from '@phosphor-icons/react'
import { Cart } from '@/src/components/Cart'
import { CartContext } from '@/src/contexts/CartContext'
import logoImg from '@/src/assets/logo.svg'
import { ToastContainer, Bounce } from 'react-toastify'

interface DefaultLayoutProps {
  children: ReactNode
}

export function DefaultLayout({ children }: DefaultLayoutProps) {
  const [isCartVisible, setIsCartVisible] = useState(false)

  const { products } = useContext(CartContext)

  function handleShowCart() {
    setIsCartVisible(!isCartVisible)
  }

  return (
    <Container>
      <Header>
        <Link href="/">
          <Image src={logoImg} alt="" />
        </Link>

        <button onClick={handleShowCart}>
          {products.length > 0 && <span>{products.length}</span>}
          <Handbag />
        </button>
      </Header>

      {isCartVisible && <Cart onClose={handleShowCart} />}

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
        theme="colored"
        transition={Bounce}
      />

      {children}
    </Container>
  )
}
