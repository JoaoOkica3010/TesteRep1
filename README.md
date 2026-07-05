# DiverStore

Loja online de cosméticos, brinquedos e produtos de higiene, construída com
Next.js, Prisma (SQLite) e Stripe Checkout.

## Stack

- **Next.js 16** (App Router, TypeScript, Tailwind CSS v4)
- **Prisma + SQLite** para categorias, produtos e encomendas
- **Zustand** para o carrinho (persistido em `localStorage`)
- **Stripe Checkout** para pagamentos (com modo demonstração se não houver chaves configuradas)

## Como correr localmente

```bash
npm install
npx prisma migrate dev   # cria a base de dados SQLite
npm run db:seed          # popula categorias e produtos de exemplo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Configuração de ambiente

Copia `.env.example` para `.env` e ajusta se necessário:

```bash
cp .env.example .env
```

- `DATABASE_URL` — já vem pronto para SQLite local.
- `STRIPE_SECRET_KEY` / `STRIPE_WEBHOOK_SECRET` — opcionais. **Sem estas
  chaves, o checkout corre em modo demonstração**: a encomenda é criada e
  marcada como paga automaticamente, sem cobrança real, para poderes testar
  o fluxo completo já. Para ativar pagamentos reais (em modo de teste ou
  produção):
  1. Cria conta em [stripe.com](https://dashboard.stripe.com/register)
  2. Copia a chave secreta de teste para `STRIPE_SECRET_KEY`
  3. Corre `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
     localmente e usa o `whsec_...` gerado como `STRIPE_WEBHOOK_SECRET`
- `ADMIN_PASSWORD` — password para entrar no painel de administração. Muda
  o valor por omissão (`admin123`) antes de publicar o site.

## Painel de administração

Em [http://localhost:3000/admin](http://localhost:3000/admin) podes gerir os
produtos (criar, editar, apagar) através de um formulário simples, protegido
pela password definida em `ADMIN_PASSWORD`.

## Estrutura

- `src/app` — páginas e rotas de API (App Router)
- `src/components` — componentes de UI partilhados
- `src/lib` — cliente Prisma, Stripe, carrinho (Zustand) e helpers
- `prisma/schema.prisma` — modelos de dados (Category, Product, Order, OrderItem)
- `prisma/seed.ts` — dados de exemplo (18 produtos em 3 categorias)

## Comandos úteis

```bash
npm run dev       # servidor de desenvolvimento
npm run build     # build de produção
npm run lint      # eslint
npm run db:seed   # repopula a base de dados
```
