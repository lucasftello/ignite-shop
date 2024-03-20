import { ReactNode, createContext, useState } from 'react'
import { toast } from 'react-toastify'

export interface Product {
  id: string
  name: string
  description: string
  imageUrl: string
  price: string
  defaultPriceId: string
}

interface CartContextProviderProps {
  children: ReactNode
}

interface CartContextType {
  products: Product[]
  addProduct: (product: Product) => void
  removeProduct: (id: Product['id']) => void
}

export const CartContext = createContext<CartContextType>({} as CartContextType)

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [products, setProducts] = useState<Product[]>([])

  function addProduct(item: Product) {
    const itemAlreadyAdd = products.find((product) => product.id === item.id)

    if (!itemAlreadyAdd) {
      setProducts((prevState) => [...prevState, item])
      toast.success('Produto adicionado a sacola')
    } else {
      toast.warn('O produto já está na sacola')
    }
  }

  function removeProduct(id: Product['id']) {
    const productsWithoutRemoved = products.filter(
      (product) => product.id !== id,
    )

    setProducts(productsWithoutRemoved)
  }

  return (
    <CartContext.Provider value={{ products, addProduct, removeProduct }}>
      {children}
    </CartContext.Provider>
  )
}
