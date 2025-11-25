import {create} from "zustand/react";
import axios from "axios";
import {immer} from "zustand/middleware/immer";
import type {cardStore, cardType} from "./types.ts";


export const useCardsStore = create<cardStore>()(immer((set, get) => ({

  cards: [],
  isLoading: false,
  error: null,
  likedFilter: "All",
  isEditing: false,
  searchingCards: [],
  cardsOnPage: 10,
  pageNumber: 1,
  allCards: 500,
  likedCardsById: [],
  fetchCards: async () => {
    set((state) => {
      state.isLoading = true;
      state.error = null;
    })
    try {
      const res = await axios.get<cardType[]>("https://jsonplaceholder.typicode.com/comments")
      set((state) => {
        state.cards = res.data.map(card => ({...card, isLiked: false}))
        state.isLoading = false
      });
    } catch (e) {
      set((state) => {
        if (e instanceof Error) {
          state.error = e.message;
        } else if (typeof e === "string") {
          state.error = e;
        }
        state.isLoading = false;

      })

    }

  },
  createCard: async (newCard) => {
    await axios.post("https://jsonplaceholder.typicode.com/comments", {body: newCard})
    set((state) => {
      state.cards = [newCard, ...state.cards];
    })
  },
  likeHandler: (card) => {
    set((state) => ({
      cards: state.cards.map(item => item.id === card.id ? ({
        ...item,
        isLiked: !item.isLiked
      }) : item),
      likedCardsById: [...state.likedCardsById, card.id],

    }))

  },
  cardDeleteHandler: async (id) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/comments/${id}`)
    set((state) => ({
      cards: state.cards.filter(card => card.id !== id)
    }))
  },
  setLikedFilter: (filter) => {
    set(() => ({
      likedFilter: filter
    }))
  },
  switchEditMode: () => {
    set((state) => ({
      isEditing: !state.isEditing
    }))
  },
  updateCardInfo: async (id, payload) => {
    await axios.post("https://jsonplaceholder.typicode.com/comments", {body: payload})
    set((state) => {
      state.cards = state.cards.map(card => id === card.id ? ({...card, ...payload}) : card)
      state.isEditing = false
    })

  },
  searchFilter: async (postId: string) => {
    const res = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
    set(() => ({
      searchingCards: res.data
    }))
  },

  setPageNumber: (pageNumber: number) => {
    set((state) => {
      state.pageNumber = pageNumber
    })
  },
  pagination: async (pageNumber: number) => {
    const {cardsOnPage} = get()


    const res = await axios.get<cardType[]>(`https://jsonplaceholder.typicode.com/comments?_page=${pageNumber}&_limit=${cardsOnPage}`)
    set((state) => ({
      cards: [...res.data.map(card => ({...card, isLiked: false})), ...state.cards].filter((card, ind, array) => array.findIndex(c => c.id === card.id) === ind),
    }))

  }

})))



