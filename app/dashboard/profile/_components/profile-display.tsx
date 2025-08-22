"use client";
import { User } from "@/schemas/auth";
import {
  CheckCircle,
  IdCard,
  Mail,
  Phone,
  Shield,
  UserIcon,
  XCircle,
} from "lucide-react";
import EditProfileForm from "./edit-profile-form";

export default function ProfileDisplay({ user }: { user: User | null }) {
  const getUserTypeBadgeColor = (userType: string) => {
    switch (userType.toLowerCase()) {
      case "student":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "teacher":
        return "bg-green-100 text-green-800 border-green-200";
      case "admin":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <>
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <UserIcon size={32} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">
                {user?.username}
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border bg-white bg-opacity-20 text-white border-white border-opacity-30">
                  <Shield size={12} />
                  {user?.user_type}
                </span>
              </div>
            </div>
          </div>
          <EditProfileForm user={user} />
        </div>
      </div>

      <div className="p-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Account Information */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-200 mb-4">
              Account Information
            </h3>

            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Username
              </label>
              <div className="flex items-center gap-3">
                <UserIcon size={18} className="text-gray-400" />
                <span className="text-gray-900 dark:text-gray-400">
                  {user?.username}
                </span>
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Phone Number
              </label>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-gray-400" />
                <span className="text-gray-900 dark:text-gray-400 ">
                  {user?.phone_number}
                </span>
              </div>
            </div>

            {/* University ID */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                University ID
              </label>
              <div className="flex items-center gap-3">
                <IdCard size={18} className="text-gray-400" />
                <span className="font-mono text-sm bg-zinc-50 dark:bg-zinc-700 px-3 py-1 rounded border">
                  {user?.university_id}
                </span>
              </div>
            </div>
          </div>

          {/* Account Details */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold   mb-4">Account Details</h3>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-gray-400" />
                <span className="text-gray-900 dark:text-gray-400">
                  {user?.email}
                </span>
              </div>
            </div>

            {/* Account Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Account Type
              </label>
              <div className="flex items-center gap-3">
                <Shield size={18} className="text-gray-400" />
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getUserTypeBadgeColor(
                    user?.user_type ?? ""
                  )}`}
                >
                  {user?.user_type}
                </span>
              </div>
            </div>

            {/* Verification Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Verification Status
              </label>
              <div className="flex items-center gap-3">
                {user?.is_varified ? (
                  <CheckCircle size={18} className="text-green-500" />
                ) : (
                  <XCircle size={18} className="text-red-500" />
                )}
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                    user?.is_varified
                      ? "bg-green-100 text-green-800 border-green-200"
                      : "bg-red-100 text-red-800 border-red-200"
                  }`}
                >
                  {user?.is_varified ? "Verified" : "Not Verified"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
