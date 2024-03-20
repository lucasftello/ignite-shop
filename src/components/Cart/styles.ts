import { styled } from '@/src/styles'

export const CartContainer = styled('div', {
  width: 480,
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '$gray800',
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  padding: '1.75rem 3rem 3rem',
  zIndex: 999,
})

export const CartHeader = styled('div', {
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  marginBottom: '1.5rem',

  button: {
    border: 'none',
    background: 'none',
    fontSize: '$xl',
    cursor: 'pointer',

    svg: {
      color: '$gray300',
    },
  },
})

export const CartContent = styled('div', {
  h2: {
    fontSize: '$lg',
    color: '$gray100',
    marginBottom: '2rem',
  },
})

export const Product = styled('div', {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  gap: '1.375rem',
  marginBottom: '1.5rem',
})

export const ProductIamgeContainer = styled('div', {
  width: '100px',
  height: '100px',
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  padding: '0.25rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  img: {
    objectFit: 'cover',
  },
})

export const ProductDetails = styled('div', {
  flex: '1',
  height: '100px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  padding: '3px 0',

  span: {
    display: 'block',
    fontSize: '$md',
    color: '$gray300',
    marginBottom: '0.375rem',
  },

  strong: {
    display: 'block',
    fontSize: '$md',
    color: '$gray100',
    fontWeight: 'bold',
  },

  button: {
    background: 'none',
    border: 'none',
    fontSize: '1rem',
    color: '$green500',
    fontWeight: 'bold',
    marginTop: 'auto',
    cursor: 'pointer',

    '&:hover': {
      color: '$green300',
    },
  },
})

export const CartEmpty = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

export const CartFooter = styled('div', {
  marginTop: 'auto',
})

export const Summary = styled('div', {
  marginBottom: '3.75rem',

  div: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.625rem',

    strong: {
      color: '$gray100',

      '&:nth-child(1)': {
        fontSize: '$md',
      },

      '&:nth-child(2)': {
        fontSize: '$xl',
      },
    },
  },
})
