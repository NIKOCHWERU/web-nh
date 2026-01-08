import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const articles = [
  {
    id: 1,
    title: "Pentingnya Legalitas Bisnis untuk UMKM",
    excerpt: "Mengapa mendaftarkan usaha Anda bukan hanya sekadar kepatuhan, tetapi investasi untuk pertumbuhan jangka panjang?",
    content: `
      Legalitas usaha adalah fondasi utama bagi setiap pelaku bisnis, termasuk Usaha Mikro, Kecil, dan Menengah (UMKM). Banyak pelaku UMKM yang masih menganggap bahwa mengurus izin usaha adalah proses yang rumit dan mahal. Padahal, di era digital saat ini, pemerintah telah mempermudah proses perizinan melalui sistem Online Single Submission (OSS).

      Beberapa alasan mengapa legalitas sangat penting antara lain:
      1. Perlindungan Hukum: Usaha Anda memiliki payung hukum yang kuat jika terjadi sengketa di kemudian hari.
      2. Akses Permodalan: Lembaga keuangan seperti bank mewajibkan adanya dokumen legalitas bagi pelaku usaha yang ingin mengajukan kredit.
      3. Meningkatkan Kepercayaan Konsumen: Konsumen dan mitra bisnis lebih percaya untuk bekerja sama dengan usaha yang memiliki identitas resmi.
      4. Fasilitas Pemerintah: Banyak program bantuan dan pembinaan dari pemerintah yang dikhususkan bagi UMKM yang sudah berizin.

      Segera urus Nomor Induk Berusaha (NIB) Anda untuk memastikan bisnis Anda tumbuh secara berkelanjutan dan profesional.
    `,
    date: "12 Oct 2025",
    category: "Bisnis",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80",
    subImage: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "Memahami Proses Litigasi di Pengadilan",
    excerpt: "Panduan praktis bagi Anda yang sedang menghadapi sengketa hukum di pengadilan. Ketahui tahapan dan persiapannya.",
    content: `
      Menghadapi sengketa hukum di pengadilan bisa menjadi pengalaman yang menegangkan jika Anda tidak memahami prosedurnya. Litigasi adalah proses penyelesaian sengketa melalui jalur pengadilan, di mana hakim akan memutuskan perkara berdasarkan bukti-bukti yang diajukan.

      Tahapan umum dalam litigasi perdata meliputi:
      1. Pendaftaran Gugatan: Penggugat mengajukan berkas ke pengadilan yang berwenang.
      2. Mediasi: Tahapan wajib di mana kedua belah pihak mencoba berdamai dengan bantuan mediator hakim.
      3. Pembacaan Gugatan & Jawaban: Jika mediasi gagal, persidangan masuk ke pokok perkara.
      4. Pembuktian: Tahap krusial untuk mengajukan bukti surat, saksi, maupun saksi ahli.
      5. Kesimpulan & Putusan: Hakim memberikan penilaian akhir atas perkara tersebut.

      Persiapan yang matang dan dokumentasi yang lengkap adalah kunci utama dalam menghadapi proses litigasi. Konsultasikan dengan tenaga profesional untuk memastikan hak-hak hukum Anda terlindungi dengan maksimal.
    `,
    date: "08 Oct 2025",
    category: "Litigasi",
    image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80",
    subImage: "https://images.unsplash.com/photo-1589216532372-1c2a367900d9?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "Cara Membuat Kontrak Bisnis yang Aman",
    excerpt: "Tips menyusun perjanjian kerjasama yang melindungi hak Anda dan mencegah sengketa di kemudian hari.",
    content: `
      Kontrak atau perjanjian adalah 'undang-undang' bagi pihak-pihak yang membuatnya. Dalam dunia bisnis, kontrak tertulis sangat vital untuk menghindari interpretasi yang berbeda di masa mendatang.

      Kriteria kontrak bisnis yang kuat:
      1. Identitas Lengkap: Pastikan subjek hukum (pihak yang bertanda tangan) memiliki kewenangan yang sah.
      2. Objek Perjanjian: Jelaskan secara mendetail apa yang menjadi hak dan kewajiban masing-masing pihak.
      3. Klausul Wanprestasi: Tentukan apa yang terjadi jika salah satu pihak gagal memenuhi janji, termasuk denda atau sanksi.
      4. Penyelesaian Sengketa: Tentukan tempat penyelesaian masalah, apakah melalui negosiasi, arbitrase, atau pengadilan tertentu.
      5. Force Majeure: Atur kondisi luar biasa (seperti bencana alam) yang dapat menunda pelaksanaan kontrak.

      Jangan pernah menandatangani kontrak yang tidak Anda pahami sepenuhnya. Review hukum oleh profesional dapat menyelamatkan bisnis Anda dari kerugian besar di masa depan.
    `,
    date: "25 Sep 2025",
    category: "Kontrak",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80",
    subImage: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    title: "Perlindungan Konsumen di Era Digital",
    excerpt: "Hak-hak konsumen yang wajib diketahui dalam transaksi online dan langkah hukum jika dirugikan.",
    content: `
      Belanja online memberikan kemudahan, namun juga menyimpan risiko. Sebagai konsumen, Anda dilindungi oleh Undang-Undang Perlindungan Konsumen (UUPK).

      Hak-hak utama konsumen digital:
      - Hak atas informasi yang benar, jelas, dan jujur mengenai kondisi barang/jasa.
      - Hak untuk mendapatkan keamanan dan keselamatan dalam mengonsumsi barang/jasa.
      - Hak untuk didengar pendapat dan keluhannya.
      - Hak untuk mendapatkan kompensasi atau ganti rugi jika barang yang diterima tidak sesuai.

      Jika Anda merasa dirugikan dalam transaksi digital, simpan semua bukti percakapan dan bukti pembayaran. Anda dapat melapor ke Badan Penyelesaian Sengketa Konsumen (BPSK) atau menggunakan fitur aduan yang disediakan oleh platform marketplace.
    `,
    date: "10 Sep 2025",
    category: "Edukasi",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
    subImage: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    title: "Panduan Lengkap Hak Waris",
    excerpt: "Membedah hukum waris di Indonesia: Siapa yang berhak dan bagaimana pembagiannya secara adil.",
    content: `
      Hukum waris di Indonesia memiliki dualisme, yaitu Hukum Waris Islam dan Hukum Waris Perdata (KUHPerdata). Pemilihan hukum yang berlaku tergantung pada keyakinan dan kesepakatan keluarga.

      Poin penting dalam pembagian warisan:
      1. Ahli Waris: Siapa saja yang masuk dalam urutan utama penerima warisan.
      2. Harta Waris: Seluruh harta kekayaan pewaris setelah dikurangi utang-utang yang ada.
      3. Legitieme Portie: Bagian mutlak yang harus diterima oleh ahli waris tertentu menurut KUHPerdata.
      4. Proses Balik Nama: Bagaimana melegalkan perpindahan hak atas tanah atau aset lainnya kepada ahli waris.

      Penyusunan wasiat sejak dini atau konsultasi dengan ahli hukum dapat meminimalisir potensi konflik keluarga di kemudian hari terkait pembagian harta.
    `,
    date: "01 Sep 2025",
    category: "Keluarga",
    image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&w=1200&q=80",
    subImage: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=800&q=80"
  }
];

const Articles = () => {
  const [selectedArticle, setSelectedArticle] = useState(null);

  // If an article is selected, show the simplified but enhanced detail view
  if (selectedArticle) {
    return (
      <div className="pt-32 pb-24 bg-white min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Clear Back Button */}
            <button 
              onClick={() => {
                setSelectedArticle(null);
                window.scrollTo(0, 0);
              }}
              className="group flex items-center gap-3 bg-gray-50 hover:bg-gold text-navy px-6 py-3 rounded-full font-bold uppercase tracking-widest text-xs transition-all duration-300 shadow-md mb-12 border border-gray-100"
            >
              <ArrowRight size={16} className="rotate-180 transform group-hover:-translate-x-1 transition-transform" />
              Kembali ke Daftar Artikel
            </button>

            {/* Title & Metadata */}
            <div className="mb-12">
              <div className="bg-gold/10 text-gold px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest inline-block mb-6">
                {selectedArticle.category}
              </div>
              <h1 className="text-3xl md:text-6xl font-bold text-navy mb-6 leading-tight font-serif">
                {selectedArticle.title}
              </h1>
              <div className="flex items-center gap-4 text-gray-400 text-sm font-medium">
                <span>{selectedArticle.date}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                <span>By Admin Narasumber Hukum</span>
              </div>
            </div>

            {/* Main Content Image */}
            <div className="mb-16 rounded-[2.5rem] overflow-hidden shadow-2xl relative">
              <img 
                src={selectedArticle.image} 
                alt={selectedArticle.title} 
                className="w-full h-auto object-cover max-h-[600px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>

            {/* Content Section */}
            <div className="max-w-3xl mx-auto">
              <div className="text-gray-700 text-lg md:text-xl leading-relaxed text-justify font-light">
                {selectedArticle.content.split('\n').filter(p => p.trim()).map((paragraph, i) => (
                  <React.Fragment key={i}>
                    <p className="mb-8">{paragraph.trim()}</p>
                    {/* Intersperse a sub-image after the 2nd paragraph */}
                    {i === 1 && selectedArticle.subImage && (
                      <div className="my-12 rounded-3xl overflow-hidden shadow-xl">
                        <img 
                          src={selectedArticle.subImage} 
                          alt="Detail Visual" 
                          className="w-full h-auto object-cover max-h-[400px]"
                        />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Simple CTA */}
              <div className="mt-20 pt-12 border-t border-gray-100 flex flex-col items-center text-center">
                <p className="text-gray-500 mb-6 italic">Apakah Anda membutuhkan bantuan hukum terkait masalah ini?</p>
                <Link 
                  to="/#contact" 
                  className="bg-navy text-white px-10 py-5 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-gold hover:text-navy transition-all duration-300 shadow-xl shadow-navy/10 flex items-center gap-3"
                >
                  Konsultasi Sekarang
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Otherwise, show the list view
  return (
    <div className="pt-20">
       {/* Header */}
       <section className="bg-navy text-white py-24 relative overflow-hidden text-center">
         <div className="absolute top-0 left-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl"></div>
         <div className="container mx-auto px-4 relative z-10">
           <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
             <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-[0.2em] mb-6 px-4">Artikel & Edukasi</h1>
             <div className="w-24 h-1.5 bg-gold mx-auto mb-8"></div>
             <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed px-4">
               Wawasan hukum kontemporer untuk mendampingi setiap keputusan strategis Anda.
             </p>
           </motion.div>
         </div>
       </section>

       <section className="py-24 bg-white container mx-auto px-4">
         <motion.div 
           className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12"
           initial="hidden"
           animate="visible"
           variants={staggerContainer}
         >
           {articles.map((article) => (
             <motion.article 
               key={article.id} 
               variants={fadeInUp} 
               className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 group flex flex-col h-full border border-gray-100 cursor-pointer"
               onClick={() => {
                 setSelectedArticle(article);
                 window.scrollTo(0, 0);
               }}
             >
               <div className="relative overflow-hidden aspect-video">
                 <img 
                   src={article.image} 
                   alt={article.title} 
                   className="w-full h-full object-cover transform group-hover:scale-105 transition duration-700"
                 />
                 <div className="absolute top-6 left-6 bg-gold text-navy text-[10px] font-bold px-4 py-1.5 uppercase tracking-widest rounded-full shadow-lg">
                   {article.category}
                 </div>
               </div>
               <div className="p-8 md:p-10 flex flex-col flex-grow">
                 <div className="mb-4 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                   {article.date} | By Admin
                 </div>
                 <h3 className="font-bold text-xl md:text-2xl mb-4 text-navy group-hover:text-gold transition leading-tight font-serif min-h-[3.5rem]">
                   {article.title}
                 </h3>
                 <p className="text-gray-500 text-sm mb-8 flex-grow leading-relaxed">
                   {article.excerpt}
                 </p>
                 <div className="flex items-center text-gold font-bold text-xs uppercase tracking-[0.2em] mt-auto">
                   Baca Selengkapnya <ArrowRight size={16} className="ml-3 group-hover:translate-x-2 transition-transform" />
                 </div>
               </div>
             </motion.article>
           ))}
         </motion.div>
       </section>
    </div>
  );
};

export default Articles;
