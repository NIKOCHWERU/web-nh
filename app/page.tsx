import { Metadata } from 'next';
import HomeClient from './HomeClient';

export const metadata: Metadata = {
  title: "Narasumber Hukum | Kantor Hukum & Solusi Edukatif",
  description: "Kantor Narasumber Hukum adalah sentral edukasi dan solusi hukum terpercaya di Indonesia. Kami menangani kasus perdata, pidana, legalitas bisnis, dan konsultasi hukum profesional.",
};

export default function HomePage() {
  return <HomeClient />;
}
