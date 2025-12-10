import {Pagination, PaginationItem} from "@mui/material";

import {useMemo} from "react";
import {useCardsStore} from "../store/store.ts";
import { Link } from "react-router-dom";

const PaginationMui = () => {
  const {cards, cardsOnPage, setPageNumber, pageNumber} = useCardsStore()
  const pagesCount = useMemo(() => Math.ceil(cards.length / cardsOnPage), [cards, cardsOnPage])
  const handlePageChange = (_: unknown, num: number) => {
    setPageNumber(num);
  };
  return (
    <div className="pag-wrapper"><Pagination
      count={pagesCount}
      page={pageNumber}
      onChange={(_, num) => handlePageChange(_, num)}
      showFirstButton
      showLastButton
      renderItem={(item) => (<PaginationItem
        component={Link}
        to={`/products/?page=${item.page}`} {...item} />)}


    /></div>
  );
};

export default PaginationMui;