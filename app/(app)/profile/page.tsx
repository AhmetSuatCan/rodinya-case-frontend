"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  User, 
  Mail, 
  Calendar, 
  Crown, 
  Edit3, 
  Save, 
  X,
  Camera,
  Shield,
  Award,
  TrendingUp,
  Package
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useOrderStats } from "../../hooks/useOrder";

export default function ProfilePage() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { stats, loading: statsLoading, error: statsError } = useOrderStats();
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user?.name || "");

  const handleSave = () => {
    // TODO: Implement profile update API call
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedName(user?.name || "");
    setIsEditing(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      // Wait a bit to ensure state is updated, then redirect with full page reload
      setTimeout(() => {
        window.location.href = '/';
      }, 100);
    } catch (error) {
      // Even if there's an error, redirect to main page with full reload
      setTimeout(() => {
        window.location.href = '/';
      }, 100);
    }
  };

  // Get member status based on VIP status
  const getMemberStatus = () => {
    if (!user) return "Unknown";
    return user.isVIP ? "VIP" : "Normal User";
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  if (!user) {
    return (
      <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-slate-200/50 dark:bg-slate-800/80 dark:border-slate-700/50 p-8">
        <div className="text-center">
          <div className="text-slate-500 dark:text-slate-400">Loading profile...</div>
        </div>
      </div>
    );
  }

  const memberSince = new Date(user.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long'
  });

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-slate-200/50 dark:bg-slate-800/80 dark:border-slate-700/50 overflow-hidden">
        {/* Cover Photo */}
        <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600 relative">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute bottom-4 right-4">
            <button className="flex items-center space-x-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-xl text-white hover:bg-white/30 transition-all">
              <Camera className="h-4 w-4" />
              <span className="text-sm font-medium">Change Cover</span>
            </button>
          </div>
        </div>

        {/* Profile Info */}
        <div className="p-8 -mt-16 relative">
          <div className="flex flex-col sm:flex-row items-start sm:items-end space-y-4 sm:space-y-0 sm:space-x-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-xl border-4 border-white dark:border-slate-800">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-white dark:bg-slate-700 rounded-full shadow-lg border-2 border-slate-200 dark:border-slate-600 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-600 transition-all">
                <Camera className="h-4 w-4 text-slate-600 dark:text-slate-300" />
              </button>
            </div>

            {/* Name and Status */}
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                {isEditing ? (
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      className="text-2xl font-bold bg-transparent border-b-2 border-blue-500 focus:outline-none text-slate-900 dark:text-white"
                    />
                    <button
                      onClick={handleSave}
                      className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-all"
                    >
                      <Save className="h-5 w-5" />
                    </button>
                    <button
                      onClick={handleCancel}
                      className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-3">
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                      {user.name}
                    </h1>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-all"
                    >
                      <Edit3 className="h-4 w-4" />
                    </button>
                  </div>
                )}
                
                {user.isVIP && (
                  <div className="flex items-center space-x-1 px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full text-white text-sm font-medium">
                    <Crown className="h-4 w-4" />
                    <span>VIP Member</span>
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-4 text-slate-600 dark:text-slate-400">
                <div className="flex items-center space-x-1">
                  <Mail className="h-4 w-4" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>Member since {memberSince}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all">
                Edit Profile
              </button>
              <button 
                onClick={handleLogout}
                className="px-6 py-3 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-medium hover:bg-slate-300 dark:hover:bg-slate-600 transition-all"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      {statsError && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-4 mb-6">
          <div className="text-red-700 dark:text-red-300 text-sm">
            Failed to load order statistics: {statsError.message}
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200/50 dark:bg-slate-800/80 dark:border-slate-700/50 p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <Package className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                {statsLoading ? "..." : stats.total}
              </div>
              <div className="text-slate-600 dark:text-slate-400">Total Orders</div>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200/50 dark:bg-slate-800/80 dark:border-slate-700/50 p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                {statsLoading ? "..." : formatCurrency(stats.totalValue)}
              </div>
              <div className="text-slate-600 dark:text-slate-400">Total Spent</div>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200/50 dark:bg-slate-800/80 dark:border-slate-700/50 p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Award className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                {getMemberStatus()}
              </div>
              <div className="text-slate-600 dark:text-slate-400">Member Status</div>
            </div>
          </div>
        </div>
      </div>

      {/* Account Security */}
      <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-slate-200/50 dark:bg-slate-800/80 dark:border-slate-700/50 p-8">
        <div className="flex items-center space-x-3 mb-6">
          <Shield className="h-6 w-6 text-blue-600" />
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Account Security</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
            <div>
              <div className="font-medium text-slate-900 dark:text-white">Password</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Last changed 3 months ago</div>
            </div>
            <button className="px-4 py-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all">
              Change
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
            <div>
              <div className="font-medium text-slate-900 dark:text-white">Two-Factor Authentication</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Add an extra layer of security</div>
            </div>
            <button className="px-4 py-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all">
              Enable
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
            <div>
              <div className="font-medium text-slate-900 dark:text-white">Login Sessions</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Manage your active sessions</div>
            </div>
            <button className="px-4 py-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all">
              Manage
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}