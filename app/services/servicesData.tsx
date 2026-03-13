import { Scale, FileText, ShieldCheck } from 'lucide-react';
import React from 'react';

export const servicesData = [
    {
        slug: 'hukum',
        path: '/services/hukum',
        titleKey: 'services.legal.title',
        shortDescKey: 'services.legal.desc',
        icon: <Scale size={40} className="text-gold" />,
        image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80",
        content: {
            id: `
                <h2>Layanan Hukum Komprehensif</h2>
                <p>Pada intinya meliputi seluruh Perkara/Upaya Hukum di Indonesia, baik secara Litigasi (Penyelesaian dilakukan di Pengadilan) maupun Non Litigasi (Penyelesaian dilakukan di Luar Pengadilan).</p>
                <h3 class="font-bold text-navy text-lg mt-6 mb-4">Cakupan Penanganan Perkara:</h3>
                <div class="grid md:grid-cols-2 gap-x-8 gap-y-2">
                    <ul class="space-y-2 list-disc list-inside text-gray-600">
                        <li>Perkara Kewarganegaraan</li>
                        <li>Perkara Perkawinan</li>
                        <li>Perkara Adopsi atau Hak Asuh Anak</li>
                        <li>Perkara Kepemilikan Barang atau Aset</li>
                        <li>Perkara Hak Usaha</li>
                        <li>Perkara Perikatan-perikatan</li>
                        <li>Perkara Perkumpulan atau Persekutuan</li>
                        <li>Perkara Jual-Beli, Tukar-Menukar, Sewa-Menyewa</li>
                        <li>Perkara Pinjam-Meminjam & Hutang Piutang</li>
                        <li>Perkara Waris atau Hibah</li>
                        <li>Perkara Hak Paten atau HAKI</li>
                        <li>Perkara Pencemaran Nama Baik</li>
                        <li>Perkara Perubahan Nama atau Identitas</li>
                        <li>Perkara Wanprestasi</li>
                        <li>Perkara Perbuatan Melawan Hukum (PMH)</li>
                        <li>Perkara Pemisahan Harta</li>
                        <li>Perkara Perjanjian Bisnis</li>
                        <li>Perkara Pelanggaran Jabatan</li>
                    </ul>
                    <ul class="space-y-2 list-disc list-inside text-gray-600">
                        <li>Perkara Pencurian atau Perampokan</li>
                        <li>Perkara Pembunuhan</li>
                        <li>Perkara Penipuan & Penggelapan</li>
                        <li>Perkara Pemerasan & Pengancaman</li>
                        <li>Perkara Penganiayaan</li>
                        <li>Perkara Pemerkosaan & Asusila</li>
                        <li>Perkara Korupsi (Tipikor)</li>
                        <li>Perkara Pengemplangan Pajak</li>
                        <li>Perkara Pemalsuan Dokumen</li>
                        <li>Perkara Perzinahan</li>
                        <li>Perkara KDRT</li>
                        <li>Perkara Narkotika</li>
                        <li>Perkara Pelanggaran Ketertiban Umum</li>
                        <li>Perkara Perbuatan Curang</li>
                        <li>Dan Perkara Pidana Lainnya</li>
                    </ul>
                </div>
            `,
            en: `
                <h2>Comprehensive Legal Services</h2>
                <p>Essentially covering all Cases/Legal Efforts in Indonesia, both Litigation (Settlement in Court) and Non-Litigation (Settlement Outside Court).</p>
                <h3 class="font-bold text-navy text-lg mt-6 mb-4">Scope of Case Handling:</h3>
                <div class="grid md:grid-cols-2 gap-x-8 gap-y-2">
                    <ul class="space-y-2 list-disc list-inside text-gray-600">
                        <li>Citizenship Cases</li>
                        <li>Marriage Cases</li>
                        <li>Adoption or Child Custody Cases</li>
                        <li>Goods/Asset Ownership Cases</li>
                        <li>Business Rights Cases</li>
                        <li>Commitment Cases</li>
                        <li>Association or Partnership Cases</li>
                        <li>Buy & Sell, Exchange, Rent & Lease Cases</li>
                        <li>Borrowing and Debt Cases</li>
                        <li>Inheritance or Grant Cases</li>
                        <li>Patent or Intellectual Property Cases</li>
                        <li>Defamation Cases</li>
                        <li>Name or Identity Change Cases</li>
                        <li>Default (Wanprestasi) Cases</li>
                        <li>Unlawful Act (PMH) Cases</li>
                        <li>Property Separation Cases</li>
                        <li>Business Agreement Cases</li>
                        <li>Position Violation Cases</li>
                    </ul>
                    <ul class="space-y-2 list-disc list-inside text-gray-600">
                        <li>Theft or Robbery Cases</li>
                        <li>Murder Cases</li>
                        <li>Fraud & Embezzlement Cases</li>
                        <li>Extortion & Threat Cases</li>
                        <li>Assault Cases</li>
                        <li>Rape & Indecency Cases</li>
                        <li>Corruption (Tipikor) Cases</li>
                        <li>Tax Evasion Cases</li>
                        <li>Document Forgery Cases</li>
                        <li>Adultery Cases</li>
                        <li>Domestic Violence (KDRT) Cases</li>
                        <li>Narcotics Cases</li>
                        <li>Public Order Violation Cases</li>
                        <li>Fraudulent Act Cases</li>
                        <li>And Other Criminal Cases</li>
                    </ul>
                </div>
            `
        }
    },
    {
        slug: 'perizinan',
        path: '/services/perizinan',
        titleKey: 'services.licensing.title',
        shortDescKey: 'services.licensing.desc',
        icon: <FileText size={40} className="text-gold" />,
        image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80",
        content: {
            id: `
                <h2>Solusi Legalitas & Perizinan Terpadu</h2>
                <p>Kami menawarkan solusi dan saran praktis mengenai semua aspek dalam menjalankan bisnis dan segala upaya kaitan dengan perlindungan asset berharga yang ada di Indonesia beserta nasihat untuk keberlangsungan berbagai perizinan dan legalitas.</p>
                <p>Kami berpengalaman melakukan pengurusan serta pendampingan mulai dari investasi awal hingga keberhasilan pendirian dan pengoperasian. Layanan kami mencakup seluruh pekerjaan yang berkaitan dengan 18 Kementrian di Indonesia.</p>

                <div class="space-y-6 mt-8 text-sm">
                    <details class="bg-gray-50 p-4 rounded-lg border border-gray-200" open>
                        <summary class="font-bold text-navy text-base cursor-pointer hover:text-gold transition">1. Legalitas & Izin Usaha Umum</summary>
                        <ul class="mt-3 space-y-1 list-disc list-inside text-gray-600 ml-2">
                            <li>Pendirian, Pembaharuan, Pembubaran Badan Usaha</li>
                            <li>Izin-Izin Usaha OSS dan Hak Kekayaan Intelektual</li>
                            <li>Sertifikat Halal, PIRT, SNI, BPOM</li>
                            <li>Izin Lingkungan dan Mendirikan Bangunan (IMB/PBG)</li>
                        </ul>
                    </details>
                    <details class="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <summary class="font-bold text-navy text-base cursor-pointer hover:text-gold transition">2. Perpajakan Lengkap</summary>
                        <ul class="mt-3 space-y-1 list-disc list-inside text-gray-600 ml-2">
                            <li>SPT Tahunan & Masa (Pribadi/Badan)</li>
                            <li>Pengurusan NPWP, EFIN, PKP</li>
                            <li>Restitusi, Keberatan, dan Surat Keterangan Fiskal</li>
                        </ul>
                    </details>
                    <details class="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <summary class="font-bold text-navy text-base cursor-pointer hover:text-gold transition">3. Kesehatan & Medis, Keimigrasian & Pertanahan</summary>
                        <ul class="mt-3 space-y-1 list-disc list-inside text-gray-600 ml-2">
                            <li>Izin Operasional RS, Klinik, Apotek & Tenaga Medis</li>
                            <li>Paspor, KITAS, KITAP, & Alih Status Izin Tinggal</li>
                            <li>Konversi, Peralihan, Hak Tanggungan & Perpanjangan Hak Tanah</li>
                        </ul>
                    </details>
                     <details class="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <summary class="font-bold text-navy text-base cursor-pointer hover:text-gold transition">4. Sektor Strategis Lainnya</summary>
                        <ul class="mt-3 space-y-1 list-disc list-inside text-gray-600 ml-2">
                            <li>Energi, Migas & Pertambangan</li>
                            <li>Transportasi, Reklame & Lingkungan (AMDAL)</li>
                            <li>Industri, Perdagangan & Rekomendasi Ekspor/Impor</li>
                        </ul>
                    </details>
                </div>
            `,
            en: `
                <h2>Integrated Legality & Permitting Solutions</h2>
                <p>We offer practical solutions and advice on all aspects of running a business and maintaining the protection of valuable assets in Indonesia, along with counsel for the continuity of various permits and legality.</p>
                <p>We have experience in managing and accompanying from initial investment to successful establishment and operation. Our services cover all work related to 18 Ministries in Indonesia.</p>

                <div class="space-y-6 mt-8 text-sm">
                    <details class="bg-gray-50 p-4 rounded-lg border border-gray-200" open>
                        <summary class="font-bold text-navy text-base cursor-pointer hover:text-gold transition">1. Legality & General Business Permits</summary>
                        <ul class="mt-3 space-y-1 list-disc list-inside text-gray-600 ml-2">
                            <li>Establishment, Renewal, and Dissolution of Business Entities</li>
                            <li>OSS Business Permits and Intellectual Property Rights</li>
                            <li>Halal Certification, PIRT, SNI, BPOM</li>
                            <li>Environmental Permits and Building Permits (IMB/PBG)</li>
                        </ul>
                    </details>
                    <details class="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <summary class="font-bold text-navy text-base cursor-pointer hover:text-gold transition">2. Comprehensive Taxation</summary>
                        <ul class="mt-3 space-y-1 list-disc list-inside text-gray-600 ml-2">
                            <li>Annual & Periodic Tax Returns (Individual/Corporate)</li>
                            <li>Processing of NPWP, EFIN, PKP</li>
                            <li>Restitution, Objections, and Fiscal Certificates</li>
                        </ul>
                    </details>
                    <details class="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <summary class="font-bold text-navy text-base cursor-pointer hover:text-gold transition">3. Health & Medical, Immigration & Land Affairs</summary>
                        <ul class="mt-3 space-y-1 list-disc list-inside text-gray-600 ml-2">
                            <li>Operational Permits for Hospitals, Clinics, Pharmacies & Medical Personnel</li>
                            <li>Passports, KITAS, KITAP, & Stay Permit Status Switching</li>
                            <li>Conversion, Transfer, Mortgage Rights & Extension of Land Rights</li>
                        </ul>
                    </details>
                     <details class="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <summary class="font-bold text-navy text-base cursor-pointer hover:text-gold transition">4. Other Strategic Sectors</summary>
                        <ul class="mt-3 space-y-1 list-disc list-inside text-gray-600 ml-2">
                            <li>Energy, Oil/Gas & Mining Processing</li>
                            <li>Transportation, Advertising & Environment (AMDAL)</li>
                            <li>Industry, Trade & Export/Import Recommendations</li>
                        </ul>
                    </details>
                </div>
            `
        }
    },
    {
        slug: 'pelatihan-sdm',
        path: '/services/pelatihan-sdm',
        titleKey: 'services.hr.title',
        shortDescKey: 'services.hr.desc',
        icon: <ShieldCheck size={40} className="text-gold" />,
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
        content: {
            id: `
                <h2>Pengembangan Potensi Human Capital</h2>
                <p>Kami berdedikasi untuk menciptakan, merencanakan, mendesain dan membawakan sebuah langkah perubahan yang berdampak bagi setiap individu maupun Perusahaan dengan disertai metode-metode terbaru yang lebih relevan.</p>
                
                <div class="space-y-6 mt-8">
                    <div class="bg-gradient-to-r from-navy/5 to-gold/5 p-6 rounded-xl border-l-4 border-gold">
                        <h3 class="font-bold text-navy text-lg mb-3 flex items-center gap-2">IN HOUSE & PUBLIC TRAINING</h3>
                        <p class="text-gray-600 leading-relaxed">Menggunakan model pembelajaran terintegrasi (pra-pelatihan, kelas, dan pasca-pelatihan) dan dikemas dalam bentuk <em>learning journey with high business value</em>.</p>
                    </div>
                    <div class="bg-gradient-to-r from-navy/5 to-gold/5 p-6 rounded-xl border-l-4 border-gold">
                        <h3 class="font-bold text-navy text-lg mb-3 flex items-center gap-2">OUTBOUND PROGRAM FOR TEAMBUILDING</h3>
                        <p class="text-gray-600 leading-relaxed">Melibatkan komponen permainan <em>goal-setting</em>, <em>interpersonal relations</em>, <em>problem-solving</em>, dan <em>role clarification</em>.</p>
                    </div>
                    <div class="bg-gradient-to-r from-navy/5 to-gold/5 p-6 rounded-xl border-l-4 border-gold">
                        <h3 class="font-bold text-navy text-lg mb-3 flex items-center gap-2">PEOPLE ENABLER CONSULTANCY & CAREER COACHING</h3>
                        <p class="text-gray-600 leading-relaxed">Mulai dari rekrutment, perencanaan karir, pembaharuan kebijakan, hingga coaching lintas generasi (Milennial & Gen Z) agar lebih empowered di tempat kerjanya.</p>
                    </div>
                </div>
            `,
            en: `
                <h2>Human Capital Potential Development</h2>
                <p>We are dedicated to creating, planning, designing, and delivering impactful steps for change for every individual and Company, accompanied by the latest, more relevant methods.</p>
                
                <div class="space-y-6 mt-8">
                    <div class="bg-gradient-to-r from-navy/5 to-gold/5 p-6 rounded-xl border-l-4 border-gold">
                        <h3 class="font-bold text-navy text-lg mb-3 flex items-center gap-2">IN HOUSE & PUBLIC TRAINING</h3>
                        <p class="text-gray-600 leading-relaxed">Using an integrated learning model (pre-training, class, and post-training) and packaged as a <em>learning journey with high business value</em>.</p>
                    </div>
                    <div class="bg-gradient-to-r from-navy/5 to-gold/5 p-6 rounded-xl border-l-4 border-gold">
                        <h3 class="font-bold text-navy text-lg mb-3 flex items-center gap-2">OUTBOUND PROGRAM FOR TEAMBUILDING</h3>
                        <p class="text-gray-600 leading-relaxed">Involving game components such as <em>goal-setting</em>, <em>interpersonal relations</em>, <em>problem-solving</em>, and <em>role clarification</em>.</p>
                    </div>
                    <div class="bg-gradient-to-r from-navy/5 to-gold/5 p-6 rounded-xl border-l-4 border-gold">
                        <h3 class="font-bold text-navy text-lg mb-3 flex items-center gap-2">PEOPLE ENABLER CONSULTANCY & CAREER COACHING</h3>
                        <p class="text-gray-600 leading-relaxed">From recruitment, career planning, policy updates, to cross-generational coaching (Millennials & Gen Z) to make them more empowered at their workplace.</p>
                    </div>
                </div>
            `
        }
    }
];
