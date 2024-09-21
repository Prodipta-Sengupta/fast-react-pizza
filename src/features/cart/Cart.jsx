import LinkButton from "../../ui/LinkButton";
import Button from "../../ui/Button";
import { useSelector } from "react-redux";

function Cart() {
  const username = useSelector((state) => state.user.username);
  return (
    <div>
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2>Your cart, {username}</h2>

      <div>
        <Button to="/order/new">Order pizzas</Button>
        <button>Clear cart</button>
      </div>
    </div>
  );
}

export default Cart;
