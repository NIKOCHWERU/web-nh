import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://www.narasumberhukum.com';

    // Static routes
    const routes: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
        },
        {
            url: `${baseUrl}/tentang`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/layanan`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/artikel`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/kontak`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
    ];

    try {
        // Fetch articles from API (requesting larger limit for sitemap)
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/articles?per_page=100`, {
            next: { revalidate: 3600 } // Revalidate every hour
        });

        if (!response.ok) throw new Error('Failed to fetch articles');

        const data = await response.json();
        const articles = data.data || [];

        const articleRoutes = articles.map((article: any) => ({
            url: `${baseUrl}/artikel/${article.slug}`,
            lastModified: new Date(article.updated_at || article.published_at),
            changeFrequency: 'weekly' as const,
            priority: 0.7,
        }));

        return [...routes, ...articleRoutes];
    } catch (error) {
        console.error('Sitemap generation error:', error);
        return routes;
    }
}
