const filtersRegex = /\b(lt|lte|gt|gte|in|eq)\b/g

const prepareQueryObject = (name: string, queryFilterObject: unknown) => {
  const keysOfName = Object.keys(queryFilterObject).filter(key =>
    key.includes(name)
  )
  let results = {}
  keysOfName.forEach(key => {
    if (key.includes('_')) {
      const queryOption = key.split('_')
      results = {
        ...results,
        [queryOption[0]]: {
          ...results[queryOption[0]],
          [`$${queryOption[1]}`]: queryFilterObject[key],
        },
      }
    } else {
      results = {
        ...results,
        [key]: queryFilterObject[key],
      }
    }
  })
  return results
}

const prepareSortObject = (sort: string) => {
  let sortList = []
  if (sort.includes(',')) {
    sortList = sort.split(',')
  } else {
    sortList = [sort]
  }
  const sortObject = {}
  sortList.forEach(sort => {
    const [key, value] = sort.split('_')
    sortObject[key] = value
  })
  return sortObject
}

export const sortingFilteringHandler = (query: { [key: string]: unknown }) => {
  console.log(query)
  const options = {
    filter: {},
    sort: {},
    select: '',
  }
  // prepare mongo operators
  /**
   * the query obj should look like:
   * {
   *   select: 'name,price,rating',
   *   sort: 'name_(asc|desc),price_(asc|desc),rating_(asc|desc)',
   *   name_(lt|lte|gt|gte|in|eq): boolean | 0 | 1,
   *   name: value,
   * }
   * model.find({name: {$gt:10}})
   */

  // prepare query string
  const queryString = JSON.stringify(query).replace(
    filtersRegex,
    match => `$${match}`
  )
  // determine none params keys
  const noneParams = ['select', 'sort', 'page', 'limit']
  const queryFilterObject = JSON.parse(queryString)
  noneParams.forEach(param => delete queryFilterObject[param])

  console.log(queryFilterObject)

  // prepare filter query
  let queryNames = []
  const queryKeys = Object.keys(queryFilterObject)
  queryKeys.forEach(key => {
    if (key.includes('_')) {
      queryNames.push(key.split('_')[0])
    } else {
      queryNames.push(key)
    }
  })

  queryNames = [...new Set(queryNames)]
  queryNames.forEach(name => {
    options.filter = {
      ...options.filter,
      ...prepareQueryObject(name, queryFilterObject),
    }
  })
  // prepare sort query
  if (query.sort) {
    options.sort = prepareSortObject((query.sort as string) || '')
  }

  if (query.select) {
    if ((query.select as string).includes(','))
      options.select = (query.select as string).split(',').join(' ')
    else options.select = query.select as string
  }

  console.log(options)

  return options
}
