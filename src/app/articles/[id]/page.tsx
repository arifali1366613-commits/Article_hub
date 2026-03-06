'use client';

import React, { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import EditButton from '@/components/EditButton';
import { useAuth } from '@/context/AuthContext';

interface Article {
  title: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}

export default function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const { id } = React.use(params);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const docRef = doc(db, 'articles', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setArticle(docSnap.data() as Article);
        } else {
          setError('Article not found');
        }
      } catch (err) {
        setError('Failed to load article');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  const isAuthor = user?.email === article?.author;

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {article?.title}
            </h1>
            <p className="text-gray-600">By {article?.author}</p>
            <p className="text-sm text-gray-500 mt-1">
              Updated {new Date(article?.updatedAt || '').toLocaleDateString()}
            </p>
          </div>
          {isAuthor && <EditButton articleId={id} article={article!} />}
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="text-gray-800 whitespace-pre-wrap">
            {article?.content}
          </div>
        </div>
      </div>
    </main>
  );
}
