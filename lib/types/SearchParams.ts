export type SortOption =
  | 'popularity.asc'
  | 'popularity.desc'
  | 'release_date.asc'
  | 'release_date.desc'
  | 'revenue.asc'
  | 'revenue.desc'
  | 'primary_release_date.asc'
  | 'primary_release_date.desc'
  | 'original_title.asc'
  | 'original_title.desc'
  | 'vote_average.asc'
  | 'vote_average.desc'
  | 'vote_count.asc'
  | 'vote_count.desc'

export type SearchParams = {
  language: 'en-US'
  with_genres?: string[]
  primary_release_year?: string
  'vote_average.lte'?: string
  'vote_average.gte'?: string
  sort_by: SortOption
  page: number
}
