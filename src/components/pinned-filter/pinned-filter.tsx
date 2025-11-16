import Card from "../card/card.tsx";
import {Button} from "antd";
import {useCardsStore} from "../store/store.ts";

const PinnedFilter = () => {

  const {cards, likedFilter, setLikedFilter} = useCardsStore()

  if (likedFilter === "Pinned") {

    return (
      <>


        <>
          {cards.filter(card => card.isLiked).length > 0 ? (<>
          <div className="pinnedCard-wrapper">{cards.filter(card => card.isLiked).map(card => (<Card
            key={card.id}
            card={card}
          ></Card>))
          }</div>
          <Button type="primary" className="back-button" onClick={() => setLikedFilter("All")}>Back</Button></>) : <div className="empty-pinned-filter">
          <h1>тут пока ничего нет</h1>
          <Button type="primary" onClick={() => setLikedFilter("All")}>назад</Button>
        </div>}</>
      </>
    )
  }


};

export default PinnedFilter;