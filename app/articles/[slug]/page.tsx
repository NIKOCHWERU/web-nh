import { notFound } from 'next/navigation';
import ArticleDetailClient from '@/app/articles/[slug]/ArticleDetailClient';

async function getArticle(slug: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/articles/${slug}`, { 
      cache: 'no-store' 
    });
    
    if (!res.ok) return null;
    
    return res.json();
  } catch (error) {
    return null;
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticle(slug);
  
  if (!article) {
    notFound();
  }

  return <ArticleDetailClient article={article} />;
}
