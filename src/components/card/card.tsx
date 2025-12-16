import {FcDislike, FcLike} from "react-icons/fc";
import {FaTrash} from "react-icons/fa";
import type {propsType} from "./types.ts";
import {useNavigate} from "react-router";
import {useCardsStore} from "../store/store.ts";
import * as React from "react";
import type {cardType} from "../store/types.ts";


const Card = ({card}: propsType) => {
  const {likeHandler, cardDeleteHandler, likedCardsById} = useCardsStore()
  const loc = useNavigate();



  const productIdHandler = (id: number | string | undefined) => {
    loc(`/products/${id}`, {state: card})

  }
  const switchLikeHandler = (card: cardType, event: React.MouseEvent<HTMLDivElement>): void => {
    likeHandler(card)
    event.stopPropagation()
  }
  const DeleteHandler = async (id: number | string | undefined, event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
    await cardDeleteHandler(id)


  }


  return (
    <div
      className="card-container"
      onClick={() => productIdHandler(card.id)}
    >
      <img

        className="profile-pic"
        src="assets/pics/profilePhoto.svg"
        alt=""
      />
      <p>{card.email.slice(0,15) + "..."}</p>
      <div className="icons-wrapper">
        <div
          className="iconButton"
          onClick={(event) => DeleteHandler(card.id, event)}
        ><FaTrash />
        </div>
        <div
          className="iconButton"
          onClick={(event) => switchLikeHandler(card, event)}
        >{likedCardsById.includes(card.id) ?
          <FcDislike /> : <FcLike />}</div>
      </div>
    </div>
  );
};

export default Card;


