import type { Metadata } from 'next';
import { DemoStoreProvider } from '@/components/store/DemoStore';
import './globals.css';
export const metadata:Metadata={title:'FurniVerse | 3D Furniture Studio',description:'Explore and customize furniture in an interactive 3D shopping experience.'};
export default function RootLayout({children}:{children:React.ReactNode}) {return <html lang="en"><body><DemoStoreProvider>{children}</DemoStoreProvider></body></html>}
