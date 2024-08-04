import Typography from "@mui/material/Typography";
import CartItems from "~/components/CartItems/CartItems";
import { CartProductItem } from "~/models/CartItem";

type ReviewCartProps = {
  items: CartProductItem[];
};

export default function ReviewCart({ items }: ReviewCartProps) {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <CartItems items={items} isEditable />
    </>
  );
}
