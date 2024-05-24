import { Genre } from './Genre'
import { Videos } from './Videos'

export type MovieData = {
  page: number
  total_pages: number
  results: MovieResult[]
}

export type MovieResult = {
  id: number
  genre_ids: number[]
  original_title: string
  poster_path: string | null
  release_date: string
  vote_average: number
  vote_count: number
}

export type ProductionCompany = {
  id: number
  logo_path: string
  name: string
  origin_country: string
}
export type MovieDetails = {
  id: number
  budget: number
  genres: Genre[]
  original_title: string
  overview: string
  poster_path?: string
  production_companies: ProductionCompany[]
  release_date: string
  revenue: number
  runtime: number
  videos: Videos
  vote_average: number
  vote_count: number
}
