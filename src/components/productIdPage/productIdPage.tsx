import {Link, useLocation} from "react-router";
import {useCardsStore} from "../store/store.ts";
import {useState} from "react";
import {Button, TextField} from "@mui/material";
import {type SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
  schema,
  type schemaType
} from "./updateProductInfoScheme/updateProductInfoSchema.ts";


const ProductIdPage = () => {
  const location = useLocation()
  const card = location.state
  const {switchEditMode, isEditing, updateCardInfo} = useCardsStore()
  const [emailState, setEmailState] = useState<string>(card.email)
  const [nameState, setNameState] = useState<string>(card.name)
  const [bodyState, setBodyState] = useState<string>(card.body)


  const {
    handleSubmit,
    reset,
    register,
    formState: {errors}
  } = useForm<schemaType>({
    resolver: zodResolver(schema),
    mode: "onChange"
  },)
  const submitHandler: SubmitHandler<schemaType> = async (data: {
    body: string,
    email: string,
    name: string
  }) => {

    await updateCardInfo(card.id, {id: card.id, postId: card.postId, ...data})
    reset()
  }

  if (isEditing) {
    return (

      <>

        <form
          onSubmit={handleSubmit(submitHandler)}
          className="cardInfo-wrapper"
        >

          <Link to="/products">
            <Button onClick={switchEditMode}>back to cards</Button>
          </Link>
          <TextField
            variant={"standard"}
            {...register("body")}
            label={"Введите описание:"}
            value={bodyState}
            onChange={(e) => setBodyState(e.target.value)}
          ></TextField>
          {errors.body && <h1 style={{color: "red"}}>{errors.body.message}</h1>}
          <TextField
            label={"Введите Email:"}
            {...register("email",
              {
              required: "поле обязательно", minLength: {
                value: 3, message: "минимум символов 3"
              }
            })}
            value={emailState}
            variant={"standard"}
            onChange={(e) => setEmailState(e.target.value)}
          ></TextField>
          {errors.email &&
            <h1 style={{color: "red"}}>{errors.email.message}</h1>}
          <TextField {...register("name")}
                     label={"Введите название:"}
                     value={nameState}
                     variant={"standard"}
                     onChange={(e) => setNameState(e.target.value)}
          ></TextField>
          {errors.name && <h1 style={{color: "red"}}>{errors.name.message}</h1>}
          <Button
            type={"submit"}
          >
            Save changes
          </Button>
        </form>
      </>
    )
  }


  return (
    <div className="cardInfo-wrapper">
      <Link to="/products">
        <Button>back to cards</Button>
      </Link>
      <h1>
        <span className="span-info">Информация о карточке </span>: {bodyState}
      </h1>
      <h1>
        <span className="span-info">Почта</span>: {emailState}</h1>
      <h1>
        <span className="span-info">Имя карточки</span>: {nameState}</h1>
      <Button onClick={switchEditMode}>Edit</Button>
    </div>
  );
};

export default ProductIdPage;