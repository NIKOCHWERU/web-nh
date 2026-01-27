import { Metadata } from 'next';
import HomeClient from './HomeClient';

export const metadata: Metadata = {
  title: "Sentral Edukasi Dan Solusi | Narasumber Hukum",
  description: "Kantor Narasumber Hukum adalah sentral edukasi dan solusi hukum terpercaya di Indonesia. Kami menangani kasus perdata, pidana, legalitas bisnis, dan konsultasi hukum profesional.",
};

export default function HomePage() {
  return <HomeClient />;
}
