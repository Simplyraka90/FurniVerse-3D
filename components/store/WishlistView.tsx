'use client';
import { useDemoStore } from './DemoStore';
import ProductCard from './ProductCard';
export default function WishlistView(){const {favorites,products}=useDemoStore();const saved=products.filter(p=>favorites.includes(p.id));return saved.length?<div className="catalog-grid" style={{marginTop:50}}>{saved.map(p=><ProductCard key={p.id} product={p}/>)}</div>:<div className="catalog-empty"><h3>Nothing saved yet</h3><p>Tap the heart on any favorite furniture piece to save it here.</p></div>}
