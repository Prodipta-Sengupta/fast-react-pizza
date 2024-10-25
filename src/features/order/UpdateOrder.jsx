import Button from "../../ui/Button.jsx";
import { updateOrder } from "../../services/apiRestaurant.js";
import { useFetcher } from "react-router-dom";

function UpdateOrder() {
  const fetcher = useFetcher();
  return (
    <fetcher.Form method="PATCH">
      <Button>Make Priority</Button>
    </fetcher.Form>
  );
}

export async function action({ params }) {
  const data = { priority: true };
  await updateOrder(params.id, data);
  return null;
}

export default UpdateOrder;
