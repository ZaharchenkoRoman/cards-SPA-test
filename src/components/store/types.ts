export interface cardType {
  postId: number | string;
  id: number | string;
  name: string;
  email: string;
  body: string;

}

export interface cardStore {
  cards: cardType[],
  isLoading: boolean,
  error: null | string
  fetchCards: () => Promise<void>,
  createCard: (newCard: cardType) => void,
}