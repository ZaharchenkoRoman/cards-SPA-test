import {useCardsStore} from "../store/store.ts";
import Card from "../card/card.tsx";
import PinnedFilter from "../pinned-filter/pinned-filter.tsx";
import SearchFilter from "../searchFilter/search-filter.tsx";
import {Button} from "@mui/material";

import Loader from "../loader/loader.tsx";
import PaginationMui from "../pagination/pagination.tsx";
import {
  closestCenter,
  DndContext, type DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
}
  from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import {useEffect, useState} from "react";
import type {cardType} from "../store/types.ts";


const AllCards = () => {
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

  const [sortableCards, setSortableCards] = useState<cardType[]>([]);


  useEffect(() => {
    setSortableCards(Array.from(cards.values()));
  }, [cards]);



  const lastCardId = cardsOnPage * pageNumber
  const firstCardId = lastCardId - cardsOnPage


  const fetchCardsHandler = () => {
    cardsExistHandler()
    fetchCards(pageNumber)
  }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );
  const handleDragEnd = (event: DragEndEvent) => {
    const {active, over} = event;
    if (over && active.id !== over.id) {
      const newItems = arrayMove(
        sortableCards,
        sortableCards.findIndex((item) => item.id === active.id),
        sortableCards.findIndex((item) => item.id === over.id)
      );
      setSortableCards(newItems);
    }
    }



  const pagedItems = sortableCards.slice(firstCardId, lastCardId)
  return (

    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      {cardsExist && likedFilter === "All" && <SearchFilter />}
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


                <SortableContext
                  items={pagedItems.map(i => i.id?.toString())}
                  strategy={verticalListSortingStrategy}
                >
                  {pagedItems.map((item) => (
                    <Card
                      key={item.id}
                      card={item}
                    />
                  ))}
                </SortableContext>

              </div>
              {!isLoading && cardsExist && <PaginationMui />
              }
            </>) : null}
        </>)
      }  </DndContext>
  );
}


export default AllCards;