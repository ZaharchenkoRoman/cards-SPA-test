import {FcDislike, FcLike} from "react-icons/fc";
import {FaTrash} from "react-icons/fa";
import type {propsType} from "./types.ts";
import {useNavigate} from "react-router";
import {useCardsStore} from "../store/store.ts";
import * as React from "react";


const Card = ({card}: propsType) => {
  const {likeHandler, cardDeleteHandler} = useCardsStore()
  const loc = useNavigate();


  const productIdHandler = (id: number | string) => {
    loc(`/products/${id}`, {state: card})

  }
  const switchLikeHandler = (id: number | string, event: React.MouseEvent<HTMLDivElement>): void => {
    likeHandler(id)
    event.stopPropagation()
  }
  const DeleteHandler = (id: number | string, event: React.MouseEvent<HTMLDivElement>) => {
    cardDeleteHandler(id)
    event.stopPropagation()

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
      <p>{card.email.length > 20 ?  card.email.slice(0, 20) + "..." : card.email}</p>
      <div className="icons-wrapper">
        <div onClick={(event) => DeleteHandler(card.id, event)}><FaTrash />
        </div>
        <div onClick={(event) => switchLikeHandler(card.id, event)}>{card.isLiked ?
          <FcDislike /> : <FcLike />}</div>
      </div>
    </div>
  );
};

export default Card;