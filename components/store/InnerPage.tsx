import SceneFrame from '@/components/three/SceneFrame';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
export default function InnerPage({ eyebrow, title, description, children, interactive = false }: { eyebrow: string; title: string; description: string; children?: React.ReactNode; interactive?: boolean }) {
 return <div className="inner-page"><section className="inner-hero"><div className="inner-copy"><p className="overline">{eyebrow}</p><h1>{title}</h1><p>{description}</p><Link className="text-link" href="/shop">Explore the collection <ArrowRight size={17}/></Link></div><SceneFrame compact interactive={interactive}/></section>{children}</div>;
}
