import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Header } from './components/Header';
import { CategoryBar } from './components/CategoryBar';
import { Banner } from './components/Banner';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { AddToCartConfirmation } from './components/AddToCartConfirmation';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { ReturnModal } from './components/ReturnModal';
import { SupportModal } from './components/SupportModal';
import { BottomNav } from './components/BottomNav';
import { OrdersView } from './components/OrdersView';
import { CategoriesView } from './components/CategoriesView';
import { WishlistView } from './components/WishlistView';
import { AccountView } from './components/AccountView';
import { AdminPanel } from './components/admin/AdminPanel';
import { 
  Sparkles, 
  Flame, 
  ThumbsUp, 
  X, 
  Truck, 
  ShieldCheck, 
  Banknote, 
  Clock, 
  Scissors,
  ArrowRight,
  PhoneCall
} from 'lucide-react';

const MainShopContent: React.FC = () => {
  const { 
    filteredProducts, 
    products, 
    selectedCategory, 
    setSelectedCategory, 
    searchQuery, 
    setSearchQuery,
    activeModal, 
    closeModal, 
    activeTab, 
    setActiveTab, 
    openModal, 
    language,
    t,
    navigate
  } = useShop();

  const isFiltering = selectedCategory !== 'all' || searchQuery.trim() !== '';

  // Categorized products for simple home screen sections
  const bestSellers = products.filter(p => p.isBestSeller);
  const newArrivals = products.filter(p => p.isNewArrival);
  const recommended = products.filter(p => p.category === 'combo' || p.category === 'premium');

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#4A4A4A] flex flex-col font-sans selection:bg-[#C8A96B]/30 selection:text-[#111111] pb-20 sm:pb-6">
      {/* 1. Header */}
      <Header />

      {/* 2. Simple Category Buttons */}
      <CategoryBar />

      {/* Main View Router */}
      <main className="flex-1">
        {activeTab === 'categories' && <CategoriesView />}
        {activeTab === 'orders' && <OrdersView />}
        {activeTab === 'wishlist' && <WishlistView />}
        {activeTab === 'account' && <AccountView />}

        {activeTab === 'home' && (
          <div className="space-y-8 sm:space-y-12">
            {/* If searching or filtering, show direct filtered results */}
            {isFiltering ? (
              <div className="max-w-7xl mx-auto px-4 pt-6">
                <div className="bg-white rounded-2xl p-4 sm:p-6 border border-[#E5E0D8] shadow-2xs mb-6 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="text-lg sm:text-xl font-black text-[#111111]">
                      {searchQuery
                        ? (language === 'hi' ? `खोज परिणाम: "${searchQuery}"` : `Search Results for "${searchQuery}"`)
                        : (language === 'hi' ? 'चुने हुए कपड़े' : 'Selected Category')}
                    </h2>
                    <p className="text-xs text-[#777777] mt-0.5">
                      {language === 'hi' 
                        ? `${filteredProducts.length} कपड़े उपलब्ध हैं` 
                        : `Showing ${filteredProducts.length} fabrics matching your choice`}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setSearchQuery('');
                    }}
                    className="flex items-center gap-1.5 bg-[#F7F5F0] hover:bg-[#E5E0D8] text-[#111111] border border-[#E5E0D8] font-bold px-3 py-1.5 rounded-xl text-xs transition cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                    <span>{language === 'hi' ? 'सभी कपड़े देखें (Clear Filter)' : 'Clear Filter / Show All'}</span>
                  </button>
                </div>

                {filteredProducts.length === 0 ? (
                  <div className="bg-white rounded-2xl p-12 text-center border border-[#E5E0D8] max-w-md mx-auto space-y-4">
                    <p className="text-sm text-[#4A4A4A] font-medium">
                      {language === 'hi' 
                        ? 'इस खोज में कोई कपड़ा नहीं मिला। कृपया दूसरा नाम या "शर्ट", "पैंट", "कॉटन" लिखकर खोजें।' 
                        : 'No fabrics found matching your search. Try searching "shirt", "pant", "linen" or "combo".'}
                    </p>
                    <button
                      onClick={() => {
                        setSelectedCategory('all');
                        setSearchQuery('');
                      }}
                      className="bg-[#111111] hover:bg-[#2B2B2B] text-white font-bold py-2.5 px-6 rounded-xl text-xs transition cursor-pointer"
                    >
                      {language === 'hi' ? 'सभी कपड़े देखें' : 'View All Fabrics'}
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-6">
                    {filteredProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              /* CLEAN HOME SCREEN */
              <>
                {/* 3. Attractive Product Banner */}
                <Banner />

                {/* Trust Highlights Bar */}
                <div className="max-w-7xl mx-auto px-4">
                  <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E5E0D8] shadow-2xs grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#F7F5F0] border border-[#E5E0D8] flex items-center justify-center text-[#111111] shrink-0">
                        <Banknote className="w-5 h-5 text-[#C8A96B]" />
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-[#111111] leading-tight">
                          {language === 'hi' ? 'कैश ऑन डिलीवरी' : 'Cash on Delivery'}
                        </h4>
                        <p className="text-[11px] text-[#777777]">{language === 'hi' ? 'घर आने पर पैसे दें' : 'Pay when you receive'}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#F7F5F0] border border-[#E5E0D8] flex items-center justify-center text-[#111111] shrink-0">
                        <Truck className="w-5 h-5 text-[#C8A96B]" />
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-[#111111] leading-tight">
                          {language === 'hi' ? 'मुफ्त व तेज डिलीवरी' : 'Free Delivery'}
                        </h4>
                        <p className="text-[11px] text-[#777777]">{language === 'hi' ? '₹499 से ऊपर मुफ्त' : 'On orders above ₹499'}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#F7F5F0] border border-[#E5E0D8] flex items-center justify-center text-[#111111] shrink-0">
                        <ShieldCheck className="w-5 h-5 text-[#C8A96B]" />
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-[#111111] leading-tight">
                          {language === 'hi' ? '7 दिन आसान वापसी' : '7 Days Easy Return'}
                        </h4>
                        <p className="text-[11px] text-[#777777]">{language === 'hi' ? 'घर से फ्री पिकअप' : 'Free doorstep pickup'}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#F7F5F0] border border-[#E5E0D8] flex items-center justify-center text-[#111111] shrink-0">
                        <Scissors className="w-5 h-5 text-[#C8A96B]" />
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-[#111111] leading-tight">
                          {language === 'hi' ? 'सटीक कटिंग गारंटी' : 'Tailor-Cut Quality'}
                        </h4>
                        <p className="text-[11px] text-[#777777]">{language === 'hi' ? '100% सही मीटर नाप' : 'Full measured meters'}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4. Best Sellers Section */}
                <section className="max-w-7xl mx-auto px-4">
                  <div className="flex items-end justify-between mb-4 sm:mb-5">
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-[#C8A96B] uppercase tracking-wider mb-0.5">
                        <Flame className="w-4 h-4" />
                        <span>{language === 'hi' ? 'ग्राहकों की पहली पसंद' : 'Most Popular'}</span>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-black text-[#111111] font-serif">
                        {language === 'hi' ? 'सबसे ज्यादा बिकने वाले कपड़े (Best Sellers)' : 'Best Sellers'}
                      </h2>
                    </div>

                    <button
                      onClick={() => setSelectedCategory('best_sellers')}
                      className="text-xs sm:text-sm font-bold text-[#111111] hover:text-[#C8A96B] flex items-center gap-1 cursor-pointer transition"
                    >
                      <span>{language === 'hi' ? 'सब देखें' : 'View All'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-6">
                    {bestSellers.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </section>

                {/* 5. New Arrivals Section */}
                <section className="max-w-7xl mx-auto px-4">
                  <div className="flex items-end justify-between mb-4 sm:mb-5">
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-[#C8A96B] uppercase tracking-wider mb-0.5">
                        <Sparkles className="w-4 h-4" />
                        <span>{language === 'hi' ? 'ताजा स्टॉक' : 'Fresh Stock'}</span>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-black text-[#111111] font-serif">
                        {language === 'hi' ? 'नए डिजाइन व फैब्रिक (New Arrivals)' : 'New Arrivals'}
                      </h2>
                    </div>

                    <button
                      onClick={() => setSelectedCategory('new_arrivals')}
                      className="text-xs sm:text-sm font-bold text-[#111111] hover:text-[#C8A96B] flex items-center gap-1 cursor-pointer transition"
                    >
                      <span>{language === 'hi' ? 'सब देखें' : 'View All'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-6">
                    {newArrivals.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </section>

                {/* 6. Recommended Products Section */}
                <section className="max-w-7xl mx-auto px-4">
                  <div className="flex items-end justify-between mb-4 sm:mb-5">
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-[#C8A96B] uppercase tracking-wider mb-0.5">
                        <ThumbsUp className="w-4 h-4" />
                        <span>{language === 'hi' ? 'सूटिंग व कॉम्बो स्पेशल' : 'Handpicked Combos'}</span>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-black text-[#111111] font-serif">
                        {language === 'hi' ? 'सुझाए गए फैब्रिक (Recommended Products)' : 'Recommended Products'}
                      </h2>
                    </div>

                    <button
                      onClick={() => setSelectedCategory('combo')}
                      className="text-xs sm:text-sm font-bold text-[#111111] hover:text-[#C8A96B] flex items-center gap-1 cursor-pointer transition"
                    >
                      <span>{language === 'hi' ? 'सब देखें' : 'View All'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-6">
                    {recommended.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </section>

                {/* Help Banner at Bottom of Home */}
                <section className="max-w-7xl mx-auto px-4 pt-4">
                  <div className="bg-[#111111] text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-[#2B2B2B]">
                    <div className="space-y-1.5 text-center md:text-left">
                      <h3 className="text-lg sm:text-xl font-black font-serif text-white">
                        {language === 'hi' ? 'कपड़े की नाप या सिलाई में कोई संशय है?' : 'Confused about how many meters to buy?'}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#D9D4CA] max-w-xl">
                        {language === 'hi' 
                          ? 'हमारे कपड़ा विशेषज्ञ से सीधे फोन या व्हाट्सएप पर पूछें। सही सलाह मुफ्त में पाएं।' 
                          : 'Speak directly with our fabric master on toll-free helpline or WhatsApp.'}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        onClick={() => openModal('support')}
                        className="bg-[#C8A96B] hover:bg-[#b8985a] text-[#111111] font-bold px-5 py-3 rounded-xl text-xs sm:text-sm flex items-center gap-2 transition cursor-pointer shadow-xs active:scale-95"
                      >
                        <PhoneCall className="w-4 h-4" />
                        <span>{language === 'hi' ? 'हेल्पलाइन: 1800-200-5588' : 'Call: 1800-200-5588'}</span>
                      </button>

                      <button
                        onClick={() => openModal('support')}
                        className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold px-5 py-3 rounded-xl text-xs sm:text-sm transition cursor-pointer"
                      >
                        {language === 'hi' ? 'मदद सवाल देखें' : 'View Size Guide'}
                      </button>
                    </div>
                  </div>
                </section>
              </>
            )}
          </div>
        )}
      </main>

      {/* Clean Footer */}
      <footer className="mt-12 sm:mt-16 bg-[#151515] border-t border-[#2B2B2B] py-8 px-4 text-xs text-[#D9D4CA]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg bg-[#2B2B2B] border border-[#C8A96B]/40 flex items-center justify-center text-[#C8A96B]">
                <Scissors className="w-4 h-4 -rotate-45" />
              </div>
              <span className="font-serif font-black text-sm text-white">SHREE MARUTI KRUPA</span>
            </div>
            <p className="text-[#D9D4CA] text-[11px] leading-relaxed">
              {language === 'hi' 
                ? 'सूरत, गुजरात का भरोसेमंद फैब्रिक स्टोर। शुद्ध कॉटन, लिनेन व फॉर्मल सूटिंग का असली संग्रह।' 
                : 'Trusted premium fabric house from Surat, Gujarat. Tailor-grade shirtings, suitings and gift combos.'}
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider mb-2">
              {language === 'hi' ? 'आसान लिंक्स' : 'Quick Links'}
            </h4>
            <ul className="space-y-1 text-[#D9D4CA]">
              <li><button onClick={() => { setActiveTab('orders'); }} className="hover:text-[#C8A96B] cursor-pointer transition">{language === 'hi' ? 'ऑर्डर ट्रैक करें' : 'Track Order'}</button></li>
              <li><button onClick={() => { setActiveTab('categories'); }} className="hover:text-[#C8A96B] cursor-pointer transition">{language === 'hi' ? 'सभी श्रेणियां' : 'All Categories'}</button></li>
              <li><button onClick={() => openModal('support')} className="hover:text-[#C8A96B] cursor-pointer transition">{language === 'hi' ? 'कपड़ा लंबाई गाइड' : 'Fabric Length Guide'}</button></li>
              <li><button onClick={() => openModal('support')} className="hover:text-[#C8A96B] cursor-pointer transition">{language === 'hi' ? 'वापसी नियम' : 'Return Policy'}</button></li>
              <li>
                <button 
                  onClick={() => navigate('/admin')} 
                  className="hover:text-white cursor-pointer font-bold text-[#C8A96B] flex items-center gap-1 mt-1 transition"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{language === 'hi' ? 'दुकानदार एडमिन पोर्टल (/admin)' : 'Merchant Admin Portal (/admin)'}</span>
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider mb-2">
              {language === 'hi' ? 'ग्राहक सहायता' : 'Customer Support'}
            </h4>
            <p className="text-white font-semibold mb-1">Toll-Free: 1800-200-5588</p>
            <p className="text-[#D9D4CA] text-[11px]">Mon - Sun: 9:00 AM - 8:00 PM</p>
            <p className="text-[#D9D4CA] text-[11px] mt-1">support@shreemarutikrupa.com</p>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider mb-2">
              {language === 'hi' ? 'सुरक्षा व गारंटी' : '100% Purchase Protection'}
            </h4>
            <p className="text-[11px] text-[#D9D4CA] leading-relaxed">
              {language === 'hi' 
                ? 'कैश ऑन डिलीवरी • 7 दिन की डोरस्टेप रिटर्न • 100% असली ब्रांडेड फैब्रिक' 
                : 'Cash on Delivery • 7-Day Easy Doorstep Returns • 100% Genuine Branded Fabrics'}
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-6 border-t border-[#2B2B2B] flex flex-col sm:flex-row items-center justify-between gap-3 text-[#777777] text-[11px]">
          <p>© 2026 SHREE MARUTI KRUPA. All rights reserved.</p>
          <p className="text-[#D9D4CA] font-medium">Simple & Easy Fabric Shopping Experience for India</p>
        </div>
      </footer>

      {/* Mobile Sticky Bottom Navigation */}
      <BottomNav />

      {/* Global Modals */}
      {activeModal?.type === 'product' && activeModal.data && (
        <ProductDetailModal product={activeModal.data} onClose={closeModal} />
      )}

      {activeModal?.type === 'addConfirm' && (
        <AddToCartConfirmation />
      )}

      {activeModal?.type === 'cartDrawer' && (
        <CartDrawer />
      )}

      {activeModal?.type === 'checkout' && (
        <CheckoutModal />
      )}

      {activeModal?.type === 'tracking' && activeModal.data && (
        <OrderTrackingModal order={activeModal.data} onClose={closeModal} />
      )}

      {activeModal?.type === 'return' && activeModal.data && (
        <ReturnModal order={activeModal.data.order} product={activeModal.data.product} onClose={closeModal} />
      )}

      {activeModal?.type === 'support' && (
        <SupportModal onClose={closeModal} />
      )}
    </div>
  );
};

const AppRouter: React.FC = () => {
  const { currentPath } = useShop();

  if (currentPath.startsWith('/admin')) {
    return <AdminPanel />;
  }

  return <MainShopContent />;
};

export default function App() {
  return (
    <ShopProvider>
      <AppRouter />
    </ShopProvider>
  );
}
