'use client';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { CartItem, demoProducts, demoReviews, Product, Review } from '@/lib/demo-data';
type Store = { products:Product[]; reviews:Review[]; cart:CartItem[]; favorites:string[]; ready:boolean;
 addProduct:(p:Omit<Product,'id'|'rating'>)=>void; removeProduct:(id:string)=>void; addReview:(r:Omit<Review,'id'|'createdAt'>)=>void; removeReview:(id:string)=>void;
 addToCart:(id:string)=>void; updateQuantity:(id:string,quantity:number)=>void; clearCart:()=>void; toggleFavorite:(id:string)=>void; };
const Context = createContext<Store | null>(null);
const KEY='furniverse-3d-ui-demo-v2';
export function DemoStoreProvider({children}:{children:React.ReactNode}) {
 const [products,setProducts]=useState<Product[]>(demoProducts); const [reviews,setReviews]=useState<Review[]>(demoReviews);
 const [cart,setCart]=useState<CartItem[]>([]); const [favorites,setFavorites]=useState<string[]>([]); const [ready,setReady]=useState(false);
 useEffect(()=>{try{const raw=localStorage.getItem(KEY);if(raw){const saved=JSON.parse(raw); if(Array.isArray(saved.products))setProducts(saved.products);if(Array.isArray(saved.reviews))setReviews(saved.reviews);if(Array.isArray(saved.cart))setCart(saved.cart);if(Array.isArray(saved.favorites))setFavorites(saved.favorites);}}catch(e){console.warn('Could not restore demo data',e);}setReady(true);},[]);
 useEffect(()=>{if(!ready)return;try{localStorage.setItem(KEY,JSON.stringify({products,reviews,cart,favorites}));}catch(e){console.warn('Could not save demo data',e);}},[ready,products,reviews,cart,favorites]);
 const value=useMemo<Store>(()=>({products,reviews,cart,favorites,ready,
 addProduct:p=>setProducts(old=>[{...p,id:`item-${Date.now()}-${Math.random().toString(36).slice(2,7)}`,rating:5},...old]),
 removeProduct:id=>{setProducts(old=>old.filter(p=>p.id!==id));setReviews(old=>old.filter(r=>r.productId!==id));setCart(old=>old.filter(c=>c.productId!==id));setFavorites(old=>old.filter(f=>f!==id));},
 addReview:r=>setReviews(old=>[{...r,id:`review-${Date.now()}-${Math.random().toString(36).slice(2,7)}`,createdAt:new Date().toISOString().slice(0,10)},...old]),
 removeReview:id=>setReviews(old=>old.filter(r=>r.id!==id)),
 addToCart:id=>setCart(old=>{const item=old.find(c=>c.productId===id);return item?old.map(c=>c.productId===id?{...c,quantity:c.quantity+1}:c):[...old,{productId:id,quantity:1}]}),
 updateQuantity:(id,quantity)=>setCart(old=>quantity<=0?old.filter(c=>c.productId!==id):old.map(c=>c.productId===id?{...c,quantity}:c)),
 clearCart:()=>setCart([]),
 toggleFavorite:id=>setFavorites(old=>old.includes(id)?old.filter(f=>f!==id):[...old,id]),
 }),[products,reviews,cart,favorites,ready]);return <Context.Provider value={value}>{children}</Context.Provider>;
}
export function useDemoStore(){const ctx=useContext(Context);if(!ctx)throw new Error('useDemoStore must be used inside DemoStoreProvider');return ctx;}
