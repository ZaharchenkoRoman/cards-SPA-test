import {Link, NavLink, useNavigate} from "react-router";
import {useCardsStore} from "../store/store.ts";
import {Button} from "@mui/material";


const Header = () => {
  const {setLikedFilter, setPageNumber} = useCardsStore()
  const toProductsHandler = useNavigate()
  const linkHandler = async () => {
    setLikedFilter("All")
    setPageNumber(1)
    toProductsHandler("/products")

  }
  return (
    <div className="header-container">
    <Button className="headerButton" onClick={linkHandler} >All cards</Button>
      <Link to="/createProduct"><Button className="headerButton">Create product</Button></Link>
      <NavLink to="/products"><Button className="headerButton" onClick={() => setLikedFilter("Pinned")}
      >Pinned Cards</Button></NavLink>

    </div>
  );
};

export default Header;