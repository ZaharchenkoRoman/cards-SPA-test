export interface cardType {
  postId: number | string;
  id: number | string;
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
  createCard: (newCard: cardType) => void,
  likeHandler: (id: number | string) => void,
  cardDeleteHandler: (id: number | string) => void,
  setLikedFilter: (filter: string) => void,
  likedFilter: "All" | "Pinned",
  isEditing: boolean,
  switchEditMode: () => void,
  saveCardChangesHandler: (id: number | string, payload: {body: string, email: string, name: string}) => void,

}