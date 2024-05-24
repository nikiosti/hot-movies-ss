import { SortOption } from '@/lib/types/SearchParams'

type SortByOption = {
  label: string
  value: SortOption
}

export const SORT_BY_DATA: SortByOption[] = [
  { label: 'Most popular', value: 'popularity.desc' },
  { label: 'Least popular', value: 'popularity.asc' },
  { label: 'Release Date Ascending', value: 'release_date.asc' },
  { label: 'Release Date Descending', value: 'release_date.desc' },
  { label: 'Revenue Ascending', value: 'revenue.asc' },
  { label: 'Revenue Descending', value: 'revenue.desc' },
  { label: 'Primary Release Date Ascending', value: 'primary_release_date.asc' },
  { label: 'Primary Release Date Descending', value: 'primary_release_date.desc' },
  { label: 'Original Title Ascending', value: 'original_title.asc' },
  { label: 'Original Title Descending', value: 'original_title.desc' },
  { label: 'Vote Average Ascending', value: 'vote_average.asc' },
  { label: 'Vote Average Descending', value: 'vote_average.desc' },
  { label: 'Vote Count Ascending', value: 'vote_count.asc' },
  { label: 'Vote Count Descending', value: 'vote_count.desc' },
]
