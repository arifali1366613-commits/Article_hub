'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import LogoutButton from './LogoutButton';

export default function NavBar() {
  const { user } = useAuth();

  return (
    <nav className="bg-white shadow">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          ArticleHub
        </Link>
        {user && (
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">{user.email}</span>
            <Link
              href="/articles/create"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              + Create Article
            </Link>
            <LogoutButton />
          </div>
        )}
      </div>
    </nav>
  );
}
