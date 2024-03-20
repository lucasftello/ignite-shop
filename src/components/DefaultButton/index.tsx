import { ButtonHTMLAttributes } from 'react'
import { ButtonContainer } from './styles'

interface DefaultButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
}

export function DefaultButton({ text, ...props }: DefaultButtonProps) {
  return <ButtonContainer {...props}>{text}</ButtonContainer>
}
