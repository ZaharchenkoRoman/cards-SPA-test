import {createContext} from "react";
import type {paginationContextType} from "./types.ts";

export const paginationContext = createContext<paginationContextType>({} as paginationContextType);