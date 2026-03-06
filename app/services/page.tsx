import { Metadata } from 'next';
import ServicesClient from './ServicesClient';

export const metadata: Metadata = {
  title: "Layanan Hukum Terpercaya | Narasumber Hukum",
  description: "Jelajahi berbagai layanan hukum kami mulai dari litigasi, legalitas bisnis, konsultasi edukatif, hingga hukum keluarga and pertanahan.",
};

export default function ServicesPage() {
  return <ServicesClient />;
}
