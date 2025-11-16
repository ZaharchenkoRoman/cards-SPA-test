import {Button} from "antd";
import {useState} from "react";
import {useCardsStore} from "../store/store.ts";
import Card from "../card/card.tsx";
import PinnedFilter from "../pinned-filter/pinned-filter.tsx";
import SearchFilter from "../searchFilter/search-filter.tsx";

const Pagination = () => {

  const {cards, error, isLoading, likedFilter} = useCardsStore()

  const [activePage, setActivePage] = useState(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [numberCardsOnPage] = useState<number>(30)

  const lastIndexOfCards = numberCardsOnPage * currentPage
  const firstIndexOfCards = lastIndexOfCards - numberCardsOnPage
  const CardsPerPage = cards.slice(firstIndexOfCards, lastIndexOfCards)

  const numbersOfPages = Math.ceil(cards.length / numberCardsOnPage);

  const pages = []

  for (let i = 1; i <= numbersOfPages; i++) {
    pages.push(i)
  }

  const currentPageHandler = (page: number) => {
    setCurrentPage(page);
    setActivePage(page)
  }
  const nextPageHandler = () => {
    if (currentPage >= numbersOfPages) {
      setCurrentPage(0);
      setActivePage(0)
    }
    setCurrentPage(prev => prev + 1)
    setActivePage(prev => prev + 1)
  }
  const prevPageHandler = () => {
    setCurrentPage(prev => prev - 1)
    setActivePage(prev => prev - 1)
  }


  return (

    <>
      <PinnedFilter />


      {error ? <h1>{error}</h1> : null}
      {isLoading ? <h1>Loading...</h1> : null}


      {likedFilter === "All" ? (<>
        <SearchFilter />
        <div className="products-container">

          {CardsPerPage.map(card => <Card
            key={card.id}
            card={card}
          />)}
          <div className="pagination-wrapper"><Button
            disabled={activePage === 1}
            className="pagination-button"
            onClick={prevPageHandler}
          >prev</Button>
            <ul className="pagination-wrapper__ul">{pages.map(page => (<li>
              <Button
                type={activePage === page ? "primary" : "default"}
                onClick={() => currentPageHandler(page)}
              >{page}</Button></li>))}</ul>
            <Button
              onClick={nextPageHandler}
              className="pagination-button"
            >next</Button>
          </div>
        </div>
      </>) : null}





    </>


  );
};

export default Pagination;