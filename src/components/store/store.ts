import {create} from "zustand/react";
import axios from "axios";
import {immer} from "zustand/middleware/immer";
import type {cardStore, cardType} from "./types.ts";
import {enableMapSet} from "immer";

enableMapSet();

export const useCardsStore = create<cardStore>()(immer((set) => ({

  cards: new Map(),
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
      state.cards = new Map([[newCard.id, newCard], ...state.cards]);
    })
  },
  likeHandler: (card) => {
    set((state) => ({
      likedCardsById: state.likedCardsById.includes(card.id) ? state.likedCardsById.filter(el => el !== card.id) : [...state.likedCardsById, card.id],


    }))

  },
  cardDeleteHandler: async (id) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/comments/${id}`)

    set((state) => {
      if (state.cards.has(String(id))) {
        state.cards.delete(String(id))
      }
    })
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
    if (state.cards.has(String(id))) {
      state.cards.set(String(id), payload)

    }
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
      const cardsMap = new Map<string, cardType>()
      res.data.map((card: cardType) => {
        cardsMap.set(String(card.id), card)
      })
      set(() => ({
        cards: cardsMap,
        isLoading: false,
        error: null
      }))

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



