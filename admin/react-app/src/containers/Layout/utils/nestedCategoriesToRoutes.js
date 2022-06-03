export const nestedCategoriesToRoutes = (json) => {
  const array = []

  const categoryToRouteURL = (category, prefix) =>
    prefix ? prefix + '/' + category.url_name : category.url_name

  const categoryToRoute = (category, prefix) => {
    const url = categoryToRouteURL(category, prefix)

    array.push({ url, id: category.id })

    if (category.children) {
      const newPrefix = url

      category.children.map((child) => {
        categoryToRoute(child, newPrefix)
      })
    }
  }

  json.map((category) => {
    categoryToRoute(category)
  })

  return array
}
