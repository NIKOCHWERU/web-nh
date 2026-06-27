import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import ArticleDetailClient from '@/app/artikel/[slug]/ArticleDetailClient';

async function getArticle(slug: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles/${slug}`, { 
      cache: 'no-store' 
    });
    
    if (!res.ok) return null;
    
    return res.json();
  } catch (error) {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  
  if (!article) {
    return {
      title: "Artikel Tidak Ditemukan",
    };
  }

  // Extract first 160 characters from article body to use as meta description
  const cleanDescription = article.content
    ? article.content.replace(/<[^>]*>/g, '').substring(0, 160).trim()
    : "Baca selengkapnya artikel edukasi hukum terbaru dari Kantor Narasumber Hukum.";

  return {
    title: article.title,
    description: cleanDescription,
    alternates: {
      canonical: `/artikel/${slug}`,
    },
    openGraph: {
      title: article.title,
      description: cleanDescription,
      url: `https://www.narasumberhukum.com/artikel/${slug}`,
      type: 'article',
      publishedTime: article.published_at,
      modifiedTime: article.updated_at,
      images: [
        {
          url: article.image_url || (article.image
            ? (article.image.startsWith('http') ? article.image : `https://www.narasumberhukum.com/storage/${article.image}`)
            : 'https://www.narasumberhukum.com/logo.png'),
        }
      ],
    }
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticle(slug);
  
  if (!article) {
    notFound();
  }

  return <ArticleDetailClient article={article} />;
}
