import {Link, NavLink, useNavigate} from "react-router";
import {useCardsStore} from "../store/store.ts";
import {Button} from "@mui/material";


const Header = () => {
  const {setLikedFilter, likedFilter, pagination, setPageNumber} = useCardsStore()
  const toProductsHandler = useNavigate()
  const linkHandler = async () => {
    setPageNumber(1)
    await pagination(1)
    toProductsHandler("/products")

  }
  return (
    <div className="header-container">
    <Button onClick={linkHandler} disabled={likedFilter === "Pinned"}>All cards</Button>
      <Link to="/createProduct"><Button disabled={likedFilter === "Pinned"}>Create product</Button></Link>
      <NavLink to="/products"><Button
        disabled={likedFilter === "Pinned"}
        onClick={() => setLikedFilter("Pinned")}
      >Pinned Cards</Button></NavLink>
    </div>
  );
};

export default Header;