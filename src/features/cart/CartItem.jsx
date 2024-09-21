import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { removePizzaFromCart } from "./cartSlice";
function CartItem({ item }) {
  const dispatch = useDispatch();
  const { name, quantity, totalPrice } = item;
  function removeCartItem() {
    dispatch(removePizzaFromCart({ pizzaId: item.pizzaId }));
  }
  return (
    <li>
      <p>
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between">
        <p>{formatCurrency(totalPrice)}</p>
        <Button onClick={removeCartItem}>Remove</Button>
      </div>
    </li>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    pizzaId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    totalPrice: PropTypes.number.isRequired,
  }).isRequired,
};

export default CartItem;
