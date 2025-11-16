import {useForm} from "react-hook-form";
import type {formType} from "./types.ts";
import {useCardsStore} from "../store/store.ts";
import {Link} from "react-router";
import {v4} from 'uuid';
import {cardsSchema, type UserFormData} from "./schemas/createProductSchema.ts";
import {zodResolver} from "@hookform/resolvers/zod";

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
    const newCard = {...data, id: generateId(), postId: generateId(), isLiked: false}
    createCard(newCard)
    console.log(data)
    reset()
  }


  return (
    <>

      <form className="form-wrapper" onSubmit={handleSubmit(submit)}>
        <Link to="/products"><button>back</button></Link>
        <input placeholder="имя карточки:" {...register("name")}></input>
        <div className="error-div">{errors.name && <h1>{errors.name.message}</h1>}</div>
        <input
          type='email'
          placeholder="email:" {...register("email")}></input>
        <div className="error-div">{errors.email && <h1>{errors.email.message}</h1>}</div>
        <input
          placeholder="описание карточки:" {...register("body")}></input>
        <div className="error-div">{errors.body && <h1>{errors.body.message}</h1>}</div>
        <button type="submit">Create</button>

      </form>

    </>

  );
};

export default CreateProduct;