"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  User, 
  ShoppingBag, 
  Settings, 
  Heart, 
  CreditCard, 
  MapPin,
  Bell,
  Menu,
  X
} from "lucide-react";

interface ProfileLayoutProps {
  children: React.ReactNode;
}

const profileNavItems = [
  {
    href: "/profile",
    label: "Profile Overview",
    icon: User,
    description: "Personal information and account details"
  },
  {
    href: "/profile/myorders",
    label: "My Orders",
    icon: ShoppingBag,
    description: "Order history and tracking"
  },
  {
    href: "/profile/favorites",
    label: "Favorites",
    icon: Heart,
    description: "Your favorite products"
  },
  {
    href: "/profile/addresses",
    label: "Addresses",
    icon: MapPin,
    description: "Delivery addresses"
  },
  {
    href: "/profile/payment",
    label: "Payment Methods",
    icon: CreditCard,
    description: "Saved payment methods"
  },
  {
    href: "/profile/notifications",
    label: "Notifications",
    icon: Bell,
    description: "Notification preferences"
  },
  {
    href: "/profile/settings",
    label: "Settings",
    icon: Settings,
    description: "Account settings and preferences"
  }
];

export default function ProfileLayout({ children }: ProfileLayoutProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Decorative background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-400/20 to-pink-600/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/80 backdrop-blur-md shadow-lg border border-slate-200/50 dark:bg-slate-800/80 dark:border-slate-700/50 text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 transition-all"
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>

            {/* Sidebar Navigation */}
            <div className={`lg:w-80 ${isMobileMenuOpen ? 'block' : 'hidden lg:block'}`}>
              <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-slate-200/50 dark:bg-slate-800/80 dark:border-slate-700/50 p-6">
                <div className="mb-8">
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    My Account
                  </h1>
                  <p className="text-slate-600 dark:text-slate-400 mt-1">
                    Manage your profile and preferences
                  </p>
                </div>

                <nav className="space-y-2">
                  {profileNavItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`group flex items-start space-x-3 p-4 rounded-2xl transition-all ${
                          isActive
                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                            : 'hover:bg-slate-100 dark:hover:bg-slate-700/50 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <Icon className={`h-5 w-5 mt-0.5 flex-shrink-0 ${
                          isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300'
                        }`} />
                        <div className="flex-1 min-w-0">
                          <div className={`font-medium ${
                            isActive ? 'text-white' : 'text-slate-900 dark:text-white'
                          }`}>
                            {item.label}
                          </div>
                          <div className={`text-sm mt-0.5 ${
                            isActive ? 'text-blue-100' : 'text-slate-500 dark:text-slate-400'
                          }`}>
                            {item.description}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
