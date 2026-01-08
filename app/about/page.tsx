import { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: "Tentang Kami | Narasumber Hukum",
  description: "Kenali lebih dekat Narasumber Hukum, tim profesional kami, visi misi, dan nilai-nilai yang kami junjung tinggi dalam memberikan edukasi and solusi hukum.",
};

export default function AboutPage() {
  return <AboutClient />;
}
