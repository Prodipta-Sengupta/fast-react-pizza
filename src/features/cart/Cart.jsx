import LinkButton from "../../ui/LinkButton";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem";
import { clearCart } from "./cartSlice";
import { useNavigate } from "react-router-dom";

function Cart() {
  const username = useSelector((state) => state.user.username);
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function removeCartItem() {
    dispatch(clearCart());
    navigate("/menu");
  }
  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className="mt-7 text-xl font-semibold">Your cart, {username}</h2>

      <ul className="divide-y divide-stone-200 border-b">
        {cart.map((pizza) => (
          <CartItem key={pizza.pizzaId} item={pizza}></CartItem>
        ))}
      </ul>

      <div className="mt-6 space-x-2">
        {cart.length > 0 && <Button to="/order/new">Order pizzas</Button>}
        {cart.length > 0 && (
          <Button onClick={removeCartItem}>Clear cart</Button>
        )}
      </div>
    </div>
  );
}

export default Cart;
