import {Button} from "antd";
import {useContext, useState} from "react";
import {paginationContext} from "../../contexts/paginationContext.ts";

const Pagination = () => {

  const [activePage, setActivePage] = useState(1);


  const {cards,numberCardsOnPage,setCurrentPage,currentPage} = useContext(paginationContext);

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


  );
};

export default Pagination;