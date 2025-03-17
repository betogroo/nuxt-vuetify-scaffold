export const capitalize = (s: string) =>
  s.charAt(0).toLocaleUpperCase() + s.slice(1)

export const isDevelopment = () => process.env.NODE_ENV !== 'production'

export const timestampToDate = (date: string) =>
  new Date(date).toLocaleDateString('pt-BR')

export const getYear = (date: string) => new Date(date).getUTCFullYear()

export const formatCurrency = (value: number, decimalPlaces: number = 2) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  }).format(value)
}
