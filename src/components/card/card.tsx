import {FcLike} from "react-icons/fc";
import {FaTrash} from "react-icons/fa";
import type {propsType} from "./types.ts";
import {useNavigate} from "react-router";


const Card = ({card}: propsType) => {
  const loc = useNavigate();


  const productIdHandler = (id: number) => {
    loc(`/products/${id}`, {state: card} )
  }



  return (
    <div className="card-container" onClick={() => productIdHandler(card.id)}>
      <img
        className="profile-pic"
        src="../../../public/pics/profilePhoto.svg"
        alt=""
      />
      <p>{card.email}</p>
      <FcLike />
      <FaTrash />
    </div>
  );
};

export default Card;