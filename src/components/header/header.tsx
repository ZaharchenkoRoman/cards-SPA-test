import {Button} from "antd";
import {Link, useNavigate} from "react-router";
import {useCardsStore} from "../store/store.ts";


const Header = () => {
  const {fetchCards} = useCardsStore()
  const toProductsHandler = useNavigate()
  const linkHandler = () => {
    toProductsHandler("/products")
    fetchCards()

  }
  return (
    <div className="header-container">
    <Button onClick={linkHandler}>Show products cards</Button>
      <Link to="/createProduct"><Button>Create product</Button></Link>
    </div>
  );
};

export default Header;