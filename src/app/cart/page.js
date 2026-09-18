"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const router = useRouter();
  const { cartItems, cartTotal, updateQty, removeFromCart, clearCart } = useCart();

  const deliveryFee = cartTotal >= 25000 ? 0 : 299;
  const orderTotal = cartTotal + deliveryFee;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#FAF6EE] flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center px-4">
          <div className="text-center max-w-sm">
            <div className="w-20 h-20 bg-[#FAF2EA] rounded-full flex items-center justify-center mx-auto mb-6 border border-[#C5A059]/20">
              <svg className="h-9 w-9 text-[#C5A059]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h1 className="font-serif text-2xl font-bold text-[#0C1B33] mb-2">Your cart is empty</h1>
            <p className="text-sm text-gray-500 font-light leading-relaxed mb-6">
              Explore our exquisite jewellery collections and add pieces you love.
            </p>
            <Link
              href="/#catalog-section"
              className="inline-flex items-center gap-2 bg-[#0C1B33] hover:bg-[#C5A059] text-white px-8 py-3.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-md"
            >
              Browse Collections
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF6EE] flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          
          {/* Page Title */}
          <div className="mb-8">
            <span className="text-[#C5A059] text-xs font-semibold tracking-[0.3em] uppercase block mb-1">Your Selection</span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0C1B33]">
              Shopping Cart
            </h1>
            <div className="h-0.5 w-10 bg-[#C5A059] mt-2" />
          </div>

          <div className="flex flex-col lg:flex-row gap-8 items-start">
            
            {/* Cart Items */}
            <div className="flex-1 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-[#C5A059]/15 p-4 sm:p-5 flex gap-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Thumbnail */}
                  <Link href={`/product/${item.id}`} className="shrink-0">
                    <div className="relative h-20 w-20 sm:h-24 sm:w-24 rounded-xl overflow-hidden bg-[#FAF2EA] border border-[#C5A059]/10">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain p-2"
                        sizes="96px"
                      />
                    </div>
                  </Link>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <div className="min-w-0">
                        <Link href={`/product/${item.id}`}>
                          <h3 className="font-serif text-sm sm:text-base font-bold text-[#0C1B33] hover:text-[#C5A059] transition-colors line-clamp-2 leading-tight">
                            {item.name}
                          </h3>
                        </Link>
                        <p className="text-[10px] text-[#C5A059] font-semibold tracking-wider uppercase mt-1">
                          {item.karat} · {item.metal}
                        </p>
                      </div>
                      {/* Remove */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="shrink-0 p-1.5 text-gray-300 hover:text-red-400 transition-colors cursor-pointer border-none bg-transparent rounded-lg hover:bg-red-50"
                        aria-label="Remove item"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    {/* Price + Qty Row */}
                    <div className="flex items-center justify-between mt-3 gap-4">
                      {/* Quantity stepper */}
                      <div className="flex items-center border border-[#C5A059]/25 rounded-full overflow-hidden">
                        <button
                          onClick={() => updateQty(item.id, item.qty - 1)}
                          className="px-2.5 py-1.5 text-[#0C1B33] hover:bg-[#FAF6EE] transition-colors text-sm font-bold cursor-pointer border-none bg-transparent"
                        >
                          −
                        </button>
                        <span className="px-3 py-1.5 text-sm font-semibold text-[#0C1B33] border-x border-[#C5A059]/15 min-w-[32px] text-center">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => updateQty(item.id, item.qty + 1)}
                          className="px-2.5 py-1.5 text-[#0C1B33] hover:bg-[#FAF6EE] transition-colors text-sm font-bold cursor-pointer border-none bg-transparent"
                        >
                          +
                        </button>
                      </div>

                      {/* Line total */}
                      <div className="text-right">
                        <span className="font-serif text-base sm:text-lg font-bold text-[#0C1B33]">
                          ₹{(item.price * item.qty).toLocaleString("en-IN")}
                        </span>
                        {item.qty > 1 && (
                          <p className="text-[10px] text-gray-400">
                            ₹{item.price.toLocaleString("en-IN")} each
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Clear Cart */}
              <div className="text-right pt-2">
                <button
                  onClick={clearCart}
                  className="text-xs text-gray-400 hover:text-red-400 font-semibold tracking-wide underline-offset-2 hover:underline transition-colors cursor-pointer border-none bg-transparent"
                >
                  Clear entire cart
                </button>
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="w-full lg:w-80 shrink-0">
              <div className="bg-white rounded-2xl border border-[#C5A059]/20 shadow-sm overflow-hidden sticky top-24">
                <div className="px-6 py-4 bg-[#0C1B33]">
                  <h2 className="font-serif text-lg font-bold text-white">Order Summary</h2>
                </div>

                <div className="px-6 py-5 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 font-light">
                      Subtotal ({cartItems.reduce((s, i) => s + i.qty, 0)} items)
                    </span>
                    <span className="font-semibold text-[#0C1B33]">
                      ₹{cartTotal.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 font-light">Delivery</span>
                    <span className={deliveryFee === 0 ? "text-green-600 font-semibold" : "font-semibold text-[#0C1B33]"}>
                      {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                    </span>
                  </div>

                  {deliveryFee > 0 && (
                    <p className="text-[10px] text-green-600 bg-green-50 px-3 py-2 rounded-lg font-medium">
                      Add ₹{(25000 - cartTotal).toLocaleString("en-IN")} more for free delivery
                    </p>
                  )}

                  <div className="border-t border-[#C5A059]/15 pt-3 mt-3">
                    <div className="flex justify-between items-baseline">
                      <span className="font-bold text-[#0C1B33] tracking-wide">Total</span>
                      <div className="text-right">
                        <span className="font-serif text-2xl font-bold text-[#0C1B33]">
                          ₹{orderTotal.toLocaleString("en-IN")}
                        </span>
                        <p className="text-[10px] text-gray-400 font-light">Inclusive of all taxes</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Checkout CTA */}
                <div className="px-6 pb-6 space-y-3">
                  <button
                    id="cart-checkout-btn"
                    onClick={() => alert("Checkout integration coming soon! Please WhatsApp us to place your order.")}
                    className="w-full bg-[#C5A059] hover:bg-[#D4AF37] text-white py-4 rounded-full text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 shadow-lg shadow-[#C5A059]/20 cursor-pointer border-none"
                  >
                    Proceed to Checkout
                  </button>

                  <a
                    href={`https://wa.me/918275080681?text=Hi%20Uttamchand%20Nemichand%20Jain%20%26%20Sons%2C%20I%20would%20like%20to%20place%20an%20order%20for%20${encodeURIComponent(cartItems.map((i) => `${i.name} (x${i.qty})`).join(", "))}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    id="cart-whatsapp-order"
                    className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#20ba5a] text-white py-3.5 rounded-full text-xs font-bold tracking-[0.15em] uppercase transition-colors shadow-md"
                  >
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.863-9.73.001-2.597-1.002-5.038-2.825-6.863-1.822-1.824-4.248-2.829-6.853-2.83-5.437 0-9.863 4.37-9.866 9.731-.001 1.713.456 3.385 1.32 4.872L1.879 21.65l6.768-1.772l-.001-.001-.001-.001z" />
                    </svg>
                    Order via WhatsApp
                  </a>

                  <Link
                    href="/#catalog-section"
                    className="flex items-center justify-center gap-1.5 text-xs text-[#0C1B33]/60 hover:text-[#C5A059] font-semibold tracking-wide transition-colors mt-1"
                  >
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Continue Shopping
                  </Link>
                </div>

                {/* Trust badges */}
                <div className="border-t border-[#C5A059]/10 px-6 py-4 bg-[#FAF6EE]">
                  <div className="flex items-center justify-center gap-4 text-[9px] font-semibold text-gray-400 uppercase tracking-wide">
                    <span className="flex items-center gap-1">
                      <svg className="h-3 w-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      Secure
                    </span>
                    <span>·</span>
                    <span>BIS Hallmarked</span>
                    <span>·</span>
                    <span>Free Returns</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
