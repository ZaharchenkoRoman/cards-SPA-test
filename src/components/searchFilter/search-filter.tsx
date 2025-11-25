import Card from "../card/card.tsx";
import {useCardsStore} from "../store/store.ts";

import {useState} from "react";
import {Input} from "@mui/material";

const SearchFilter = () => {

  const { searchingCards, searchFilter} = useCardsStore()

const [value , setValue] = useState<string>("");


  const handler = async(e) => {
    setValue(e.target.value)
    await searchFilter(value)
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