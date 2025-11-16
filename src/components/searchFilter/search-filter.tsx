import {Input} from "antd";
import Card from "../card/card.tsx";
import {useState} from "react";
import {useCardsStore} from "../store/store.ts";

const SearchFilter = () => {

  const {cards} = useCardsStore()
  const [searchValue, setSearchValue] = useState<string>("")


  return (
    <>
      <Input
        className="search-input"
        type="text"
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
      />
      {searchValue.length > 0 && (
        <div className="filtered-wrapper">{cards.filter(card => card.email.toLowerCase().includes(searchValue.toLowerCase())).map(card =>
          <Card card={card}></Card>)}
        </div>)}
    </>
  );

};

export default SearchFilter;