const useProduct = () => {
  const products = useProducts()
  const productOnDemand = useProductOnDemand()
  const productClasses = useProductClasses()
  const productExpenseCategories = useProductExpenseCategories()

  return {
    ...products,
    ...productOnDemand,
    ...productClasses,
    ...productExpenseCategories,
  }
}

export default useProduct
