"use client";

import { useActionState } from "react";

export type ProductFormInitial = {
  name: string;
  slug: string;
  description: string;
  price: number;
  imageEmoji: string;
  imageColor: string;
  categoryId: string;
  featured: boolean;
  stock: number;
};

export function ProductForm({
  categories,
  action,
  initial,
  submitLabel,
}: {
  categories: { id: string; name: string; icon: string }[];
  action: (prevState: string | null, formData: FormData) => Promise<string | null>;
  initial?: ProductFormInitial;
  submitLabel: string;
}) {
  const [error, formAction, pending] = useActionState(action, null);

  return (
    <form action={formAction} className="mt-6 flex max-w-xl flex-col gap-4">
      <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
        Nome
        <input
          name="name"
          defaultValue={initial?.name}
          required
          className="rounded-xl border border-gray-200 px-4 py-2.5 outline-none focus:border-fuchsia-400"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
        Slug (usado no URL, ex: peluche-urso-gigante)
        <input
          name="slug"
          defaultValue={initial?.slug}
          placeholder="deixa em branco para gerar a partir do nome"
          className="rounded-xl border border-gray-200 px-4 py-2.5 outline-none focus:border-fuchsia-400"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
        Descrição
        <textarea
          name="description"
          defaultValue={initial?.description}
          required
          rows={3}
          className="rounded-xl border border-gray-200 px-4 py-2.5 outline-none focus:border-fuchsia-400"
        />
      </label>

      <div className="grid grid-cols-2 gap-4">
        <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
          Preço (€)
          <input
            name="price"
            type="number"
            step="0.01"
            min="0"
            defaultValue={initial ? (initial.price / 100).toFixed(2) : undefined}
            required
            className="rounded-xl border border-gray-200 px-4 py-2.5 outline-none focus:border-fuchsia-400"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
          Stock
          <input
            name="stock"
            type="number"
            min="0"
            defaultValue={initial?.stock ?? 100}
            className="rounded-xl border border-gray-200 px-4 py-2.5 outline-none focus:border-fuchsia-400"
          />
        </label>
      </div>

      <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
        Categoria
        <select
          name="categoryId"
          defaultValue={initial?.categoryId}
          required
          className="rounded-xl border border-gray-200 px-4 py-2.5 outline-none focus:border-fuchsia-400"
        >
          <option value="" disabled>
            Escolhe uma categoria
          </option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.icon} {category.name}
            </option>
          ))}
        </select>
      </label>

      <div className="grid grid-cols-2 gap-4">
        <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
          Emoji da imagem
          <input
            name="imageEmoji"
            defaultValue={initial?.imageEmoji}
            placeholder="🎁"
            required
            className="rounded-xl border border-gray-200 px-4 py-2.5 outline-none focus:border-fuchsia-400"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
          Cor do fundo (gradiente Tailwind)
          <input
            name="imageColor"
            defaultValue={initial?.imageColor}
            placeholder="from-pink-500 to-purple-500"
            required
            className="rounded-xl border border-gray-200 px-4 py-2.5 outline-none focus:border-fuchsia-400"
          />
        </label>
      </div>

      <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
        <input
          type="checkbox"
          name="featured"
          defaultChecked={initial?.featured}
          className="h-4 w-4"
        />
        Mostrar em destaque na página inicial
      </label>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="mt-2 self-start rounded-full bg-gradient-to-r from-fuchsia-600 to-purple-600 px-6 py-3 font-semibold text-white shadow-md transition hover:opacity-90 disabled:opacity-60"
      >
        {pending ? "A guardar..." : submitLabel}
      </button>
    </form>
  );
}
