'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import Link from 'next/link';
import LoginForm from '@/components/LoginForm';
import NavBar from '@/components/NavBar';

interface Article {
  id: string;
  title: string;
  author: string;
  updatedAt: string;
}

export default function Home() {
  const { user, loading } = useAuth();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loadingArticles, setLoadingArticles] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'articles'));
        const articlesData: Article[] = [];
        querySnapshot.forEach((doc) => {
          articlesData.push({
            id: doc.id,
            title: doc.data().title,
            author: doc.data().author,
            updatedAt: doc.data().updatedAt,
          });
        });
        setArticles(articlesData);
      } catch (err) {
        console.error('Failed to fetch articles:', err);
      } finally {
        setLoadingArticles(false);
      }
    };

    if (!loading) {
      fetchArticles();
    }
  }, [loading]);

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
          <LoginForm />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <NavBar />
      
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Articles</h1>

        {loadingArticles ? (
          <p className="text-gray-600">Loading articles...</p>
        ) : articles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-6">No articles yet. Create one to get started!</p>
            <Link href="/articles/create" className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition inline-block">
              + Create Your First Article
            </Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {articles.map((article) => (
              <Link href={`/articles/${article.id}`} key={article.id}>
                <div className="bg-white rounded-lg shadow hover:shadow-md transition p-6 cursor-pointer">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {article.title}
                  </h2>
                  <p className="text-gray-600 mb-2">By {article.author}</p>
                  <p className="text-sm text-gray-500">
                    Updated {new Date(article.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
