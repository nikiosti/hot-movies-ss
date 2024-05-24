import { SortOption } from '@/lib/types/SearchParams'

export interface FilterForm {
  genres: string[]
  sortBy: SortOption
  releaseYear: string
  voteAverageLte: string,
  voteAverageGte: string,

}
