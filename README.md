# FurniVerse 3D – Premium UI-only Demo

A responsive furniture e-commerce **frontend demonstration** built using Next.js 16, TypeScript, Tailwind CSS, React Three Fiber, Drei and Lucide icons.

## Install and run

```bash
npm install
npm run dev
```

Open http://localhost:3000. There is **no database, API key, Prisma migration or `.env` file** required.

## What works locally

- Responsive premium homepage with animated procedural 3D sofa.
- Shop with seeded sample product cards, category filters and search.
- Product detail pages with images, a generic interactive 3D sofa preview, and user-submitted demo reviews.
- Wishlist, cart quantity controls and mock checkout form.
- Interactive 3D sofa color customization and object rotation/zoom showroom.
- `/admin` demo with overview, add/delete products and review deletion.
- Changes persisted in browser `localStorage` (key `furniverse-3d-ui-demo-v2`).

## Important limitations

- **No backend or authentication.** `/admin` is public and meant **only** for local UI demonstration; do not deploy it as a real business admin.
- No real orders, payments, inventory protection, email or user accounts.
- Login and signup are mock forms; passwords are never stored or sent.
- Demo reviews are local only and must not be interpreted as verified buyer reviews.
- 3D product preview shows a **generic procedural sofa**, not the exact furniture model pictured in product photos.
- Showroom is an interactive sofa studio, not yet a navigable 3D interior.
- Product images are external demo photographs; replace with licensed product assets for production use.

## Folder overview

- `app/(store)/` – public shop pages, each with the shared 3D scene in `InnerPage` or dedicated hero.
- `app/admin/` – demo-only admin interface.
- `components/store/DemoStore.tsx` – localStorage-backed product, reviews, wishlist and cart state.
- `components/admin/AdminDemo.tsx` – product and review management interface.
- `components/three/` – actual browser-rendered 3D sofa, camera, shadows and environment.
- `lib/demo-data.ts` – initial demo product and review records.

## Original syntax error

The old `lib/products.ts` had a malformed Prisma query and required a database connection. That file and Prisma API integration were deliberately removed in this frontend-only revision.

To reset demo data, open the browser's developer tools → Application → Local Storage and delete `furniverse-3d-ui-demo-v2`, then refresh.
