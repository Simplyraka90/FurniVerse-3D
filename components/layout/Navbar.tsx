'use client';
import Link from 'next/link';
import { Armchair, ShoppingBag, UserRound, Heart, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useDemoStore } from '@/components/store/DemoStore';
const links=[{href:'/',name:'Home'},{href:'/shop',name:'Shop'},{href:'/showroom',name:'3D Showroom'},{href:'/customize',name:'Customize'}];
export default function Navbar(){const [menu,setMenu]=useState(false);const {cart}=useDemoStore();const path=usePathname();return <><div className="announcement">COMPLIMENTARY DESIGN INSPIRATION · EXPLORE FURNITURE IN 3D</div><header className="nav-shell"><nav className="nav-inner" aria-label="Main navigation">
<Link href="/" className="brand"><span className="brand-icon"><Armchair size={21}/></span><span>Furni<span className="brand-italic">Verse</span><small>THE 3D LIVING STUDIO</small></span></Link>
<div className={`nav-links ${menu?'is-open':''}`}>{links.map(x=><Link onClick={()=>setMenu(false)} className={path===x.href?'nav-current':''} key={x.href} href={x.href}>{x.name}</Link>)}<Link href="/admin" onClick={()=>setMenu(false)} className="nav-admin-mobile">Admin Demo</Link></div>
<div className="nav-actions"><Link aria-label="Wishlist" href="/wishlist"><Heart size={19}/></Link><Link aria-label="Profile" href="/profile"><UserRound size={19}/></Link><Link className="cart-nav" aria-label="Cart" href="/cart"><ShoppingBag size={19}/>{cart.length>0&&<b>{cart.reduce((s,c)=>s+c.quantity,0)}</b>}</Link><button className="mobile-menu-btn" onClick={()=>setMenu(v=>!v)} aria-label="Toggle navigation">{menu?<X size={22}/>:<Menu size={22}/>}</button></div>
</nav></header></>}
