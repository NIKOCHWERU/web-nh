import { Metadata } from 'next';
import ArticlesClient from './ArticlesClient';

export const metadata: Metadata = {
  title: "Artikel & Edukasi Hukum | Narasumber Hukum",
  description: "Dapatkan wawasan hukum kontemporer, panduan praktis, and edukasi hukum dari para ahli di Narasumber Hukum.",
};

export default function ArticlesPage() {
  return <ArticlesClient />;
}
