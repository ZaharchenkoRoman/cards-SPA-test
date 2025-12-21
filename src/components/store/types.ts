export interface cardType {
  postId?: number | string
  id: number | string
  name: string;
  email: string;
  body: string;
}

export interface cardStore {
  cards: Map<string | number, cardType>,
  isLoading: boolean,
  error: null | string
  createCard: (newCard: cardType) => Promise<void>,
  likeHandler: (card: cardType) => void,
  cardDeleteHandler: (id: number | string | undefined) => Promise<void>,
  setLikedFilter: (filter: string) => void,
  likedFilter: "All" | "Pinned",
  isEditing: boolean,
  switchEditMode: () => void,
  updateCardInfo: (id: number | string , payload: {
    id: number | string ;
    postId: number | string;
    email: string;
    name: string;
    body: string
  }) => Promise<void>,

  searchingCards: cardType[],
  searchFilter: (text: string) => Promise<void>,
  cardsOnPage: number,
  fetchCards: (pageNumber: number) => Promise<void>,
  setPageNumber: (page: number) => void,
  pageNumber: number,
  likedCardsById: Array<number | string | undefined>,
  cardsExist: boolean,
  cardsExistHandler: () => void,
  searchingValue: string,
  setSearchingValue: (value: string) => void,

}
