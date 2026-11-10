"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface AdminUser {
  id: number;
  name: string;
  email: string;
  password?: string;
  role: string;
  created_at: string;
}

export default function AdminRegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [adminsList, setAdminsList] = useState<AdminUser[]>([]);

  const fetchAdmins = async () => {
    try {
      const res = await fetch("/api/admin/list");
      const data = await res.json();
      if (data.success) {
        setAdminsList(data.admins);
      }
    } catch {}
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 4) {
      setError("Password must be at least 4 characters long");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/admin/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Registration failed");
      }

      setSuccess(`Sub-Admin "${name}" registered successfully with Full Admin Access!`);

      // Store auth session immediately so they can directly use it
      if (typeof window !== "undefined") {
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("user", JSON.stringify(data.data.user));
      }

      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      fetchAdmins();
    } catch (err: any) {
      setError(err.message || "Failed to register admin");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-sky-950 text-white flex flex-col justify-between py-8 px-4 sm:px-6 lg:px-8">
      {/* Header Bar */}
      <div className="max-w-4xl mx-auto w-full flex items-center justify-between pb-6 border-b border-slate-700/60">
        <Link href="/" className="flex items-center gap-3 group">
          <img
            src="/logo.png"
            alt="LetsCod Logo"
            className="h-10 w-auto object-contain bg-white/10 p-1.5 rounded-lg border border-white/20"
          />
          <div>
            <span className="font-extrabold text-lg tracking-tight text-white block">
              LetsCod Technologies
            </span>
            <span className="text-[11px] text-sky-400 font-semibold tracking-wider uppercase block">
              Admin &amp; Sub-Admin Provisioning
            </span>
          </div>
        </Link>
        <div className="flex items-center gap-2">
          <Link
            href="/login?admin=1"
            className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 border border-white/15 transition-all"
          >
            Admin Portal
          </Link>
          <Link
            href="/admin/dashboard"
            className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-sky-500 hover:bg-sky-600 text-white transition-all shadow-sm"
          >
            Go to Dashboard &rarr;
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto w-full py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Registration Form Card */}
        <div className="lg:col-span-7 bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-200 p-6 sm:p-8">
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-sky-100 text-sky-800 mb-3">
              <span>🛡️</span> Sub-Admin &amp; Supervisor Registration
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
              Create Sub-Admin Account
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Register a new administrative user with full access privileges. Account
              credentials will be safely saved directly to the database.
            </p>
          </div>

          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-700 flex items-center gap-2">
              <span>⚠️</span> {error}
            </div>
          )}

          {success && (
            <div className="mb-5 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800">
              <div className="flex items-center gap-2 font-bold text-xs mb-2">
                <span>✅</span> {success}
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                <a
                  href="/admin/dashboard"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-all"
                >
                  ⚡ Open Admin Dashboard Now
                </a>
                <Link
                  href="/login?admin=1"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg border border-slate-300 transition-all"
                >
                  Go to Admin Login
                </Link>
              </div>
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Full Name / Supervisor Title
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Sub-Admin Prince / Operations Head"
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Admin Email / Login ID
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. subadmin@letscod.com"
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none transition-all"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Confirm Password
                </label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Admin Role &amp; Permission Level
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none transition-all"
              >
                <option value="admin">Sub-Admin (Full Dashboard &amp; Operations Access)</option>
                <option value="super-admin">Super Admin (Root Supervisor Access)</option>
                <option value="manager">Operations Supervisor (Full Access)</option>
              </select>
              <p className="text-[11px] text-slate-400 mt-1">
                * Selected role receives complete permissions across CRM, hosting, leads, users &amp; settings.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 mt-2 bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-sky-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <span>Registering &amp; Inserting into Database...</span>
              ) : (
                <span>⚡ Register &amp; Create Sub-Admin Account</span>
              )}
            </button>
          </form>
        </div>

        {/* Database Live Records & Info */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quick Info Box */}
          <div className="bg-slate-800/80 backdrop-blur-md rounded-2xl p-6 border border-slate-700/80 shadow-xl">
            <h2 className="text-sm font-bold text-sky-400 uppercase tracking-wider mb-2">
              ⚡ Quick Access Shortcuts
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Registered sub-admins are immediately stored in the database. You can also bypass
              login directly anytime using the Skip Admin button.
            </p>
            <div className="space-y-2">
              <a
                href="/login?admin=1"
                className="block w-full py-2.5 px-4 text-center text-xs font-bold rounded-xl bg-slate-700/80 hover:bg-slate-700 text-white border border-slate-600 transition-all"
              >
                Open Admin Login Portal (/login?admin=1)
              </a>
              <button
                type="button"
                onClick={() => {
                  const u = {
                    id: 1,
                    name: "Super Administrator",
                    email: "admin@letscod.com",
                    role: "admin",
                    role_slug: "admin",
                    roleSlug: "admin",
                    user_type: "admin",
                    permissions: ["*"],
                  };
                  localStorage.setItem("token", "admin-skip-session-token");
                  localStorage.setItem("user", JSON.stringify(u));
                  window.location.href = "/admin/dashboard";
                }}
                className="block w-full py-2.5 px-4 text-center text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/30 transition-all"
              >
                🚀 Direct Skip to Admin Dashboard
              </button>
            </div>
          </div>

          {/* Database Admins List */}
          <div className="bg-slate-800/80 backdrop-blur-md rounded-2xl p-6 border border-slate-700/80 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <span>📁</span> Database Admins ({adminsList.length})
              </h2>
              <button
                type="button"
                onClick={fetchAdmins}
                className="text-[11px] text-sky-400 hover:text-sky-300 font-semibold"
              >
                Refresh
              </button>
            </div>

            <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
              {adminsList.map((adm) => (
                <div
                  key={adm.id}
                  className="p-3 rounded-xl bg-slate-900/60 border border-slate-700/50 flex items-center justify-between"
                >
                  <div>
                    <div className="font-bold text-xs text-white flex items-center gap-1.5">
                      {adm.name}
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30">
                        {adm.role}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400">{adm.email}</div>
                    <div className="mt-1 inline-flex items-center gap-1 font-mono text-[11px] bg-amber-950/80 text-amber-200 border border-amber-500/40 px-2 py-0.5 rounded">
                      <span>🔑 Password:</span>
                      <span className="font-bold text-amber-300 select-all">{adm.password || "admin"}</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-mono bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/50">
                    Active
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-4xl mx-auto w-full pt-6 border-t border-slate-800 text-center text-xs text-slate-500">
        LetsCod Technologies • 100% Cloned Next.js Architecture with Database Authentication
      </div>
    </div>
  );
}
