import { formatCurrency } from "../../utils/helpers.js";
import PropTypes from "prop-types";

function OrderItem({ item, isLoading, ingredients }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li>
      <div>
        <p>
          <span>{quantity}&times;</span> {name}
        </p>
        <p>{formatCurrency(totalPrice)}</p>
      </div>
      <p className="text-sm capitalize italic text-stone-500">
        {isLoading ? "Loading..." : ingredients.join(", ")}
      </p>
    </li>
  );
}

export default OrderItem;

//Props validation
// https://reactjs.org/docs/typechecking-with-proptypes.html

OrderItem.propTypes = {
  item: PropTypes.shape({
    quantity: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    totalPrice: PropTypes.number.isRequired,
  }).isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  isLoading: PropTypes.bool.isRequired,
};
