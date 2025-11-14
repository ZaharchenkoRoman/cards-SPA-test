import {FcLike} from "react-icons/fc";
import {FaTrash} from "react-icons/fa";
import type {propsType} from "./types.ts";
import {useNavigate} from "react-router";


const Card = ({card}: propsType) => {
  const loc = useNavigate();


  const productIdHandler = (id: number | string) => {
    loc(`/products/${id}`, {state: card})
  }


  return (
    <div
      className="card-container"
      onClick={() => productIdHandler(card.id)}
    >
      <img
        className="profile-pic"
        src="../../../public/assets/pics/profilePhoto.svg"
        alt=""
      />
      <p>{card.email.slice(0,20) + "..."}</p>
      <div className="icons-wrapper"><FaTrash /><FcLike />
        </div>
    </div>
  );
};

export default Card;