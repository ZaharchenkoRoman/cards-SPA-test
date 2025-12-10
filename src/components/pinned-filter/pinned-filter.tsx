import Card from "../card/card.tsx";

import {useCardsStore} from "../store/store.ts";
import {Button} from "@mui/material";

const PinnedFilter = () => {

  const {cards, likedFilter, setLikedFilter, likedCardsById} = useCardsStore()

  if (likedFilter === "Pinned") {

    return (
      <>


        <>
          {likedCardsById.length > 0 ? (<>
          <div className="products-container">{cards.filter(card => likedCardsById.includes(card.id)).map(card => (<Card
            key={card.id}
            card={card}
          ></Card>))
          }</div>
          <Button  className="back-button" onClick={() => setLikedFilter("All")}>Back</Button></>) : <div className="empty-pinned-filter">
          <h1>Cписок закрепленного пуст!</h1>
          <Button onClick={() => setLikedFilter("All")}>назад</Button>
        </div>}</>
      </>
    )
  }


};

export default PinnedFilter;