import Card from "../card/card.tsx";

import {useCardsStore} from "../store/store.ts";
import {Button} from "@mui/material";

const PinnedFilter = () => {

  const {cards, likedFilter, setLikedFilter, likedCardsById} = useCardsStore()

  if (likedFilter === "Pinned") {

    return (
      <>


        <>
          {cards.filter(card => card.isLiked).length > 0 ? (<>
          <div className="pinnedCard-wrapper">{cards.filter(card => likedCardsById.includes(card.id)).map(card => (<Card
            key={card.id}
            card={card}
          ></Card>))
          }</div>
          <Button  className="back-button" onClick={() => setLikedFilter("All")}>Back</Button></>) : <div className="empty-pinned-filter">
          <h1>тут пока ничего нет</h1>
          <Button onClick={() => setLikedFilter("All")}>назад</Button>
        </div>}</>
      </>
    )
  }


};

export default PinnedFilter;