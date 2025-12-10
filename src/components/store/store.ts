import {create} from "zustand/react";
import axios from "axios";
import {immer} from "zustand/middleware/immer";
import type {cardStore, cardType} from "./types.ts";


export const useCardsStore = create<cardStore>()(immer((set) => ({

  cards: [],
  isLoading: false,
  error: null,
  likedFilter: "All",
  isEditing: false,
  searchingCards: [],
  cardsOnPage: 10,
  pageNumber: 1,
  likedCardsById: [],
  loadedPages: [],
  cardsExist: false,
  searchingValue: "",

  createCard: async (newCard) => {
    await axios.post("https://jsonplaceholder.typicode.com/comments", {body: newCard})
    set((state) => {
      state.cards = [newCard, ...state.cards];
    })
  },
  likeHandler: (card) => {
    set((state) => ({
      likedCardsById: state.likedCardsById.includes(card.id) ? state.likedCardsById.filter(el => el !== card.id) : [...state.likedCardsById, card.id],


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
      state.cards = state.cards.map((card) => card.id === id ? {
        ...card,
        body: payload.body,
        email: payload.email,
        name: payload.name
      } : card);
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
  fetchCards: async () => {
    try {
      set(() => ({
        isLoading: true,
        error: null
      }))
      const res = await axios.get<cardType[]>(`https://jsonplaceholder.typicode.com/comments`)
      set((state) => {
        state.cards = res.data
      })
    } catch (e) {
      set((state) => {
        if (typeof e === "string") {
          state.error = e
        }
      })
    } finally {
      set(() => ({
        isLoading: false
      }))
    }
  },
  cardsExistHandler: () => {
    set((state) => {state.cardsExist = !state.cardsExist})
  },
  setSearchingValue: (value) => {
    set(() => ({
      searchingValue: value
    }))
  }

})))



