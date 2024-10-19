// https://uibakery.io/regex-library/phone-number

import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useSelector } from "react-redux";
import { getTotalPrice } from "../cart/cartSlice";
import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";

const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const navigation = useNavigation();
  const username = useSelector((state) => state.user.username);
  const isSubmitting = navigation.state === "submitting";
  const errors = useActionData();
  const cart = useSelector((state) => state.cart.cart);
  const totalPrice = useSelector(getTotalPrice);
  const priorityPrice = withPriority ? 0.2 * totalPrice : 0;
  const total = totalPrice + priorityPrice;

  if (cart.length === 0) {
    return (
      <div>
        <h2>No pizzas in cart</h2>
        <Button to="/menu">Go back</Button>
      </div>
    );
  }
  return (
    <div>
      <h2>Ready to order? Let&apos;s go!</h2>
      <Form method="POST">
        <div>
          <label>First Name</label>
          <input
            type="text"
            name="customer"
            required
            className="input"
            defaultValue={username}
          />
        </div>

        <div>
          <label>Phone number</label>
          <div>
            <input type="text" name="phone" required className="input" />
          </div>
        </div>
        <div>{errors?.phone && <p>{errors.phone}</p>}</div>
        <div>
          <label>Address</label>
          <div>
            <input type="text" name="address" required className="input" />
          </div>
        </div>

        <div>
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-yellow-400"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>
        <input
          type="hidden"
          name="cart"
          value={JSON.stringify(cart)}
          className="input"
        />
        <div>
          <Button>
            {isSubmitting
              ? "Submitting..."
              : `Order now for ${formatCurrency(total)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };
  const newOrder = await createOrder(order);

  const errors = {};
  if (!isValidPhone(order.phone)) {
    errors.phone = "Invalid phone number";
  }
  if (Object.keys(errors).length) {
    return errors;
  }
  return redirect(`/order/${newOrder.id}`);
}
export default CreateOrder;
