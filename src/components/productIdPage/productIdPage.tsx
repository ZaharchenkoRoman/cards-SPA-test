
import {Link, useLocation} from "react-router";
import {useCardsStore} from "../store/store.ts";
import {useState} from "react";
import type {cardType} from "../store/types.ts";
import {Button} from "@mui/material";

const ProductIdPage = () => {
  const location = useLocation()
  const card = location.state
  const {switchEditMode, isEditing, updateCardInfo} = useCardsStore()
  const [emailState, setEmailState] = useState<string>(card.email)
  const [nameState, setNameState] = useState<string>(card.name)
  const [bodyState, setBodyState] = useState<string>(card.body)
  const [saveStatus, setSaveStatus] = useState<string>("")

const saveChangesHandler = async (card: cardType) => {
  await updateCardInfo(card.id, {
    email: emailState,
    name: nameState,
    body: bodyState
  });
  setSaveStatus("Изменения успешно сохранены")
}


  if (isEditing) {
    return (
      <div>
        <Link to="/products">
          <button>back to cards</button>
        </Link>
        <input value={bodyState} onChange={(e) => setBodyState(e.target.value)}></input>
        <input value={emailState} onChange={(e) => setEmailState(e.target.value)}></input>
        <input value={nameState} onChange={(e) => setNameState(e.target.value)}></input>
        <Button
          onClick={() => saveChangesHandler(card)}
        >Save changes</Button>
        {!!saveStatus && saveStatus}
      </div>
    )
  }


  return (
    <div>
      <Link to="/products">
        <button>back to cards</button>
      </Link>
      <h1>{card.body}</h1>
      <h1>{card.email}</h1>
      <h1>{card.name}</h1>
      <Button onClick={switchEditMode}>Edit</Button>
    </div>
  );
};

export default ProductIdPage;