export type Product = { id:string; name:string; category:string; price:number; description:string; color:string; image:string; badge?:string; rating:number };
export type Review = { id:string; productId:string; author:string; rating:number; text:string; createdAt:string };
export type CartItem = { productId:string; quantity:number };
export const demoProducts:Product[] = [
 {id:'luna-sofa',name:'Luna Cloud Sofa',category:'Sofas',price:48999,description:'Plush boucle-inspired comfort with a modern sculptural silhouette.',color:'#b8896a',image:'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1100&q=85',badge:'BESTSELLER',rating:4.9},
 {id:'oak-chair',name:'Milo Lounge Chair',category:'Chairs',price:18999,description:'An elegant accent chair with a natural warm finish.',color:'#ae845c',image:'https://images.unsplash.com/photo-1503602642458-232111445657?w=1100&q=85',badge:'NEW ARRIVAL',rating:4.8},
 {id:'arc-table',name:'Arc Coffee Table',category:'Tables',price:13999,description:'A timeless, soft-edged centerpiece for slow afternoons.',color:'#b89b79',image:'https://images.unsplash.com/photo-1499933374294-4584851497cc?w=1100&q=85',rating:4.7},
 {id:'nordic-sofa',name:'Nordic Living Sofa',category:'Sofas',price:62999,description:'Spacious, inviting seating designed for effortless living.',color:'#9a8b77',image:'https://images.unsplash.com/photo-1550254478-ead40cc54513?w=1100&q=85',badge:'EDITOR’S PICK',rating:4.9},
 {id:'dawn-bed',name:'Dawn Platform Bed',category:'Beds',price:42999,description:'A serene upholstered bed that brings warmth to the room.',color:'#c0ac96',image:'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1100&q=85',rating:4.8},
 {id:'form-desk',name:'Form Oak Desk',category:'Tables',price:24999,description:'Natural materials meet a clean, functional silhouette.',color:'#a7825e',image:'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1100&q=85',rating:4.6}
];
export const demoReviews:Review[] = [
 {id:'rev-1',productId:'luna-sofa',author:'Aarav',rating:5,text:'Beautiful silhouette and super comfortable for our living room.',createdAt:'2026-11-12'},
 {id:'rev-2',productId:'oak-chair',author:'Meera',rating:5,text:'Love the finish and modern look.',createdAt:'2026-11-14'},
 {id:'rev-3',productId:'dawn-bed',author:'Kabir',rating:4,text:'Perfect minimalist design for my bedroom.',createdAt:'2026-11-17'}
];
