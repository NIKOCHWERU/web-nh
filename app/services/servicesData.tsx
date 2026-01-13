import { Scale, FileText, ShieldCheck } from 'lucide-react';
import React from 'react';

export const servicesData = [
    {
        slug: 'bidang-hukum',
        title: "Bidang Hukum",
        icon: <Scale size={40} className="text-gold" />,
        image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80",
        shortDesc: "Kami siap mendampingi, memberikan pertimbangan, serta melakukan segala bentuk upaya hukum di Indonesia, baik pembelaan di dalam maupun di luar Pengadilan (Litigasi & Non-Litigasi).",
        content: `
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
        `
    },
    {
        slug: 'bidang-perizinan-perpajakan-keimigrasian-legalitas',
        title: "Bidang Perizinan, Perpajakan, Keimigrasian dan Legalitas",
        icon: <FileText size={40} className="text-gold" />,
        image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80",
        shortDesc: "Solusi praktis perlindungan aset dan legalitas bisnis. Kami mendampingi dari investasi awal hingga operasional, mencakup pengurusan izin di 18 Kementerian sesuai regulasi terbaru.",
        content: `
            <h2>Solusi Legalitas & Perizinan Terpadu</h2>
            <p>Kami menawarkan solusi dan saran praktis mengenai semua aspek dalam menjalankan bisnis dan segala upaya kaitan dengan perlindungan asset berharga yang ada di Indonesia beserta nasihat untuk keberlangsungan berbagai perizinan dan legalitas.</p>
            <p>Kami berpengalaman melakukan pengurusan serta pendampingan mulai dari investasi awal hingga keberhasilan pendirian dan pengoperasian. Layanan kami mencakup seluruh pekerjaan yang berkaitan dengan 18 Kementrian di Indonesia.</p>

            <div class="space-y-6 mt-8 text-sm">
                <details class="bg-gray-50 p-4 rounded-lg border border-gray-200" open>
                    <summary class="font-bold text-navy text-base cursor-pointer hover:text-gold transition">1. Legalitas & Izin Usaha Umum</summary>
                    <ul class="mt-3 space-y-1 list-disc list-inside text-gray-600 ml-2">
                        <li>Pendirian, Pembaharuan, Pembubaran Badan Usaha</li>
                        <li>Izin Prinsip</li>
                        <li>Izin-Izin Usaha OSS</li>
                        <li>Hak Kekayaan Intelektual (Merek, Paten, Design Industri)</li>
                        <li>Sertifikat Halal, PIRT, SNI, BPOM</li>
                        <li>Izin Lingkungan</li>
                        <li>Izin Mendirikan Menara Telekomunikasi</li>
                        <li>Izin Mendirikan Bangunan (IMB) / Persetujuan Bangunan Gedung (PBG)</li>
                        <li>Izin Perdagangan Umum</li>
                        <li>Izin Usaha Perdagangan (Toko Swalayan, Pusat Perbelanjaan)</li>
                        <li>Tanda Daftar Gudang</li>
                        <li>Surat Tanda Pendaftaran Waralaba</li>
                        <li>Izin Usaha Industri & Jasa Konstruksi</li>
                        <li>Izin Koperasi Simpan Pinjam (Pusat, Cabang, Kas)</li>
                        <li>Izin Usaha Toko Modern</li>
                        <li>Tanda Daftar Usaha Pariwisata</li>
                    </ul>
                </details>

                <details class="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <summary class="font-bold text-navy text-base cursor-pointer hover:text-gold transition">2. Perpajakan Lengkap</summary>
                    <div class="mt-3 space-y-1 text-gray-600 ml-2">
                        <p class="font-semibold text-navy text-sm mb-2">SPT & Pajak Penghasilan:</p>
                        <ul class="space-y-1 list-disc list-inside">
                            <li>SPT Tahunan & Masa (Pribadi/Badan)</li>
                            <li>PPh 21, 22, 23, 25, 29, Final, Pemotongan & Pemungutan</li>
                            <li>PPN & PPnBM</li>
                            <li>Pajak Daerah (Hotel, Restoran, Reklame, Hiburan)</li>
                            <li>PBB & BPHTB</li>
                        </ul>
                        <p class="font-semibold text-navy text-sm mt-3 mb-2">Administrasi Perpajakan:</p>
                        <ul class="space-y-1 list-disc list-inside">
                            <li>Pengurusan NPWP, EFIN, PKP, Sertifikat Elektronik</li>
                            <li>Aktivasi & Cetak Ulang Kode Aktivasi</li>
                            <li>Perubahan Data WP, Pemindahan WP, Penghapusan NPWP</li>
                            <li>Surat Kuasa Khusus</li>
                        </ul>
                        <p class="font-semibold text-navy text-sm mt-3 mb-2">Restitusi & Keberatan:</p>
                        <ul class="space-y-1 list-disc list-inside">
                            <li>Restitusi (Pasal 17c, 17d, VAT Refund)</li>
                            <li>Keberatan, Banding, Pembetulan</li>
                            <li>Pengurangan/Pembatalan Sanksi Administrasi</li>
                            <li>Pengangsuran & Penundaan Pembayaran</li>
                        </ul>
                        <p class="font-semibold text-navy text-sm mt-3 mb-2">Surat Keterangan & SKB:</p>
                        <ul class="space-y-1 list-disc list-inside">
                            <li>SKB PPh (Pasal 21, 22, 23)</li>
                            <li>SKB PPN & PPnBM</li>
                            <li>Surat Keterangan Fiskal</li>
                            <li>Advance Pricing Agreement (Transfer Pricing)</li>
                        </ul>
                        <p class="font-semibold text-navy text-sm mt-3 mb-2">Bea Meterai & Lainnya:</p>
                        <ul class="space-y-1 list-disc list-inside">
                            <li>Izin Pembubuhan Tanda Bea Meterai (Digital, Komputerisasi, Percetakan)</li>
                            <li>Permintaan Nomor Seri Faktur Pajak</li>
                            <li>Layanan Khusus (Difabel, Lansia, UMKM)</li>
                        </ul>
                    </div>
                </details>

                <details class="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <summary class="font-bold text-navy text-base cursor-pointer hover:text-gold transition">3. Kesehatan & Medis</summary>
                    <div class="mt-3 space-y-1 text-gray-600 ml-2">
                        <p class="font-semibold text-navy text-sm mb-2">Fasilitas Kesehatan:</p>
                        <ul class="space-y-1 list-disc list-inside">
                            <li>Izin Mendirikan & Operasional RS (Umum/Khusus Kelas C & D)</li>
                            <li>Izin Klinik (Pratama, Utama, Radiologi, Dialisis)</li>
                            <li>Izin Laboratorium Klinik Pratama</li>
                            <li>Izin Pusat Kesehatan Masyarakat (Puskesmas)</li>
                            <li>Izin Apotek & Toko Obat/Alat Kesehatan</li>
                            <li>Izin Optikal</li>
                        </ul>
                        <p class="font-semibold text-navy text-sm mt-3 mb-2">Tenaga Medis:</p>
                        <ul class="space-y-1 list-disc list-inside">
                            <li>Izin Praktik Dokter (Umum, Spesialis, Gigi, Internship)</li>
                            <li>Izin Praktik Bidan & Perawat</li>
                            <li>Izin Apoteker & Tenaga Teknis Kefarmasian</li>
                            <li>Izin Radiographer, Penata Anestesi, Elektromedis</li>
                            <li>Izin Ahli Teknologi Lab Medik</li>
                            <li>Izin Fisioterapis, Okupasi Terapis, Tenaga Gizi</li>
                            <li>Izin Refraksionis Optisien, Optometris</li>
                            <li>Izin Perekam Medis, Teknisi Gigi, Tukang Gigi</li>
                            <li>Izin Terapis Gigi & Mulut, Terapis Wicara</li>
                            <li>Izin Ortotis Prostestis, Teknisi Kardiovaskuler</li>
                            <li>Izin Psikologi Klinis, Sanitarian</li>
                            <li>Izin Praktik Dokter Hewan</li>
                        </ul>
                        <p class="font-semibold text-navy text-sm mt-3 mb-2">Sertifikasi & Lainnya:</p>
                        <ul class="space-y-1 list-disc list-inside">
                            <li>Sertifikat Produksi PIRT, PKRT, Obat Tradisional</li>
                            <li>Surat Terdaftar Penyehat Tradisional</li>
                            <li>Izin Salon Kecantikan, Panti Sehat</li>
                            <li>Sertifikat Laik Higiene (Depot Air, Jasaboga, Restoran, Hotel, Kolam Renang)</li>
                        </ul>
                    </div>
                </details>

                <details class="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <summary class="font-bold text-navy text-base cursor-pointer hover:text-gold transition">4. Keimigrasian</summary>
                    <ul class="mt-3 space-y-1 list-disc list-inside text-gray-600 ml-2">
                        <li>Paspor Baru/Penggantian (WNI)</li>
                        <li>Penggantian Paspor (Hilang/Rusak)</li>
                        <li>Perubahan Data & Status Sipil</li>
                        <li>Pemberian & Perpanjangan Izin Tinggal Kunjungan (ITK)</li>
                        <li>Pemberian & Perpanjangan Izin Tinggal Terbatas (KITAS)</li>
                        <li>Pemberian & Perpanjangan Izin Tinggal Tetap (KITAP)</li>
                        <li>Alih Status Izin Tinggal</li>
                        <li>Alih Penjamin & Alih/Rangkap Jabatan</li>
                        <li>Pendaftaran Anak Berkewarganegaraan Ganda & Affidavit</li>
                        <li>Naturalisasi (WNI/WNA)</li>
                        <li>Surat Keterangan Keimigrasian</li>
                        <li>Re-Entry Tidak Kembali (RTK)</li>
                        <li>Mutasi Paspor/Alamat WNA</li>
                        <li>Pelayanan Khusus (Lansia, Balita, Difabel)</li>
                        <li>Pelayanan Pengantaran Paspor</li>
                    </ul>
                </details>

                <details class="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <summary class="font-bold text-navy text-base cursor-pointer hover:text-gold transition">5. Pertanahan</summary>
                    <div class="mt-3 space-y-1 text-gray-600 ml-2">
                        <p class="font-semibold text-navy text-sm mb-2">Pemberian & Konversi Hak:</p>
                        <ul class="space-y-1 list-disc list-inside">
                            <li>Konversi, Pengakuan & Penegasan Hak Tanah</li>
                            <li>Pemberian Hak Milik, HGB, Hak Pakai, HGU</li>
                            <li>Pemberian Hak Pengelolaan (Instansi/BUMN/BUMD)</li>
                            <li>Wakaf (Belum/Sudah Bersertifikat)</li>
                        </ul>
                        <p class="font-semibold text-navy text-sm mt-3 mb-2">Peralihan & Perpanjangan:</p>
                        <ul class="space-y-1 list-disc list-inside">
                            <li>Peralihan Hak (Jual-Beli, Waris, Tukar-Menukar, Hibah, Lelang, Merger)</li>
                            <li>Ganti Nama Sertipikat</li>
                            <li>Perpanjangan & Pembaruan HGU, HGB, Hak Pakai</li>
                            <li>Perubahan Hak Atas Tanah</li>
                            <li>Pemecahan/Penggabungan/Pemisahan Hak</li>
                        </ul>
                        <p class="font-semibold text-navy text-sm mt-3 mb-2">Hak Tanggungan & Layanan Lain:</p>
                        <ul class="space-y-1 list-disc list-inside">
                            <li>Pendaftaran & Penghapusan Hak Tanggungan (Roya)</li>
                            <li>Peralihan Hak Tanggungan (Cessie), Subrogasi</li>
                            <li>Pencatatan (Blokir, Sita, Pengangkatan Sita)</li>
                            <li>Sertipikat Pengganti (Hilang/Rusak/Blanko Lama)</li>
                            <li>Informasi Pertanahan & Pengecekan Sertipikat</li>
                            <li>Pengukuran Bidang Tanah</li>
                            <li>Konsolidasi Tanah Swadaya</li>
                            <li>Pertimbangan Teknis Pertanahan</li>
                        </ul>
                    </div>
                </details>

                <details class="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <summary class="font-bold text-navy text-base cursor-pointer hover:text-gold transition">6. Energi & Migas</summary>
                    <ul class="mt-3 space-y-1 list-disc list-inside text-gray-600 ml-2">
                        <li>Izin Survei & Pemanfaatan Data Migas</li>
                        <li>Izin Usaha Penyimpanan, Pengangkutan, Pengolahan, Niaga Migas</li>
                        <li>Izin Gudang Bahan Peledak & Persetujuan Juru Tembak</li>
                        <li>Pengesahan Kualifikasi Ahli Las</li>
                        <li>Izin Panas Bumi & Registrasi Usaha Penunjang</li>
                        <li>Persetujuan Studi Kelayakan PLTP</li>
                        <li>Izin Usaha Bahan Bakar Nabati</li>
                        <li>Izin Usaha Penyediaan Tenaga Listrik (IUPTL, IUTPLU)</li>
                        <li>Izin Penjualan/Pembelian Tenaga Listrik Lintas Negara</li>
                        <li>Izin Interkoneksi Tenaga Listrik</li>
                        <li>Izin Usaha Jasa Penunjang Tenaga Listrik</li>
                        <li>IPJ Telematika</li>
                    </ul>
                </details>

                <details class="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <summary class="font-bold text-navy text-base cursor-pointer hover:text-gold transition">7. Pertambangan</summary>
                    <ul class="mt-3 space-y-1 list-disc list-inside text-gray-600 ml-2">
                        <li>Izin Usaha Pertambangan (IUP, IUPK)</li>
                        <li>Surat Izin Pertambangan Batuan</li>
                        <li>Izin Pertambangan Rakyat</li>
                        <li>Izin Usaha Jasa Pertambangan</li>
                        <li>Izin Pengangkutan & Penjualan</li>
                        <li>Pengesahan Kepala Teknik Tambang</li>
                        <li>Kartu Izin Meledakkan (KIM)</li>
                        <li>Kartu Pekerja Peledakan (KPP)</li>
                        <li>Surat Rekomendasi Persetujuan Ekspor</li>
                    </ul>
                </details>

                <details class="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <summary class="font-bold text-navy text-base cursor-pointer hover:text-gold transition">8. Transportasi & Reklame</summary>
                    <ul class="mt-3 space-y-1 list-disc list-inside text-gray-600 ml-2">
                        <li>Izin Penyelenggaraan Angkutan (Dalam/Tidak Dalam Trayek)</li>
                        <li>Kartu Pengawasan Angkutan</li>
                        <li>Izin Pengelolaan Tempat Parkir</li>
                        <li>Izin Operasional Bengkel (Tertunjuk/Umum)</li>
                        <li>Izin Penyelenggaraan Reklame (Insidentil, Permanen, Kendaraan)</li>
                        <li>Izin Usaha Jasa Perawatan & Perbaikan Kapal</li>
                        <li>Izin Penyelenggaraan Sarana/Prasarana Perkeretaapian</li>
                    </ul>
                </details>

                <details class="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <summary class="font-bold text-navy text-base cursor-pointer hover:text-gold transition">9. Lingkungan & AMDAL</summary>
                    <ul class="mt-3 space-y-1 list-disc list-inside text-gray-600 ml-2">
                        <li>Penyusunan & Pengesahan UKL-UPL</li>
                        <li>Penyusunan & Pengesahan KA-ANDAL & RKL-RPL</li>
                        <li>Persetujuan Lingkungan Hidup</li>
                        <li>Andalalin (Analisis Dampak Lalu Lintas)</li>
                        <li>Pertek Limbah B3 (IPL-B3)</li>
                        <li>Pertek Emisi & Air Limbah (IPAL/IPLC)</li>
                        <li>Izin Pembuangan Air Limbah</li>
                        <li>Izin Pengendalian Vektor & Binatang Pembawa Penyakit</li>
                        <li>Konsultasi Publik & Pengumuman Media</li>
                    </ul>
                </details>

                <details class="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <summary class="font-bold text-navy text-base cursor-pointer hover:text-gold transition">10. Industri & Perdagangan</summary>
                    <div class="mt-3 space-y-1 text-gray-600 ml-2">
                        <p class="font-semibold text-navy text-sm mb-2">Sertifikasi & Standar:</p>
                        <ul class="space-y-1 list-disc list-inside">
                            <li>Persetujuan Penggunaan Tanda SNI</li>
                            <li>Registrasi Sertifikat Produk</li>
                            <li>Pengajuan Lembaga Penilaian Kesesuaian</li>
                            <li>Verifikasi Pemenuhan Standar</li>
                            <li>Tanda Pendaftaran Produk (Telepon Seluler, Tablet, Kendaraan Bermotor)</li>
                        </ul>
                        <p class="font-semibold text-navy text-sm mt-3 mb-2">Rekomendasi Impor/Ekspor:</p>
                        <ul class="space-y-1 list-disc list-inside">
                            <li>Rekomendasi Importir (B2, Produsen, Terdaftar)</li>
                            <li>Rekomendasi Ekspor/Impor BBN, Skrap Logam</li>
                            <li>Rekomendasi Impor Kapal, Komoditas Perikanan</li>
                            <li>Rekomendasi Persetujuan Impor (Ban, Gula, Prekursor)</li>
                            <li>Surat Persetujuan Impor Kendaraan Bermotor</li>
                            <li>Master List Impor Limbah Non-B3</li>
                        </ul>
                        <p class="font-semibold text-navy text-sm mt-3 mb-2">Pertimbangan Teknis:</p>
                        <ul class="space-y-1 list-disc list-inside">
                            <li>Pertek SNI Wajib (Kabel, Kompor LPG, Besi/Baja, Tabung LPG)</li>
                            <li>Pertek Impor (Tepung Terigu, Pelek, Baterai)</li>
                            <li>Pertek Ekspor Produk Pertambangan</li>
                            <li>Surat Keterangan Pengecualian SNI</li>
                        </ul>
                    </div>
                </details>

                <details class="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <summary class="font-bold text-navy text-base cursor-pointer hover:text-gold transition">11. Lain-lain</summary>
                    <ul class="mt-3 space-y-1 list-disc list-inside text-gray-600 ml-2">
                        <li>Izin Pendirian Satuan Pendidikan (Formal/Non-Formal)</li>
                        <li>Izin Tempat Penjualan Minuman Beralkohol</li>
                        <li>Izin Usaha Pemotongan Hewan</li>
                        <li>Izin Pemanfaatan Ruang Jalan</li>
                        <li>Rekomendasi Tenaga Kerja Asing</li>
                        <li>Surat Keterangan Kawasan Industri Halal</li>
                        <li>Pendaftaran Produsen Minyak Goreng</li>
                        <li>Legalisasi Mesin & Peralatan Industri Cakram Optik</li>
                    </ul>
                </details>
            </div>
        `
    },
    {
        slug: 'bidang-pengembangan-pelatihan-sdm',
        title: "Bidang Pengembangan dan Pelatihan Sumber Daya Manusia",
        icon: <ShieldCheck size={40} className="text-gold" />,
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
        shortDesc: "Kami berdedikasi merancang langkah perubahan berdampak bagi individu dan perusahaan melalui metode pelatihan SDM terbaru yang relevan dan inovatif.",
        content: `
            <h2>Pengembangan Potensi Human Capital</h2>
            <p>Kami berdedikasi untuk menciptakan, merencanakan, mendesain dan membawakan sebuah langkah perubahan yang berdampak bagi setiap individu maupun Perusahaan dengan disertai metode-metode terbaru yang lebih relevan.</p>
            <p>Program kami dirancang khusus untuk meningkatkan kompetensi, kepemimpinan, dan produktivitas tim Anda.</p>

            <div class="space-y-6 mt-8">
                <div class="bg-gradient-to-r from-navy/5 to-gold/5 p-6 rounded-xl border-l-4 border-gold">
                    <h3 class="font-bold text-navy text-lg mb-3 flex items-center gap-2">
                        <span class="bg-gold text-navy px-3 py-1 rounded-full text-sm font-black">1</span>
                        IN HOUSE & PUBLIC TRAINING
                    </h3>
                    <p class="text-gray-600 leading-relaxed">
                        Menggunakan model pembelajaran terintegrasi (pra-pelatihan, kelas, dan pasca-pelatihan) dan dikemas dalam bentuk <em>learning journey with high business value</em>.
                    </p>
                </div>

                <div class="bg-gradient-to-r from-navy/5 to-gold/5 p-6 rounded-xl border-l-4 border-gold">
                    <h3 class="font-bold text-navy text-lg mb-3 flex items-center gap-2">
                        <span class="bg-gold text-navy px-3 py-1 rounded-full text-sm font-black">2</span>
                        OUTBOUND PROGRAM FOR TEAMBUILDING
                    </h3>
                    <p class="text-gray-600 leading-relaxed">
                        Melibatkan komponen permainan <em>goal-setting</em>, <em>interpersonal relations</em>, <em>problem-solving</em>, dan <em>role clarification</em>.
                    </p>
                </div>

                <div class="bg-gradient-to-r from-navy/5 to-gold/5 p-6 rounded-xl border-l-4 border-gold">
                    <h3 class="font-bold text-navy text-lg mb-3 flex items-center gap-2">
                        <span class="bg-gold text-navy px-3 py-1 rounded-full text-sm font-black">3</span>
                        PEOPLE ENABLER CONSULTANCY
                    </h3>
                    <p class="text-gray-600 leading-relaxed">
                        Mulai dari rekrutment, perencanaan karir, sampai dengan pembaharuan kebijakan perusahaan, kami menyediakan semua pelayanannya.
                    </p>
                </div>

                <div class="bg-gradient-to-r from-navy/5 to-gold/5 p-6 rounded-xl border-l-4 border-gold">
                    <h3 class="font-bold text-navy text-lg mb-3 flex items-center gap-2">
                        <span class="bg-gold text-navy px-3 py-1 rounded-full text-sm font-black">4</span>
                        CAREER COACHING FOR ALL LEVELS
                    </h3>
                    <p class="text-gray-600 leading-relaxed">
                        Mulai dari generasi YZ, Millennials, dan bahkan kolonial, semuanya akan kami pandu agar bisa lebih <em>empowered</em> di tempat kerjanya.
                    </p>
                </div>

                <div class="bg-gradient-to-r from-navy/5 to-gold/5 p-6 rounded-xl border-l-4 border-gold">
                    <h3 class="font-bold text-navy text-lg mb-3 flex items-center gap-2">
                        <span class="bg-gold text-navy px-3 py-1 rounded-full text-sm font-black">5</span>
                        FREE COMMUNITY SERVICE
                    </h3>
                    <p class="text-gray-600 leading-relaxed">
                        Pengabdian masyarakat dalam berbagai bentuk pelatihan dan pengembangan dapat kami berikan cuma-cuma.
                    </p>
                </div>

                <div class="bg-gradient-to-r from-navy/5 to-gold/5 p-6 rounded-xl border-l-4 border-gold">
                    <h3 class="font-bold text-navy text-lg mb-3 flex items-center gap-2">
                        <span class="bg-gold text-navy px-3 py-1 rounded-full text-sm font-black">6</span>
                        RESEARCH & DEVELOPMENT
                    </h3>
                    <p class="text-gray-600 leading-relaxed">
                        Perencanaan, lokasi waktu pelatihan, karakter kepemimpinan, dan berbagai topik lainnya, adalah obyek pelayanan penelitian kami.
                    </p>
                </div>
            </div>
        `
    }
];
