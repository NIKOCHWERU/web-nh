import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // WordPress Admin & System Files
      {
        source: '/wp-admin/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/wp-content/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/wp-includes/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/wp-login.php',
        destination: '/',
        permanent: true,
      },

      // WordPress Feed & XML
      {
        source: '/feed/:path*',
        destination: '/sitemap.xml',
        permanent: true,
      },
      {
        source: '/comments/feed/:path*',
        destination: '/',
        permanent: true,
      },

      // WordPress Category/Tag Archives
      {
        source: '/category/:slug',
        destination: '/articles',
        permanent: true,
      },
      {
        source: '/tag/:slug',
        destination: '/articles',
        permanent: true,
      },

      // WordPress Author Pages
      {
        source: '/author/:slug',
        destination: '/about',
        permanent: true,
      },

      // WordPress Date Archives
      {
        source: '/:year(\\d{4})/:month(\\d{2})/:day(\\d{2})/:slug',
        destination: '/articles',
        permanent: true,
      },
      {
        source: '/:year(\\d{4})/:month(\\d{2})/:slug',
        destination: '/articles',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
