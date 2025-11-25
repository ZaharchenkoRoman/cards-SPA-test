export interface cardType {
  postId:  number | string
  id: number | string
  name: string;
  email: string;
  body: string;
  isLiked: boolean;
}
export interface cardStore {
  cards: cardType[],
  isLoading: boolean,
  error: null | string
  fetchCards: () => Promise<void>,
  createCard: (newCard: cardType) => Promise<void>,
  likeHandler: (card: cardType) => void,
  cardDeleteHandler: (id: number | string) => Promise<void>,
  setLikedFilter: (filter: string) => void,
  likedFilter: "All" | "Pinned",
  isEditing: boolean,
  switchEditMode: () => void,
  updateCardInfo: (id: number | string, payload: {
    body: string,
    email: string,
    name: string
  }) => Promise<void>,
  searchingCards: cardType[],
  searchFilter: (text: string) => Promise<void>,
  cardsOnPage: number,
  pageNumber: number,
  allCards: number,
  pagination: (pageNumber: number) => Promise<void>,
  setPageNumber: (page: number) => void,
  likedCardsById: Array<number | string>
}
