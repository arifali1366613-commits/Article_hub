'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import NavBar from '@/components/NavBar';
import LoginForm from '@/components/LoginForm';
import CreateArticleForm from '@/components/CreateArticleForm';

export default function CreateArticlePage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-gray-50">
        <NavBar />
        <div className="max-w-md mx-auto pt-20 px-4">
          <div className="mb-4 p-4 bg-blue-50 border border-blue-200 text-blue-700 rounded">
            You must be logged in to create an article.
          </div>
          <LoginForm />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <CreateArticleForm />
      </div>
    </main>
  );
}
