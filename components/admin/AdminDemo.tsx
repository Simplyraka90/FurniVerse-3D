
"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  Armchair,
  ArrowLeft,
  LayoutDashboard,
  PackagePlus,
  MessageSquare,
  Trash2,
  Plus,
  Boxes,
  Star,
  ShoppingBag,
  CheckCircle2,
  LockKeyhole,
  LogOut,
  Eye,
  EyeOff,
} from "lucide-react";
import { useDemoStore } from "@/components/store/DemoStore";

const ADMIN_USERNAME = "funrachix";
const ADMIN_PASSWORD = "rachixx";
const SESSION_KEY = "furniverse_admin_demo_session";

const empty = {
  name: "",
  category: "Sofas",
  price: "",
  description: "",
  image: "",
  color: "#b8896a",
  badge: "",
};

type AdminTab = "overview" | "products" | "reviews";

export default function AdminDemo() {
  const {
    products,
    reviews,
    cart,
    ready,
    addProduct,
    removeProduct,
    removeReview,
  } = useDemoStore();

  // Admin login state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Existing dashboard state
  const [tab, setTab] = useState<AdminTab>("overview");
  const [form, setForm] = useState(empty);
  const [notice, setNotice] = useState("");
  const [showForm, setShowForm] = useState(false);

  // Check login when the page loads
  useEffect(() => {
    const storedSession = sessionStorage.getItem(SESSION_KEY);

    if (storedSession === "true") {
      setIsAuthenticated(true);
    }

    setCheckingAuth(false);
  }, []);

  // Admin login
  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoginError("");

    if (
      username.trim() === ADMIN_USERNAME &&
      password === ADMIN_PASSWORD
    ) {
      sessionStorage.setItem(SESSION_KEY, "true");
      setIsAuthenticated(true);
      setUsername("");
      setPassword("");
      return;
    }

    setLoginError("Invalid username or password.");
  }

  // Admin logout
  function handleLogout() {
    sessionStorage.removeItem(SESSION_KEY);
    setIsAuthenticated(false);
    setUsername("");
    setPassword("");
    setTab("overview");
    setNotice("");
    setShowForm(false);
  }

  const views = [
    { key: "overview", label: "Overview", icon: LayoutDashboard },
    { key: "products", label: "Products", icon: Boxes },
    { key: "reviews", label: "Reviews", icon: MessageSquare },
  ] as const;

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (
      !form.name.trim() ||
      !Number.isFinite(Number(form.price)) ||
      Number(form.price) <= 0
    ) {
      return;
    }

    addProduct({
      name: form.name.trim(),
      category: form.category,
      price: Number(form.price),
      description:
        form.description.trim() || "Designed for modern living.",
      image:
        form.image.trim() ||
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1100&q=85",
      color: form.color,
      badge: form.badge.trim(),
    });

    setNotice("Product added to the demo storefront.");
    setForm(empty);
    setShowForm(false);
    setTab("products");
  }

  function remove(id: string, name: string) {
    if (
      window.confirm(
        `Delete ${name}? This will also remove its local demo reviews and cart items.`
      )
    ) {
      removeProduct(id);
      setNotice("Product removed from local demo.");
    }
  }

  function removeR(id: string) {
    if (window.confirm("Delete this review from the demo?")) {
      removeReview(id);
      setNotice("Review removed.");
    }
  }

  // Prevent dashboard flash while checking session
  if (checkingAuth) {
    return (
      <main
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "#f9f7f2",
          color: "#34312c",
        }}
      >
        Checking admin session...
      </main>
    );
  }

  // LOGIN PAGE
  if (!isAuthenticated) {
    return (
      <main
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #f9f7f2, #e9e0d3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "420px",
            background: "#ffffff",
            borderRadius: "20px",
            padding: "36px",
            boxShadow: "0 20px 60px rgba(52,49,44,0.10)",
            border: "1px solid #e9e0d3",
          }}
        >
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              textDecoration: "none",
              color: "#34312c",
              fontSize: "22px",
              fontWeight: "bold",
            }}
          >
            <Armchair size={30} color="#b8896a" />
            FurniVerse
          </Link>

          <div
            style={{
              textAlign: "center",
              marginTop: "32px",
              marginBottom: "28px",
            }}
          >
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "18px",
                background: "#f3e9dc",
                color: "#a47558",
                display: "grid",
                placeItems: "center",
                margin: "0 auto 18px",
              }}
            >
              <LockKeyhole size={30} />
            </div>

            <h1
              style={{
                fontSize: "26px",
                fontWeight: 700,
                color: "#34312c",
              }}
            >
              Admin Login
            </h1>

            <p
              style={{
                fontSize: "14px",
                color: "#77736c",
                marginTop: "8px",
              }}
            >
              Sign in to manage your furniture store.
            </p>
          </div>

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: "18px" }}>
              <label
                htmlFor="admin-username"
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#34312c",
                }}
              >
                Username
              </label>

              <input
                id="admin-username"
                type="text"
                autoComplete="username"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "13px 14px",
                  borderRadius: "10px",
                  border: "1px solid #ded8cf",
                  outlineColor: "#b8896a",
                  color: "#34312c",
                  background: "#ffffff",
                }}
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label
                htmlFor="admin-password"
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#34312c",
                }}
              >
                Password
              </label>

              <div style={{ position: "relative" }}>
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: "13px 48px 13px 14px",
                    borderRadius: "10px",
                    border: "1px solid #ded8cf",
                    outlineColor: "#b8896a",
                    color: "#34312c",
                    background: "#ffffff",
                  }}
                />

                <button
                  type="button"
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                  onClick={() => setShowPassword((v) => !v)}
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    color: "#77736c",
                    cursor: "pointer",
                    display: "flex",
                  }}
                >
                  {showPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>
              </div>
            </div>

            {loginError && (
              <p
                role="alert"
                style={{
                  background: "#fef2f2",
                  color: "#b91c1c",
                  padding: "12px",
                  borderRadius: "9px",
                  fontSize: "13px",
                  marginBottom: "16px",
                }}
              >
                {loginError}
              </p>
            )}

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "10px",
                border: "none",
                background: "#34312c",
                color: "#ffffff",
                fontWeight: 600,
                fontSize: "15px",
                cursor: "pointer",
              }}
            >
              Sign In to Dashboard
            </button>
          </form>

          <Link
            href="/"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "8px",
              marginTop: "24px",
              fontSize: "13px",
              color: "#77736c",
              textDecoration: "none",
            }}
          >
            <ArrowLeft size={15} />
            Back to Storefront
          </Link>
        </div>
      </main>
    );
  }

  // ADMIN DASHBOARD
  return (
    <main className="admin-shell">
      <aside className="admin-side">
        <Link href="/" className="admin-brand">
          <Armchair size={26} /> Furni<span>Verse</span>
        </Link>

        <p className="admin-side-label">DESIGN STUDIO</p>

        <div className="admin-nav">
          {views.map((v) => (
            <button
              key={v.key}
              type="button"
              className={tab === v.key ? "active" : ""}
              onClick={() => {
                setTab(v.key);
                setNotice("");
              }}
            >
              <v.icon size={18} />
              {v.label}
            </button>
          ))}
        </div>

        <div className="admin-side-bottom">
          <span className="admin-demo-pill">
            ● LOCAL UI DEMO
          </span>

          <Link href="/">
            <ArrowLeft size={16} />
            Back to storefront
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              width: "100%",
              padding: "12px 14px",
              borderRadius: "10px",
              border: "1px solid #fecaca",
              background: "#fff1f2",
              color: "#b91c1c",
              fontWeight: 600,
              cursor: "pointer",
              marginTop: "12px",
            }}
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      <div className="admin-main">
        <header className="admin-top">
          <div>
            <span className="overline">
              FURNIVERSE / CONTROL ROOM
            </span>

            <h1>
              {tab === "overview"
                ? "Studio overview"
                : tab === "products"
                ? "Product collection"
                : "Customer reviews"}
            </h1>

            <p>
              Beautifully simple store management. No backend required.
            </p>
          </div>

          <div className="admin-avatar">FV</div>
        </header>

        {notice && (
          <div className="admin-notice">
            <CheckCircle2 size={18} />
            {notice}
            <button
              type="button"
              onClick={() => setNotice("")}
            >
              ×
            </button>
          </div>
        )}

        {/* OVERVIEW */}
        {tab === "overview" && (
          <>
            <div className="admin-stats">
              <div>
                <span>PRODUCTS</span>
                <strong>{products.length}</strong>
                <small>Pieces in collection</small>
                <Boxes size={26} />
              </div>

              <div>
                <span>REVIEWS</span>
                <strong>{reviews.length}</strong>
                <small>Customer notes</small>
                <Star size={26} />
              </div>

              <div>
                <span>CART ITEMS</span>
                <strong>
                  {cart.reduce((n, c) => n + c.quantity, 0)}
                </strong>
                <small>Across this browser</small>
                <ShoppingBag size={26} />
              </div>
            </div>

            <section className="admin-panel">
              <div className="admin-panel-head">
                <div>
                  <p className="overline">QUICK ACTIONS</p>
                  <h2>Manage your studio</h2>
                </div>
              </div>

              <div className="quick-grid">
                <button
                  type="button"
                  onClick={() => {
                    setTab("products");
                    setShowForm(true);
                  }}
                >
                  <PackagePlus size={27} />
                  <strong>Add a new product</strong>
                  <span>
                    Display it instantly in the storefront.
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setTab("reviews")}
                >
                  <MessageSquare size={27} />
                  <strong>Moderate reviews</strong>
                  <span>
                    View and delete demo customer notes.
                  </span>
                </button>
              </div>
            </section>
          </>
        )}

        {/* PRODUCTS */}
        {tab === "products" && (
          <section className="admin-panel">
            <div className="admin-panel-head">
              <div>
                <p className="overline">
                  CATALOG MANAGEMENT
                </p>
                <h2>{products.length} products</h2>
              </div>

              <button
                type="button"
                className="admin-add"
                onClick={() => setShowForm((v) => !v)}
              >
                <Plus size={17} />
                {showForm ? "Close form" : "Add Product"}
              </button>
            </div>

            {showForm && (
              <form
                className="admin-product-form"
                onSubmit={submit}
              >
                <h3>New furniture piece</h3>

                <div className="admin-form-grid">
                  <label>
                    Product name *
                    <input
                      required
                      value={form.name}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          name: e.target.value,
                        })
                      }
                      placeholder="e.g. Haven Accent Chair"
                    />
                  </label>

                  <label>
                    Category
                    <select
                      value={form.category}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          category: e.target.value,
                        })
                      }
                    >
                      {[
                        "Sofas",
                        "Chairs",
                        "Tables",
                        "Beds",
                        "Storage",
                        "Decor",
                      ].map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </label>

                  <label>
                    Price (₹) *
                    <input
                      required
                      type="number"
                      min="1"
                      step="1"
                      value={form.price}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          price: e.target.value,
                        })
                      }
                      placeholder="24999"
                    />
                  </label>

                  <label>
                    Product image URL (optional)
                    <input
                      type="url"
                      value={form.image}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          image: e.target.value,
                        })
                      }
                      placeholder="https://..."
                    />
                  </label>

                  <label>
                    3D color accent
                    <input
                      type="color"
                      value={form.color}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          color: e.target.value,
                        })
                      }
                    />
                  </label>

                  <label>
                    Tag (optional)
                    <input
                      value={form.badge}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          badge: e.target.value,
                        })
                      }
                      placeholder="NEW ARRIVAL"
                    />
                  </label>

                  <label className="full">
                    Description
                    <textarea
                      rows={3}
                      value={form.description}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          description: e.target.value,
                        })
                      }
                    />
                  </label>
                </div>

                <div className="form-actions">
                  <button
                    className="btn-secondary"
                    type="button"
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </button>

                  <button
                    className="btn-primary"
                    type="submit"
                  >
                    Save Product
                  </button>
                </div>
              </form>
            )}

            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>PRODUCT</th>
                    <th>CATEGORY</th>
                    <th>PRICE</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>

                <tbody>
                  {products.map((p) => (
                    <tr key={p.id}>
                      <td>
                        <div className="admin-product-cell">
                          <img
                            src={p.image}
                            alt={p.name}
                          />

                          <div>
                            <strong>{p.name}</strong>
                            <span>{p.id}</span>
                          </div>
                        </div>
                      </td>

                      <td>{p.category}</td>

                      <td>
                        ₹{p.price.toLocaleString("en-IN")}
                      </td>

                      <td>
                        <button
                          type="button"
                          className="delete-btn"
                          onClick={() =>
                            remove(p.id, p.name)
                          }
                          aria-label={`Delete ${p.name}`}
                        >
                          <Trash2 size={16} />
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {!products.length && (
                <p className="table-empty">
                  No products. Click "Add Product" to
                  create one.
                </p>
              )}
            </div>
          </section>
        )}

        {/* REVIEWS */}
        {tab === "reviews" && (
          <section className="admin-panel">
            <div className="admin-panel-head">
              <div>
                <p className="overline">FEEDBACK</p>
                <h2>{reviews.length} customer reviews</h2>
              </div>
            </div>

            <div className="admin-review-list">
              {reviews.map((r) => (
                <article key={r.id}>
                  <div>
                    <span className="review-stars">
                      {"★".repeat(r.rating)}
                      {"☆".repeat(5 - r.rating)}
                    </span>

                    <h3>{r.author}</h3>

                    <small>
                      {products.find(
                        (p) => p.id === r.productId
                      )?.name || "Removed product"}{" "}
                      · {r.createdAt}
                    </small>

                    <p>{r.text}</p>
                  </div>

                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() => removeR(r.id)}
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </article>
              ))}

              {!reviews.length && (
                <p className="table-empty">
                  No reviews available.
                </p>
              )}
            </div>
          </section>
        )}

        <p className="admin-footnote">
          UI-only demonstration · Products, carts and reviews
          are saved in this browser's localStorage.
          Admin login is only a frontend demo.
          No secure authentication, database,
          real orders or payments.
        </p>
      </div>
    </main>
  );
}
