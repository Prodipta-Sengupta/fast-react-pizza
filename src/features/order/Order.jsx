// Test ID: IIDSAT

import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import { getOrder } from "../../services/apiRestaurant";
import { useFetcher, useLoaderData } from "react-router-dom";
import store from "../../store";
import { clearCart } from "../cart/cartSlice";
import OrderItem from "./OrderItem.jsx";
import { useEffect } from "react";
// const order = {
//   id: "ABCDEF",
//   customer: "Jonas",
//   phone: "123456789",
//   address: "Arroios, Lisbon , Portugal",
//   priority: true,
//   estimatedDelivery: "2027-04-25T10:00:00",
//   cart: [
//     {
//       pizzaId: 7,
//       name: "Napoli",
//       quantity: 3,
//       unitPrice: 16,
//       totalPrice: 48,
//     },
//     {
//       pizzaId: 5,
//       name: "Diavola",
//       quantity: 2,
//       unitPrice: 16,
//       totalPrice: 32,
//     },
//     {
//       pizzaId: 3,
//       name: "Romana",
//       quantity: 1,
//       unitPrice: 15,
//       totalPrice: 15,
//     },
//   ],
//   position: "-9.000,38.000",
//   orderPrice: 95,
//   priorityPrice: 19,
// };

function Order() {
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const order = useLoaderData();

  const fetcher = useFetcher();
  useEffect(() => {
    if (!fetcher.data && fetcher.state === "idle") {
      fetcher.load("/menu");
    }
  }, [fetcher]);
  const {
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    id,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  store.dispatch(clearCart());

  return (
    <div>
      <div>
        <h2>Order # {id} Status</h2>

        <div>
          {priority && <span>Priority</span>}
          <span>{status} order</span>
        </div>
      </div>

      <div>
        <p>
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p>(Estimated delivery: {formatDate(estimatedDelivery)})</p>
      </div>

      <ul>
        {cart.map((item) => (
          <OrderItem
            key={item.pizzaId}
            item={item}
            isLoading={fetcher.state === "loading"}
            ingredients={
              fetcher?.data?.find((pizza) => pizza.id === item.pizzaId)
                .ingredients ?? []
            }
          />
        ))}
      </ul>

      <div>
        <p>Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && <p>Price priority: {formatCurrency(priorityPrice)}</p>}
        <p>To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}</p>
      </div>
    </div>
  );
}

export async function loader({ params }) {
  const order = await getOrder(params.id);
  return order;
}

export default Order;
