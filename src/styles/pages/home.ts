import { styled } from '..'

export const HomeContainer = styled('main', {
  display: 'flex',
  width: '100%',
  maxWidth: 'calc(100vw - ((100vw - 1240px) / 2))',
  marginLeft: 'auto',
  minHeight: 656,
})

export const Product = styled('div', {
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',

  a: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  img: {
    objectFit: 'cover',
  },

  footer: {
    position: 'absolute',
    bottom: '0.25rem',
    left: '0.25rem',
    right: '0.25rem',
    padding: '2rem',
    borderRadius: 6,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '0.75rem',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    transform: 'translateY(110%)',
    opacity: 0,
    transition: 'all 0.2s ease-in-out',

    button: {
      width: 56,
      height: 56,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      backgroundColor: '$green500',
      border: 'none',
      borderRadius: 6,
      cursor: 'pointer',

      svg: {
        color: '$white',
        fontSize: '$xl',
      },

      '&:hover': {
        backgroundColor: '$green300',
      },
    },
  },

  '&:hover': {
    footer: {
      transform: 'translateY(0%)',
      opacity: 1,
    },
  },
})

export const ProductDetails = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '.25rem',

  strong: {
    fontSize: '$lg',
    color: '$gray100',
  },

  span: {
    fontSize: '$xl',
    fontWeight: 'bold',
    color: '$green300',
  },
})
