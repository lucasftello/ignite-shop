export function convertPriceToNumber(price: string): number {
  return Number(price.replace('R$', '').replace(',', '.'))
}
