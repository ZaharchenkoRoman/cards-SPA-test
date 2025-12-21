import {FcDislike, FcLike} from "react-icons/fc";
import {FaTrash} from "react-icons/fa";
import type {propsType} from "./types.ts";
import {useNavigate} from "react-router";
import {useCardsStore} from "../store/store.ts";
import * as React from "react";
import type {cardType} from "../store/types.ts";
import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities"

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


  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({id: card.id});


  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    border: '1px solid #ccc',
    padding: '16px',
    marginBottom: '8px',
    background: 'white',
    cursor: isDragging ? 'grabbing' : 'grab'
  };


  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}
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


