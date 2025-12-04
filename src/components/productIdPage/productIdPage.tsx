
import {Link, useLocation} from "react-router";
import {useCardsStore} from "../store/store.ts";
import {useState} from "react";
import type {cardType} from "../store/types.ts";
import {Button, Input} from "@mui/material";

const ProductIdPage = () => {
  const location = useLocation()
  const card = location.state
  const {switchEditMode, isEditing, updateCardInfo} = useCardsStore()
  const [emailState, setEmailState] = useState<string>(card.email)
  const [nameState, setNameState] = useState<string>(card.name)
  const [bodyState, setBodyState] = useState<string>(card.body)


const saveChangesHandler = async (card: cardType) => {
  await updateCardInfo(card.id, {
    email: emailState,
    name: nameState,
    body: bodyState
  });
}


  if (isEditing) {
    return (

      <>

        <div className="cardInfo-wrapper">

          <Link to="/products">
            <Button>back to cards</Button>
          </Link>
          <Input
            value={bodyState}
            onChange={(e) => setBodyState(e.target.value)}
          ></Input>
          <Input
            value={emailState}
            onChange={(e) => setEmailState(e.target.value)}
          ></Input>
          <Input
            value={nameState}
            onChange={(e) => setNameState(e.target.value)}
          ></Input>
          <Button
            onClick={() => saveChangesHandler(card)}
          >Save changes</Button>
        </div>
      </>
    )
  }


  return (
    <div className="cardInfo-wrapper">
      <Link to="/products">
        <Button>back to cards</Button>
      </Link>
      <h1>
        <span className="span-info">Информация о карточке </span>: {bodyState}</h1>
      <h1>
        <span className="span-info">Почта</span>: {emailState}</h1>
      <h1>
        <span className="span-info">Имя карточки</span>: {nameState}</h1>
      <Button onClick={switchEditMode}>Edit</Button>
    </div>
  );
};

export default ProductIdPage;