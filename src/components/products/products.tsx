import Header from "../header/header.tsx";
import {useCardsStore} from "../store/store.ts";
import Card from "../card/card.tsx";

const Products = () => {
  const {cards, error, isLoading} = useCardsStore()

  return (
    <>
      <Header />
      {error ? <h1>{error}</h1> : null}
      {isLoading ? <h1>Loading...</h1> : null}
      <div className="products-container">
        {cards.map(card => <Card
          key={card.id}
          card={card}
        />)}
      </div>
    </>
  );
};

export default Products;