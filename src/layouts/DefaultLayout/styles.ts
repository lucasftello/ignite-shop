import { styled } from '@/src/styles'

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  minHeight: '100vh',
})

export const Header = styled('header', {
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1240,
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  button: {
    width: 48,
    height: 48,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: '$gray800',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',

    span: {
      width: 24,
      height: 24,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      top: -8,
      right: -8,
      backgroundColor: '$green500',
      color: '$white',
      fontWeight: 'bold',
      borderRadius: '100%',
    },

    svg: {
      color: '$white',
      fontSize: '$xl',
    },
  },
})
