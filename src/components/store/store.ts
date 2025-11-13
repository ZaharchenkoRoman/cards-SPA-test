import {create} from "zustand/react";
import axios from "axios";
import {immer} from "zustand/middleware/immer";
import type {cardStore, cardType} from "./types.ts";




export const useCardsStore = create<cardStore>()(immer((set) => ({
  cards: [],
  isLoading: false,
  error: null,
  fetchCards: async () => {
    set((state) => {
      state.isLoading = true;
      state.error = null;
    })

    try {
      const res = await axios.get<cardType[]>("https://jsonplaceholder.typicode.com/comments")
      set((state) => {
        state.cards = res.data
        state.isLoading = false
      });
    }
    catch (e) {
      set((state) => {
        if ( e instanceof Error) {
          state.error = e.message;
        } else if (typeof e === "string") {
          state.error = e;
        }
        state.isLoading = false;

      })

    }

  },
  createCard: (newCard) => {
    set((state) => {state.cards = [newCard, ...state.cards];})
  }

})))

