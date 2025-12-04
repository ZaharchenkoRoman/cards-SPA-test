import Card from "../card/card.tsx";
import {useCardsStore} from "../store/store.ts";

import {type ChangeEvent, useEffect, useState} from "react";
import {Input} from "@mui/material";
import {useDebounce} from "../../hooks/useDebounce.ts";

const SearchFilter = () => {

  const {searchingCards, searchFilter} = useCardsStore()

  const [value, setValue] = useState<string>("");


const debouncedValue = useDebounce(value, 500);


useEffect(() => {
  (async () => {
    try {
      await searchFilter(debouncedValue)
    }
    catch (e) {
      console.error(e);
    }
  })()
}, [debouncedValue, searchFilter])


  const handler =  (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setValue(e.target.value)



  }
  return (
    <>
      <div className="search-input-div"><Input
        className="search-input"
        type="text"
        value={value}
        onChange={(e) => handler(e)}
        placeholder="введите id поста (цифру)"
      /></div>
      {value.length > 0 && (
        <div className="filtered-wrapper">
          {searchingCards.map(card =>
            <Card card={card}></Card>)}
        </div>)}
    </>
  );

};

export default SearchFilter;