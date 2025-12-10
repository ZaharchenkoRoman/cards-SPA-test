import Card from "../card/card.tsx";
import {useCardsStore} from "../store/store.ts";

import {type ChangeEvent} from "react";
import {Button, Input} from "@mui/material";
import {AiOutlineClear} from "react-icons/ai";


const SearchFilter = () => {

  const {cards, setSearchingValue, searchingValue} = useCardsStore()


  const handler = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setSearchingValue(e.target.value)
  }

  const clearInputValue = () => {
    setSearchingValue("")
  }

  const searchFilterCards = cards.filter(card => card.email.toLowerCase().includes(searchingValue.toLowerCase())).slice(0, 10)

  return (
    <>
      <div className="search-wrapper">
        <div className="search-input-div"><Input
          className="search-input"
          type="text"
          value={searchingValue}
          onChange={(e) => handler(e)}
          placeholder="введите почту карточки: "
        /></div>
        <Button
          className="clearButton"
          onClick={clearInputValue}
        ><AiOutlineClear /></Button></div>
      {searchingValue.length > 0 && (
        <div className="products-container">
          {searchFilterCards.length !== 0 ? searchFilterCards.map(card =>
            <Card
            key={card.id}
          card={card}
        />): (<h1 className="cardInfo-wrapper">Карочек не найдено!</h1>)}

        </div>)}
    </>
  );

};

export default SearchFilter;