
import {Link, useNavigate} from "react-router";
import {useCardsStore} from "../store/store.ts";
import {Button} from "@mui/material";


const Header = () => {
  const {setLikedFilter, likedFilter} = useCardsStore()
  const toProductsHandler = useNavigate()
  const linkHandler = async () => {
    toProductsHandler("/products")

  }
  return (
    <div className="header-container">
    <Button onClick={linkHandler} disabled={likedFilter === "Pinned"}>All cards</Button>
      <Link to="/createProduct"><Button disabled={likedFilter === "Pinned"}>Create product</Button></Link>
      <Button disabled={likedFilter === "Pinned"} onClick={() => setLikedFilter("Pinned")}>Pinned Cards</Button>
    </div>
  );
};

export default Header;