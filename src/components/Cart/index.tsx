import { useContext, useState } from 'react'
import Image from 'next/image'
import { CartContext, Product as ProductType } from '@/src/contexts/CartContext'
import { X } from '@phosphor-icons/react'
import {
  CartContainer,
  CartContent,
  CartEmpty,
  CartFooter,
  CartHeader,
  Product,
  ProductDetails,
  ProductIamgeContainer,
  Summary,
} from './styles'
import { DefaultButton } from '../DefaultButton'
import axios from 'axios'
import { convertPriceToNumber } from '@/src/utils/convertPriceToNumber'
import { priceFormatter } from '@/src/utils/priceFormatter'

interface CartProps {
  onClose: () => void
}

interface ProductsCheckout {
  price: ProductType['defaultPriceId']
  quantity: number
}

export function Cart({ onClose }: CartProps) {
  const { products, removeProduct } = useContext(CartContext)
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false)

  const productsQuantity = products.length
  const totalValue = products.reduce(
    (total, product) => total + convertPriceToNumber(product.price),
    0,
  )

  async function handleCheckout() {
    try {
      setIsCreatingCheckoutSession(true)

      const productsCheckout: ProductsCheckout[] = []

      products.map((product) =>
        productsCheckout.push({
          price: product.defaultPriceId,
          quantity: 1,
        }),
      )

      const response = await axios.post('/api/checkout', {
        products: productsCheckout,
      })
      const { checkoutUrl } = response.data
      window.location.href = checkoutUrl
    } catch (error) {
      setIsCreatingCheckoutSession(false)
      alert('Falha ao redirecionar ao checkout')
    }
  }

  function handleCloseCart() {
    onClose()
  }

  return (
    <CartContainer>
      <CartHeader>
        <button onClick={handleCloseCart}>
          <X />
        </button>
      </CartHeader>

      <CartContent>
        <h2>Sacola de compras</h2>

        {products.length > 0 ? (
          products.map((product) => {
            return (
              <Product key={product.id}>
                <ProductIamgeContainer>
                  <Image src={product.imageUrl} width={85} height={85} alt="" />
                </ProductIamgeContainer>
                <ProductDetails>
                  <span>{product.name}</span>
                  <strong>{product.price}</strong>
                  <button onClick={() => removeProduct(product.id)}>
                    Remover
                  </button>
                </ProductDetails>
              </Product>
            )
          })
        ) : (
          <CartEmpty>
            <p>Sua sacola está vazia!</p>
          </CartEmpty>
        )}
      </CartContent>

      {products.length > 0 && (
        <CartFooter>
          <Summary>
            <div>
              <span>Quantidade</span>
              <span>{productsQuantity}</span>
            </div>

            <div>
              <strong>Valor total</strong>
              <strong>{priceFormatter(totalValue)}</strong>
            </div>
          </Summary>

          <DefaultButton
            text="Finalizar compra"
            onClick={handleCheckout}
            disabled={isCreatingCheckoutSession}
          />
        </CartFooter>
      )}
    </CartContainer>
  )
}
