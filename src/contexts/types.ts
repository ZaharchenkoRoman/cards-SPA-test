import type {cardType} from "../components/store/types.ts";

export interface paginationContextType {
  cards: cardType[]
  numberCardsOnPage: number
  setCurrentPage: (page: number | ((prev: number) => number)) => void
  currentPage: number
}