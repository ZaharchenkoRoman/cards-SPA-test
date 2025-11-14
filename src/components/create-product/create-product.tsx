import {useForm} from "react-hook-form";
import type {formType} from "./types.ts";
import {useCardsStore} from "../store/store.ts";
import {Button} from "antd";
import {Link} from "react-router";
import {v4} from 'uuid';
import {cardsSchema, type UserFormData} from "./schemas/createProductSchema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import Products from "../products/products.tsx";

const CreateProduct = () => {
  const generateId = () => v4()
  const {createCard} = useCardsStore()
  const {register, handleSubmit, reset, formState: {errors}} = useForm<UserFormData>({
    defaultValues: {
      name: '',
      email: '',
      body: '',
    }, mode: "onBlur", resolver: zodResolver(cardsSchema)
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
        {errors.name && <h1>{errors.name.message}</h1>}
        <input
          type='email'
          placeholder="введите email:" {...register("email")}></input>
        {errors.email && <h1>{errors.email.message}</h1>}
        <input

          type="text"
          placeholder="введите описание:" {...register("body")}></input>
        {errors.body && <h1>{errors.body.message}</h1>}
        <button type="submit">Create</button>
      </form>
      <Products/>
    </>

  );
};

export default CreateProduct;