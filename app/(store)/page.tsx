
import Link from 'next/link';
import {
  ArrowRight,
  MoveUpRight,
  ShieldCheck,
  Truck,
  Box,
} from 'lucide-react';

import SceneFrame from '@/components/three/SceneFrame';
import FeatureCard from '@/components/store/FeatureCard';
import ProductCatalog from '@/components/store/ProductCatalog';

export default function Home() {
  return (
    <>
      {/* HERO SECTION */}
      <section className="hero-shell">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="eyebrow-dot" />
            THE ART OF MODERN LIVING
          </div>

          <h1>
            Make room
            <br />
            for <em>beautiful</em>
            <br />
            living.
          </h1>

          <p className="hero-desc">
            Sculptural forms. Timeless comfort.
            Discover a new perspective on furniture,
            brought to life in three dimensions.
          </p>

          <div className="hero-buttons">
            <Link className="btn-primary" href="/shop">
              Explore collection
              <ArrowRight size={18} />
            </Link>

            <Link className="btn-secondary" href="/showroom">
              Enter 3D showroom
              <MoveUpRight size={17} />
            </Link>
          </div>

          <div className="hero-footnote">
            <span className="line" />
            MADE FOR YOUR EVERYDAY MOMENTS
          </div>
        </div>

        <div className="hero-visual">
          {/* Updated 3D sofa */}
          <SceneFrame />

          <div className="scene-caption">
            <span>01 / THE ATELIER SOFA</span>
            <span>SOFT FORM · TIMELESS CRAFT</span>
          </div>

          <div className="hero-stamp">
            DESIGNED
            <br />
            TO BELONG
            <br />
            ●
          </div>
        </div>
      </section>

      {/* TRUST SECTION */}
      <section className="trust-band">
        <div>
          <Truck size={20} />
          Delivery support
        </div>

        <div>
          <ShieldCheck size={20} />
          Thoughtful quality
        </div>

        <div>
          <Box size={20} />
          Explore in real 3D
        </div>
      </section>

      {/* EXPERIENCE SECTION */}
      <section className="section-pad">
        <div className="section-heading">
          <div>
            <p className="overline">
              THE EXPERIENCE
            </p>

            <h2>
              Spaces that tell
              <em> your story.</em>
            </h2>
          </div>

          <p>
            Not just furniture. New ways to discover,
            imagine and shape the spaces you live in.
          </p>
        </div>

        <div className="feature-grid">
          <FeatureCard
            className="feature-soft"
            kicker="01 / THE COLLECTION"
            title="Find your form."
            description="Explore our curated furniture collection."
            href="/shop"
          />

          <FeatureCard
            className="feature-warm"
            kicker="02 / INTERACTIVE"
            title="See every angle."
            description="Enter a more immersive way to shop."
            href="/showroom"
          />

          <FeatureCard
            className="feature-dark"
            kicker="03 / PERSONAL"
            title="Make it yours."
            description="Discover a world of materials and colors."
            href="/customize"
          />
        </div>
      </section>

      {/* PRODUCT COLLECTION */}
      <section
        className="section-pad"
        style={{ paddingTop: 20 }}
      >
        <div className="section-heading">
          <div>
            <p className="overline">
              THE FURNITURE EDIT
            </p>

            <h2>
              Curated to
              <em> feel like home.</em>
            </h2>
          </div>

          <p>
            A few pieces to begin your next chapter.
            Explore the full collection to discover more.
          </p>
        </div>

        <ProductCatalog limit={3} />
      </section>

      {/* FINAL CTA */}
      <section className="closing-banner">
        <p className="overline">
          CURATED FOR HOME
        </p>

        <h2>
          Good design feels
          <br />
          <em>like coming home.</em>
        </h2>

        <Link className="btn-light" href="/shop">
          Explore furniture
          <ArrowRight size={18} />  
        </Link>
      </section>
    </>
  );
}
