'use client';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
const FurnitureScene=dynamic(()=>import('./FurnitureScene'),{ssr:false,loading:()=> <div className="scene-fallback">Preparing your 3D experience…</div>});
export default function SceneFrame({interactive=false,compact=false,color='#b8896a'}:{interactive?:boolean;compact?:boolean;color?:string}){const [reduced,setReduced]=useState(false);useEffect(()=>{const mq=window.matchMedia('(prefers-reduced-motion: reduce)');const f=()=>setReduced(mq.matches);f();mq.addEventListener('change',f);return()=>mq.removeEventListener('change',f)},[]);return <div className={`scene-frame ${compact?'scene-compact':''}`} aria-label="Animated 3D sofa preview">{reduced?<div className="scene-fallback">FurniVerse · Thoughtful design</div>:<FurnitureScene interactive={interactive} color={color}/>}</div>}
