import {useCardsStore} from "../store/store.ts";
import Card from "../card/card.tsx";
import PinnedFilter from "../pinned-filter/pinned-filter.tsx";
import SearchFilter from "../searchFilter/search-filter.tsx";
import {Pagination, PaginationItem} from "@mui/material";
import {Link} from "react-router-dom"
import {memo, useEffect, useMemo} from "react";
import Loader from "../loader/loader.tsx";

const Pag = memo(() => {

  const {
    cards,
    likedFilter,
    allCards,
    cardsOnPage,
    pageNumber,
    pagination,
    setPageNumber, isLoading
  } = useCardsStore()
  const lastCardId = cardsOnPage * pageNumber
  const firstCardId = lastCardId - cardsOnPage


  const handlePageChange = (_: unknown, num: number) => {
    setPageNumber(num);
  };

  useEffect(() => {
    pagination(pageNumber)
  }, [pagination, pageNumber]);



  const pagesCount = useMemo(() => Math.ceil(allCards / cardsOnPage), [allCards, cardsOnPage])
  return (

    <>
      <PinnedFilter />

      {likedFilter === "All" ? (<>
        <SearchFilter />
        <div className="products-container">
              {isLoading && <Loader/>}
          {cards.slice(firstCardId, lastCardId).map(card => <Card
            key={card.id}
            card={card}
          />)}

        </div>
        {!isLoading && <div className="pag-wrapper"><Pagination
          count={pagesCount}
          page={pageNumber}
          onChange={(_, num) => handlePageChange(_, num)}
          showFirstButton
          showLastButton
          renderItem={(item) => (<PaginationItem
            component={Link}
            to={`/products/?page=${item.page}`} {...item} />)}


        /></div>}
      </>) : null}


    </>


  );
})

export default Pag;