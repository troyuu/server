import { Outlet } from 'react-router-dom';

const BG_IMAGE = 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1920&q=80';

export default function AuthLayout() {
  return (
    <div
      className="relative flex min-h-screen items-center justify-center p-4"
      style={{
        backgroundImage: `url(${BG_IMAGE})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
      <div className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl bg-white/95 backdrop-blur-sm shadow-2xl">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6 text-center">
          <h1 className="text-2xl font-bold tracking-wide text-white">ShopEase</h1>
          <p className="mt-1 text-sm text-indigo-200">Your one-stop e-commerce platform</p>
        </div>
        <div className="px-8 py-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
