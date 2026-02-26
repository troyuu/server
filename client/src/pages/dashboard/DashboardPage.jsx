import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { getProducts } from '../../services/productService';
import { getCategories } from '../../services/categoryService';
import { getOrders } from '../../services/orderService';
import { getUsers } from '../../services/userService';
import LoadingSpinner from '../../components/LoadingSpinner';

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ products: 0, categories: 0, orders: 0, users: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getProducts(), getCategories(), getOrders(), getUsers()])
      .then(([p, c, o, u]) => {
        setStats({
          products: p.data.data?.length || 0,
          categories: c.data.data?.length || 0,
          orders: o.data.data?.length || 0,
          users: u.data.data?.length || 0,
        });
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner />;

  const cards = [
    { label: 'Products', value: stats.products, color: 'bg-blue-500' },
    { label: 'Categories', value: stats.categories, color: 'bg-green-500' },
    { label: 'Orders', value: stats.orders, color: 'bg-orange-500' },
    { label: 'Users', value: stats.users, color: 'bg-purple-500' },
  ];

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-900">
        Welcome back, {user?.user_name || 'User'}!
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <div key={card.label} className="rounded-xl bg-white p-6 shadow-sm">
            <div className={`mb-3 inline-block rounded-lg ${card.color} px-3 py-1 text-sm font-medium text-white`}>
              {card.label}
            </div>
            <p className="text-3xl font-bold text-gray-900">{card.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
