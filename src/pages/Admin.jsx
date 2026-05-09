import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, ShoppingBag, Package, TrendingUp, Users, 
  Archive, MonitorPlay, MessageSquare, Ticket, Settings, 
  Menu, X, Bell, Search, Plus, MoreHorizontal, Filter
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const menuItems = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Tổng Quan' },
  { id: 'orders', icon: ShoppingBag, label: 'Đơn Hàng' },
  { id: 'products', icon: Package, label: 'Sản Phẩm' },
  { id: 'revenue', icon: TrendingUp, label: 'Doanh Thu' },
  { id: 'customers', icon: Users, label: 'Khách Hàng' },
  { id: 'inventory', icon: Archive, label: 'Kho Hàng' },
  { id: 'cms', icon: MonitorPlay, label: 'Landing Page' },
  { id: 'feedback', icon: MessageSquare, label: 'Feedback' },
  { id: 'coupons', icon: Ticket, label: 'Mã Giảm Giá' },
  { id: 'settings', icon: Settings, label: 'Cài Đặt' },
];

const revenueData = [
  { name: 'T2', value: 12000000 },
  { name: 'T3', value: 19000000 },
  { name: 'T4', value: 15000000 },
  { name: 'T5', value: 25000000 },
  { name: 'T6', value: 22000000 },
  { name: 'T7', value: 38000000 },
  { name: 'CN', value: 45000000 },
];

const Sidebar = ({ isOpen, setIsOpen, activeTab, setActiveTab }) => {
  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsOpen(false)} className="fixed inset-0 bg-brand-dark/40 z-40 lg:hidden backdrop-blur-sm" />
        )}
      </AnimatePresence>

      <motion.aside 
        className={`fixed inset-y-0 left-0 w-64 glass-dark bg-white/70 border-r border-white/50 z-50 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="h-20 flex items-center px-8">
          <div className="text-2xl font-bold tracking-tighter text-brand-red flex items-center gap-2">
            <SparklesIcon /> Hà Phương
          </div>
          <button onClick={() => setIsOpen(false)} className="lg:hidden ml-auto p-2 text-gray-500 hover:text-brand-dark">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-1 custom-scrollbar">
          {menuItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button 
                key={item.id}
                onClick={() => { setActiveTab(item.id); setIsOpen(false); }}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 w-full text-left relative group ${
                  isActive ? 'bg-white text-brand-red shadow-sm' : 'text-gray-500 hover:text-brand-dark hover:bg-white/50'
                }`}
              >
                {isActive && <motion.div layoutId="activeTab" className="absolute inset-0 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white" />}
                <item.icon className={`w-5 h-5 relative z-10 transition-colors ${isActive ? 'text-brand-red' : 'group-hover:text-brand-pink'}`} />
                <span className={`relative z-10 font-medium ${isActive ? 'font-bold' : ''}`}>{item.label}</span>
              </button>
            )
          })}
        </div>
      </motion.aside>
    </>
  );
};

const SparklesIcon = () => <svg className="w-6 h-6 text-brand-pink" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>;

const Topbar = ({ toggleSidebar }) => {
  return (
    <header className="h-20 glass bg-white/40 border-b border-white/50 sticky top-0 z-30 flex items-center justify-between px-6 lg:px-10">
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="lg:hidden p-2 text-gray-600 bg-white rounded-xl shadow-sm hover:text-brand-red">
          <Menu className="w-5 h-5" />
        </button>
        <div className="hidden md:flex items-center bg-white/60 border border-white/80 rounded-full px-4 py-2 shadow-inner w-80">
          <Search className="w-4 h-4 text-gray-400" />
          <input type="text" placeholder="Tìm kiếm đơn hàng, sản phẩm..." className="bg-transparent border-none outline-none ml-2 w-full text-sm placeholder-gray-400" />
        </div>
      </div>
      
      <div className="flex items-center gap-4 sm:gap-6">
        <button className="relative p-2 text-gray-500 hover:text-brand-red transition-colors bg-white rounded-full shadow-sm">
          <Bell className="w-5 h-5" />
          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-brand-red rounded-full border-2 border-white"></span>
        </button>
        <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-bold text-brand-dark">Hà Phương</p>
            <p className="text-xs text-gray-400">Admin</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-pink to-brand-red flex items-center justify-center text-white font-bold shadow-md">
            HP
          </div>
        </div>
      </div>
    </header>
  );
};

// --- MODULES ---

const DashboardModule = () => {
  const formatCurrency = (val) => new Intl.NumberFormat('vi-VN').format(val) + 'đ';
  
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-2xl font-bold text-brand-dark">Tổng Quan Hôm Nay</h2>
          <p className="text-gray-500 text-sm mt-1">Cập nhật lúc 15:30, 09/05/2026</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Doanh Thu", value: "45.2M", diff: "+15%", positive: true, icon: TrendingUp, color: "text-brand-red", bg: "bg-red-50" },
          { title: "Đơn Hàng", value: "128", diff: "+8%", positive: true, icon: ShoppingBag, color: "text-blue-600", bg: "bg-blue-50" },
          { title: "Khách Mới", value: "34", diff: "-2%", positive: false, icon: Users, color: "text-purple-600", bg: "bg-purple-50" },
          { title: "Lượt Truy Cập", value: "1,204", diff: "+22%", positive: true, icon: MonitorPlay, color: "text-amber-600", bg: "bg-amber-50" }
        ].map((stat, i) => (
          <div key={i} className="glass bg-white/60 p-6 rounded-[2rem] hover:shadow-xl transition-all duration-300 group">
            <div className="flex justify-between items-start mb-4">
              <div className={`w-12 h-12 rounded-2xl ${stat.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${stat.positive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {stat.diff}
              </span>
            </div>
            <p className="text-gray-500 font-medium text-sm">{stat.title}</p>
            <h3 className="text-3xl font-bold text-brand-dark mt-1">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass bg-white/60 p-6 sm:p-8 rounded-[2rem]">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-brand-dark text-lg">Biểu đồ Doanh Thu Tuần</h3>
            <select className="bg-gray-50 border-none text-sm font-medium rounded-xl px-4 py-2 outline-none">
              <option>Tuần này</option>
              <option>Tháng này</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ff4d6d" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ff4d6d" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} dy={10} />
                <YAxis tickFormatter={(val) => `${val/1000000}M`} axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                <Tooltip 
                  formatter={(val) => [formatCurrency(val), "Doanh thu"]}
                  contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}
                />
                <Area type="monotone" dataKey="value" stroke="#ff4d6d" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass bg-white/60 p-6 sm:p-8 rounded-[2rem] flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-brand-dark text-lg">Đơn Hàng Gần Đây</h3>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="flex items-center gap-4 p-3 hover:bg-white/80 rounded-2xl transition-colors cursor-pointer border border-transparent hover:border-white">
                <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center text-lg shrink-0 shadow-sm border border-pink-100">
                  {item % 2 === 0 ? '🐼' : '🍓'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-brand-dark text-sm truncate">Khách Hàng {item}</p>
                  <p className="text-xs text-gray-400">Vừa xong • COD</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-brand-red text-sm">1.25M</p>
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full">Chờ XL</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const OrdersModule = () => {
  const [orders, setOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    const loadOrders = () => {
      const data = JSON.parse(localStorage.getItem('parfums_hp_orders') || '[]');
      setOrders(data);
    };
    loadOrders();
    window.addEventListener('storage', loadOrders);
    return () => window.removeEventListener('storage', loadOrders);
  }, []);

  const updateStatus = (id, newStatus) => {
    const newOrders = orders.map(o => o.id === id ? { ...o, status: newStatus } : o);
    setOrders(newOrders);
    localStorage.setItem('parfums_hp_orders', JSON.stringify(newOrders));
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'pending': return <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold whitespace-nowrap">Chờ xác nhận</span>;
      case 'shipping': return <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold whitespace-nowrap">Đang giao</span>;
      case 'completed': return <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold whitespace-nowrap">Hoàn thành</span>;
      case 'cancelled': return <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold whitespace-nowrap">Đã hủy</span>;
      default: return null;
    }
  };

  const formatDate = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleString('vi-VN', { 
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  const filteredOrders = filterStatus === 'all' ? orders : orders.filter(o => o.status === filterStatus);

  const tabs = [
    { id: 'all', label: 'Tất cả' },
    { id: 'pending', label: 'Chờ xác nhận' },
    { id: 'shipping', label: 'Đang giao' },
    { id: 'completed', label: 'Hoàn thành' },
    { id: 'cancelled', label: 'Đã hủy' }
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-brand-dark">Quản Lý Đơn Hàng</h2>
      </div>

      <div className="glass bg-white/60 p-6 rounded-[2rem] shadow-sm">
        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 custom-scrollbar">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilterStatus(tab.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                filterStatus === tab.id 
                  ? 'bg-brand-dark text-white shadow-md' 
                  : 'bg-white text-gray-500 hover:bg-gray-50 hover:text-brand-dark border border-gray-200'
              }`}
            >
              {tab.label}
              {tab.id !== 'all' && (
                <span className="ml-2 px-2 py-0.5 rounded-full bg-white/20 text-xs">
                  {orders.filter(o => o.status === tab.id).length}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200/50 text-gray-500 text-sm">
                <th className="p-4 font-medium">Mã Đơn</th>
                <th className="p-4 font-medium">Khách Hàng</th>
                <th className="p-4 font-medium">Sản Phẩm</th>
                <th className="p-4 font-medium">Tổng Tiền</th>
                <th className="p-4 font-medium">Trạng Thái</th>
                <th className="p-4 font-medium text-right">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-gray-500">Không tìm thấy đơn hàng nào trong mục này.</td>
                </tr>
              ) : (
                filteredOrders.map(order => (
                  <tr key={order.id} className="hover:bg-white/50 transition-colors">
                    <td className="p-4">
                      <p className="font-semibold text-brand-dark">{order.id}</p>
                      <p className="text-xs text-gray-400 mt-1 whitespace-nowrap">{formatDate(order.date)}</p>
                    </td>
                    <td className="p-4">
                      <p className="font-medium text-gray-800">{order.customer}</p>
                      <p className="text-xs text-gray-500">{order.phone}</p>
                      <p className="text-xs text-gray-400 mt-1 line-clamp-1 max-w-[200px]" title={order.address}>{order.address}</p>
                    </td>
                    <td className="p-4 text-sm text-gray-600 max-w-[250px]">
                      {order.items.map(i => `${i.name} (x${i.quantity})`).join(', ')}
                    </td>
                    <td className="p-4 font-bold text-brand-red whitespace-nowrap">
                      {new Intl.NumberFormat('vi-VN').format(order.total)}đ
                    </td>
                    <td className="p-4">{getStatusBadge(order.status)}</td>
                    <td className="p-4 text-right">
                      <select 
                        value={order.status} 
                        onChange={(e) => updateStatus(order.id, e.target.value)}
                        className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-brand-red cursor-pointer shadow-sm hover:border-gray-300 transition-colors"
                      >
                        <option value="pending">Chờ xác nhận</option>
                        <option value="shipping">Đang giao</option>
                        <option value="completed">Hoàn thành</option>
                        <option value="cancelled">Hủy đơn</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

const PlaceholderModule = ({ title, icon: Icon }) => (
  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="h-[60vh] glass bg-white/50 rounded-[3rem] flex flex-col items-center justify-center text-center p-8 border border-white">
    <div className="w-24 h-24 bg-brand-pink/30 rounded-full flex items-center justify-center mb-6 shadow-inner">
      <Icon className="w-12 h-12 text-brand-red opacity-80" />
    </div>
    <h2 className="text-3xl font-bold text-brand-dark mb-4">{title}</h2>
    <p className="text-gray-500 max-w-md mx-auto">Module này đang được hoàn thiện trong Giai đoạn 2 của Kế hoạch xây dựng Admin Dashboard.</p>
  </motion.div>
);

export default function Admin() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderModule = () => {
    switch(activeTab) {
      case 'dashboard': return <DashboardModule />;
      case 'orders': return <OrdersModule />;
      case 'products': return <PlaceholderModule title="Danh Mục Sản Phẩm" icon={Package} />;
      case 'revenue': return <PlaceholderModule title="Phân Tích Doanh Thu" icon={TrendingUp} />;
      case 'customers': return <PlaceholderModule title="Quản Lý Khách Hàng" icon={Users} />;
      case 'inventory': return <PlaceholderModule title="Quản Lý Kho Hàng" icon={Archive} />;
      case 'cms': return <PlaceholderModule title="Cấu Hình Landing Page" icon={MonitorPlay} />;
      case 'feedback': return <PlaceholderModule title="Đánh Giá Khách Hàng" icon={MessageSquare} />;
      case 'coupons': return <PlaceholderModule title="Mã Giảm Giá" icon={Ticket} />;
      case 'settings': return <PlaceholderModule title="Cài Đặt Hệ Thống" icon={Settings} />;
      default: return <DashboardModule />;
    }
  };

  return (
    <div className="min-h-[100dvh] bg-[var(--color-brand-cream)] font-sans relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-pink-200/40 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[40%] bg-rose-200/40 rounded-full blur-[100px] pointer-events-none" />
      
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="lg:ml-64 flex flex-col min-h-[100dvh] transition-all duration-300 relative z-10">
        <Topbar toggleSidebar={() => setSidebarOpen(true)} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {renderModule()}
        </main>
      </div>
    </div>
  );
}
