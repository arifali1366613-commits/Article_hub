'use client';

import React, { useState } from 'react';
import { db } from '@/lib/firebase';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

interface Article {
  title: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}

export default function EditButton({ 
  articleId, 
  article 
}: { 
  articleId: string; 
  article: Article;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(article.content);
  const [title, setTitle] = useState(article.title);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  const handleSave = async () => {
    try {
      setSaving(true);
      const articleRef = doc(db, 'articles', articleId);
      await updateDoc(articleRef, {
        title,
        content,
        updatedAt: serverTimestamp(),
      });
      setIsEditing(false);
      router.refresh();
    } catch (err) {
      console.error('Failed to save article:', err);
      alert('Failed to save article');
    } finally {
      setSaving(false);
    }
  };

  if (!isEditing) {
    return (
      <button
        onClick={() => setIsEditing(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Edit Article
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Edit Article</h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Content
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={12}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
          />
        </div>

        <div className="flex justify-end space-x-2">
          <button
            onClick={() => {
              setIsEditing(false);
              setTitle(article.title);
              setContent(article.content);
            }}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition"
            disabled={saving}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50"
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}
