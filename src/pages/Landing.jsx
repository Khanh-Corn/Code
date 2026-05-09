import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Lenis from 'lenis';
import { Heart, Sparkles, Quote, ArrowRight, ShoppingBag, Star, Menu, X, Plus, Minus, Trash2 } from 'lucide-react';
import heroImage from '../assets/perfume_hero.png';
import lifestyleImage from '../assets/lifestyle.png';

const FloatingParticles = () => {
  const particles = Array.from({ length: 15 });
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((_, i) => {
        const isStrawberry = i % 2 === 0;
        return (
          <motion.div
            key={i}
            className="absolute text-xl md:text-2xl opacity-40"
            initial={{
              y: "110vh",
              x: `${Math.random() * 100}vw`,
              rotate: 0,
            }}
            animate={{
              y: "-10vh",
              x: `${Math.random() * 100}vw`,
              rotate: 360,
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 10,
            }}
          >
            {isStrawberry ? "🍓" : "🐼"}
          </motion.div>
        );
      })}
    </div>
  );
};

const CartDrawer = ({ isOpen, onClose, cartItems, updateQuantity, removeItem, onCheckout }) => {
  const total = cartItems.reduce((sum, item) => {
    const price = parseInt(item.price.replace(/\D/g, ''));
    return sum + price * item.quantity;
  }, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-[60] backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full max-w-md bg-white z-[70] shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-brand-cream">
              <h2 className="text-2xl font-bold text-brand-dark flex items-center gap-2">
                <ShoppingBag className="w-6 h-6 text-brand-red" /> Giỏ Hàng
              </h2>
              <button onClick={onClose} className="p-2 hover:bg-white rounded-full transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-4">
                  <ShoppingBag className="w-16 h-16 opacity-20" />
                  <p>Giỏ hàng của bạn đang trống</p>
                </div>
              ) : (
                cartItems.map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-center bg-gray-50 p-4 rounded-2xl">
                    <div className={`w-20 h-20 rounded-xl ${item.color} flex items-center justify-center text-4xl shadow-inner`}>
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-brand-dark">{item.name}</h3>
                      <p className="text-brand-red font-medium text-sm">{item.price}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <button onClick={() => updateQuantity(idx, -1)} className="w-6 h-6 flex items-center justify-center bg-white rounded shadow-sm hover:text-brand-red">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-semibold w-4 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(idx, 1)} className="w-6 h-6 flex items-center justify-center bg-white rounded shadow-sm hover:text-brand-red">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    <button onClick={() => removeItem(idx)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="p-6 bg-gray-50 border-t border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-gray-500 font-medium">Tổng cộng:</span>
                  <span className="text-2xl font-bold text-brand-dark">
                    {new Intl.NumberFormat('vi-VN').format(total)}đ
                  </span>
                </div>
                <button 
                  onClick={onCheckout}
                  className="w-full bg-brand-red text-white py-4 rounded-full font-bold text-lg hover:bg-rose-500 transition-colors shadow-lg shadow-brand-red/30"
                >
                  Tiến Hành Đặt Hàng
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const CheckoutModal = ({ isOpen, onClose, onConfirm }) => {
  const [formData, setFormData] = useState({ name: '', phone: '', address: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm(formData);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-[80] backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-[2rem] w-full max-w-lg overflow-hidden shadow-2xl"
            >
              <div className="p-6 border-b border-gray-100 bg-brand-pink/20 flex justify-between items-center">
                <h2 className="text-xl font-bold text-brand-dark">Thông Tin Đặt Hàng</h2>
                <button onClick={onClose} className="p-2 hover:bg-white rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 sm:p-8 flex flex-col gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên</label>
                  <input required type="text" onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-red/50 focus:border-brand-red" placeholder="Nhập họ tên của bạn" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
                  <input required type="tel" onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-red/50 focus:border-brand-red" placeholder="Nhập số điện thoại" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ giao hàng</label>
                  <textarea required onChange={e => setFormData({...formData, address: e.target.value})} rows="3" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-red/50 focus:border-brand-red resize-none" placeholder="Nhập địa chỉ chi tiết"></textarea>
                </div>
                <button type="submit" className="mt-4 w-full bg-brand-dark text-white py-4 rounded-xl font-bold text-lg hover:bg-brand-red transition-colors shadow-lg">
                  Xác Nhận Đặt Hàng
                </button>
              </form>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default function Landing() {
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 150]);
  const lifestyleY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const timer = setTimeout(() => setLoading(false), 1500);
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      lenis.destroy();
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const products = [
    { id: 1, name: "Strawberry Hug", desc: "Ngọt ngào, tươi mát như dâu tây sớm mai.", price: "1,250,000đ", tag: "Best Seller", color: "bg-red-50", icon: "🍓" },
    { id: 2, name: "Cozy Panda", desc: "Trầm ấm, mềm mại như lông gấu trúc.", price: "1,450,000đ", tag: "Cozy", color: "bg-slate-50", icon: "🐼" },
    { id: 3, name: "Knit & Tea", desc: "Thanh tao, tĩnh lặng với hương trà chiều.", price: "1,350,000đ", tag: "Sweet", color: "bg-orange-50", icon: "🧶" }
  ];

  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const updateQuantity = (idx, delta) => {
    setCartItems(prev => {
      const newItems = [...prev];
      newItems[idx].quantity += delta;
      if (newItems[idx].quantity <= 0) newItems.splice(idx, 1);
      return newItems;
    });
  };

  const removeItem = (idx) => {
    setCartItems(prev => prev.filter((_, i) => i !== idx));
  };

  const handleCheckout = () => {
    setCartOpen(false);
    setCheckoutOpen(true);
  };

  const confirmOrder = (data) => {
    const total = cartItems.reduce((sum, item) => sum + parseInt(item.price.replace(/\D/g, '')) * item.quantity, 0);
    const newOrder = {
      id: "ORD-" + Math.floor(100000 + Math.random() * 900000),
      customer: data.name,
      phone: data.phone,
      address: data.address,
      items: cartItems,
      total: total,
      status: "pending",
      date: new Date().toISOString()
    };
    
    const existingOrders = JSON.parse(localStorage.getItem('parfums_hp_orders') || '[]');
    localStorage.setItem('parfums_hp_orders', JSON.stringify([newOrder, ...existingOrders]));
    window.dispatchEvent(new Event('storage'));

    setCheckoutOpen(false);
    setCartItems([]);
    setOrderSuccess(true);
    setTimeout(() => setOrderSuccess(false), 3000);
  };

  return (
    <AnimatePresence>
      {loading ? (
        <motion.div 
          key="loader"
          className="fixed inset-0 bg-[var(--color-brand-cream)] z-[100] flex flex-col items-center justify-center"
          exit={{ opacity: 0, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <motion.div animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
            <Sparkles className="w-12 h-12 md:w-16 md:h-16 text-brand-red" />
          </motion.div>
          <motion.div initial={{ opacity: 0, mt: 10 }} animate={{ opacity: 1, mt: 20 }} className="text-brand-dark font-light tracking-widest uppercase text-xs md:text-sm mt-4">
            Hà Phương
          </motion.div>
        </motion.div>
      ) : (
        <motion.div key="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="font-sans overflow-x-hidden w-full max-w-[100vw]">
          
          {/* Order Success Toast */}
          <AnimatePresence>
            {orderSuccess && (
              <motion.div 
                initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }}
                className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] bg-green-500 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 font-medium"
              >
                <Heart className="w-5 h-5 fill-current" /> Đặt hàng thành công! Cảm ơn bạn.
              </motion.div>
            )}
          </AnimatePresence>

          <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} cartItems={cartItems} updateQuantity={updateQuantity} removeItem={removeItem} onCheckout={handleCheckout} />
          <CheckoutModal isOpen={checkoutOpen} onClose={() => setCheckoutOpen(false)} onConfirm={confirmOrder} />

          {/* Navbar */}
          <motion.nav
            initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}
            className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? "glass-dark bg-white/70 backdrop-blur-xl py-3 lg:py-4 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border-b border-white/50" : "bg-transparent py-4 lg:py-6"}`}
          >
            <div className="container mx-auto px-4 sm:px-6 lg:px-12 flex justify-between items-center">
              <div className="text-xl lg:text-2xl font-bold tracking-tighter text-brand-red flex items-center gap-2 group cursor-pointer">
                <Sparkles className="w-5 h-5 text-brand-pink shrink-0 group-hover:rotate-12 transition-transform" />
                <span className="whitespace-nowrap">Hà Phương</span> <span className="text-brand-dark font-light hidden sm:inline">Perfume</span>
              </div>
              
              <div className="hidden lg:flex gap-10 text-sm font-semibold tracking-wider uppercase text-gray-500">
                <a href="#about" className="relative group hover:text-brand-dark transition-colors whitespace-nowrap py-2">
                  Về Thương Hiệu
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-brand-red transition-all duration-300 group-hover:w-full"></span>
                </a>
                <a href="#collection" className="relative group hover:text-brand-dark transition-colors whitespace-nowrap py-2">
                  Bộ Sưu Tập
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-brand-red transition-all duration-300 group-hover:w-full"></span>
                </a>
                <a href="#lifestyle" className="relative group hover:text-brand-dark transition-colors whitespace-nowrap py-2">
                  Lifestyle
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-brand-red transition-all duration-300 group-hover:w-full"></span>
                </a>
              </div>
              
              <div className="flex items-center gap-3 sm:gap-5">
                <button onClick={() => setCartOpen(true)} className="relative p-2 text-brand-dark hover:text-brand-red transition-colors group">
                  <ShoppingBag className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  {cartItems.length > 0 && (
                    <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute top-0 right-0 w-5 h-5 bg-brand-red text-white text-[10px] font-bold rounded-full flex items-center justify-center transform translate-x-1 -translate-y-1 shadow-md shadow-brand-red/30">
                      {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                    </motion.span>
                  )}
                </button>
                <button onClick={() => document.getElementById('collection').scrollIntoView({behavior: 'smooth'})} className="hidden sm:flex bg-brand-dark text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-brand-red transition-all shadow-xl shadow-brand-dark/20 hover:shadow-brand-red/30 hover:-translate-y-0.5 items-center gap-2 whitespace-nowrap">
                  Mua Ngay
                </button>
                <button className="lg:hidden p-2 text-brand-dark bg-white/50 rounded-full backdrop-blur-md" onClick={() => setMobileMenuOpen(true)}>
                  <Menu className="w-6 h-6" />
                </button>
              </div>
            </div>
          </motion.nav>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div initial={{ opacity: 0, x: "100%" }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }} className="fixed inset-0 z-[60] bg-brand-cream flex flex-col">
                <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200">
                  <div className="text-xl font-bold text-brand-red flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-brand-pink" /> Hà Phương
                  </div>
                  <button className="p-2 text-brand-dark bg-gray-100 rounded-full" onClick={() => setMobileMenuOpen(false)}>
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <div className="flex flex-col gap-6 p-8 text-xl font-medium">
                  <a href="#about" onClick={() => setMobileMenuOpen(false)} className="hover:text-brand-red">Về Thương Hiệu</a>
                  <a href="#collection" onClick={() => setMobileMenuOpen(false)} className="hover:text-brand-red">Bộ Sưu Tập</a>
                  <a href="#lifestyle" onClick={() => setMobileMenuOpen(false)} className="hover:text-brand-red">Lifestyle</a>
                  <hr className="border-gray-200" />
                  <button onClick={() => { setMobileMenuOpen(false); setCartOpen(true); }} className="bg-brand-dark text-white px-6 py-4 rounded-full text-lg font-medium shadow-lg flex justify-center items-center gap-2 w-full">
                    <ShoppingBag className="w-5 h-5" /> Mở Giỏ Hàng
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Hero */}
          <section className="relative min-h-[100dvh] flex items-center justify-center pt-28 lg:pt-24 pb-12 overflow-hidden">
            <div className="absolute inset-0 opacity-10 mix-blend-multiply pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ff4d6d 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-brand-pink rounded-full blur-[80px] md:blur-[120px] opacity-40 pointer-events-none z-0"></div>
            
            <FloatingParticles />

            <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.2 }} className="text-center lg:text-left order-2 lg:order-1 mt-4 lg:mt-0">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-dark text-brand-red text-xs lg:text-sm font-medium mb-6">
                  <Heart className="w-4 h-4" /> Thương hiệu nước hoa chữa lành
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light leading-[1.2] lg:leading-[1.1] mb-6 text-brand-dark">
                  Mùi hương <br className="hidden lg:block"/>
                  <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-pink-400">dịu dàng</span> <br className="hidden lg:block"/>
                  dành cho những tâm hồn ngọt ngào.
                </h1>
                <p className="text-base lg:text-lg text-gray-600 mb-8 lg:mb-10 max-w-md mx-auto lg:mx-0 leading-relaxed px-4 lg:px-0">
                  Một cái ôm ấm áp qua từng nốt hương. Hà Phương Perfume mang đến sự dễ thương, trong trẻo và tinh tế.
                </p>
                <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                  <button onClick={() => document.getElementById('collection').scrollIntoView({behavior: 'smooth'})} className="bg-brand-red text-white px-8 py-4 rounded-full font-medium hover:bg-rose-500 transition-all shadow-xl shadow-brand-red/20 hover:shadow-brand-red/40 flex items-center justify-center gap-2 hover:-translate-y-1 w-full sm:w-auto">
                    Khám Phá <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>

              <motion.div style={{ y: isDesktop ? heroY : 0 }} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.4 }} className="relative order-1 lg:order-2 px-4 sm:px-12 lg:px-0">
                <div className="absolute inset-0 bg-white/30 rounded-[2rem] lg:rounded-[3rem] blur-xl lg:blur-2xl transform rotate-6 hover:rotate-12 transition-transform duration-700"></div>
                <motion.img whileHover={{ scale: 1.05 }} transition={{ duration: 0.5 }} src={heroImage} alt="Luxury Perfume" className="relative z-10 w-full max-w-[260px] sm:max-w-sm lg:max-w-md mx-auto rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-white/60 object-cover" />
                <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute -bottom-4 -left-2 lg:-bottom-6 lg:-left-6 glass-dark bg-white/80 backdrop-blur-md p-3 lg:p-4 rounded-2xl z-20 flex items-center gap-3 shadow-2xl border border-white">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-pink-100 rounded-full flex items-center justify-center text-xl lg:text-2xl shadow-inner">🍓</div>
                  <div>
                    <p className="text-[10px] lg:text-xs text-gray-500 font-medium">Hương Thơm</p>
                    <p className="text-xs lg:text-sm font-bold text-brand-dark">Ngọt Ngào & Êm Ái</p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* About */}
          <section id="about" className="py-20 lg:py-32 relative bg-white overflow-hidden w-full">
            <div className="container mx-auto px-4 sm:px-6 lg:px-12">
              <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8 }} className="relative order-2 lg:order-1">
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 relative w-full max-w-[280px] sm:max-w-sm mx-auto lg:max-w-none">
                    <div className="space-y-3 sm:space-y-4 pt-8 lg:pt-12">
                      <div className="bg-brand-pink rounded-2xl lg:rounded-3xl p-4 sm:p-6 lg:p-8 aspect-square flex items-center justify-center shadow-lg transform -rotate-3 hover:rotate-0 transition-all"><span className="text-4xl lg:text-6xl">🐼</span></div>
                      <div className="bg-rose-100 rounded-2xl lg:rounded-3xl p-4 sm:p-6 lg:p-8 aspect-square flex items-center justify-center shadow-lg transform rotate-2 hover:rotate-0 transition-all"><span className="text-4xl lg:text-6xl">🧶</span></div>
                    </div>
                    <div className="space-y-3 sm:space-y-4">
                      <div className="bg-red-100 rounded-2xl lg:rounded-3xl p-4 sm:p-6 lg:p-8 aspect-[4/5] flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-0 transition-all"><span className="text-4xl lg:text-6xl">🍓</span></div>
                      <div className="glass-dark rounded-2xl lg:rounded-3xl p-3 sm:p-4 lg:p-6 shadow-lg border border-white flex flex-col justify-center min-h-[100px]">
                        <Quote className="w-5 h-5 lg:w-8 lg:h-8 text-brand-red mb-1 sm:mb-2 opacity-50" />
                        <p className="text-[10px] sm:text-xs lg:text-sm italic text-gray-700 font-medium">"Chữa lành bằng sự đáng yêu."</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8 }} className="order-1 lg:order-2 text-center lg:text-left">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light mb-6">Câu chuyện của <br className="hidden lg:block"/><span className="font-bold text-brand-red">Hà Phương</span></h2>
                  <p className="text-gray-600 mb-4 lg:mb-6 leading-relaxed text-base lg:text-lg">Hà Phương yêu thích sự dễ thương, những món đồ handmade tỉ mỉ, gấu panda mũm mĩm và hương vị dâu tây ngọt ngào.</p>
                  <p className="text-gray-600 mb-8 leading-relaxed text-base lg:text-lg">Mỗi giọt hương không chỉ là nước hoa, mà là một trải nghiệm mang đến cho bạn cảm giác cozy, an yên.</p>
                  <div className="flex justify-center lg:justify-start gap-8 lg:gap-6">
                    <div className="flex flex-col items-center lg:items-start"><span className="text-2xl lg:text-3xl font-bold text-brand-dark mb-1">100%</span><span className="text-[10px] lg:text-sm text-gray-500 uppercase tracking-wider">Handmade Craft</span></div>
                    <div className="w-px bg-gray-200"></div>
                    <div className="flex flex-col items-center lg:items-start"><span className="text-2xl lg:text-3xl font-bold text-brand-dark mb-1">Cozy</span><span className="text-[10px] lg:text-sm text-gray-500 uppercase tracking-wider">Vibe & Lifestyle</span></div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Featured Collection */}
          <section id="collection" className="py-20 lg:py-32 relative bg-[var(--color-brand-cream)]">
            <div className="container mx-auto px-4 sm:px-6 lg:px-12">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.8 }} transition={{ duration: 0.6 }} className="text-center max-w-2xl mx-auto mb-12 lg:mb-20">
                <h2 className="text-3xl lg:text-5xl font-bold mb-4 lg:mb-6 text-brand-dark">Bộ Sưu Tập Nổi Bật</h2>
                <p className="text-gray-500 text-base lg:text-lg">Khám phá những nốt hương được yêu thích nhất.</p>
              </motion.div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                {products.map((p, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.7, delay: i * 0.15, type: 'spring', damping: 20 }} whileHover={{ y: -15 }} className="group relative rounded-[2rem] lg:rounded-[2.5rem] bg-white p-6 lg:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_30px_60px_rgba(255,77,109,0.1)] transition-all duration-500 border border-gray-100/50 flex flex-col cursor-pointer">
                    <div className="absolute top-4 left-4 lg:top-6 lg:left-6 z-10">
                      <span className="glass-dark bg-white/70 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] lg:text-xs font-bold tracking-wider uppercase text-brand-dark shadow-sm border border-white/50">{p.tag}</span>
                    </div>
                    
                    <div className={`w-full aspect-square rounded-[1.5rem] lg:rounded-[2rem] ${p.color} mb-6 lg:mb-8 flex items-center justify-center relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-500 shadow-inner`}>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <span className="text-6xl lg:text-8xl transform group-hover:scale-110 transition-transform duration-700">{p.icon}</span>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-xl lg:text-2xl font-bold mb-2 text-brand-dark group-hover:text-brand-red transition-colors">{p.name}</h3>
                      <p className="text-sm lg:text-base text-gray-500 mb-4 lg:mb-6 line-clamp-2">{p.desc}</p>
                    </div>
                    
                    <div className="flex justify-between items-center pt-5 lg:pt-6 border-t border-gray-50">
                      <span className="text-xl lg:text-2xl font-extrabold text-brand-dark tracking-tight">{p.price}</span>
                      <button onClick={(e) => { e.stopPropagation(); addToCart(p); }} className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-brand-dark text-white flex items-center justify-center hover:bg-brand-red transition-colors group-hover:scale-110 shadow-[0_10px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_10px_20px_rgba(255,77,109,0.3)]" title="Thêm vào giỏ">
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Lifestyle */}
          <section id="lifestyle" className="py-20 lg:py-32 relative bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-12">
              <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-0 items-stretch rounded-[2rem] lg:rounded-[3rem] overflow-hidden shadow-2xl">
                <div className="bg-brand-dark p-6 sm:p-12 lg:p-20 flex flex-col justify-center relative overflow-hidden text-white min-h-[350px]">
                  <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
                  <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8 }} className="relative z-10 text-center lg:text-left">
                    <h2 className="text-3xl lg:text-5xl font-light mb-4 lg:mb-6 leading-tight">Một lối sống <br/><span className="font-bold text-brand-pink">đầy chất thơ</span></h2>
                    <p className="text-gray-300 text-sm lg:text-lg mb-8 lg:mb-10 leading-relaxed font-light">Hà Phương Perfume không chỉ là một mùi hương, mà là một tuyên ngôn về lối sống.</p>
                    <button className="glass-dark border-white/20 text-white px-6 lg:px-8 py-3 lg:py-4 rounded-full font-medium hover:bg-white hover:text-brand-dark transition-all flex items-center justify-center gap-2 w-full sm:w-auto mx-auto lg:mx-0">
                      Ghé Thăm Instagram 
                      <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
                    </button>
                  </motion.div>
                </div>
                <div className="relative h-[300px] sm:h-[400px] lg:h-auto overflow-hidden">
                  <motion.img style={{ y: isDesktop ? lifestyleY : 0, scale: 1.1 }} src={lifestyleImage} alt="Lifestyle" className="absolute inset-0 w-full h-[120%] object-cover" />
                </div>
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <section className="py-20 lg:py-32 relative bg-brand-pink/20 overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.8 }} transition={{ duration: 0.6 }} className="text-center mb-12 lg:mb-16"><h2 className="text-3xl lg:text-4xl font-bold text-brand-dark">Lời Thì Thầm</h2></motion.div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {[1, 2, 3].map((i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, delay: i * 0.15 }} className="bg-white p-6 lg:p-8 rounded-[1.5rem] lg:rounded-[2rem] shadow-xl shadow-brand-pink/10 relative">
                    <Quote className="absolute top-4 right-4 lg:top-6 lg:right-6 w-8 h-8 lg:w-10 lg:h-10 text-brand-pink opacity-50" />
                    <div className="flex text-yellow-400 mb-3 lg:mb-4">{[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-3 h-3 lg:w-4 lg:h-4 fill-current" />)}</div>
                    <p className="text-sm lg:text-base text-gray-600 mb-4 lg:mb-6 italic line-clamp-4">"Thực sự rất bất ngờ với mùi hương Strawberry Hug. Ngọt ngào nhưng không hề gắt."</p>
                    <div className="flex items-center gap-3 lg:gap-4 mt-auto">
                      <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-tr from-brand-pink to-brand-red flex items-center justify-center text-white font-bold text-sm lg:text-base">{['A', 'B', 'C'][i-1]}</div>
                      <div>
                        <h4 className="font-bold text-brand-dark text-sm lg:text-base">Khách hàng {i}</h4>
                        <p className="text-[10px] lg:text-xs text-gray-400">Verified Buyer</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="bg-brand-dark pt-16 lg:pt-20 pb-8 lg:pb-10 text-white relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            <div className="container mx-auto px-4 sm:px-6 lg:px-12">
              <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-12 lg:mb-16 items-center text-center lg:text-left">
                <div className="flex flex-col items-center lg:items-start">
                  <div className="text-2xl lg:text-3xl font-bold text-brand-pink mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 lg:w-6 lg:h-6" /> Hà Phương Perfume
                  </div>
                  <p className="text-gray-400 max-w-sm italic text-base lg:text-lg">"Every scent tells a soft story."</p>
                </div>
                <div className="flex justify-center lg:justify-end gap-4">
                  <a href="#" className="w-10 h-10 lg:w-12 lg:h-12 rounded-full glass-dark flex items-center justify-center hover:bg-brand-red transition-colors border-white/10"><svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg></a>
                  <a href="#" className="w-10 h-10 lg:w-12 lg:h-12 rounded-full glass-dark flex items-center justify-center hover:bg-brand-red transition-colors border-white/10"><svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></a>
                </div>
              </motion.div>
              <div className="border-t border-white/10 pt-6 lg:pt-8 flex flex-col md:flex-row justify-between items-center text-xs lg:text-sm text-gray-500 gap-4 md:gap-0">
                <p>© 2026 Hà Phương Perfume. All rights reserved.</p>
                <div className="flex gap-4 lg:gap-6">
                  <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                  <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                </div>
              </div>
            </div>
          </footer>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
