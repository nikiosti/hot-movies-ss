import { SearchParams } from './types/SearchParams'

export const buildUrlWithParameters = (url: string, params: Partial<SearchParams>): string => {
  const urlWithParameters = new URL(url)
  for (const [key, value] of Object.entries(params)) {
    if (value) {
      urlWithParameters.searchParams.set(key, value.toString())
    }
  }

  return urlWithParameters.toString()
}
