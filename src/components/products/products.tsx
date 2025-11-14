import {useCardsStore} from "../store/store.ts";
import Card from "../card/card.tsx";
import {useState} from "react";
import Pagination from "../pagination/pagination.tsx";
import {paginationContext} from "../../contexts/paginationContext.ts";

const Products = () => {
  const {cards, error, isLoading} = useCardsStore()
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [numberCardsOnPage] = useState<number>(30)

  const lastIndexOfCards = numberCardsOnPage * currentPage
  const firstIndexOfCards = lastIndexOfCards - numberCardsOnPage
  const CardsPerPage = cards.slice(firstIndexOfCards, lastIndexOfCards)


  const [searchValue, setSearchValue] = useState<string>("12222222222222222222");







  return (
    <paginationContext.Provider value={{
      cards,
      numberCardsOnPage,
      setCurrentPage,
      currentPage
    }}>
      <input type="text"  value={searchValue} onChange={e => setSearchValue(e.target.value)}/>
      {error ? <h1>{error}</h1> : null}
      {isLoading ? <h1>Loading...</h1> : null}
      <div className="products-container">
        {CardsPerPage.map(card => <Card
          key={card.id}
          card={card}
        />)}
      </div>
      <Pagination/>
    </paginationContext.Provider>
  );
};

export default Products;