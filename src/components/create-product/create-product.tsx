import {useForm} from "react-hook-form";
import type {formType} from "./types.ts";
import {useCardsStore} from "../store/store.ts";
import {Link} from "react-router";
import {v4} from 'uuid';
import {cardsSchema, type UserFormData} from "./schemas/createProductSchema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {useState} from "react";
import {Button, Input} from "@mui/material";

const CreateProduct = () => {
  console.log("createProduct render");
  const [isPosted, setIsPosted] = useState<boolean>(false);
  const generateId = () => v4()
  const {createCard} = useCardsStore()
  const {register, handleSubmit, reset, formState: {errors}} = useForm<UserFormData>({
    defaultValues: {
      name: '',
      email: '',
      body: '',
    }, mode: "onChange", resolver: zodResolver(cardsSchema)
  })

  const submit = async(data: formType) => {
    const newCard = {...data, id: generateId(), postId: generateId(), isLiked: false}
    await createCard(newCard)
    setIsPosted(prev => !prev)
    reset()
  }


  return (
    <>

      <form className="form-wrapper" onSubmit={handleSubmit(submit)}>
        <Link to="/products"><Button>back</Button></Link>
        <Input placeholder="имя карточки:" {...register("name")}></Input>
        <div className="error-div">{errors.name && <h1>{errors.name.message}</h1>}</div>
        <Input
          type='email'
          placeholder="email:" {...register("email")}></Input>
        <div className="error-div">{errors.email && <h1>{errors.email.message}</h1>}</div>
        <Input
          placeholder="описание карточки:" {...register("body")}></Input>
        <div className="error-div">{errors.body && <h1>{errors.body.message}</h1>}</div>
        <Button type="submit">Create</Button>
        {isPosted &&  <h1>Карточка успешно создана</h1>}
      </form>

    </>

  );
};

export default CreateProduct;