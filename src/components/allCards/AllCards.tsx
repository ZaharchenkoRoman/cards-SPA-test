import {useCardsStore} from "../store/store.ts";
import Card from "../card/card.tsx";
import PinnedFilter from "../pinned-filter/pinned-filter.tsx";
import SearchFilter from "../searchFilter/search-filter.tsx";
import {Button} from "@mui/material";
import {memo} from "react";
import Loader from "../loader/loader.tsx";
import PaginationMui from "../pagination/pagination.tsx";


const AllCards = memo(() => {

  const {
    cards,
    likedFilter,
    cardsOnPage,
    pageNumber,
    isLoading,
    fetchCards,
    cardsExistHandler,
    cardsExist,
    searchingValue
  } = useCardsStore()


  const lastCardId = cardsOnPage * pageNumber
  const firstCardId = lastCardId - cardsOnPage



  const fetchCardsHandler = () => {
    cardsExistHandler()
    fetchCards(pageNumber)
  }


  return (

    <>
      {cardsExist && likedFilter ==="All" && <SearchFilter />}
      {searchingValue.length === 0 && (
        <>
          <PinnedFilter />

          {likedFilter === "All" ? (
            <>


              <div className="products-container">

                {!cardsExist && <Button
                  onClick={fetchCardsHandler}
                  style={{marginTop: '350px'}}
                >Запросить карточки</Button>}

                {isLoading && <Loader />}

                {Array.from(cards.values()).slice(firstCardId,lastCardId).map(card => <Card
                  key={card.id}
                  card={card}
                />)}

              </div>
              {!isLoading && cardsExist && <PaginationMui/>
               }
            </>) : null}
        </>)
    }  </>


  );
})

export default AllCards;