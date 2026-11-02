// Client-safe CMS Types
// Auto-generated types

export interface CmsUser {
  id: string;
  username: string;
  password: string;
  name: string;
  email: string;
  role: 'super_admin' | 'editor' | 'author';
  title: string;
  bio: string;
  profile_photo_url: string;
  active: boolean;
  created_at: string;
}

export interface CmsArticle {
  id: number;
  title: string;
  slug: string;
  category: {
    id: number;
    name: string;
  };
  excerpt: string;
  content: string;
  image: string;
  image_url: string;
  supporting_images: { image: string; caption: string }[];
  author_id: string;
  author: {
    id: string;
    name: string;
    title?: string;
    profile_photo_url?: string;
  };
  status: 'published' | 'draft';
  featured: boolean;
  published_at: string;
  updated_at: string;
}

export interface CmsContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'replied' | 'archived';
  notes?: string;
  created_at: string;
}

export interface PageBlock {
  id: string;
  page: 'home' | 'tentang' | 'services' | 'kontak' | 'global';
  type:
    | 'hero'
    | 'heading_text'
    | 'features_grid'
    | 'stats_bar'
    | 'split_content'
    | 'testimonials'
    | 'faq'
    | 'cta_banner'
    | 'custom_html' | 'navbar_section' | 'footer_section' | 'about_story' | 'about_vision_mission' | 'about_values' | 'services_intro' | 'services_catalog' | 'contact_form_section';
  name: string;
  visible: boolean;
  order: number;
  style: {
    bgTheme: 'navy' | 'dark' | 'white' | 'gray';
    paddingY: 'sm' | 'md' | 'lg';
    align: 'left' | 'center';
    accentColor: string;
  };
  data: Record<string, any>;
}

export interface CmsDatabase {
  users: CmsUser[];
  articles: CmsArticle[];
  messages: CmsContactMessage[];
  blocks: PageBlock[];
  siteSettings: {
    siteName: string;
    tagline: string;
    whatsapp: string;
    email: string;
    address: string;
    heroTitle: string;
    heroHighlight: string;
    heroSubtitle: string;
    heroVideoUrl: string;
    ctaQuote: string;
    ctaGold: string;
  };
}

export const INITIAL_CMS_DB: CmsDatabase = {
  users: [
    {
      id: 'usr-admin-nh',
      username: 'admin_nh',
      password: 'NIKO1234',
      name: 'Administrator Narasumber Hukum',
      email: 'hello@narasumberhukum.com',
      role: 'super_admin',
      title: 'Super Administrator & Managing Partner',
      bio: 'Pengelola utama portal edukasi dan layanan hukum Kantor Narasumber Hukum.',
      profile_photo_url: '/logo.png',
      active: true,
      created_at: '2026-01-01T08:00:00.000Z'
    },
    {
      id: 'usr-editor-1',
      username: 'editor_hukum',
      password: 'NH2026',
      name: 'Tim Redaksi Narasumber Hukum',
      email: 'redaksi@narasumberhukum.com',
      role: 'editor',
      title: 'Senior Legal Researcher & Editor',
      bio: 'Tim riset dan penyusun kajian hukum perdata, korporasi, dan regulasi bisnis.',
      profile_photo_url: '/logo.png',
      active: true,
      created_at: '2026-02-10T09:00:00.000Z'
    },
    {
      id: 'usr-author-1',
      username: 'penulis_seleco',
      password: 'SELECO2026',
      name: 'Divisi Legalitas & Perizinan SELECO',
      email: 'legal@narasumberhukum.com',
      role: 'author',
      title: 'Corporate Licensing & Tax Specialist',
      bio: 'Spesialis kepatuhan perizinan usaha OSS RBA, HAKI, perpajakan, dan pertanahan.',
      profile_photo_url: '/logo.png',
      active: true,
      created_at: '2026-03-05T10:00:00.000Z'
    }
  ],
  articles: [
    {
      id: 1,
      title: 'Panduan Lengkap Penyelesaian Sengketa Bisnis: Litigasi vs Non-Litigasi di Indonesia',
      slug: 'panduan-lengkap-penyelesaian-sengketa-bisnis-litigasi-vs-non-litigasi',
      category: { id: 1, name: 'Hukum Perdata & Bisnis' },
      excerpt: 'Memahami perbedaan strategis antara penyelesaian sengketa melalui pengadilan (litigasi) dan jalur alternatif di luar pengadilan (mediasi, negosiasi, arbitrase) untuk melindungi aset perusahaan Anda.',
      content: `
        <p>Dalam dunia usaha yang dinamis, gesekan kepentingan maupun wanprestasi atas suatu perjanjian kontrak kerap tidak terhindarkan. Ketika sengketa bisnis terjadi, langkah hukum yang diambil oleh manajemen perusahaan akan sangat menentukan keberlangsungan operasional, reputasi, serta efisiensi biaya.</p>
        <h2>1. Penyelesaian Sengketa Non-Litigasi (Di Luar Pengadilan)</h2>
        <p>Jalur non-litigasi atau <em>Alternative Dispute Resolution</em> (ADR) diatur dalam Undang-Undang Nomor 30 Tahun 1999 tentang Arbitrase dan Alternatif Penyelesaian Sengketa. Pendekatan ini mengutamakan prinsip <em>win-win solution</em> dan kerahasiaan para pihak.</p>
        <ul>
          <li><strong>Negosiasi & Mediasi:</strong> Pertemuan langsung yang difasilitasi oleh penasihat hukum atau mediator bersertifikat guna mencapai kesepakatan perdamaian (<em>Acta Van Dading</em>).</li>
          <li><strong>Konsiliasi:</strong> Melibatkan pihak ketiga netral yang memberikan opini hukum objektif atas pokok sengketa.</li>
          <li><strong>Arbitrase (BANI):</strong> Penyelesaian sengketa komersial yang menghasilkan putusan bersifat <em>final and binding</em> (akhir dan mengikat).</li>
        </ul>
        <h2>2. Penyelesaian Sengketa Litigasi (Melalui Pengadilan)</h2>
        <p>Apabila upaya persuasif dan somasi tidak diindahkan oleh pihak lawan, maka gugatan ke Pengadilan Negeri, Pengadilan Niaga, atau Pengadilan Tata Usaha Negara menjadi instrumen penegakan hukum yang tegas.</p>
        <p>Baik dalam perkara <strong>Wanprestasi</strong> (Cidera Janji) maupun <strong>Perbuatan Melawan Hukum (PMH)</strong> berdasarkan Pasal 1365 KUHPerdata, persiapan alat bukti surat, saksi, dan pendapat ahli merupakan kunci keberhasilan dalam persidangan.</p>
        <blockquote>"Pendampingan hukum sejak tahap perancangan kontrak (contract drafting) dan negosiasi awal adalah investasi terbaik untuk mencegah kerugian litigasi di kemudian hari."</blockquote>
      `,
      image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
      image_url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
      supporting_images: [
        {
          image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80',
          caption: 'Pendampingan peninjauan kontrak dan mediasi korporasi oleh tim Narasumber Hukum.'
        }
      ],
      author_id: 'usr-admin-nh',
      author: {
        id: 'usr-admin-nh',
        name: 'Administrator Narasumber Hukum',
        title: 'Super Administrator & Managing Partner',
        profile_photo_url: '/logo.png'
      },
      status: 'published',
      featured: true,
      published_at: '2026-10-15T09:00:00.000Z',
      updated_at: '2026-10-15T09:00:00.000Z'
    },
    {
      id: 2,
      title: 'Pentingnya Kepatuhan Perizinan Usaha Berbasis Risiko (OSS RBA) & Perlindungan HAKI bagi Korporasi',
      slug: 'pentingnya-kepatuhan-perizinan-usaha-oss-rba-dan-perlindungan-haki',
      category: { id: 2, name: 'Perizinan & Legalitas' },
      excerpt: 'Panduan strategis mengurus Nomor Induk Berusaha (NIB), Sertifikat Standar, Persetujuan Bangunan Gedung (PBG), serta pendaftaran Merek dan Paten agar bisnis terhindar dari sanksi administratif.',
      content: `
        <p>Transformasi regulasi perizinan di Indonesia melalui sistem <strong>Online Single Submission Risk-Based Approach (OSS RBA)</strong> mengharuskan setiap pelaku usaha—baik PT Perorangan, PT Biasa, CV, maupun PMA—memastikan kesesuaian KBLI (Klasifikasi Baku Lapangan Usaha Indonesia) dengan aktivitas bisnis riil di lapangan.</p>
        <h2>Klasifikasi Risiko Usaha dalam OSS RBA</h2>
        <p>Tingkat risiko usaha menentukan jenis perizinan dasar dan operasional yang wajib dipenuhi:</p>
        <ol>
          <li><strong>Risiko Rendah:</strong> Cukup dengan Nomor Induk Berusaha (NIB) sebagai identitas dan legalitas menjalankan usaha.</li>
          <li><strong>Risiko Menengah Rendah & Menengah Tinggi:</strong> Membutuhkan NIB serta Sertifikat Standar (pernyataan mandiri atau diverifikasi kementerian/instansi teknis).</li>
          <li><strong>Risiko Tinggi:</strong> Wajib mengantongi NIB, Izin Teknis Kementerian, serta pemenuhan dokumen lingkungan seperti AMDAL atau UKL-UPL.</li>
        </ol>
        <h2>Perlindungan Aset Tak Berwujud Melalui HAKI</h2>
        <p>Selain izin operasional, aset terpenting perusahaan modern adalah reputasi dan inovasi. Pendaftaran <strong>Merek Dagang, Hak Cipta, Paten, dan Desain Industri</strong> di Direktorat Jenderal Kekayaan Intelektual (DJKI) memberikan hak eksklusif sekaligus perlindungan hukum terhadap pemalsuan atau pembajakan merek oleh kompetitor.</p>
      `,
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80',
      image_url: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80',
      supporting_images: [],
      author_id: 'usr-author-1',
      author: {
        id: 'usr-author-1',
        name: 'Divisi Legalitas & Perizinan SELECO',
        title: 'Corporate Licensing & Tax Specialist',
        profile_photo_url: '/logo.png'
      },
      status: 'published',
      featured: false,
      published_at: '2026-10-18T10:30:00.000Z',
      updated_at: '2026-10-18T10:30:00.000Z'
    },
    {
      id: 3,
      title: 'Mitigasi Risiko Hukum Pertanahan: Pengecekan Sertipikat, Balik Nama, hingga Penyelesaian Sengketa BPN',
      slug: 'mitigasi-risiko-hukum-pertanahan-pengecekan-sertipikat-dan-sengketa-bpn',
      category: { id: 3, name: 'Pertanahan & Properti' },
      excerpt: 'Langkah hukum krusial sebelum melakukan transaksi jual beli tanah atau akuisisi lahan komersial untuk menghindari sertipikat ganda, blokir, maupun sengketa tata usaha negara.',
      content: `
        <p>Transaksi properti dan pengadaan lahan merupakan salah satu keputusan investasi bernilai tinggi. Namun, masih banyak investor maupun masyarakat yang mengalami kerugian akibat kurangnya <em>legal due diligence</em> (uji tuntas hukum) atas objek tanah yang hendak dibeli.</p>
        <h2>Tahapan Uji Tuntas Pertanahan (Land Due Diligence)</h2>
        <ul>
          <li><strong>Pengecekan Keaslian Sertipikat di Kantor Pertanahan (BPN):</strong> Memastikan kesesuaian data fisik dan data yuridis pada buku tanah, serta memastikan tidak adanya catatan blokir, sita jaminan, atau Hak Tanggungan.</li>
          <li><strong>Verifikasi Kesesuaian Tata Ruang (KKPR / KRK):</strong> Memastikan peruntukan lahan sesuai dengan rencana bisnis atau pembangunan gedung (PBG/SLF).</li>
          <li><strong>Pembuatan Akta PPAT & Peralihan Hak:</strong> Proses jual beli, hibah, waris, atau pemasukan ke dalam perusahaan (<em>inbreng</em>) wajib dilakukan secara sah di hadapan PPAT berwenang.</li>
        </ul>
        <p>Tim Narasumber Hukum bersama PT Sedana Legal Consultant (SELECO) mendampingi klien secara menyeluruh mulai dari pengukuran ulang, konversi hak, pemecahan/penggabungan sertipikat, roya, hingga pembelaan hukum atas sengketa kepemilikan tanah di Pengadilan Negeri maupun PTUN.</p>
      `,
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80',
      image_url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80',
      supporting_images: [],
      author_id: 'usr-editor-1',
      author: {
        id: 'usr-editor-1',
        name: 'Tim Redaksi Narasumber Hukum',
        title: 'Senior Legal Researcher & Editor',
        profile_photo_url: '/logo.png'
      },
      status: 'published',
      featured: false,
      published_at: '2026-10-20T14:15:00.000Z',
      updated_at: '2026-10-20T14:15:00.000Z'
    },
    {
      id: 4,
      title: 'Transformasi Human Capital & Kepatuhan Hukum Ketenagakerjaan bagi Perusahaan Modern',
      slug: 'transformasi-human-capital-dan-kepatuhan-hukum-ketenagakerjaan',
      category: { id: 4, name: 'Ketenagakerjaan & SDM' },
      excerpt: 'Sinergi antara penyusunan Peraturan Perusahaan, Perjanjian Kerja (PKWT/PKWTT), serta program pelatihan dan pengembangan SDM lintas generasi untuk meningkatkan produktivitas organisasi.',
      content: `
        <p>Sumber Daya Manusia (SDM) yang unggul membutuhkan fondasi tata kelola hubungan industrial yang adil dan berkepastian hukum. Ketidakjelasan dalam kontrak kerja (PKWT/PKWTT) atau Peraturan Perusahaan kerap memicu perselisihan hubungan industrial yang menguras energi organisasi.</p>
        <h2>Pilar Utama Tata Kelola SDM & Hubungan Industrial</h2>
        <p>Bersama <strong>PT Teira Dwan Indonesia (MTI-Talenstory)</strong>, Narasumber Hukum menghadirkan pendekatan terintegrasi yang memadukan kepatuhan hukum ketenagakerjaan dengan pengembangan potensi <em>Human Capital</em>:</p>
        <ul>
          <li>Penyusunan & Pembaruan Peraturan Perusahaan (PP) serta Perjanjian Kerja Bersama (PKB).</li>
          <li><em>In House & Public Training</em> berbasis <em>learning journey with high business value</em>.</li>
          <li><em>People Enabler Consultancy & Career Coaching</em> untuk menyelaraskan kinerja generasi Millennial dan Gen Z di lingkungan korporasi.</li>
        </ul>
      `,
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
      image_url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
      supporting_images: [],
      author_id: 'usr-admin-nh',
      author: {
        id: 'usr-admin-nh',
        name: 'Administrator Narasumber Hukum',
        title: 'Super Administrator & Managing Partner',
        profile_photo_url: '/logo.png'
      },
      status: 'published',
      featured: false,
      published_at: '2026-10-22T11:00:00.000Z',
      updated_at: '2026-10-22T11:00:00.000Z'
    }
  ],
  messages: [
    {
      id: 'msg-1001',
      name: 'Budi Santoso, S.E.',
      email: 'budi.santoso@korporasijaya.co.id',
      phone: '081288990011',
      subject: 'Konsultasi Pendirian PT PMA & Pengurusan Izin OSS / KITAS',
      message: 'Selamat siang Tim Narasumber Hukum, perusahaan kami berencana mendirikan PT PMA di bidang perdagangan besar dan membutuhkan pendampingan pengurusan NIB, izin teknis, serta KITAS untuk 2 direktur ekspatriat. Mohon informasi jadwal konsultasi.',
      status: 'unread',
      notes: '',
      created_at: '2026-10-23T08:15:00.000Z'
    },
    {
      id: 'msg-1002',
      name: 'Hj. Ratna Dewi',
      email: 'ratnadewi.properti@gmail.com',
      phone: '081122334455',
      subject: 'Pendampingan Sengketa Sertipikat Tanah & Pemecahan SHGB',
      message: 'Halo Kantor Narasumber Hukum, saya ingin berkonsultasi terkait tumpang tindih batas lahan di sertipikat SHGB kami serta rencana pemecahan sertipikat untuk proyek komersial di Jakarta.',
      status: 'read',
      notes: 'Sudah dihubungi awal oleh tim legal, menunggu dokumen scan sertipikat.',
      created_at: '2026-10-22T14:40:00.000Z'
    }
  ],
  
export const DEFAULT_PRESET_BLOCKS: PageBlock[] = [
  // GLOBAL
  {
    id: 'blk-global-navbar',
    page: 'global',
    type: 'navbar_section',
    name: 'Header & Navbar Utama',
    visible: true,
    order: 1,
    style: { bgTheme: 'navy', paddingY: 'sm', align: 'left', accentColor: '#C5A059' },
    data: {
      brandName: 'NARASUMBER HUKUM',
      tagline: 'SENTRAL EDUKASI & SOLUSI',
      logoUrl: '/logo.png',
      ctaText: 'HUBUNGI',
      ctaUrl: '/kontak'
    }
  },
  {
    id: 'blk-global-footer',
    page: 'global',
    type: 'footer_section',
    name: 'Footer & Informasi Kontak Bawah',
    visible: true,
    order: 2,
    style: { bgTheme: 'navy', paddingY: 'md', align: 'left', accentColor: '#C5A059' },
    data: {
      aboutSummary: 'Merupakan tempat berkumpulnya para Aktivis Handal dibidang Hukum, Perizinan, Legalitas, Pengembangan dan Pelatihan SDM yang telah terkoneksi dalam satu pintu untuk dapat melayani kebutuhan Klien kami di Seluruh Indonesia.',
      offices: [
        { name: 'Kantor I', addr: 'Jl.M.H Thamrin No. 9 Lt 12, Kebon Sirih Menteng, DKI Jakarta, 10340' },
        { name: 'Kantor II', addr: 'Jl. Sunset Road No. 77, Lt.3, Kuta, Kec. Kuta, Badung, Bali, 80361' },
        { name: 'Kantor III', addr: 'Jl. Kertabumi No 1 Ruko Kertabumi Blok A No.9 Lantai 2 Karawang Kulon, Karawang Barat, Jawa Barat' }
      ],
      whatsapp: '0822 1102 0022',
      email: 'hello@narasumberhukum.com',
      copyright: 'All Rights Reserved.'
    }
  },

  // BERANDA (HOME)
  {
    id: 'blk-home-hero',
    page: 'home',
    type: 'hero',
    name: 'Hero Banner Beranda',
    visible: true,
    order: 1,
    style: { bgTheme: 'navy', paddingY: 'lg', align: 'left', accentColor: '#C5A059' },
    data: {
      badge: 'SENTRAL EDUKASI & SOLUSI HUKUM',
      title: 'SENTRAL EDUKASI',
      highlight: 'DAN SOLUSI',
      subtitle: 'Kami menyediakan layanan konsultasi dan pendampingan hukum, perizinan, perpajakan, serta legalitas usaha melalui pendekatan edukatif dan solutif. Konsultasikan kebutuhan hukum Anda bersama kami.',
      buttonText: 'LAYANAN KAMI',
      buttonUrl: '/services',
      secondaryBtnText: 'KONSULTASI SEKARANG',
      secondaryBtnUrl: '/kontak',
      bgVideoUrl: 'https://res.cloudinary.com/dysw7tjks/video/upload/v1756377208/Desain_tanpa_judul_oeaojq.mp4'
    }
  },
  {
    id: 'blk-home-stats',
    page: 'home',
    type: 'stats_bar',
    name: 'Statistik & Ringkasan Layanan',
    visible: true,
    order: 2,
    style: { bgTheme: 'navy', paddingY: 'md', align: 'center', accentColor: '#C5A059' },
    data: {
      badge: 'SENTRAL EDUKASI & SOLUSI TERPADU',
      title: 'Kesatuan Pelayanan Hukum, Legalitas & Pengembangan SDM',
      subtitle: 'Didukung kolaborasi strategis bersama PT Sedana Legal Consultant (SELECO), SELECO Project, dan PT Teira Dwan Indonesia (MTI-Talenstory).',
      items: [
        { value: '448+', label: 'Total Cakupan Layanan' },
        { value: '34', label: 'Cakupan Perkara Hukum' },
        { value: '411', label: 'Layanan Izin, Pajak & BPN' },
        { value: '18', label: 'Kementerian Terkait' }
      ]
    }
  },
  {
    id: 'blk-home-features',
    page: 'home',
    type: 'features_grid',
    name: 'Pilar 3 Layanan Unggulan',
    visible: true,
    order: 3,
    style: { bgTheme: 'white', paddingY: 'md', align: 'center', accentColor: '#C5A059' },
    data: {
      badge: 'LAYANAN UNGGULAN',
      title: 'Solusi Terpadu Kebutuhan Hukum & Bisnis',
      subtitle: 'Solusi hukum komprehensif yang disesuaikan dengan kebutuhan Anda.',
      items: [
        {
          title: 'Bidang Hukum',
          desc: 'Kami siap mendampingi, memberikan pertimbangan, serta melakukan segala bentuk upaya hukum di Indonesia (Litigasi & Non-Litigasi).'
        },
        {
          title: 'Perizinan & Legalitas (411 Layanan)',
          desc: 'Solusi praktis perlindungan aset dan legalitas bisnis. Kami mendampingi dari investasi awal hingga operasional lintas 18 Kementerian.'
        },
        {
          title: 'Pengembangan & Pelatihan SDM',
          desc: 'Kami berdedikasi merancang langkah perubahan berdampak bagi individu dan perusahaan melalui metode pelatihan SDM inovatif.'
        }
      ]
    }
  },
  {
    id: 'blk-home-values',
    page: 'home',
    type: 'about_values',
    name: 'Nilai-Nilai Perusahaan (RICCIEP)',
    visible: true,
    order: 4,
    style: { bgTheme: 'navy', paddingY: 'lg', align: 'center', accentColor: '#C5A059' },
    data: {
      badge: 'OUR VALUES',
      title: 'Nilai-Nilai Utama (R-I-C-C-I-E-P)',
      subtitle: 'Prinsip utama yang menjadi landasan setiap langkah kami dalam melayani Anda.',
      items: [
        { title: 'R - RESPONSIVE', desc: 'Action Today, Not Tomorrow. Menanggapi setiap komunikasi maksimal dalam hitungan jam.' },
        { title: 'I - INFORMATIVE', desc: 'Clarity is Power. Menyajikan data yang akurat, transparan, dan mudah dipahami.' },
        { title: 'C - COMMUNICATIVE', desc: 'Listen First, Solve Better. Membangun dialog dua arah yang jujur tanpa hambatan.' },
        { title: 'C - CREATIVE', desc: 'Think Beyond Boundaries. Menawarkan sudut pandang baru dan solusi inovatif.' },
        { title: 'I - INITIATIVE', desc: 'Lead the Way. Bertindak proaktif untuk mencegah kendala sebelum terjadi.' },
        { title: 'E - EFFECTIVE', desc: 'Result-Oriented Action. Bekerja dengan fokus pada tujuan akhir dan dampak nyata.' },
        { title: 'P - POSITIVE', desc: 'Optimism in Every Challenge. Menjaga energi positif dan memberikan rasa aman.' }
      ]
    }
  },
  {
    id: 'blk-home-testimonials',
    page: 'home',
    type: 'testimonials',
    name: 'Testimoni & Kepercayaan Klien',
    visible: true,
    order: 5,
    style: { bgTheme: 'white', paddingY: 'md', align: 'center', accentColor: '#C5A059' },
    data: {
      badge: 'TESTIMONI KLIEN',
      title: 'Dedikasi Nyata Bagi Klien Kami',
      subtitle: 'Dedikasi kami tercermin dalam setiap kesuksesan yang diraih oleh klien kami.',
      items: [
        {
          text: 'Tim Narasumber Hukum memiliki pemahaman yang mendalam tentang hukum, perizinan dan legalitas yang ada di Indonesia. Kami bersyukur semua permasalahan dalam usaha saya dapat ditangani dengan baik dan efisien.',
          name: 'Anwar Muksin',
          role: 'Klien Korporat'
        },
        {
          text: 'Ibu Debora dan tim melakukan pekerjaan yang sangat baik dan praktis. Mereka memberikan penjelasan yang jelas untuk membantu kami mengambil keputusan.',
          name: 'Ani Handayani',
          role: 'Klien Bisnis'
        },
        {
          text: 'Tim ini dapat diandalkan dan responsif. Saya sangat puas dengan kinerja tim, berintegritas dan bersedia mempertimbangkan biaya alternatif untuk menjaga kepuasan klien.',
          name: 'Ridwan Hanafi',
          role: 'Klien Individu'
        }
      ]
    }
  },
  {
    id: 'blk-home-faq',
    page: 'home',
    type: 'faq',
    name: 'Accordion Pertanyaan Populer (FAQ)',
    visible: true,
    order: 6,
    style: { bgTheme: 'gray', paddingY: 'md', align: 'center', accentColor: '#C5A059' },
    data: {
      title: 'Pertanyaan Populer Seputar Layanan',
      items: [
        {
          q: 'Bagaimana cara memulai konsultasi hukum?',
          a: 'Anda dapat menghubungi kami melalui tombol WhatsApp yang tersedia di website ini atau mengisi formulir kontak di halaman Hubungi Kami.'
        },
        {
          q: 'Berapa biaya jasa hukum di Narasumber Hukum?',
          a: 'Biaya jasa hukum kami bervariasi tergantung pada kompleksitas dan jenis perkara. Kami selalu mengedepankan transparansi dan akan memberikan estimasi biaya setelah sesi konsultasi awal.'
        },
        {
          q: 'Apakah Narasumber Hukum hanya melayani di Jakarta?',
          a: 'Meskipun kantor operasional kami berada di DKI Jakarta, Bali, dan Karawang, kami melayani klien dan menangani perkara di seluruh wilayah Indonesia.'
        }
      ]
    }
  },
  {
    id: 'blk-home-cta',
    page: 'home',
    type: 'cta_banner',
    name: 'Banner Ajakan Konsultasi (CTA)',
    visible: true,
    order: 7,
    style: { bgTheme: 'navy', paddingY: 'md', align: 'center', accentColor: '#C5A059' },
    data: {
      title: 'Jangan Ditunda Dan Dipendam,',
      highlight: 'Segera Selesaikan.',
      subtitle: 'Tim ahli kami siap memberikan solusi hukum terbaik untuk Anda. Hubungi kami sekarang untuk konsultasi awal.',
      buttonText: 'Konsultasi Gratis via WhatsApp',
      buttonUrl: 'https://wa.me/6282211020022'
    }
  },

  // TENTANG KAMI (TENTANG)
  {
    id: 'blk-tentang-story',
    page: 'tentang',
    type: 'about_story',
    name: 'Profil & Kisah Narasumber Hukum',
    visible: true,
    order: 1,
    style: { bgTheme: 'white', paddingY: 'lg', align: 'left', accentColor: '#C5A059' },
    data: {
      title: 'NARASUMBER HUKUM',
      paragraphs: [
        'NARASUMBER HUKUM saat ini terdiri dari Firma Narasumber Hukum yang bekerjasama dengan PT Sedana Legal Consultant (SELECO) dan PT Teira Dwan Indonesia (MTI-Talenstory). Dengan ini menjadikan kami sebuah kesatuan pelayanan dalam sektor Hukum, Izin, dan Legalitas disertai dengan Pengembangan dan Pelatihan Sumber Daya Manusia. Kami mengaplikasikan pengetahuan, kemampuan, dan kreativitas yang maksimal untuk mencapai tujuan bersama dengan klien kami. Kami tersedia untuk memberikan layanan hukum, izin, legalitas, pengembangan dan pelatihan SDM yang efektif dan efisien secara tepat.',
        'Pendirian NARASUMBER HUKUM dilatarbelakangi oleh pemahaman akan pentingnya kualitas pelayanan, dan komitmen terhadap kepuasan klien. Kami percaya bahwa dengan menyediakan layanan yang lengkap serta berkualitas tinggi adalah solusi yang tepat untuk memberikan berbagai kemudahan dan kelegaan bagi klien kami.',
        'Kami yakin bahwa kolaborasi dalam tim kami menghasilkan kinerja maksimal dalam menangani dan menyelesaikan kebutuhan klien kami, karena tim kami berpengalaman dan terlatih serta terbiasa menghadapi berbagai perkara atau proyek dengan tingkat keahliannya yang tinggi.'
      ]
    }
  },
  {
    id: 'blk-tentang-vision',
    page: 'tentang',
    type: 'about_vision_mission',
    name: 'Visi & Misi Perusahaan',
    visible: true,
    order: 2,
    style: { bgTheme: 'navy', paddingY: 'lg', align: 'center', accentColor: '#C5A059' },
    data: {
      visionTitle: 'Visi Kami',
      visionDesc: 'Menjadi mitra terpercaya dalam menyediakan solusi hukum yang berintegritas, inovatif, dan berorientasi pada hasil guna mendukung pertumbuhan dan kepastian hukum bagi setiap klien.',
      missionTitle: 'Misi Kami',
      missions: [
        { title: 'Pelayanan Terbaik', desc: 'Menyediakan layanan hukum berkualitas tinggi yang mendahulukan kepentingan klien dengan memberikan solusi tepat, responsif, dan inovatif.' },
        { title: 'Keadilan dan Kepastian Hukum', desc: 'Mengadvokasi keadilan dan kepastian hukum sebagai landasan utama dalam setiap tindakan hukum yang kami ambil.' },
        { title: 'Kemitraan yang Berkelanjutan', desc: 'Mengembangkan hubungan jangka panjang yang saling menguntungkan dengan klien kami.' },
        { title: 'Inovasi dan Pengetahuan', desc: 'Terus mengembangkan pengetahuan dan teknologi dalam hukum untuk memberikan solusi paling mutakhir.' }
      ]
    }
  },

  // LAYANAN (SERVICES)
  {
    id: 'blk-services-intro',
    page: 'services',
    type: 'services_intro',
    name: 'Pengenalan 3 Slide Layanan',
    visible: true,
    order: 1,
    style: { bgTheme: 'navy', paddingY: 'md', align: 'center', accentColor: '#C5A059' },
    data: {
      badge: 'KATALOG LAYANAN RESMI',
      title: 'Layanan Terpadu Narasumber Hukum',
      subtitle: 'Terbagi dalam 3 Divisi Utama: Pelayanan Hukum (34 Perkara), Pelayanan Perizinan & Legalitas (411 Layanan), serta Pelayanan Pelatihan & Pengembangan SDM (6 Program).'
    }
  },
  {
    id: 'blk-services-catalog',
    page: 'services',
    type: 'services_catalog',
    name: 'Katalog Interaktif 3 Slide & 411 Perizinan',
    visible: true,
    order: 2,
    style: { bgTheme: 'white', paddingY: 'lg', align: 'left', accentColor: '#C5A059' },
    data: {
      slide1Title: 'Slide 1: Pelayanan Hukum',
      slide1Desc: 'Meliputi seluruh Perkara/Upaya Hukum di Indonesia, baik Litigasi (Pengadilan) maupun Non-Litigasi (Luar Pengadilan).',
      slide2Title: 'Slide 2: Pelayanan Perizinan dan Legalitas',
      slide2Desc: 'Pengurusan & pendampingan lengkap dari investasi awal hingga operasional, mencakup 411 izin di 18 Kementerian RI.',
      slide3Title: 'Slide 3: Pengembangan dan Pelatihan SDM',
      slide3Desc: 'Merancang langkah perubahan berdampak melalui In-House Training, Outbound, People Enabler, Career Coaching, dan R&D.'
    }
  },

  // KONTAK (KONTAK)
  {
    id: 'blk-kontak-form',
    page: 'kontak',
    type: 'contact_form_section',
    name: 'Formulir Konsultasi & Alamat Kantor',
    visible: true,
    order: 1,
    style: { bgTheme: 'gray', paddingY: 'lg', align: 'left', accentColor: '#C5A059' },
    data: {
      title: 'Hubungi Kami',
      subtitle: 'Kami siap mendengarkan dan mendampingi setiap perkara Anda dengan profesionalisme tinggi.',
      whatsapp: '+62-822-1102-0022',
      email: 'hello@narasumberhukum.com',
      address: 'Jakarta Pusat, Indonesia'
    }
  }
];

  blocks: DEFAULT_PRESET_BLOCKS,
  siteSettings: {
    siteName: 'Narasumber Hukum',
    tagline: 'Sentral Edukasi & Solusi',
    whatsapp: '6282211020022',
    email: 'hello@narasumberhukum.com',
    address: 'Jakarta Pusat, Indonesia',
    heroTitle: 'SENTRAL EDUKASI',
    heroHighlight: 'DAN SOLUSI',
    heroSubtitle: 'Kami menyediakan layanan konsultasi dan pendampingan hukum, perizinan, perpajakan, serta legalitas usaha melalui pendekatan edukatif dan solutif. Konsultasikan kebutuhan hukum Anda bersama kami.',
    heroVideoUrl: 'https://res.cloudinary.com/dysw7tjks/video/upload/v1756377208/Desain_tanpa_judul_oeaojq.mp4',
    ctaQuote: 'Keadilan dan Kepastian Hukum Adalah Hak Setiap Warga Negara,',
    ctaGold: 'Konsultasikan Masalah Hukum Anda Bersama Kami.'
  }
};

