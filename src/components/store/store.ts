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
  createCard: (newCard) => {
    set((state) => {
      state.cards = [newCard, ...state.cards];
    })
  },
  likeHandler: (id) => {
    set((state) => {
      state.cards.map(card => card.id === id ? card.isLiked = !card.isLiked : card)
    })
  },
  cardDeleteHandler: (id) => {
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
  saveCardChangesHandler: (id, payload) => {
    set((state) => {
      state.cards = state.cards.filter(card => card.id === id).map(card => ({
        ...card,
        email: payload.email,
        name: payload.name,
        body: payload.body,
      }))
      state.isEditing = false
    })
  }

})))

