import {useCardsStore} from "../store/store.ts";
import Card from "../card/card.tsx";
import PinnedFilter from "../pinned-filter/pinned-filter.tsx";
import SearchFilter from "../searchFilter/search-filter.tsx";
import {Pagination, PaginationItem} from "@mui/material";

import {Link} from "react-router-dom"
import {useEffect} from "react";

const Pag = () => {

  const {
    cards,
    error,
    isLoading,
    likedFilter,
    allCards,
    cardsOnPage,
    pageNumber,
    pagination,
    setPageNumber
  } = useCardsStore()
  console.log(cards.length)

  useEffect(() => {
    pagination(pageNumber)
  }, [pageNumber, pagination])
  console.log("pagination render")
  return (

    <>
      <PinnedFilter />


      {error ? <h1>{error}</h1> : null}
      {isLoading ? <h1>Loading...</h1> : null}


      {likedFilter === "All" ? (<>
        <SearchFilter />
        <div className="products-container">
          {cards.slice(0,10).map(card => <Card
            key={card.id}
            card={card}
          />)}

        </div>
        <div className="pag-wrapper"><Pagination
          count={Math.ceil(allCards / cardsOnPage)}
          page={pageNumber}
          onChange={(_, num) => setPageNumber(num)}
          showFirstButton
          showLastButton
          renderItem={(item) => (<PaginationItem
            component={Link}
            to={`/products/?page=${item.page}`} {...item} />)}

        /></div>
      </>) : null}


    </>


  );
};

export default Pag;