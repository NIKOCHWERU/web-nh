import { Scale, FileText, ShieldCheck } from 'lucide-react';
import React from 'react';

export type DirectoryCategoryType =
  | 'hukum'
  | 'perizinan'
  | 'pajak'
  | 'imigrasi'
  | 'pertanahan'
  | 'sdm';

export interface DirectoryServiceItem {
  id: number;
  code: string;
  title: string;
  category: string;
  subcategory: string;
  type: DirectoryCategoryType;
}

export interface DirectoryCategoryInfo {
  id: 'all' | DirectoryCategoryType;
  name: string;
  nameEn: string;
  count: number;
  description: string;
  descriptionEn: string;
}

// 1. PELAYANAN HUKUM (34 Item Lengkap sesuai layanan.txt)
export const PELAYANAN_HUKUM_TITLES: string[] = [
  "Perkara Kewarganegaraan",
  "Perkara Perkawinan",
  "Perkara Adopsi atau Hak Asuh Anak",
  "Perkara Kepemilikan Barang atau Aset",
  "Perkara Hak Usaha",
  "Perkara Perikatan-perikatan",
  "Perkara Perkumpulan atau Persekutuan",
  "Perkara Jual-Beli, Tukar-Menukar, Sewa-Menyewa, Pinjam-Meminjam",
  "Perkara Hutang Piutang",
  "Perkara Waris atau Hibah",
  "Perkara Hak Paten atau Hak Kekayaan Intelektual",
  "Perkara Pencemaran Nama Baik",
  "Perkara Perubahan Nama atau Identitas",
  "Perkara Wanprestasi",
  "Perkara Perbuatan Melawan Hukum (PMH)",
  "Perkara Pemisahan Harta",
  "Perkara Perjanjian Bisnis atau Perjanjian untuk Melakukan Pekerjaan dan Perkara Lainnya",
  "Perkara Pencurian atau Perampokan",
  "Perkara Pembunuhan",
  "Perkara Penipuan",
  "Perkara Pemerasan",
  "Perkara Penganiayaan",
  "Perkara Pemerkosaan",
  "Perkara Korupsi",
  "Perkara Pengemplangan Pajak",
  "Perkara Pemalsuan Dokumen",
  "Perkara Perzinahan",
  "Perkara Kekerasan Dalam Rumah Tangga (KDRT)",
  "Perkara Narkotika",
  "Perkara Pelanggaran Ketertiban Umum",
  "Perkara Pemalsuan",
  "Perkara Perbuatan Curang",
  "Perkara Pemalsuan (Counterfeiting)",
  "Perkara Pelanggaran Jabatan dan Perkara Pidana Lainnya"
];

// 2. PELAYANAN PERIZINAN DAN LEGALITAS (411 Item Lengkap sesuai layanan.txt)
export const PERIZINAN_LEGALITAS_RAW_TITLES: string[] = [
  "Pendirian, Pembaharuan, Pembubaran Badan Usaha",
  "Izin Prinsip",
  "Izin-Izin Usaha OSS",
  "Hak Kekayaan Intelektual (Merek, Paten, Design Industri)",
  "Sertifikat Halal",
  "Sertifikat PIRT",
  "SNI",
  "BPOM",
  "Pajak SPT Tahunan Orang Pribadi / Perorangan",
  "Pajak SPT Tahunan Badan Usaha / Perusahaan",
  "Pajak SPT Masa Bulanan Orang Pribadi / Perorangan",
  "Pajak SPT Masa Bulanan Badan Usaha / Perusahaan",
  "Pajak Penghasilan PPh Orang Pribadi / Perorangan",
  "Pajak Penghasilan PPh Badan Usaha / Perusahaan",
  "Pajak Penghasilan PPh Pemotongan & Pemungutan",
  "Pajak PPN & PPnBM",
  "Pajak Hotel",
  "Pajak Restoran",
  "Pajak Reklame",
  "Pajak Hiburan",
  "Pajak PBB & BPHTB",
  "Izin Lingkungan",
  "Izin Mendirikan Menara Telekomunikasi",
  "Izin Mendirikan Bangunan (IMB) Rumah Tinggal; *Saat Ini Dikenal Sebagai Persetujuan Bangunan Gedung (PBG)",
  "Izin Mendirikan Bangunan (IMB) Non Rumah Tinggal; *Saat Ini Dikenal Sebagai Persetujuan Bangunan Gedung (PBG)",
  "Izin Perdagangan Umum",
  "Izin Usaha Perdagangan (Usaha Toko Swalayan Yang Berdiri Sendiri)",
  "Izin Usaha Perdagangan (Usaha Toko Swalayan Yang Terintegrasi Dengan Pusat Perbelanjaan Atau Bangunan/Kawasan Lain)",
  "Izin Usaha Perdagangan (Usaha Pusat Perbelanjaan)",
  "Tanda Daftar Gudang",
  "Izin Khusus Waktu Pelayanan Bagi Pusat Perbelanjaan Dan Toko Modern",
  "Surat Tanda Pendaftaran Waralaba",
  "Izin Usaha Industri",
  "Izin Usaha Jasa Konstruksi",
  "Izin Koperasi Simpan Pinjam",
  "Izin Pembukaan Kantor Cabang Koperasi Simpan Pinjam",
  "Izin Pembukaan Kantor Cabang Pembantu Koperasi Simpan Pinjam",
  "Izin Pembukaan Kantor Kas Koperasi Simpan Pinjam",
  "Izin Usaha Toko Modern",
  "Izin Mendirikan Rumah Sakit Umum Kelas C Dan D",
  "Izin Mendirikan Rumah Sakit Khusus Kelas C",
  "Izin Operasional Rumah Sakit Umum Kelas C Dan D",
  "Izin Operasional Rumah Sakit Khusus Kelas C",
  "Izin Apotek",
  "Izin Toko Obat",
  "Izin Operasional Klinik Pratama",
  "Izin Operasional Klinik Utama",
  "Izin Apoteker",
  "Izin Tenaga Teknis Kefarmasian",
  "Izin Radiographer",
  "Izin Penata Anestesi",
  "Izin Ahli Teknologi Laboratorium Medik",
  "Izin Refraksionis Optisien",
  "Izin Perekam Medis",
  "Izin Teknisi Gigi",
  "Izin Program Pendidikan Dokter Spesialis",
  "Izin Program Pendidikan Dokter Gigi Spesialis",
  "Izin Praktik Dokter Internship",
  "Izin Praktik Mandiri Dokter Umum",
  "Izin Praktik Mandiri Dokter Spesialis",
  "Izin Praktik Mandiri Dokter Gigi",
  "Izin Praktik Mandiri Dokter Gigi Spesialis",
  "Izin Praktek Mandiri Bidan",
  "Izin Perawat",
  "Izin Fisioterapis",
  "Izin Okupasi Terapis",
  "Izin Tenaga Gizi",
  "Izin Ortotis Prostetis Mandiri",
  "Izin Terapis Gigi Dan Mulut",
  "Izin Terapis Wicara",
  "Izin Tukang Gigi",
  "Sertifikat Produksi Pangan Industri Rumah Tangga",
  "Surat Terdaftar Penyehat Tradisional",
  "Izin Optikal",
  "Izin Toko Alat Kesehatan",
  "Sertifikat Produksi Usaha Kecil Dan Mikro Obat Tradisional",
  "Izin Salon Kecantikan",
  "Izin Operasional Klinik Radiologi",
  "Izin Operasional Klinik Dialisis",
  "Izin Operasional Laboratorium Klinik Pratama",
  "Izin Elektromedis",
  "Izin Dokter Umum",
  "Izin Dokter Spesialis",
  "Izin Dokter Gigi",
  "Izin Dokter Gigi Spesialis",
  "Izin Bidan",
  "Izin Ortotis Prostetis",
  "Izin Fisioterapis Mandiri",
  "Izin Praktik Mandiri Okupasi Terapis",
  "Izin Praktek Mandiri Tenaga Gizi",
  "Izin Praktek Mandiri Terapis Gigi Dan Mulut",
  "Izin Praktek Mandiri Terapis Wicara",
  "Izin Praktek Mandiri Perawat",
  "Sertifikat Produksi Perusahaan Rumah Tangga (PRT), Alat Kesehatan Dan Perbekalan Kesehatan Rumah Tangga (PKRT)",
  "Izin Sanitarian",
  "Izin Praktik Psikologi Klinis",
  "Izin Optometris",
  "Izin Psikologi Klinis Mandiri",
  "Sertifikat Laik Higiene Sanitasi Depot Air Minum",
  "Sertifikat Laik Higiene Sanitasi Jasaboga",
  "Sertifikat Laik Hygiene Rumah Makan/Restoran",
  "Sertifikat Laik Sehat Hotel",
  "Sertifikat Laik Sehat Kolam Renang",
  "Izin Penyelenggaraan Pengendalian Vektor Dan Binatang Pembawa Penyakit",
  "Izin Operasional Pengelolaan Limbah Bahan Berbahaya Dan Beracun (Limbah B3) Untuk Penghasil",
  "Izin Pengelolaan Limbah Bahan Berbahaya Dan Beracun (Limbah B3) Untuk Usaha Jasa",
  "Tanda Daftar Usaha Pariwisata",
  "Izin Pendirian Program Atau Satuan Pendidikan (Usaha)",
  "Alur Izin Penyelenggaraan Satuan Pendidikan Non Formal (Operasional/Komersial)",
  "Izin Pemanfaatan Ruang Manfaat Jalan Dan Ruang Milik Jalan Dan Ruang Pengawasan Jalan",
  "Izin Tempat Penjualan Minuman Beralkohol (Golongan B Dan C)",
  "Izin Usaha Pemotongan Hewan",
  "Izin Praktik Dokter Hewan",
  "Izin Pembuangan Air Limbah Ke Air Permukaan",
  "Izin Panti Sehat Berkelompok",
  "Izin Teknisi Kardiovaskuler",
  "Izin Pusat Kesehatan Masyarakat",
  "Izin Penyelenggaraan Angkutan Orang Dalam Trayek",
  "Izin Penyelenggaraan Angkutan Orang Tidak Dalam Trayek",
  "Izin Pengelolaan Tempat Parkir",
  "Kartu Pengawasan Angkutan Orang Tidak Dalam Trayek",
  "Kartu Pengawasan Angkutan Orang Dalam Trayek",
  "Izin Operasional Bengkel Tertunjuk",
  "Izin Operasional Bengkel Umum",
  "Izin Penyelenggaraan Reklame Insidentil",
  "Izin Penyelenggaraan Reklame Permanen Di Halaman (Persil) Dan Di Bangunan",
  "Izin Penyelenggaraan Reklame Di Bahu Jalan/Berm Jalan/Trotoar, Jembatan, Jalan Layang, Jalan Tol, Jembatan Kereta Api Dan Shelter",
  "Izin Penyelenggaraan Reklame Permanen Di Taman",
  "Izin Penyelenggaraan Reklame Permanen Di Jembatan Penyebrangan Orang Dan Bando Jalan",
  "Izin Penyelenggaraan Reklame Kendaraan",
  "Izin Usaha Jasa Terkait Dengan Perawatan Dan Perbaikan Kapal",
  "Izin Penyelenggaraan Sarana Perkeretaapian Umum",
  "Izin Penyelenggaraan Prasarana Perkeretaapian Umum",
  "Paspor Baru/Penggantian",
  "Penggantian Paspor Karena Hilang/Rusak",
  "Perubahan Data Paspor/Keimigrasian",
  "Tempat Pemeriksaan Imigrasi (TPI)",
  "Pemberian Izin Tinggal Kunjungan",
  "Perpanjangan Izin Tinggal Kunjungan",
  "Pemberian Izin Tinggal Terbatas",
  "Alih Status Izin Tinggal Kunjungan Ke Izin Tinggal Terbatas",
  "Perpanjangan Izin Tinggal Terbatas",
  "Alih Status Izin Tinggal Terbatas Ke Izin Tinggal Tetap",
  "Pemberian Izin Tinggal Tetap",
  "Perpanjangan Izin Tinggal Tetap",
  "Pelaporan Izin Tinggal Tetap",
  "Alih Penjamin Keimigrasian",
  "Alih/Rangkap Jabatan Tenaga Kerja Asing",
  "Pendaftaran Anak Berkewarganegaraan Ganda",
  "Fasilitas Keimigrasian Bagi Anak Berkewarganegaraan Ganda (AFFIDAVIT)",
  "Surat Keterangan Keimigrasian",
  "Pelayanan Bagi WNA Pada Unit Kerja Keimigrasian (UKK)",
  "Pengembalian Dokumen Keimigrasian",
  "Pencabutan Dokumen Menjadi WNI",
  "Pencabutan Dokumen Menjadi WNA",
  "Re-Entry Tidak Kembali (RTK)",
  "Mutasi Paspor WNA",
  "Mutasi Alamat Keimigrasian",
  "Perubahan Status Sipil Keimigrasian",
  "Pelayanan Pengantaran Paspor Bagi Lansia Dan Balita",
  "Pelayanan Khusus Keimigrasian Bagi Difabel Dan Lansia",
  "Penghapusan NPWP",
  "Perubahan Data Wajib Pajak Dan/Atau Pengusaha Kena Pajak",
  "Pemindahan Wajib Pajak",
  "Permohonan Pelaporan Usaha Dan Pengukuhan PKP",
  "Penetapan Wajib Pajak Sebagai Wajib Pajak Non Efektif",
  "Pengaktifan Kembali Wajib Pajak Non Efektif",
  "Permintaan Kembali Kartu NPWP/SKT/SPPKP",
  "Aktivasi EFIN",
  "Aktivasi Akun Pengusaha Kena Pajak",
  "Cetak Ulang Kode Aktivasi",
  "Aktivasi Sertifikat Elektronik",
  "Surat Kuasa Khusus Perpajakan",
  "Pencabutan Pengukuhan PKP",
  "Penggunaan Nilai Buku Atas Pengalihan Dan Perolehan Harta Dalam Rangka Penggabungan, Peleburan, Pemekaran, Atau Pengambilalihan Usaha",
  "Permohonan Perubahan Metode Pembukuan",
  "Permintaan Perubahan Tahun Buku Pertama",
  "Pembayaran Dan Penyetoran Pajak",
  "Pengangsuran Pembayaran PPh Pasal 29",
  "Penundaan Pembayaran PPh Pasal 29",
  "Pengurangan Angsuran PPh Pasal 25",
  "Angsuran PPh Pasal 25 Wajib Pajak Bank, Sewa Guna Usaha Dengan Hak Opsi, Badan Usaha Milik Negara Dan Badan Usaha Milik Daerah",
  "Pemindahbukuan (Pbk)",
  "Pengalihan Saldo Bea Meterai Dari Sistem Komputerisasi Ke Teknologi Percetakan",
  "Pengalihan Saldo Bea Meterai Dari Teknologi Percetakan Ke Sistem Komputerisasi",
  "Pemindahbukuan (Pbk) Saldo Deposit Mesin Teraan Meterai Digital",
  "Pengembalian Kelebihan Pembayaran Pajak Bumi Dan Bangunan",
  "Pengembalian Kelebihan Pembayaran Pajak Bumi Dan Bangunan Karena Diterbitkannya Keputusan Atau Putusan Yang Mengakibatkan Lebih Bayar PBB",
  "Pengembalian Pendahuluan Bagi Wajib Pajak Dengan Kriteria Tertentu (Pasal 17C UU KUP)",
  "Restitusi Dengan Pengembalian Pendahuluan Bagi WP Dengan Persyaratan Tertentu (Pasal 17D KUP)",
  "Restitusi Dengan Pengembalian Pendahuluan Bagi PKP Berisiko Rendah (Pasal 9 Ayat (4C) UU PPN)",
  "Pengembalian PPN Bagi Turis (VAT Refund For Tourists)",
  "Pengembalian Atas Keputusan/Putusan Keberatan/Banding/PK Pasal 36/Pembetulan Pasal 16",
  "Pengembalian Kelebihan Pembayaran Pajak Yang Seharusnya Tidak Terutang Atas Pembayaran Pajak Oleh Pihak Pembayar",
  "Pengembalian Kelebihan Pembayaran Pajak Yang Seharusnya Tidak Terutang Atas Kelebihan Pajak Dalam Rangka Impor",
  "Pengembalian Kelebihan Pembayaran Pajak Yang Seharusnya Tidak Terutang Atas Kesalahan Pemotongan Atau Pemungutan PPh, PPN Atau PPnBM",
  "Pengembalian Kelebihan Pembayaran Pajak Yang Seharusnya Tidak Terutang Atas Kesalahan Pemotongan Atau Pemungutan Pajak Terhadap Subjek Pajak Luar Negeri Yang Memiliki Bentuk Usaha Tetap Di Indonesia",
  "Pengembalian Kelebihan Pembayaran Pajak Yang Seharusnya Tidak Terutang Atas Kesalahan Pemotongan Atau Pemungutan Pajak Terhadap Subjek Pajak Luar Negeri Yang Tidak Memiliki Bentuk Usaha Tetap Di Indonesia",
  "Pengembalian Kelebihan Pembayaran Pajak Yang Seharusnya Tidak Terutang Atas Kesalahan Pemotongan Atau Pemungutan Pajak Terhadap Orang Pribadi Atau Badan Yang Tidak Diwajibkan Memiliki NPWP",
  "Pemberian Imbalan Bunga",
  "Pemberitahuan Perpanjangan Jangka Waktu Penyampaian SPT Tahunan",
  "Izin Pembubuhan Tanda Bea Meterai Lunas Dengan Mesin Teraan Meterai Digital",
  "Pembetulan Izin Pembubuhan Tanda Bea Meterai Lunas Dengan Mesin Teraan Meterai Digital Berdasarkan Permohonan Wajib Pajak",
  "Pencabutan Izin Pembubuhan Tanda Bea Meterai Lunas Dengan Mesin Teraan Meterai Digital Berdasarkan Permohonan Wajib Pajak",
  "Izin Pembubuhan Tanda Bea Meterai Lunas Dengan Sistem Komputerisasi",
  "Izin Pembubuhan Tanda Bea Meterai Lunas Dengan Teknologi Percetakan",
  "Izin Sebagai Pelaksana Pembubuhan Tanda Bea Meterai Lunas Dengan Teknologi Percetakan",
  "Penetapan Wajib Pajak Dengan Kriteria Tertentu",
  "Penetapan Pengusaha Kena Pajak Berisiko Rendah (Perusahaan Yang Sahamnya Diperdagangkan Di Bursa Efek Di Indonesia)",
  "Penetapan Atas Saat Mulainya Penyusutan Harta Berwujud Yang Dapat Dilakukan Pada Bulan Digunakan Atau Bulan Mulai Menghasilkan",
  "Surat Keterangan Fiskal",
  "Surat Keterangan Pemenuhan Kewajiban Perpajakan Bakal Calon Kepala Daerah",
  "Permohonan SKB PPh Pasal 21/Pasal 22 Selain Impor, Pasal 22 Impor/PPh Pasal 23",
  "SKB PPh Pasal 22 Atas Impor Emas Batangan Dari Wajib Pajak Yang Bergerak Dalam Bidang Industri Perhiasan Emas Untuk Tujuan Ekspor",
  "Permohonan SKB Pemotongan Pajak Penghasilan Atas Bunga Deposito Dan Tabungan Serta Diskonto Sertifikat Bank Indonesia Yang Diterima Atau Diperoleh Dana Pensiun Yang Pendiriannya Telah Disahkan Oleh Menteri Keuangan",
  "Surat Keterangan Bebas PPh Atas Penghasilan Dari Pengalihan Hak Atas Tanah Dan Atau Bangunan",
  "Surat Keterangan Bebas PPh Atas Penghasilan Dari Pengalihan Hak Atas Tanah Dan/Atau Bangunan Bagi Wajib Pajak Yang Usaha Pokoknya Melakukan Pengalihan Hak Atas Tanah Dan/Atau Bangunan",
  "Surat Keterangan Bebas PPN Atas Impor Dan/Atau Penyerahan Barang Kena Pajak Tertentu Dan/Atau Penyerahan Jasa Kena Pajak Tertentu",
  "SKB Pajak Pertambahan Nilai Atau Pajak Pertambahan Nilai Dan Pajak Penjualan Atas Barang Mewah Kepada Perwakilan Negara Asing Dan Badan Internasional Serta Pejabatnya",
  "Surat Keterangan Bebas PPnBM Atas Impor Atau Penyerahan Kendaraan Ambulan, Kendaraan Jenazah, Kendaraan Pemadam Kebakaran, Kendaraan Tahanan, Dan Kendaraan Angkutan Umum",
  "Surat Keterangan Bebas PPnBM Atas Impor Atau Penyerahan Kendaraan Protokoler Kenegaraan, Kendaraan Dinas Atau Kendaraan Patroli TNI/Polri",
  "Surat Keterangan Domisili Subjek Pajak Dalam Negeri",
  "Surat Dispensasi Atas Pengalihan Barang Kena Pajak Sebagaimana Atau Pengalihpemanfaatan Jasa Kena Pajak Yang Dilakukan Kepada Sesama Perwakilan Negara Asing, Badan Internasional, Pejabat Perwakilan Negara Asing, Dan/Atau Pejabat Badan Internasional, Pajak Pertambahan Nilai Atau Pajak Pertambahan Nilai Dan Pajak Penjualan Atas Barang Mewah",
  "Surat Keterangan Penelitian Formal Bukti Pemenuhan Kewajiban Penyetoran PPh Atas Pengalihan Hak Atas Tanah Dan/Atau Bangunan Atau Perubahan Perjanjian Pengikatan Jual Beli Atas Tanah Dan/Atau Bangunan",
  "Kesepakatan Harga Transfer (Advance Pricing Agreement)",
  "Permintaan Keterangan Wajib Pajak Dalam Rangka Pengajuan Keberatan",
  "Keberatan Perpajakan",
  "Pencabutan Keberatan",
  "Permintaan Keterangan Wajib Pajak Dalam Rangka Banding",
  "Permohonan Pembetulan Surat Tagihan Pajak/Surat Ketetapan Pajak/Surat Keputusan Pajak (Pasal 16 UU KUP)",
  "Pengurangan Atau Penghapusan Sanksi Administrasi (Pasal 36 Ayat 1a UU KUP)",
  "Pengurangan Atau Pembatalan Surat Ketetapan Pajak Yang Tidak Benar (Pasal 36 Ayat 1b UU KUP)",
  "Pengurangan Atau Pembatalan Surat Tagihan Pajak Yang Tidak Benar (Pasal 36 Ayat 1c UU KUP)",
  "Pembatalan Surat Ketetapan Pajak Dari Hasil Pemeriksaan (Pasal 36 Ayat 1d UU KUP)",
  "Pencabutan Permohonan Pasal 36 UU KUP",
  "Pengurangan Denda Administrasi PBB (Pasal 20 UU PBB)",
  "Pengurangan Surat Pemberitahuan Pajak Terutang Atau Surat Ketetapan Pajak PBB Yang Tidak Benar",
  "Pembatalan Surat Pemberitahuan Pajak Terutang, Surat Ketetapan Pajak PBB, Atau Surat Tagihan Pajak PBB Yang Tidak Benar",
  "Pengurangan Pajak Bumi Dan Bangunan",
  "Pengangsuran Pembayaran Pajak",
  "Penundaan Pembayaran Pajak",
  "Perpanjangan Jangka Waktu Pelunasan Pajak",
  "Pengaduan Pelayanan Perpajakan",
  "Inovasi Business Development Service (Pembinaan UMKM)",
  "Pelayanan Terhadap Wajib Pajak Khusus (Difabel Dan Lansia)",
  "Permintaan Nomor Seri Faktur Pajak Secara Manual",
  "Permintaan Data E-Faktur Pajak",
  "Konversi, Pengakuan Dan Penegasan Hak Tanah",
  "Pemberian Hak Milik",
  "Pemberian Hak Guna Bangunan",
  "Pemberian Hak Pakai",
  "Pemberian Hak Guna Usaha",
  "Pemberian Hak Pengelolaan Instansi Pemerintah/Pemerintah Daerah/BUMN/BUMD",
  "Wakaf Dari Tanah Belum Bersertifikat (Konversi, Pengakuan Dan Penegasan Hak)",
  "Wakaf Dari Tanah Negara (Pemberian Hak Tanah Wakaf)",
  "Peralihan Hak Atas Tanah Dan Satuan Rumah Susun: Jual-Beli, Pewarisan/Wasiat, Tukar-Menukar, Hibah, Pembagian Hak Bersama, Lelang, Pemasukan Kedalam Perusahaan/Inbreng, Merger",
  "Ganti Nama Sertipikat Hak Atas Tanah Dan Hak Milik Atas Rumah Susun",
  "Perpanjangan Jangka Waktu Hak Guna Usaha",
  "Perpanjangan Jangka Waktu Hak Guna Bangunan/Hak Pakai",
  "Perpanjangan Hak Milik Atas Satuan Rumah Susun",
  "Pembaruan Hak Guna Bangunan/Hak Pakai Dan Pemberian Hak Guna Bangunan/Hak Pakai Di Atas Hak Pengelolaan",
  "Pembaruan Hak Guna Usaha",
  "Wakaf Dari Tanah Yang Sudah Bersertipikat",
  "Perubahan Hak Atas Tanah",
  "Pemecahan/Penggabungan/Pemisahan Hak",
  "Sertipikat Pengganti Hak Atas Tanah, Hak Milik Atas Rumah Susun Dan Hak Tanggungan, Karena: Blanko Lama, Hilang, Rusak",
  "Hak Tanggungan: Pendaftaran Hak Tanggungan, Penghapusan Hak Tanggungan (Roya), Peralihan Hak Tanggungan (Cessie), Subrogasi (Perubahan Kreditur)",
  "Pencatatan: Blokir, Sita, Pengangkatan Sita",
  "Informasi Pertanahan; Pengecekan Sertipikat; Surat Keterangan Pendaftaran Tanah, Informasi Titik Dasar Teknik, Informasi Peta",
  "Pengukuran Bidang Tanah: Pengukuran Bidang Untuk Keperluan Pengembalian Batas; Pengukuran Dalam Rangka Kegiatan Inventaris/Pengadaan Tanah, Pengukuran Atas Permintaan Instansi Dan/Atau Masyarakat Untuk Mengetahui Luas Tanah, Pengukuran Dalam Rangka Pembuatan Peta Situasi Lengkap (Topografi)",
  "Konsolidasi Tanah Swadaya",
  "Pertimbangan Teknis: Pertimbangan Teknis Pertanahan, Pertimbangan Teknis Penatagunaan Tanah",
  "Izin Survei",
  "Izin Pemanfaatan Data Migas",
  "Izin Usaha Penyimpanan Migas",
  "Izin Usaha Pengangkutan Migas",
  "Izin Usaha Pengolahan Migas",
  "Izin Usaha Niaga Migas",
  "Izin Usaha Niaga Migas (Umum/Terbatas)",
  "Izin Gudang Bahan Peledak",
  "Pengesahan Kualifikasi Ahli Las",
  "Persetujuan Gudang/Kontainer Penyimpanan Bahan Peledak",
  "Persetujuan Juru Tembak Bahan Peledak",
  "Izin Panas Bumi",
  "Izin Usaha Bahan Bakar Nabati",
  "Rekomendasi Ekspor Impor Bahan Bakar Nabati",
  "Penandasahan Impor Barang Panas Bumi",
  "Registrasi Usaha Penunjang Panas Bumi",
  "Persetujuan Pengeboran/Penggalian Eksplorasi",
  "Persetujuan Studi Kelayakan Air Tanah",
  "UMKU - Persetujuan Studi Kelayakan / Feasibility Study (FS) Proyek Pembangkit Listrik Tenaga Panas Bumi (PLTP)",
  "Izin Usaha Penyediaan Tenaga Listrik",
  "Penetapan Wilayah Usaha Penyediaan Tenaga Listrik",
  "Izin Usaha Penyediaan Tenaga Listrik Untuk Kepentingan Umum (IUTPLU)",
  "Izin Usaha Penyediaan Tenaga Listrik untuk Kepentingan Sendiri",
  "Izin Usaha Penyediaan Tenaga Listrik Kepentingan Sendiri (Operasional)",
  "Izin Penjualan Tenaga Listrik Lintas Negara",
  "Izin Usaha Jasa Penunjang Tenaga Listrik",
  "Izin Pembelian Tenaga Listrik Lintas Negara",
  "Izin Interkoneksi Tenaga Listrik Lintas Negara",
  "IPJ Telematika",
  "Registrasi Sertifikat Produk",
  "Izin Persetujuan dan Penandasahan Rencana Impor Barang",
  "Izin Penjualan dan Interkoneksi Tenaga Listrik Lintas Negara",
  "Rekomendasi Penandasahan Dan Persetujuan Rencana Impor Barang",
  "Perizinan Berusaha Jasa Penunjang Tenaga Listrik",
  "Izin Pembelian dan Interkoneksi Tenaga Listrik Lintas Negara",
  "Badan Usaha Jasa Pengelolaan Lingkungan Ketenagalistrikan",
  "Izin Usaha Pertambangan Khusus Sebagai Kelanjutan Operasi Kontrak/Perjanjian",
  "Izin Pengangkutan dan Penjualan",
  "Izin Usaha Jasa Pertambangan",
  "Izin Usaha Pertambangan Untuk Penjualan",
  "Surat Izin Pertambangan Batuan",
  "Izin Pertambangan Rakyat",
  "Pengesahan Kepala Teknik Tambang / Penanggung Jawab Teknik dan Lingkungan",
  "Permohonan Kartu Izin Meledakkan (KIM)",
  "Permohonan Kartu Pekerja Peledakan (KPP) Madya",
  "Persetujuan Besar Pencairan Jaminan Kesungguhan Pembangunan Fasilitas Pemurnian",
  "Surat Rekomendasi Persetujuan Ekspor",
  "Penyusunan Dokumen UKL-UPL",
  "Pengesahan UKL-UPL",
  "Persetujuan Lingkungan Hidup",
  "Andalalin (Khusus Jalan Kabupaten/Kota)",
  "Pertek Limbah B3 (IPL-B3)",
  "Pertek Emisi",
  "Pertek Air Limbah (IPAL/IPLC)",
  "Konsultasi Publik",
  "Pengumuman Koran/Media Massa",
  "Penyusunan & Pengesahan KA-ANDAL",
  "Penyusunan & Pengesahan KA-ANDAL & RKL - RPL",
  "Persetujuan Lingkungan Hidup (AMDAL)",
  "Andalalin (Jalan Provinsi/Nasional & Kabupaten/Kota)",
  "Pertek Limbah B3 (IPL-B3) Lanjutan",
  "Pertek Emisi Udara",
  "Pertek Air Limbah (IPAL/IPLC) Industri",
  "Pendaftaran Produsen Minyak Goreng",
  "Legalisasi Pendaftaran/Registrasi Mesin dan Peralatan Industri Cakram Optik",
  "Master List Impor Limbah Non B3",
  "Penetapan Pusat Penyedia Bahan Baku/Penolong",
  "Pengajuan Lembaga Penilaian Kesesuaian",
  "Persetujuan Penggunaan Tanda SNI",
  "Persetujuan Perhitungan Nilai TKDN Produk Telepon Seluler, Komputer Genggam, dan Komputer Tablet",
  "Pertek Ekspor Produk Pertambangan yang merupakan Produk Industri",
  "Pertimbangan Teknis Baterai",
  "Pertimbangan Teknis Impor Tepung Terigu",
  "Pertimbangan Teknis Impor Tepung Terigu Non Makanan",
  "Pengecualian dari Ketentuan Ekspor Batubara dan Produk Batubara",
  "Pertimbangan Teknis Pengecualian SNI Wajib Keramik Tableware",
  "Pertimbangan Teknis Pengecualian SNI Wajib Peralatan Dapur dan Pemanas Cairan Rumah Tangga",
  "Pertimbangan Teknis Setrika",
  "Pertimbangan Teknis SNI Wajib Batang Konduktor dari Tembaga",
  "Pertimbangan Teknis SNI Wajib Konverter Kit",
  "Pertimbangan Teknis SNI Wajib Lemari Pendingin",
  "Pertimbangan Teknis SNI Wajib Mesin Cuci",
  "Pertimbangan Teknis SNI Wajib Mesin Pendingin Ruangan",
  "Pertimbangan Teknis SNI Wajib Pipa Baja Saluran Air",
  "Program Restrukturisasi Mesin dan/atau Peralatan Industri Pengolahan Kayu",
  "Rekomendasi Ekspor Produk Telepon Seluler/Komputer Genggam (Handheld)/Komputer Tablet Yang Akan Diimpor Kembali",
  "Rekomendasi Ekspor Skrap Logam",
  "Rekomendasi Ekspor Bahan Bakar Lain Sebagai Bahan Baku dan Bahan Penolong Industri",
  "Rekomendasi Impor Bahan Bakar Lain Sebagai Bahan Baku dan Bahan Penolong Industri",
  "Rekomendasi ET Produk Pertambangan Hasil Pengolahan dan Pemurnian (IKD)",
  "Rekomendasi ET Produk Pertambangan Hasil Pengolahan dan Pemurnian (IKH)",
  "Rekomendasi ET Produk Pertambangan Hasil Pengolahan dan Pemurnian (IMDL)",
  "Rekomendasi Impor Kapal Bukan Baru Usia di atas 20 Tahun",
  "Rekomendasi Impor Komoditas Pergaraman",
  "Rekomendasi Impor Komoditas Perikanan",
  "Rekomendasi Impor Pengecualian SNI Meter Air Minum",
  "Rekomendasi Impor Pengecualian SNI Pompa Air",
  "Rekomendasi Importir B2",
  "Rekomendasi Importir Produsen Nitrocellulose (IP-NC)",
  "Rekomendasi Importir Produsen Prekursor Non-Farmasi",
  "Rekomendasi Importir Terdaftar Telepon Seluler, Komputer Genggam (Handheld) dan Komputer Tablet",
  "Rekomendasi IP Raw Sugar",
  "Rekomendasi IUI Logam",
  "Rekomendasi IUI Minuman Beralkohol",
  "Rekomendasi Pembebasan Bea Masuk atas Impor Bahan Baku Dalam Rangka Penanaman Modal",
  "Rekomendasi Pengeluaran Hasil Produksi Kawasan Berikat",
  "Rekomendasi Pengguna Gas Bumi Tertentu",
  "Rekomendasi Perizinan Industri Rokok",
  "Rekomendasi Persetujuan Ekspor Lumpur Anoda",
  "Rekomendasi Persetujuan Ekspor Timah Industri",
  "Rekomendasi Persetujuan Impor Bahan Baku Minuman Beralkohol",
  "Rekomendasi Persetujuan Impor Ban",
  "Rekomendasi Persetujuan Impor Gula Kristal Rafinasi",
  "Rekomendasi Persetujuan Impor Prekursor Non-Farmasi",
  "Rekomendasi Pertimbangan Teknis Impor Pelek tanpa SNI",
  "Rekomendasi Pertimbangan Teknis Pupuk Non SNI Wajib",
  "Rekomendasi Pertimbangan Teknis SNI Wajib Kabel Listrik",
  "Rekomendasi Pertimbangan Teknis SNI Wajib Kompor Gas LPG",
  "Rekomendasi Pertimbangan Teknis SNI Wajib Produk Besi/Baja",
  "Rekomendasi Pertimbangan Teknis SNI Wajib Tabung Baja LPG",
  "Rekomendasi PI-B2 bagi BUMN dengan API-U",
  "Rekomendasi PI-B2 bagi Pemilik NIB dengan API-P",
  "Rekomendasi Tenaga Kerja Asing",
  "Skema Khusus Industri Galangan Kapal",
  "Surat Keterangan Impor Air Minum Non AMDK",
  "Surat Keterangan Impor Tepung Terigu",
  "Surat Keterangan Kawasan Industri Halal",
  "Surat Keterangan Pengecualian Berlokasi di Kawasan Industri",
  "Surat Keterangan Pengecualian SNI Mainan Secara Wajib",
  "Surat Pendaftaran Bahan Berbahaya",
  "Surat Pendaftaran/Legalisasi dan Perpanjangan Mesin dan Peralatan Cakram Optik",
  "Surat Penetapan Untuk Perusahaan Pengguna Importasi IKD",
  "Surat Persetujuan Impor Kendaraan Bermotor",
  "Surat Persetujuan Impor Kendaraan Bermotor Listrik Berbasis Baterai",
  "Surat Persetujuan Impor Komponen Non-IKD",
  "Surat Persetujuan Impor Komponen Non-IKD untuk Kendaraan Bermotor Listrik Berbasis Baterai",
  "Tanda Pendaftaran Produk Telepon Seluler, Komputer Genggam (Handheld), dan Komputer Tablet",
  "Tanda Pendaftaran Tipe Kendaraan Bermotor",
  "Verifikasi Pemenuhan Standar Kegiatan Usaha dan/atau Produk"
];

// 3. PELATIHAN & PENGEMBANGAN SDM
export const PELATIHAN_SDM_TITLES: { title: string; subcategory: string }[] = [
  {
    title: "In House & Public Training (Learning Journey with High Business Value)",
    subcategory: "Pelatihan Korporasi & Publik"
  },
  {
    title: "Outbound Program for Teambuilding (Goal-Setting, Interpersonal Relations & Problem-Solving)",
    subcategory: "Teambuilding & Leadership"
  },
  {
    title: "People Enabler Consultancy & Career Coaching (Rekrutmen, Perencanaan Karir, Kebijakan HR & Coaching Lintas Generasi)",
    subcategory: "Konsultasi HR & Coaching"
  }
];

// Build unified directory items
const hukumItems: DirectoryServiceItem[] = PELAYANAN_HUKUM_TITLES.map((title, idx) => ({
  id: idx + 1,
  code: `HKM-${String(idx + 1).padStart(2, '0')}`,
  title,
  category: "Bidang Hukum",
  subcategory: idx < 17 ? "Litigasi & Non-Litigasi (Perdata)" : "Litigasi & Non-Litigasi (Pidana)",
  type: 'hukum'
}));

const perizinanItems: DirectoryServiceItem[] = PERIZINAN_LEGALITAS_RAW_TITLES.map((title, idx) => {
  const num = idx + 1;
  let type: DirectoryCategoryType = 'perizinan';
  let category = "Perizinan & Legalitas";
  let subcategory = "Perizinan Usaha & Sektoral";

  // Classify based on exact numbering in layanan.txt:
  // 9-21 & 162-247: Perpajakan
  // 134-161 & 395: Keimigrasian
  // 24-25 & 248-272: Pertanahan & PBG
  if ((num >= 9 && num <= 21) || (num >= 162 && num <= 247)) {
    type = 'pajak';
    category = "Perpajakan";
    subcategory = num <= 21 ? "SPT, PPh, PPN & Pajak Daerah" : "AdministrasiNPWP, PKP, Restitusi, SKB & Keberatan Pajak";
  } else if ((num >= 134 && num <= 161) || num === 395) {
    type = 'imigrasi';
    category = "Keimigrasian";
    subcategory = "Paspor, Izin Tinggal (KITAS/KITAP), TKA & Dokumen Imigrasi";
  } else if (num === 24 || num === 25 || (num >= 248 && num <= 272)) {
    type = 'pertanahan';
    category = "Pertanahan & Bangunan";
    subcategory = num <= 25 ? "Persetujuan Bangunan Gedung (IMB/PBG)" : "Sertipikat Hak Tanah, Peralihan, Hak Tanggungan & Pengukuran BPN";
  } else {
    type = 'perizinan';
    category = "Perizinan & Legalitas";
    if (num <= 8) subcategory = "Badan Usaha, OSS, HAKI, Halal, SNI & BPOM";
    else if (num >= 26 && num <= 39) subcategory = "Perdagangan, Industri, Konstruksi & Koperasi";
    else if (num >= 40 && num <= 104) subcategory = "Kesehatan, Rumah Sakit, Klinik, Apotek & Tenaga Medis";
    else if (num >= 105 && num <= 133) subcategory = "Lingkungan, Pariwisata, Pendidikan, Transportasi & Reklame";
    else if (num >= 273 && num <= 319) subcategory = "Energi, Migas, Panas Bumi, Ketenagalistrikan & Pertambangan";
    else if (num >= 320 && num <= 335) subcategory = "Dokumen Lingkungan (AMDAL, UKL-UPL, Andalalin & Pertek B3)";
    else subcategory = "Perindustrian, Pertimbangan Teknis SNI & Rekomendasi Ekspor-Impor";
  }

  return {
    id: 34 + num,
    code: `PRZ-${String(num).padStart(3, '0')}`,
    title,
    category,
    subcategory,
    type
  };
});

const sdmItems: DirectoryServiceItem[] = PELATIHAN_SDM_TITLES.map((item, idx) => ({
  id: 34 + 411 + idx + 1,
  code: `SDM-${String(idx + 1).padStart(2, '0')}`,
  title: item.title,
  category: "Pengembangan & Pelatihan SDM",
  subcategory: item.subcategory,
  type: 'sdm'
}));

export const ALL_DIRECTORY_SERVICES: DirectoryServiceItem[] = [
  ...hukumItems,
  ...perizinanItems,
  ...sdmItems
];

export const DIRECTORY_CATEGORIES: DirectoryCategoryInfo[] = [
  {
    id: 'all',
    name: `Semua Layanan (${ALL_DIRECTORY_SERVICES.length})`,
    nameEn: `All Services (${ALL_DIRECTORY_SERVICES.length})`,
    count: ALL_DIRECTORY_SERVICES.length,
    description: "Direktori lengkap seluruh layanan Narasumber Hukum meliputi Pelayanan Hukum (Litigasi & Non-Litigasi), Perizinan & Legalitas, Perpajakan, Keimigrasian, Pertanahan, serta Pengembangan & Pelatihan SDM.",
    descriptionEn: "Complete directory of all Narasumber Hukum services covering Legal Services (Litigation & Non-Litigation), Licensing & Legality, Taxation, Immigration, Land Affairs, and HR Development & Training."
  },
  {
    id: 'hukum',
    name: "Pelayanan Hukum",
    nameEn: "Legal Services",
    count: hukumItems.length,
    description: "Pada intinya meliputi seluruh Perkara/Upaya Hukum di Indonesia, baik secara Litigasi (Penyelesaian dilakukan di Pengadilan) maupun Non Litigasi (Penyelesaian dilakukan di Luar Pengadilan).",
    descriptionEn: "Covering all Legal Cases/Efforts in Indonesia, both through Litigation (Court Settlement) and Non-Litigation (Out-of-Court Settlement)."
  },
  {
    id: 'perizinan',
    name: "Perizinan & Legalitas Usaha",
    nameEn: "Business Licensing & Legality",
    count: perizinanItems.filter(i => i.type === 'perizinan').length,
    description: "Pendirian Badan Usaha, Izin Usaha OSS, HAKI, Halal, BPOM, Kesehatan & Rumah Sakit, Transportasi, Reklame, Energi, Migas, Ketenagalistrikan, Pertambangan, Lingkungan (AMDAL/UKL-UPL), serta Rekomendasi Ekspor-Impor.",
    descriptionEn: "Company Establishment, OSS Business Permits, Intellectual Property, Halal, BPOM, Healthcare & Hospitals, Transportation, Energy, Mining, Environment (AMDAL/UKL-UPL), and Export-Import Recommendations."
  },
  {
    id: 'pajak',
    name: "Perpajakan",
    nameEn: "Taxation",
    count: perizinanItems.filter(i => i.type === 'pajak').length,
    description: "SPT Tahunan & Masa (Orang Pribadi/Badan), PPh, PPN & PPnBM, Pajak Daerah, Administrasi NPWP/PKP/EFIN, Pemindahbukuan, Restitusi, Surat Keterangan Bebas (SKB), hingga Keberatan & Banding Pajak.",
    descriptionEn: "Annual & Periodic Tax Returns (Individual/Corporate), Income Tax, VAT, Regional Tax, NPWP/PKP/EFIN Administration, Tax Refund/Restitution, Tax Exemption Certificates (SKB), and Tax Objections."
  },
  {
    id: 'imigrasi',
    name: "Keimigrasian",
    nameEn: "Immigration",
    count: perizinanItems.filter(i => i.type === 'imigrasi').length,
    description: "Pengurusan Paspor, Izin Tinggal Kunjungan, Izin Tinggal Terbatas (KITAS/ITAS), Izin Tinggal Tetap (KITAP/ITAP), Alih Status, Tenaga Kerja Asing, Affidavit, dan Dokumen Keimigrasian WNI/WNA.",
    descriptionEn: "Passports, Visit Stay Permits, Limited Stay Permits (KITAS/ITAS), Permanent Stay Permits (KITAP/ITAP), Permit Status Conversion, Foreign Workers, Affidavit, and Immigration Documents."
  },
  {
    id: 'pertanahan',
    name: "Pertanahan & Bangunan",
    nameEn: "Land & Building Affairs",
    count: perizinanItems.filter(i => i.type === 'pertanahan').length,
    description: "Persetujuan Bangunan Gedung (IMB/PBG), Konversi & Pemberian Hak Tanah (SHM, HGB, HGU, Hak Pakai), Peralihan Hak, Wakaf, Pemecahan/Penggabungan Sertipikat, Hak Tanggungan (Roya/Cessie), dan Pengukuran Bidang Tanah BPN.",
    descriptionEn: "Building Approval (IMB/PBG), Land Rights Granting & Conversion (SHM, HGB, HGU), Title Transfer, Waqf, Certificate Splitting/Merging, Mortgage Rights (Roya/Cessie), and Land Measurement."
  },
  {
    id: 'sdm',
    name: "Pengembangan & Pelatihan SDM",
    nameEn: "HR Development & Training",
    count: sdmItems.length,
    description: "Program pengembangan potensi Human Capital melalui In House & Public Training, Outbound Program for Teambuilding, serta People Enabler Consultancy & Career Coaching.",
    descriptionEn: "Human Capital potential development programs through In House & Public Training, Outbound Program for Teambuilding, and People Enabler Consultancy & Career Coaching."
  }
];

export const servicesData = [
    {
        slug: 'hukum',
        path: '/services/hukum',
        titleKey: 'services.legal.title',
        shortDescKey: 'services.legal.desc',
        icon: <Scale size={40} className="text-gold" />,
        image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80",
        directoryTypes: ['hukum'] as DirectoryCategoryType[],
        content: {
            id: `
                <h2>Layanan Hukum Komprehensif (34 Cakupan Perkara)</h2>
                <p>Pada intinya meliputi seluruh Perkara/Upaya Hukum di Indonesia, baik secara Litigasi (Penyelesaian dilakukan di Pengadilan) maupun Non Litigasi (Penyelesaian dilakukan di Luar Pengadilan).</p>
            `,
            en: `
                <h2>Comprehensive Legal Services (34 Case Scopes)</h2>
                <p>Essentially covering all Cases/Legal Efforts in Indonesia, both Litigation (Settlement in Court) and Non-Litigation (Settlement Outside Court).</p>
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
        directoryTypes: ['perizinan', 'pajak', 'imigrasi', 'pertanahan'] as DirectoryCategoryType[],
        content: {
            id: `
                <h2>Solusi Legalitas, Perizinan, Perpajakan, Keimigrasian & Pertanahan (411 Layanan)</h2>
                <p>Kami menawarkan solusi dan saran praktis mengenai semua aspek dalam menjalankan bisnis dan segala upaya kaitan dengan perlindungan aset berharga yang ada di Indonesia beserta nasihat untuk keberlangsungan berbagai perizinan dan legalitas.</p>
                <p>Kami berpengalaman melakukan pengurusan serta pendampingan mulai dari investasi awal hingga keberhasilan pendirian dan pengoperasian. Layanan kami mencakup seluruh pekerjaan yang berkaitan dengan 18 Kementerian di Indonesia.</p>
            `,
            en: `
                <h2>Integrated Legality, Permitting, Taxation, Immigration & Land Solutions (411 Services)</h2>
                <p>We offer practical solutions and advice on all aspects of running a business and maintaining the protection of valuable assets in Indonesia, along with counsel for the continuity of various permits and legality.</p>
                <p>We have experience in managing and accompanying from initial investment to successful establishment and operation. Our services cover all work related to 18 Ministries in Indonesia.</p>
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
        directoryTypes: ['sdm'] as DirectoryCategoryType[],
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
                        <p class="text-gray-600 leading-relaxed">Mulai dari rekrutmen, perencanaan karir, pembaharuan kebijakan, hingga coaching lintas generasi (Millennial & Gen Z) agar lebih empowered di tempat kerjanya.</p>
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
