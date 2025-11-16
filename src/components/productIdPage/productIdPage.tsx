import {Button} from "antd";
import {Link, useLocation} from "react-router";
import {useCardsStore} from "../store/store.ts";
import {useState} from "react";

const ProductIdPage = () => {
  const location = useLocation()
  const card = location.state
  const {switchEditMode, isEditing, saveCardChangesHandler} = useCardsStore()
  const [emailState, setEmailState] = useState<string>(card.email)
  const [nameState, setNameState] = useState<string>(card.name)
  const [bodyState, setBodyState] = useState<string>(card.body)




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
          onClick={() => saveCardChangesHandler(card.id, {
            email: emailState,
            name: nameState,
            body: bodyState
          })}
        >Save changes</Button>
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