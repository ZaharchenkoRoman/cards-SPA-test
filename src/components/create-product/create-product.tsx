import {useForm} from "react-hook-form";
import type {formType} from "./types.ts";
import {useCardsStore} from "../store/store.ts";
import {Button} from "antd";
import {Link} from "react-router";
import {v4} from 'uuid';
import {cardsSchema, type UserFormData} from "./schema/schema.ts";
import {zodResolver} from "@hookform/resolvers/zod";

const CreateProduct = () => {
  const generateId = () => v4()
  const {createCard} = useCardsStore()
  const {register, handleSubmit, reset} = useForm<UserFormData>({
    defaultValues: {
      name: '',
      email: '',
      body: '',
    }, mode: "onChange", resolver: zodResolver(cardsSchema)
  })

  const submit = (data: formType) => {
    const newCard = {...data, id: generateId(), postId: generateId()}
    createCard(newCard)
    console.log(data)
    reset()
  }


  return (
    <>
      <Link to="/products"><Button>back</Button></Link>
      <form onSubmit={handleSubmit(submit)}>
        <input placeholder="введите имя:" {...register("name")}></input>
        <input
          type='email'
          placeholder="введите email:" {...register("email")}></input>
        <input
          type="text"
          placeholder="введите описание:" {...register("body")}></input>
        <button type="submit">Create</button>
      </form>
    </>

  );
};

export default CreateProduct;