import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
export default function FeatureCard({ title, kicker, description, href, className = '' }: {title:string;kicker:string;description:string;href:string;className?:string}) {
 return <Link href={href} className={`feature-card ${className}`}><span className="overline">{kicker}</span><div><h3>{title}</h3><p>{description}</p><span className="feature-arrow"><ArrowUpRight size={20}/></span></div></Link>;
}
