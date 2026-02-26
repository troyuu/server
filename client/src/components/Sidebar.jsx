import { NavLink } from 'react-router-dom';

const links = [
  { section: 'Main', items: [{ to: '/dashboard', label: 'Dashboard' }] },
  { section: 'Profile', items: [{ to: '/profile', label: 'My Profile' }] },
  {
    section: 'Catalog',
    items: [
      { to: '/products', label: 'Products' },
      { to: '/categories', label: 'Categories' },
    ],
  },
  { section: 'Sales', items: [{ to: '/orders', label: 'Orders' }] },
  {
    section: 'Admin',
    items: [
      { to: '/admin/users', label: 'Users' },
      { to: '/admin/registered', label: 'Registered Users' },
      { to: '/admin/login-history', label: 'Login History' },
    ],
  },
];

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {open && (
        <div className="fixed inset-0 z-20 bg-black/50 lg:hidden" onClick={onClose} />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-gray-900 text-white transition-transform lg:static lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-center border-b border-gray-700 text-xl font-bold">
          Ecom Admin
        </div>
        <nav className="mt-4 space-y-4 px-4">
          {links.map((group) => (
            <div key={group.section}>
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-400">
                {group.section}
              </p>
              {group.items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `block rounded-lg px-3 py-2 text-sm transition-colors ${
                      isActive ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:bg-gray-800'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
