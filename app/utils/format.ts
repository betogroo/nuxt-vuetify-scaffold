export const capitalize = (s: string) =>
  s.charAt(0).toLocaleUpperCase() + s.slice(1)

export const isDevelopment = () => process.env.NODE_ENV !== 'production'

export const timestampToDate = (date: string) =>
  new Date(date).toLocaleDateString('pt-BR')

export const getYear = (date: string) => new Date(date).getUTCFullYear()
