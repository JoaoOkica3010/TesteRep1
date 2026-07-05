"use client";

import { deleteProductAction } from "../actions";

export function DeleteProductButton({ productId }: { productId: string }) {
  return (
    <form
      action={deleteProductAction.bind(null, productId)}
      onSubmit={(event) => {
        if (!confirm("Tens a certeza que queres apagar este produto?")) {
          event.preventDefault();
        }
      }}
    >
      <button
        type="submit"
        className="font-semibold text-gray-400 hover:text-red-500"
      >
        Apagar
      </button>
    </form>
  );
}
