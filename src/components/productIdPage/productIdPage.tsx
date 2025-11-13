import {Link, useLocation} from "react-router";

const ProductIdPage = () => {
  const {state} = useLocation()

  return (
    <div>
      <Link to="/products">
        <button>back to cards</button>
      </Link>
      <h1>{state.body}</h1>
      <h1>{state.email}</h1>
      <h1>{state.name}</h1>
    </div>
  );
};

export default ProductIdPage;