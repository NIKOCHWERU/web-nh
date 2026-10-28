"use client";
import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  FileText,
  Mail,
  Layers,
  Users,
  Settings,
  LogOut,
  Plus,
  Trash2,
  Edit3,
  Eye,
  EyeOff,
  CheckCircle,
  Search,
  ExternalLink,
  Copy,
  ArrowUp,
  ArrowDown,
  Monitor,
  Tablet,
  Smartphone,
  Save,
  Lock,
  UserCheck,
  Shield,
  MessageSquare,
  Send,
  Sparkles,
  Image as ImageIcon,
  Code,
  ListChecks,
  HelpCircle,
  BarChart3,
  Megaphone,
  Columns,
  Type,
  RefreshCw,
  Check,
  X
} from 'lucide-react';
import {
  CmsDatabase,
  CmsUser,
  CmsArticle,
  CmsContactMessage,
  PageBlock,
  INITIAL_CMS_DB
} from '@/lib/cmsStorage';
import { BlockRendererItem } from '@/components/CustomBlocksRenderer';

type ActiveTab = 'overview' | 'articles' | 'messages' | 'builder' | 'users' | 'settings';

const BLOCK_TEMPLATES: {
  type: PageBlock['type'];
  label: string;
  desc: string;
  icon: React.ReactNode;
  defaultData: Record<string, any>;
}[] = [
  {
    type: 'stats_bar',
    label: 'Statistik & Angka',
    desc: 'Baris 4 kotak angka pencapaian & statistik layanan',
    icon: <BarChart3 size={18} />,
    defaultData: {
      badge: 'PENCAPAIAN KAMI',
      title: 'Kepercayaan Klien Adalah Prioritas Utama',
      subtitle: 'Dedikasi penuh dalam menangani perkara hukum, legalitas bisnis, dan pengembangan SDM.',
      items: [
        { value: '448+', label: 'Cakupan Layanan' },
        { value: '34', label: 'Perkara Litigasi & Non-Litigasi' },
        { value: '411', label: 'Layanan Perizinan & Pajak' },
        { value: '18', label: 'Kementerian Terkait' }
      ]
    }
  },
  {
    type: 'hero',
    label: 'Hero / Banner Seksi',
    desc: 'Banner besar dengan judul, teks emas, gambar latar & tombol',
    icon: <Sparkles size={18} />,
    defaultData: {
      badge: 'SENTRAL EDUKASI & SOLUSI HUKUM',
      title: 'Pendampingan Hukum Profesional &',
      highlight: 'Terpercaya di Indonesia',
      subtitle: 'Kami hadir memberikan kepastian hukum, pengurusan legalitas terpadu, serta pengembangan SDM korporasi.',
      bgImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1600&q=80',
      buttonText: 'Konsultasi Sekarang',
      buttonUrl: '/kontak'
    }
  },
  {
    type: 'heading_text',
    label: 'Heading & Paragraf',
    desc: 'Blok judul seksi formal beserta uraian teks atau artikel',
    icon: <Type size={18} />,
    defaultData: {
      badge: 'INFORMASI HUKUM',
      title: 'Komitmen Pelayanan Hukum Berkeadilan',
      body: '<p>Kantor Narasumber Hukum berkomitmen menyajikan analisis hukum yang akurat, transparan, dan berorientasi pada solusi terbaik bagi setiap klien individu maupun korporasi.</p>'
    }
  },
  {
    type: 'features_grid',
    label: 'Grid 3 Kolom Fitur',
    desc: 'Tiga kartu keunggulan atau layanan dengan ikon emas',
    icon: <Columns size={18} />,
    defaultData: {
      badge: 'KEUNGGULAN KAMI',
      title: 'Pilar Pendampingan Terpadu',
      subtitle: 'Sinergi layanan hukum, perizinan usaha, dan manajemen talenta.',
      items: [
        {
          title: 'Litigasi & Non-Litigasi',
          desc: 'Penanganan perkara perdata, pidana, niaga, tata usaha negara, hingga mediasi di luar pengadilan.'
        },
        {
          title: 'Legalitas & Perpajakan',
          desc: 'Pengurusan izin OSS RBA, HAKI, BPOM, kepatuhan SPT Pajak, KITAS, hingga sertipikat BPN.'
        },
        {
          title: 'Pengembangan SDM',
          desc: 'In-house training, outbound teambuilding, dan people enabler consultancy.'
        }
      ]
    }
  },
  {
    type: 'split_content',
    label: 'Split Gambar & Teks',
    desc: 'Tata letak 2 kolom gambar di samping teks & daftar poin',
    icon: <ImageIcon size={18} />,
    defaultData: {
      badge: 'KOLABORASI STRATEGIS',
      title: 'Sinergi Narasumber Hukum, SELECO & MTI-Talenstory',
      desc: 'Menjadikan kami kesatuan pelayanan dalam sektor Hukum, Izin, dan Legalitas disertai Pengembangan Sumber Daya Manusia.',
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1000&q=80',
      imagePosition: 'left',
      bullets: [
        'Pendampingan oleh Advokat & Konsultan Hukum berlisensi resmi',
        'Pengurusan perizinan lintas 18 Kementerian di Indonesia',
        'Program pelatihan SDM terukur dan berdampak tinggi'
      ],
      buttonText: 'Pelajari Layanan Kami',
      buttonUrl: '/services'
    }
  },
  {
    type: 'faq',
    label: 'Accordion FAQ',
    desc: 'Daftar tanya jawab interaktif yang dapat dibuka-tutup',
    icon: <HelpCircle size={18} />,
    defaultData: {
      title: 'Pertanyaan Seputar Layanan Kami',
      items: [
        {
          q: 'Bagaimana prosedur awal konsultasi perkara hukum?',
          a: 'Anda dapat menghubungi tim kami melalui formulir website atau WhatsApp untuk menjadwalkan sesi konsultasi awal dan bedah dokumen hukum.'
        },
        {
          q: 'Apakah melayani pengurusan perizinan usaha di luar Jakarta?',
          a: 'Ya, layanan hukum dan perizinan kami menjangkau seluruh wilayah Indonesia.'
        }
      ]
    }
  },
  {
    type: 'testimonials',
    label: 'Testimoni Klien',
    desc: 'Kartu kutipan ulasan dan apresiasi dari klien',
    icon: <ListChecks size={18} />,
    defaultData: {
      title: 'Apresiasi & Kepercayaan Klien',
      items: [
        {
          text: 'Pendampingan yang sangat profesional, komunikatif, dan memberikan kepastian hukum bagi perusahaan kami.',
          name: 'Direktur Operasional',
          role: 'Perusahaan Manufaktur Nasional'
        },
        {
          text: 'Proses pengurusan legalitas OSS, HAKI, dan pajak perusahaan berjalan cepat dan transparan.',
          name: 'Managing Director',
          role: 'Grup Bisnis & Properti'
        }
      ]
    }
  },
  {
    type: 'cta_banner',
    label: 'Banner Call To Action',
    desc: 'Banner ajakan konsultasi dengan tombol WhatsApp langsung',
    icon: <Megaphone size={18} />,
    defaultData: {
      title: 'Butuh Pendampingan Hukum atau Perizinan',
      highlight: 'Secara Cepat & Resmi?',
      subtitle: 'Diskusikan kebutuhan hukum, pajak, imigrasi, atau perizinan bisnis Anda bersama tim ahli kami.',
      buttonText: 'Hubungi Tim Kami via WhatsApp',
      buttonUrl: 'https://wa.me/6282211020022'
    }
  },
  {
    type: 'custom_html',
    label: 'Custom HTML / Embed',
    desc: 'Blok kode HTML bebas, tabel kustom, atau embed video/map',
    icon: <Code size={18} />,
    defaultData: {
      html: '<div class="p-6 rounded-xl bg-gold/10 border border-gold/30 text-center"><h3 class="text-xl font-bold mb-2">Pengumuman / Konten Kustom</h3><p class="text-sm opacity-80">Anda dapat menulis HTML kustom di sini melalui panel inspektor di sebelah kanan.</p></div>'
    }
  }
];

export default function DashboardClient() {
  // Authentication state
  const [currentUser, setCurrentUser] = useState< Omit<CmsUser, 'password'> | null >(null);
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // CMS Database state
  const [db, setDb] = useState<CmsDatabase>(INITIAL_CMS_DB);
  const [loadingDb, setLoadingDb] = useState(true);
  const [savingDb, setSavingDb] = useState(false);
  const [toast, setToast] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Navigation tab
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');

  // --- ARTICLES MODULE STATE ---
  const [articleSearch, setArticleSearch] = useState('');
  const [articleStatusFilter, setArticleStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [editingArticle, setEditingArticle] = useState<Partial<CmsArticle> | null>(null);
  const [articlePreviewMode, setArticlePreviewMode] = useState(false);

  // --- MESSAGES MODULE STATE ---
  const [messageSearch, setMessageSearch] = useState('');
  const [messageStatusFilter, setMessageStatusFilter] = useState<'all' | 'unread' | 'read' | 'replied' | 'archived'>('all');
  const [selectedMessage, setSelectedMessage] = useState<CmsContactMessage | null>(null);

  // --- VISUAL BUILDER (ELEMENTOR) STATE ---
  const [builderPage, setBuilderPage] = useState<'home' | 'tentang' | 'services' | 'kontak'>('home');
  const [builderViewport, setBuilderViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [inspectorTab, setInspectorTab] = useState<'content' | 'style' | 'global'>('content');

  // --- USERS MODULE STATE ---
  const [editingUser, setEditingUser] = useState<Partial<CmsUser> | null>(null);

  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    setToast({ text, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Load session & DB
  useEffect(() => {
    const savedUser = sessionStorage.getItem('nh_cms_user');
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch {
        // ignore
      }
    }
    fetchCmsData();
  }, []);

  const fetchCmsData = async () => {
    setLoadingDb(true);
    try {
      const res = await fetch('/api/cms', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        setDb(data);
        if (data.blocks?.length > 0 && !selectedBlockId) {
          const firstHome = data.blocks.find((b: PageBlock) => b.page === 'home');
          if (firstHome) setSelectedBlockId(firstHome.id);
        }
      }
    } catch (err) {
      console.error('Failed to fetch CMS DB:', err);
    } finally {
      setLoadingDb(false);
    }
  };

  const persistCmsData = async (nextDb: CmsDatabase, successMsg = 'Perubahan berhasil disimpan ke website!') => {
    setSavingDb(true);
    setDb(nextDb);
    try {
      const res = await fetch('/api/cms', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nextDb)
      });
      if (!res.ok) throw new Error('Save failed');
      showToast(successMsg, 'success');
    } catch {
      showToast('Gagal menyimpan ke server.', 'error');
    } finally {
      setSavingDb(false);
    }
  };

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);

    try {
      const res = await fetch('/api/cms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'login',
          username: loginUsername,
          password: loginPassword
        })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        // Fallback check against in-memory db users
        const fallbackUser = db.users.find(
          (u) =>
            u.username.toLowerCase() === loginUsername.trim().toLowerCase() &&
            u.password === loginPassword &&
            u.active
        );
        if (fallbackUser) {
          const { password: _p, ...safeUser } = fallbackUser;
          setCurrentUser(safeUser);
          sessionStorage.setItem('nh_cms_user', JSON.stringify(safeUser));
          showToast(`Selamat datang, ${safeUser.name}!`);
        } else {
          setLoginError(data.message || 'Username atau password salah.');
        }
      } else {
        setCurrentUser(data.user);
        sessionStorage.setItem('nh_cms_user', JSON.stringify(data.user));
        showToast(`Selamat datang, ${data.user.name}!`);
      }
    } catch {
      setLoginError('Terjadi kesalahan koneksi saat login.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    sessionStorage.removeItem('nh_cms_user');
    setLoginUsername('');
    setLoginPassword('');
  };

  // Filtered Articles
  const filteredArticles = useMemo(() => {
    return db.articles.filter((art) => {
      if (articleStatusFilter !== 'all' && art.status !== articleStatusFilter) return false;
      if (!articleSearch.trim()) return true;
      const q = articleSearch.toLowerCase();
      return (
        art.title.toLowerCase().includes(q) ||
        (art.category?.name || '').toLowerCase().includes(q) ||
        (art.author?.name || '').toLowerCase().includes(q)
      );
    });
  }, [db.articles, articleStatusFilter, articleSearch]);

  // Filtered Messages
  const filteredMessages = useMemo(() => {
    return db.messages.filter((msg) => {
      if (messageStatusFilter !== 'all' && msg.status !== messageStatusFilter) return false;
      if (!messageSearch.trim()) return true;
      const q = messageSearch.toLowerCase();
      return (
        msg.name.toLowerCase().includes(q) ||
        msg.email.toLowerCase().includes(q) ||
        msg.subject.toLowerCase().includes(q) ||
        msg.message.toLowerCase().includes(q) ||
        msg.phone.toLowerCase().includes(q)
      );
    });
  }, [db.messages, messageStatusFilter, messageSearch]);

  // Page Builder Blocks for current page
  const currentPageBlocks = useMemo(() => {
    return db.blocks
      .filter((b) => b.page === builderPage)
      .sort((a, b) => a.order - b.order);
  }, [db.blocks, builderPage]);

  const selectedBlock = useMemo(() => {
    return db.blocks.find((b) => b.id === selectedBlockId) || null;
  }, [db.blocks, selectedBlockId]);

  const unreadCount = useMemo(
    () => db.messages.filter((m) => m.status === 'unread').length,
    [db.messages]
  );

  // --- ARTICLE ACTIONS ---
  const openNewArticle = () => {
    const defaultAuthor =
      db.users.find((u) => u.id === currentUser?.id) || db.users[0];
    setEditingArticle({
      title: '',
      slug: '',
      category: { id: 1, name: 'Hukum Perdata & Bisnis' },
      excerpt: '',
      content: '<p>Tulis pembahasan artikel edukasi hukum di sini...</p>',
      image_url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
      supporting_images: [],
      author_id: defaultAuthor.id,
      status: 'published',
      featured: false,
      published_at: new Date().toISOString().slice(0, 10)
    });
    setArticlePreviewMode(false);
  };

  const handleSaveArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArticle?.title?.trim()) {
      showToast('Judul artikel wajib diisi.', 'error');
      return;
    }

    const authorObj =
      db.users.find((u) => u.id === editingArticle.author_id) || db.users[0];

    const generatedSlug =
      editingArticle.slug?.trim() ||
      editingArticle.title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-');

    const isExisting = Boolean(editingArticle.id);
    const articleId =
      editingArticle.id ||
      (db.articles.length > 0 ? Math.max(...db.articles.map((a) => a.id)) + 1 : 1);

    const savedArticle: CmsArticle = {
      id: articleId,
      title: editingArticle.title.trim(),
      slug: generatedSlug,
      category: {
        id: 1,
        name: editingArticle.category?.name || 'Hukum & Edukasi'
      },
      excerpt:
        editingArticle.excerpt?.trim() ||
        (editingArticle.content || '').replace(/<[^>]*>/g, '').slice(0, 160),
      content: editingArticle.content || '',
      image: editingArticle.image_url || 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
      image_url: editingArticle.image_url || 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
      supporting_images: editingArticle.supporting_images || [],
      author_id: authorObj.id,
      author: {
        id: authorObj.id,
        name: authorObj.name,
        title: authorObj.title,
        profile_photo_url: authorObj.profile_photo_url
      },
      status: editingArticle.status === 'draft' ? 'draft' : 'published',
      featured: Boolean(editingArticle.featured),
      published_at: editingArticle.published_at
        ? new Date(editingArticle.published_at).toISOString()
        : new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    let nextArticles = [...db.articles];
    if (savedArticle.featured) {
      nextArticles = nextArticles.map((a) => ({ ...a, featured: false }));
    }

    if (isExisting) {
      nextArticles = nextArticles.map((a) => (a.id === articleId ? savedArticle : a));
    } else {
      nextArticles.unshift(savedArticle);
    }

    await persistCmsData({ ...db, articles: nextArticles }, 'Artikel berhasil disimpan!');
    setEditingArticle(null);
  };

  const handleDeleteArticle = async (id: number) => {
    const nextArticles = db.articles.filter((a) => a.id !== id);
    await persistCmsData({ ...db, articles: nextArticles }, 'Artikel berhasil dihapus.');
  };

  const insertArticleSnippet = (htmlSnippet: string) => {
    if (!editingArticle) return;
    setEditingArticle({
      ...editingArticle,
      content: `${editingArticle.content || ''}\n${htmlSnippet}`
    });
  };

  const handleImageFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    onLoaded: (dataUrl: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onLoaded(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  // --- MESSAGE ACTIONS ---
  const handleUpdateMessage = async (
    id: string,
    updates: Partial<CmsContactMessage>
  ) => {
    const nextMessages = db.messages.map((m) =>
      m.id === id ? { ...m, ...updates } : m
    );
    const updatedSelected = nextMessages.find((m) => m.id === id) || null;
    setSelectedMessage(updatedSelected);
    await persistCmsData({ ...db, messages: nextMessages }, 'Status pesan diperbarui.');
  };

  const handleDeleteMessage = async (id: string) => {
    const nextMessages = db.messages.filter((m) => m.id !== id);
    if (selectedMessage?.id === id) setSelectedMessage(null);
    await persistCmsData({ ...db, messages: nextMessages }, 'Pesan berhasil dihapus.');
  };

  // --- VISUAL BUILDER (ELEMENTOR) ACTIONS ---
  const handleAddBlock = (template: (typeof BLOCK_TEMPLATES)[number]) => {
    const newBlock: PageBlock = {
      id: `blk-${Date.now()}`,
      page: builderPage,
      type: template.type,
      name: template.label,
      visible: true,
      order: currentPageBlocks.length + 1,
      style: {
        bgTheme: template.type === 'hero' || template.type === 'stats_bar' || template.type === 'cta_banner' ? 'navy' : 'white',
        paddingY: 'md',
        align: template.type === 'split_content' ? 'left' : 'center',
        accentColor: '#C5A059'
      },
      data: JSON.parse(JSON.stringify(template.defaultData))
    };

    const nextBlocks = [...db.blocks, newBlock];
    setDb({ ...db, blocks: nextBlocks });
    setSelectedBlockId(newBlock.id);
    setInspectorTab('content');
    showToast(`Blok "${template.label}" ditambahkan ke halaman! Klik Simpan untuk mempublikasikan.`);
  };

  const handleUpdateSelectedBlock = (updater: (b: PageBlock) => PageBlock) => {
    if (!selectedBlockId) return;
    const nextBlocks = db.blocks.map((b) => (b.id === selectedBlockId ? updater(b) : b));
    setDb({ ...db, blocks: nextBlocks });
  };

  const handleMoveBlock = (blockId: string, direction: 'up' | 'down') => {
    const pageList = [...currentPageBlocks];
    const index = pageList.findIndex((b) => b.id === blockId);
    if (index === -1) return;
    const swapIdx = direction === 'up' ? index - 1 : index + 1;
    if (swapIdx < 0 || swapIdx >= pageList.length) return;

    const temp = pageList[index];
    pageList[index] = pageList[swapIdx];
    pageList[swapIdx] = temp;

    const reorderedIds = new Map(pageList.map((b, i) => [b.id, i + 1]));
    const nextBlocks = db.blocks.map((b) =>
      reorderedIds.has(b.id) ? { ...b, order: reorderedIds.get(b.id)! } : b
    );
    setDb({ ...db, blocks: nextBlocks });
  };

  const handleDuplicateBlock = (block: PageBlock) => {
    const copy: PageBlock = {
      ...JSON.parse(JSON.stringify(block)),
      id: `blk-${Date.now()}`,
      name: `${block.name} (Salinan)`,
      order: currentPageBlocks.length + 1
    };
    setDb({ ...db, blocks: [...db.blocks, copy] });
    setSelectedBlockId(copy.id);
  };

  const handleDeleteBlock = (blockId: string) => {
    const nextBlocks = db.blocks.filter((b) => b.id !== blockId);
    setDb({ ...db, blocks: nextBlocks });
    if (selectedBlockId === blockId) {
      setSelectedBlockId(nextBlocks.find((b) => b.page === builderPage)?.id || null);
    }
  };

  // --- USER / AUTHOR MANAGEMENT ACTIONS ---
  const handleSaveUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser?.username?.trim() || !editingUser?.name?.trim()) {
      showToast('Username dan Nama Lengkap wajib diisi.', 'error');
      return;
    }

    const isExisting = Boolean(editingUser.id);
    const duplicateUsername = db.users.some(
      (u) =>
        u.username.toLowerCase() === editingUser.username!.trim().toLowerCase() &&
        u.id !== editingUser.id
    );
    if (duplicateUsername) {
      showToast('Username sudah digunakan oleh user lain.', 'error');
      return;
    }

    const savedUser: CmsUser = {
      id: editingUser.id || `usr-${Date.now()}`,
      username: editingUser.username.trim(),
      password: editingUser.password || 'NH2026',
      name: editingUser.name.trim(),
      email: editingUser.email?.trim() || 'penulis@narasumberhukum.com',
      role: editingUser.role || 'author',
      title: editingUser.title?.trim() || 'Penulis & Konsultan Hukum',
      bio: editingUser.bio?.trim() || '',
      profile_photo_url: editingUser.profile_photo_url || '/logo.png',
      active: editingUser.active !== undefined ? editingUser.active : true,
      created_at: editingUser.created_at || new Date().toISOString()
    };

    const nextUsers = isExisting
      ? db.users.map((u) => (u.id === savedUser.id ? savedUser : u))
      : [...db.users, savedUser];

    await persistCmsData({ ...db, users: nextUsers }, 'Data user / penulis berhasil disimpan!');
    setEditingUser(null);
  };

  const handleDeleteUser = async (id: string) => {
    const target = db.users.find((u) => u.id === id);
    if (target?.username === 'admin_nh') {
      showToast('Akun utama admin_nh tidak dapat dihapus.', 'error');
      return;
    }
    const nextUsers = db.users.filter((u) => u.id !== id);
    await persistCmsData({ ...db, users: nextUsers }, 'User berhasil dihapus.');
  };

  // ============================================================================
  // RENDER LOGIN SCREEN IF NOT LOGGED IN
  // ============================================================================
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[#0a0a0b] text-white flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(197,160,89,0.14),transparent_50%)] pointer-events-none" />
        <div className="w-full max-w-md bg-[#121216] border border-white/10 rounded-2xl p-8 shadow-2xl relative z-10">
          <div className="flex flex-col items-center text-center mb-8">
            <img src="/logo.png" alt="Logo Narasumber Hukum" className="w-16 h-16 object-contain mb-4" />
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-gold mb-1">
              ENTERPRISE CMS & VISUAL BUILDER
            </span>
            <h1 className="text-2xl font-bold text-white font-serif tracking-wide">
              NARASUMBER HUKUM
            </h1>
            <p className="text-xs text-gray-400 mt-1.5">
              Masuk untuk mengelola artikel, pesan klien, penulis, dan halaman website.
            </p>
          </div>

          {loginError && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-medium text-center">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                Username
              </label>
              <input
                type="text"
                required
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
                placeholder="Masukkan username (contoh: admin_nh)"
                className="w-full px-4 py-3 rounded-xl bg-[#1a1a20] border border-white/15 focus:border-gold text-white text-sm focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                Password
              </label>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="Masukkan password"
                className="w-full px-4 py-3 rounded-xl bg-[#1a1a20] border border-white/15 focus:border-gold text-white text-sm focus:outline-none transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3.5 rounded-xl bg-gold text-navy font-bold text-xs uppercase tracking-widest hover:bg-white transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <Lock size={15} />
              {loginLoading ? 'Memverifikasi...' : 'Masuk ke Dashboard'}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-white/10 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-gold transition-colors"
            >
              <ExternalLink size={13} /> Kembali ke Beranda Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const canManageBuilderAndUsers = currentUser.role === 'super_admin' || currentUser.role === 'editor';

  // ============================================================================
  // RENDER AUTHENTICATED DASHBOARD
  // ============================================================================
  return (
    <div className="min-h-screen bg-[#0c0c0f] text-white flex flex-col lg:flex-row font-sans">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed bottom-5 right-5 z-50 px-5 py-3.5 rounded-xl shadow-2xl border flex items-center gap-2.5 text-xs font-bold tracking-wide transition-all ${
            toast.type === 'success'
              ? 'bg-emerald-950/95 border-emerald-500/40 text-emerald-200'
              : 'bg-red-950/95 border-red-500/40 text-red-200'
          }`}
        >
          <CheckCircle size={16} className="text-gold shrink-0" />
          <span>{toast.text}</span>
        </div>
      )}

      {/* LEFT SIDEBAR NAVIGATION */}
      <aside className="w-full lg:w-64 bg-[#121217] border-b lg:border-b-0 lg:border-r border-white/10 shrink-0 flex flex-col justify-between">
        <div>
          {/* Brand Header */}
          <div className="p-5 border-b border-white/10 flex items-center justify-between lg:justify-start gap-3">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="Logo NH" className="w-10 h-10 object-contain" />
              <div>
                <div className="text-sm font-bold text-gold font-serif tracking-wider leading-tight">
                  NARASUMBER HUKUM
                </div>
                <div className="text-[10px] text-gray-400 uppercase tracking-widest">
                  CMS & Visual Studio
                </div>
              </div>
            </div>
            <Link
              href="/"
              target="_blank"
              className="lg:hidden px-3 py-1.5 rounded-lg bg-white/5 text-gold text-xs font-bold flex items-center gap-1"
            >
              <ExternalLink size={13} /> Web
            </Link>
          </div>

          {/* Logged-in User Card */}
          <div className="px-4 py-3.5 border-b border-white/10 bg-[#16161d] flex items-center gap-3">
            <img
              src={currentUser.profile_photo_url || '/logo.png'}
              alt={currentUser.name}
              className="w-9 h-9 rounded-full object-cover border border-gold/40 bg-navy shrink-0"
            />
            <div className="min-w-0 flex-1">
              <div className="text-xs font-bold text-white truncate">{currentUser.name}</div>
              <div className="text-[10px] text-gold uppercase tracking-wider font-semibold">
                {currentUser.role === 'super_admin'
                  ? 'Super Admin'
                  : currentUser.role === 'editor'
                  ? 'Editor'
                  : 'Penulis Artikel'}
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <nav className="p-3 flex lg:flex-col gap-1.5 overflow-x-auto">
            {[
              { id: 'overview', label: 'Ringkasan', icon: <LayoutDashboard size={17} />, show: true },
              {
                id: 'articles',
                label: 'Kelola Artikel',
                icon: <FileText size={17} />,
                badge: db.articles.length,
                show: true
              },
              {
                id: 'messages',
                label: 'Pesan Masuk Form',
                icon: <Mail size={17} />,
                badge: unreadCount > 0 ? unreadCount : undefined,
                badgeAlert: unreadCount > 0,
                show: true
              },
              {
                id: 'builder',
                label: 'Visual Block Builder',
                icon: <Layers size={17} />,
                show: canManageBuilderAndUsers
              },
              {
                id: 'users',
                label: 'Manajemen User / Penulis',
                icon: <Users size={17} />,
                badge: db.users.length,
                show: canManageBuilderAndUsers
              },
              {
                id: 'settings',
                label: 'Pengaturan Website',
                icon: <Settings size={17} />,
                show: canManageBuilderAndUsers
              }
            ]
              .filter((item) => item.show)
              .map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id as ActiveTab)}
                  className={`flex items-center justify-between gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    activeTab === item.id
                      ? 'bg-gold text-navy shadow-md'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                        activeTab === item.id
                          ? 'bg-navy text-gold'
                          : item.badgeAlert
                          ? 'bg-red-500 text-white'
                          : 'bg-white/10 text-gray-300'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              ))}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="hidden lg:flex flex-col gap-2 p-4 border-t border-white/10">
          <Link
            href="/"
            target="_blank"
            className="w-full py-2.5 px-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-200 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
          >
            <ExternalLink size={14} className="text-gold" />
            Lihat Website Live
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="w-full py-2.5 px-3.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/25 text-red-300 text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <LogOut size={14} />
            Keluar (`{currentUser.username}`)
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header Bar */}
        <header className="h-16 bg-[#121217] border-b border-white/10 px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <h2 className="text-base md:text-lg font-bold text-white">
              {activeTab === 'overview' && 'Ringkasan Eksekutif & Aktivitas Website'}
              {activeTab === 'articles' && 'Manajemen Artikel & Edukasi Hukum'}
              {activeTab === 'messages' && 'Kotak Masuk Pesan Formulir Kontak'}
              {activeTab === 'builder' && 'Visual Block Page Builder (Elementor Mode)'}
              {activeTab === 'users' && 'Manajemen Akun Pengguna & Penulis Artikel'}
              {activeTab === 'settings' && 'Pengaturan Umum & Identitas Website'}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={fetchCmsData}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-gold transition-colors cursor-pointer"
              title="Muat Ulang Data"
            >
              <RefreshCw size={16} className={loadingDb ? 'animate-spin text-gold' : ''} />
            </button>
            <button
              type="button"
              onClick={() => persistCmsData(db)}
              disabled={savingDb}
              className="px-4 py-2 rounded-xl bg-gold text-navy hover:bg-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <Save size={14} />
              {savingDb ? 'Menyimpan...' : 'Simpan Semua'}
            </button>
          </div>
        </header>

        {/* WORKSPACE BODY */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* =================================================================
              TAB 1: OVERVIEW
          ================================================================= */}
          {activeTab === 'overview' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              {/* KPI Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div
                  onClick={() => setActiveTab('articles')}
                  className="bg-[#15151c] border border-white/10 hover:border-gold/40 rounded-2xl p-5 cursor-pointer transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                      Total Artikel
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-gold/15 text-gold flex items-center justify-center">
                      <FileText size={18} />
                    </div>
                  </div>
                  <div className="text-3xl font-extrabold text-white mb-1">{db.articles.length}</div>
                  <div className="text-xs text-gray-400">
                    {db.articles.filter((a) => a.status === 'published').length} Terbit &bull;{' '}
                    {db.articles.filter((a) => a.status === 'draft').length} Draft
                  </div>
                </div>

                <div
                  onClick={() => setActiveTab('messages')}
                  className="bg-[#15151c] border border-white/10 hover:border-gold/40 rounded-2xl p-5 cursor-pointer transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                      Pesan Masuk Form
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                      <Mail size={18} />
                    </div>
                  </div>
                  <div className="text-3xl font-extrabold text-white mb-1">{db.messages.length}</div>
                  <div className="text-xs text-emerald-400 font-semibold">
                    {unreadCount} pesan belum dibaca
                  </div>
                </div>

                <div
                  onClick={() => canManageBuilderAndUsers && setActiveTab('builder')}
                  className="bg-[#15151c] border border-white/10 hover:border-gold/40 rounded-2xl p-5 cursor-pointer transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                      Blok Halaman Aktif
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center">
                      <Layers size={18} />
                    </div>
                  </div>
                  <div className="text-3xl font-extrabold text-white mb-1">{db.blocks.length}</div>
                  <div className="text-xs text-gray-400">Visual Block Builder (Elementor)</div>
                </div>

                <div
                  onClick={() => canManageBuilderAndUsers && setActiveTab('users')}
                  className="bg-[#15151c] border border-white/10 hover:border-gold/40 rounded-2xl p-5 cursor-pointer transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                      User & Penulis
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center">
                      <Users size={18} />
                    </div>
                  </div>
                  <div className="text-3xl font-extrabold text-white mb-1">{db.users.length}</div>
                  <div className="text-xs text-gray-400">
                    {db.users.filter((u) => u.active).length} akun penulis aktif
                  </div>
                </div>
              </div>

              {/* Quick Action Buttons */}
              <div className="bg-[#15151c] border border-white/10 rounded-2xl p-6">
                <h3 className="text-xs font-bold uppercase tracking-widest text-gold mb-4">
                  Aksi Cepat Administrator
                </h3>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('articles');
                      openNewArticle();
                    }}
                    className="px-4 py-2.5 rounded-xl bg-gold text-navy font-bold text-xs flex items-center gap-2 hover:bg-white transition-all cursor-pointer"
                  >
                    <Plus size={15} /> Tulis Artikel Hukum Baru
                  </button>
                  {canManageBuilderAndUsers && (
                    <button
                      type="button"
                      onClick={() => setActiveTab('builder')}
                      className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs flex items-center gap-2 transition-all cursor-pointer"
                    >
                      <Layers size={15} className="text-gold" /> Buka Visual Block Builder (Elementor)
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setActiveTab('messages')}
                    className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <MessageSquare size={15} className="text-emerald-400" /> Kelola Pesan Masuk ({db.messages.length})
                  </button>
                  {canManageBuilderAndUsers && (
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab('users');
                        setEditingUser({
                          username: '',
                          password: '',
                          name: '',
                          email: '',
                          role: 'author',
                          title: 'Legal Associate & Content Writer',
                          bio: '',
                          profile_photo_url: '/logo.png',
                          active: true
                        });
                      }}
                      className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs flex items-center gap-2 transition-all cursor-pointer"
                    >
                      <UserCheck size={15} className="text-purple-400" /> Tambah Penulis Artikel
                    </button>
                  )}
                </div>
              </div>

              {/* Two Column Recent Activity */}
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Recent Messages */}
                <div className="bg-[#15151c] border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Mail size={16} className="text-gold" /> Pesan Klien Terbaru
                    </h3>
                    <button
                      type="button"
                      onClick={() => setActiveTab('messages')}
                      className="text-xs text-gold hover:underline font-semibold cursor-pointer"
                    >
                      Lihat Semua &rarr;
                    </button>
                  </div>
                  <div className="space-y-3">
                    {db.messages.slice(0, 4).map((m) => (
                      <div
                        key={m.id}
                        onClick={() => {
                          setSelectedMessage(m);
                          setActiveTab('messages');
                        }}
                        className="p-3.5 rounded-xl bg-[#1b1b24] border border-white/5 hover:border-gold/30 cursor-pointer transition-all"
                      >
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="font-bold text-xs text-white">{m.name}</span>
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                              m.status === 'unread'
                                ? 'bg-red-500/20 text-red-300'
                                : m.status === 'replied'
                                ? 'bg-emerald-500/20 text-emerald-300'
                                : 'bg-white/10 text-gray-400'
                            }`}
                          >
                            {m.status}
                          </span>
                        </div>
                        <div className="text-xs text-gold font-medium truncate mb-1">{m.subject}</div>
                        <p className="text-xs text-gray-400 line-clamp-1">{m.message}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Articles */}
                <div className="bg-[#15151c] border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <FileText size={16} className="text-gold" /> Artikel Terbaru
                    </h3>
                    <button
                      type="button"
                      onClick={() => setActiveTab('articles')}
                      className="text-xs text-gold hover:underline font-semibold cursor-pointer"
                    >
                      Kelola Artikel &rarr;
                    </button>
                  </div>
                  <div className="space-y-3">
                    {db.articles.slice(0, 4).map((a) => (
                      <div
                        key={a.id}
                        className="p-3.5 rounded-xl bg-[#1b1b24] border border-white/5 hover:border-gold/30 flex items-center justify-between gap-3 transition-all"
                      >
                        <div className="min-w-0">
                          <div className="text-[10px] text-gold font-bold uppercase tracking-wider mb-0.5">
                            {a.category?.name} &bull; Oleh {a.author?.name}
                          </div>
                          <div className="text-xs font-bold text-white truncate">{a.title}</div>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setEditingArticle({
                              ...a,
                              published_at: a.published_at.slice(0, 10)
                            });
                            setActiveTab('articles');
                          }}
                          className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-gold hover:text-navy text-xs font-bold shrink-0 transition-colors cursor-pointer"
                        >
                          Edit
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =================================================================
              TAB 2: ARTICLES MANAGEMENT & EDITOR
          ================================================================= */}
          {activeTab === 'articles' && (
            <div className="max-w-7xl mx-auto">
              {editingArticle ? (
                <div className="bg-[#15151c] border border-white/10 rounded-2xl p-6">
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-5 mb-6 border-b border-white/10">
                    <div>
                      <h3 className="text-lg font-bold text-white">
                        {editingArticle.id ? 'Edit Artikel Hukum' : 'Tulis Artikel Hukum Baru'}
                      </h3>
                      <p className="text-xs text-gray-400">
                        Gunakan toolbar blok konten di bawah untuk menyusun struktur artikel profesional.
                      </p>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <button
                        type="button"
                        onClick={() => setArticlePreviewMode(!articlePreviewMode)}
                        className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                      >
                        <Eye size={14} className="text-gold" />
                        {articlePreviewMode ? 'Mode Edit' : 'Preview Artikel'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingArticle(null)}
                        className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-bold cursor-pointer"
                      >
                        Batal
                      </button>
                    </div>
                  </div>

                  {articlePreviewMode ? (
                    <div className="bg-white text-navy rounded-2xl p-8 max-w-4xl mx-auto">
                      <span className="bg-gold text-navy text-[10px] font-bold px-3 py-1 uppercase tracking-widest rounded-full">
                        {editingArticle.category?.name}
                      </span>
                      <h1 className="text-3xl font-bold mt-4 mb-4">{editingArticle.title || 'Judul Artikel'}</h1>
                      {editingArticle.image_url && (
                        <img
                          src={editingArticle.image_url}
                          alt="Preview"
                          className="w-full h-72 object-cover rounded-xl mb-6"
                        />
                      )}
                      <div
                        className="prose max-w-none text-gray-800"
                        dangerouslySetInnerHTML={{ __html: editingArticle.content || '' }}
                      />
                    </div>
                  ) : (
                    <form onSubmit={handleSaveArticle} className="grid lg:grid-cols-12 gap-6">
                      {/* Left 8 cols: Main Content */}
                      <div className="lg:col-span-8 space-y-4">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                            Judul Artikel *
                          </label>
                          <input
                            type="text"
                            required
                            value={editingArticle.title || ''}
                            onChange={(e) =>
                              setEditingArticle({
                                ...editingArticle,
                                title: e.target.value,
                                slug: e.target.value
                                  .toLowerCase()
                                  .replace(/[^a-z0-9\s-]/g, '')
                                  .trim()
                                  .replace(/\s+/g, '-')
                              })
                            }
                            placeholder="Contoh: Panduan Lengkap Penyelesaian Sengketa Kontrak Bisnis..."
                            className="w-full px-4 py-3 rounded-xl bg-[#1b1b24] border border-white/15 focus:border-gold text-white text-sm focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                            Slug URL Artikel
                          </label>
                          <input
                            type="text"
                            value={editingArticle.slug || ''}
                            onChange={(e) => setEditingArticle({ ...editingArticle, slug: e.target.value })}
                            placeholder="panduan-lengkap-penyelesaian-sengketa"
                            className="w-full px-4 py-2.5 rounded-xl bg-[#1b1b24] border border-white/10 focus:border-gold text-gray-300 text-xs font-mono focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                            Ringkasan Singkat (Excerpt / Meta Description)
                          </label>
                          <textarea
                            rows={2}
                            value={editingArticle.excerpt || ''}
                            onChange={(e) => setEditingArticle({ ...editingArticle, excerpt: e.target.value })}
                            placeholder="Ringkasan 1-2 kalimat yang tampil pada kartu daftar artikel..."
                            className="w-full px-4 py-2.5 rounded-xl bg-[#1b1b24] border border-white/15 focus:border-gold text-white text-sm focus:outline-none"
                          />
                        </div>

                        {/* Block Content Insert Toolbar */}
                        <div>
                          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-gray-400">
                              Isi Konten Artikel (Mendukung Blok & HTML)
                            </label>
                            <div className="flex flex-wrap gap-1.5">
                              <button
                                type="button"
                                onClick={() => insertArticleSnippet('<h2>Sub-Judul Pembahasan Hukum</h2>')}
                                className="px-2.5 py-1 rounded bg-white/10 hover:bg-gold hover:text-navy text-[11px] font-bold transition-colors cursor-pointer"
                              >
                                + Heading H2
                              </button>
                              <button
                                type="button"
                                onClick={() => insertArticleSnippet('<p>Tulis paragraf penjelasan hukum di sini...</p>')}
                                className="px-2.5 py-1 rounded bg-white/10 hover:bg-gold hover:text-navy text-[11px] font-bold transition-colors cursor-pointer"
                              >
                                + Paragraf
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  insertArticleSnippet(
                                    '<blockquote>"Kutipan pasal undang-undang atau yurisprudensi putusan pengadilan."</blockquote>'
                                  )
                                }
                                className="px-2.5 py-1 rounded bg-white/10 hover:bg-gold hover:text-navy text-[11px] font-bold transition-colors cursor-pointer"
                              >
                                + Kutipan Pasal
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  insertArticleSnippet(
                                    '<ul>\n  <li>Poin penjelasan hukum pertama</li>\n  <li>Poin penjelasan hukum kedua</li>\n</ul>'
                                  )
                                }
                                className="px-2.5 py-1 rounded bg-white/10 hover:bg-gold hover:text-navy text-[11px] font-bold transition-colors cursor-pointer"
                              >
                                + Daftar Poin
                              </button>
                            </div>
                          </div>
                          <textarea
                            rows={14}
                            value={editingArticle.content || ''}
                            onChange={(e) => setEditingArticle({ ...editingArticle, content: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-[#1b1b24] border border-white/15 focus:border-gold text-white text-sm font-mono leading-relaxed focus:outline-none"
                          />
                        </div>
                      </div>

                      {/* Right 4 cols: Meta, Author, Image, Publish */}
                      <div className="lg:col-span-4 space-y-4">
                        <div className="bg-[#1b1b24] border border-white/10 rounded-xl p-4 space-y-4">
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                              Penulis Artikel (Author)
                            </label>
                            <select
                              value={editingArticle.author_id || ''}
                              onChange={(e) => setEditingArticle({ ...editingArticle, author_id: e.target.value })}
                              className="w-full px-3.5 py-2.5 rounded-xl bg-[#121217] border border-white/15 focus:border-gold text-white text-xs font-semibold focus:outline-none"
                            >
                              {db.users.map((u) => (
                                <option key={u.id} value={u.id}>
                                  {u.name} ({u.role})
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                              Kategori Hukum
                            </label>
                            <input
                              type="text"
                              value={editingArticle.category?.name || ''}
                              onChange={(e) =>
                                setEditingArticle({
                                  ...editingArticle,
                                  category: { id: 1, name: e.target.value }
                                })
                              }
                              placeholder="Hukum Perdata & Bisnis"
                              className="w-full px-3.5 py-2.5 rounded-xl bg-[#121217] border border-white/15 focus:border-gold text-white text-xs focus:outline-none"
                            />
                            <div className="flex flex-wrap gap-1 mt-2">
                              {[
                                'Hukum Perdata & Bisnis',
                                'Perizinan & Legalitas',
                                'Pertanahan & Properti',
                                'Perpajakan',
                                'Ketenagakerjaan & SDM',
                                'Hukum Pidana'
                              ].map((cat) => (
                                <button
                                  key={cat}
                                  type="button"
                                  onClick={() =>
                                    setEditingArticle({
                                      ...editingArticle,
                                      category: { id: 1, name: cat }
                                    })
                                  }
                                  className="text-[10px] px-2 py-0.5 rounded bg-white/5 hover:bg-gold/20 text-gray-300 hover:text-gold transition-colors cursor-pointer"
                                >
                                  {cat}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                                Status
                              </label>
                              <select
                                value={editingArticle.status || 'published'}
                                onChange={(e) =>
                                  setEditingArticle({
                                    ...editingArticle,
                                    status: e.target.value as 'published' | 'draft'
                                  })
                                }
                                className="w-full px-3 py-2.5 rounded-xl bg-[#121217] border border-white/15 text-white text-xs font-bold focus:outline-none"
                              >
                                <option value="published">Published (Terbit)</option>
                                <option value="draft">Draft (Konsep)</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                                Tanggal Terbit
                              </label>
                              <input
                                type="date"
                                value={editingArticle.published_at || ''}
                                onChange={(e) =>
                                  setEditingArticle({ ...editingArticle, published_at: e.target.value })
                                }
                                className="w-full px-3 py-2 rounded-xl bg-[#121217] border border-white/15 text-white text-xs focus:outline-none"
                              />
                            </div>
                          </div>

                          <label className="flex items-center gap-2.5 cursor-pointer pt-1">
                            <input
                              type="checkbox"
                              checked={Boolean(editingArticle.featured)}
                              onChange={(e) =>
                                setEditingArticle({ ...editingArticle, featured: e.target.checked })
                              }
                              className="w-4 h-4 accent-gold rounded"
                            />
                            <span className="text-xs font-semibold text-gray-200">
                              Jadikan Artikel Utama (Featured di Atas)
                            </span>
                          </label>
                        </div>

                        {/* Featured Image Box */}
                        <div className="bg-[#1b1b24] border border-white/10 rounded-xl p-4 space-y-3">
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-400">
                            Gambar Sampul Artikel
                          </label>
                          {editingArticle.image_url && (
                            <img
                              src={editingArticle.image_url}
                              alt="Preview"
                              className="w-full h-36 object-cover rounded-lg border border-white/10"
                            />
                          )}
                          <input
                            type="text"
                            value={editingArticle.image_url || ''}
                            onChange={(e) =>
                              setEditingArticle({ ...editingArticle, image_url: e.target.value })
                            }
                            placeholder="https://images.unsplash.com/..."
                            className="w-full px-3 py-2 rounded-lg bg-[#121217] border border-white/15 text-white text-xs focus:outline-none"
                          />
                          <label className="block w-full py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 border border-dashed border-white/20 text-center text-xs text-gold font-bold cursor-pointer">
                            Upload File Gambar dari Komputer
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) =>
                                handleImageFileUpload(e, (dataUrl) =>
                                  setEditingArticle({ ...editingArticle, image_url: dataUrl })
                                )
                              }
                            />
                          </label>
                        </div>

                        <button
                          type="submit"
                          className="w-full py-3.5 rounded-xl bg-gold text-navy hover:bg-white font-bold text-xs uppercase tracking-widest transition-all shadow-lg cursor-pointer"
                        >
                          Simpan & Publikasikan Artikel
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              ) : (
                <div className="space-y-5">
                  {/* Top Filter & Create Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#15151c] border border-white/10 rounded-2xl p-4">
                    <div className="flex flex-1 items-center gap-3">
                      <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          value={articleSearch}
                          onChange={(e) => setArticleSearch(e.target.value)}
                          placeholder="Cari judul, kategori, atau nama penulis..."
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#1b1b24] border border-white/10 focus:border-gold text-white text-xs focus:outline-none"
                        />
                      </div>
                      <select
                        value={articleStatusFilter}
                        onChange={(e) => setArticleStatusFilter(e.target.value as any)}
                        className="px-3.5 py-2.5 rounded-xl bg-[#1b1b24] border border-white/10 text-white text-xs font-bold focus:outline-none"
                      >
                        <option value="all">Semua Status ({db.articles.length})</option>
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                      </select>
                    </div>
                    <button
                      type="button"
                      onClick={openNewArticle}
                      className="px-5 py-2.5 rounded-xl bg-gold text-navy hover:bg-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md cursor-pointer"
                    >
                      <Plus size={16} /> Tulis Artikel Baru
                    </button>
                  </div>

                  {/* Articles Table */}
                  <div className="bg-[#15151c] border border-white/10 rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-white/10 text-[11px] font-bold uppercase tracking-wider text-gray-400 bg-[#181820]">
                            <th className="py-3.5 px-4">Artikel</th>
                            <th className="py-3.5 px-4">Kategori</th>
                            <th className="py-3.5 px-4">Penulis</th>
                            <th className="py-3.5 px-4">Status</th>
                            <th className="py-3.5 px-4">Tanggal</th>
                            <th className="py-3.5 px-4 text-right">Aksi</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-xs">
                          {filteredArticles.map((art) => (
                            <tr key={art.id} className="hover:bg-white/[0.02] transition-colors">
                              <td className="py-4 px-4">
                                <div className="flex items-center gap-3 max-w-md">
                                  <img
                                    src={art.image_url || art.image}
                                    alt={art.title}
                                    className="w-14 h-10 rounded-lg object-cover shrink-0 border border-white/10"
                                  />
                                  <div className="min-w-0">
                                    <div className="font-bold text-white line-clamp-1 flex items-center gap-2">
                                      {art.featured && (
                                        <span className="px-2 py-0.5 rounded bg-gold/20 text-gold text-[10px] font-extrabold uppercase shrink-0">
                                          Featured
                                        </span>
                                      )}
                                      <span>{art.title}</span>
                                    </div>
                                    <div className="text-[11px] text-gray-400 font-mono truncate">
                                      /artikel/{art.slug}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="py-4 px-4">
                                <span className="px-2.5 py-1 rounded-full bg-gold/15 text-gold text-[11px] font-bold">
                                  {art.category?.name}
                                </span>
                              </td>
                              <td className="py-4 px-4 text-gray-300 font-medium">
                                {art.author?.name || 'Admin NH'}
                              </td>
                              <td className="py-4 px-4">
                                <span
                                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                                    art.status === 'published'
                                      ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                                      : 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                                  }`}
                                >
                                  {art.status}
                                </span>
                              </td>
                              <td className="py-4 px-4 text-gray-400 whitespace-nowrap">
                                {new Date(art.published_at).toLocaleDateString('id-ID', {
                                  day: 'numeric',
                                  month: 'short',
                                  year: 'numeric'
                                })}
                              </td>
                              <td className="py-4 px-4 text-right whitespace-nowrap">
                                <div className="inline-flex items-center gap-1.5">
                                  <Link
                                    href={`/artikel/${art.slug}`}
                                    target="_blank"
                                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-gold"
                                    title="Lihat Artikel"
                                  >
                                    <ExternalLink size={14} />
                                  </Link>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setEditingArticle({
                                        ...art,
                                        published_at: art.published_at.slice(0, 10)
                                      })
                                    }
                                    className="p-2 rounded-lg bg-white/5 hover:bg-gold hover:text-navy text-gray-300 transition-colors cursor-pointer"
                                    title="Edit Artikel"
                                  >
                                    <Edit3 size={14} />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteArticle(art.id)}
                                    className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-300 transition-colors cursor-pointer"
                                    title="Hapus Artikel"
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* =================================================================
              TAB 3: CONTACT MESSAGES INBOX
          ================================================================= */}
          {activeTab === 'messages' && (
            <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-6">
              {/* Left 5 cols: Message List */}
              <div className="lg:col-span-5 bg-[#15151c] border border-white/10 rounded-2xl p-4 flex flex-col h-[720px]">
                <div className="space-y-3 mb-4">
                  <div className="relative">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={messageSearch}
                      onChange={(e) => setMessageSearch(e.target.value)}
                      placeholder="Cari nama pengirim, subjek, telepon..."
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#1b1b24] border border-white/10 focus:border-gold text-white text-xs focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { id: 'all', label: `Semua (${db.messages.length})` },
                      { id: 'unread', label: `Belum Dibaca (${unreadCount})` },
                      { id: 'read', label: 'Dibaca' },
                      { id: 'replied', label: 'Dibalas' },
                      { id: 'archived', label: 'Arsip' }
                    ].map((st) => (
                      <button
                        key={st.id}
                        type="button"
                        onClick={() => setMessageStatusFilter(st.id as any)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors cursor-pointer ${
                          messageStatusFilter === st.id
                            ? 'bg-gold text-navy'
                            : 'bg-white/5 text-gray-400 hover:text-white'
                        }`}
                      >
                        {st.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
                  {filteredMessages.length > 0 ? (
                    filteredMessages.map((msg) => (
                      <div
                        key={msg.id}
                        onClick={() => {
                          setSelectedMessage(msg);
                          if (msg.status === 'unread') {
                            handleUpdateMessage(msg.id, { status: 'read' });
                          }
                        }}
                        className={`p-4 rounded-xl border transition-all cursor-pointer ${
                          selectedMessage?.id === msg.id
                            ? 'bg-gold/10 border-gold'
                            : msg.status === 'unread'
                            ? 'bg-[#1b1b26] border-gold/40'
                            : 'bg-[#1a1a22] border-white/5 hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="font-bold text-xs text-white truncate">{msg.name}</span>
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                              msg.status === 'unread'
                                ? 'bg-red-500 text-white'
                                : msg.status === 'replied'
                                ? 'bg-emerald-500/20 text-emerald-300'
                                : 'bg-white/10 text-gray-400'
                            }`}
                          >
                            {msg.status}
                          </span>
                        </div>
                        <div className="text-xs text-gold font-semibold truncate mb-1">
                          {msg.subject}
                        </div>
                        <p className="text-xs text-gray-400 line-clamp-2 mb-2">{msg.message}</p>
                        <div className="text-[10px] text-gray-500 flex items-center justify-between">
                          <span>{msg.phone}</span>
                          <span>
                            {new Date(msg.created_at).toLocaleDateString('id-ID', {
                              day: 'numeric',
                              month: 'short',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-16 text-gray-500 text-xs">
                      Tidak ada pesan pada filter ini.
                    </div>
                  )}
                </div>
              </div>

              {/* Right 7 cols: Message Detail & Actions */}
              <div className="lg:col-span-7 bg-[#15151c] border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
                {selectedMessage ? (
                  <div className="space-y-6">
                    <div className="flex flex-wrap items-start justify-between gap-4 pb-5 border-b border-white/10">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gold">
                          DETAIL PESAN FORM KONTAK
                        </span>
                        <h3 className="text-xl font-bold text-white mt-1">
                          {selectedMessage.subject}
                        </h3>
                        <div className="text-xs text-gray-400 mt-1">
                          Dikirim pada{' '}
                          {new Date(selectedMessage.created_at).toLocaleString('id-ID', {
                            dateStyle: 'full',
                            timeStyle: 'short'
                          })}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <select
                          value={selectedMessage.status}
                          onChange={(e) =>
                            handleUpdateMessage(selectedMessage.id, {
                              status: e.target.value as any
                            })
                          }
                          className="px-3 py-2 rounded-xl bg-[#1b1b24] border border-white/15 text-xs font-bold text-gold focus:outline-none"
                        >
                          <option value="unread">Belum Dibaca</option>
                          <option value="read">Sudah Dibaca</option>
                          <option value="replied">Sudah Dibalas</option>
                          <option value="archived">Arsipkan</option>
                        </select>
                        <button
                          type="button"
                          onClick={() => handleDeleteMessage(selectedMessage.id)}
                          className="p-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-300 cursor-pointer"
                          title="Hapus Pesan"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    {/* Sender Info Grid */}
                    <div className="grid sm:grid-cols-3 gap-3 bg-[#1b1b24] p-4 rounded-xl border border-white/5 text-xs">
                      <div>
                        <div className="text-gray-400 text-[10px] uppercase font-bold mb-0.5">
                          Nama Pengirim
                        </div>
                        <div className="font-bold text-white">{selectedMessage.name}</div>
                      </div>
                      <div>
                        <div className="text-gray-400 text-[10px] uppercase font-bold mb-0.5">
                          Alamat Email
                        </div>
                        <div className="font-bold text-gold truncate">{selectedMessage.email}</div>
                      </div>
                      <div>
                        <div className="text-gray-400 text-[10px] uppercase font-bold mb-0.5">
                          Nomor Telepon / WA
                        </div>
                        <div className="font-bold text-white">{selectedMessage.phone}</div>
                      </div>
                    </div>

                    {/* Message Body */}
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                        Isi Pesan / Kebutuhan Klien:
                      </div>
                      <div className="p-5 rounded-xl bg-[#1b1b24] border border-white/10 text-sm text-gray-200 leading-relaxed whitespace-pre-line">
                        {selectedMessage.message}
                      </div>
                    </div>

                    {/* Admin Internal Notes */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                        Catatan Tindak Lanjut Tim Internal:
                      </label>
                      <textarea
                        rows={3}
                        value={selectedMessage.notes || ''}
                        onChange={(e) =>
                          setSelectedMessage({ ...selectedMessage, notes: e.target.value })
                        }
                        placeholder="Tambahkan catatan internal (misal: Sudah dijadwalkan meeting hari Kamis pukul 14.00 WIB)..."
                        className="w-full px-4 py-3 rounded-xl bg-[#1b1b24] border border-white/15 focus:border-gold text-white text-xs focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          handleUpdateMessage(selectedMessage.id, {
                            notes: selectedMessage.notes
                          })
                        }
                        className="mt-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-gold hover:text-navy text-xs font-bold transition-colors cursor-pointer"
                      >
                        Simpan Catatan Internal
                      </button>
                    </div>

                    {/* Direct Reply Buttons */}
                    <div className="pt-4 border-t border-white/10 flex flex-wrap gap-3">
                      <a
                        href={`https://wa.me/${selectedMessage.phone
                          .replace(/[^0-9]/g, '')
                          .replace(/^0/, '62')}?text=${encodeURIComponent(
                          `Halo Bapak/Ibu ${selectedMessage.name}, kami dari Kantor Narasumber Hukum menindaklanjuti pesan Anda terkait "${selectedMessage.subject}".`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() =>
                          handleUpdateMessage(selectedMessage.id, { status: 'replied' })
                        }
                        className="px-5 py-3 rounded-xl bg-emerald-500 text-navy font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-emerald-400 transition-colors"
                      >
                        <Send size={14} /> Balas Langsung via WhatsApp
                      </a>
                      <a
                        href={`mailto:${selectedMessage.email}?subject=${encodeURIComponent(
                          `Re: ${selectedMessage.subject} - Kantor Narasumber Hukum`
                        )}`}
                        onClick={() =>
                          handleUpdateMessage(selectedMessage.id, { status: 'replied' })
                        }
                        className="px-5 py-3 rounded-xl bg-gold text-navy font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-white transition-colors"
                      >
                        <Mail size={14} /> Balas via Email Resmi
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center py-20 text-gray-400">
                    <Mail size={40} className="text-gold/40 mb-3" />
                    <p className="text-sm font-bold text-white mb-1">Pilih Pesan di Sebelah Kiri</p>
                    <p className="text-xs text-gray-500 max-w-sm">
                      Semua pesan yang dikirim oleh pengunjung melalui formulir kontak website akan masuk secara otomatis ke daftar ini.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* =================================================================
              TAB 4: ELEMENTOR-STYLE VISUAL BLOCK PAGE BUILDER
          ================================================================= */}
          {activeTab === 'builder' && canManageBuilderAndUsers && (
            <div className="flex flex-col h-[calc(100vh-7.5rem)] -m-6">
              {/* Builder Top Sub-Toolbar */}
              <div className="h-14 bg-[#16161d] border-b border-white/10 px-4 flex flex-wrap items-center justify-between gap-3 shrink-0">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-gold flex items-center gap-1.5">
                    <Layers size={15} /> Halaman:
                  </span>
                  <select
                    value={builderPage}
                    onChange={(e) => {
                      const nextPage = e.target.value as any;
                      setBuilderPage(nextPage);
                      const first = db.blocks.find((b) => b.page === nextPage);
                      setSelectedBlockId(first?.id || null);
                    }}
                    className="px-3.5 py-1.5 rounded-lg bg-[#0e0e12] border border-gold/40 text-white text-xs font-bold focus:outline-none"
                  >
                    <option value="home">Beranda (/)</option>
                    <option value="tentang">Tentang Kami (/tentang)</option>
                    <option value="services">Layanan (/services)</option>
                    <option value="kontak">Kontak (/kontak)</option>
                  </select>
                </div>

                {/* Responsive Viewport Switcher */}
                <div className="flex items-center gap-1 bg-[#0e0e12] p-1 rounded-lg border border-white/10">
                  {[
                    { id: 'desktop', icon: <Monitor size={14} />, label: 'Desktop' },
                    { id: 'tablet', icon: <Tablet size={14} />, label: 'Tablet' },
                    { id: 'mobile', icon: <Smartphone size={14} />, label: 'Mobile' }
                  ].map((vp) => (
                    <button
                      key={vp.id}
                      type="button"
                      onClick={() => setBuilderViewport(vp.id as any)}
                      className={`px-2.5 py-1 rounded text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                        builderViewport === vp.id
                          ? 'bg-gold text-navy'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {vp.icon}
                      <span className="hidden sm:inline">{vp.label}</span>
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={builderPage === 'home' ? '/' : `/${builderPage}`}
                    target="_blank"
                    className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-xs font-bold flex items-center gap-1.5"
                  >
                    <ExternalLink size={13} className="text-gold" /> Preview Live
                  </Link>
                  <button
                    type="button"
                    onClick={() => persistCmsData(db, 'Layout & blok halaman berhasil dipublikasikan!')}
                    className="px-4 py-1.5 rounded-lg bg-gold text-navy hover:bg-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
                  >
                    <Save size={13} /> Update Halaman
                  </button>
                </div>
              </div>

              {/* 3-Column Elementor Workspace */}
              <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 min-h-0 overflow-hidden">
                {/* LEFT PANEL (3 cols): Widget Library & Navigator */}
                <div className="lg:col-span-3 bg-[#121217] border-r border-white/10 flex flex-col min-h-0 overflow-y-auto p-4 space-y-6">
                  <div>
                    <div className="text-[11px] font-extrabold uppercase tracking-widest text-gold mb-3">
                      + Tambah Blok Elemen (Klik)
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      {BLOCK_TEMPLATES.map((tpl) => (
                        <button
                          key={tpl.type}
                          type="button"
                          onClick={() => handleAddBlock(tpl)}
                          className="p-3 rounded-xl bg-[#1a1a22] hover:bg-[#22222d] border border-white/10 hover:border-gold/50 text-left transition-all flex items-start gap-3 group cursor-pointer"
                        >
                          <div className="w-8 h-8 rounded-lg bg-gold/15 text-gold flex items-center justify-center shrink-0 group-hover:bg-gold group-hover:text-navy transition-colors">
                            {tpl.icon}
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs font-bold text-white group-hover:text-gold">
                              {tpl.label}
                            </div>
                            <div className="text-[10px] text-gray-400 line-clamp-1">{tpl.desc}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Navigator List */}
                  <div className="pt-4 border-t border-white/10">
                    <div className="text-[11px] font-extrabold uppercase tracking-widest text-gold mb-3">
                      Navigator Blok ({currentPageBlocks.length})
                    </div>
                    <div className="space-y-2">
                      {currentPageBlocks.map((blk, i) => (
                        <div
                          key={blk.id}
                          onClick={() => {
                            setSelectedBlockId(blk.id);
                            setInspectorTab('content');
                          }}
                          className={`p-2.5 rounded-xl border text-xs flex items-center justify-between gap-2 cursor-pointer transition-all ${
                            selectedBlockId === blk.id
                              ? 'bg-gold/15 border-gold text-white'
                              : 'bg-[#1a1a22] border-white/10 text-gray-300 hover:border-white/25'
                          }`}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="text-[10px] font-mono text-gray-500">#{i + 1}</span>
                            <span className="font-bold truncate">{blk.name}</span>
                          </div>
                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedBlockId(blk.id);
                                const nextBlocks = db.blocks.map((b) =>
                                  b.id === blk.id ? { ...b, visible: !b.visible } : b
                                );
                                setDb({ ...db, blocks: nextBlocks });
                              }}
                              className="p-1 text-gray-400 hover:text-gold"
                              title={blk.visible ? 'Sembunyikan' : 'Tampilkan'}
                            >
                              {blk.visible ? <Eye size={13} /> : <EyeOff size={13} />}
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteBlock(blk.id);
                              }}
                              className="p-1 text-gray-400 hover:text-red-400"
                              title="Hapus Blok"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </div>
                      ))}
                      {currentPageBlocks.length === 0 && (
                        <div className="text-xs text-gray-500 italic py-4 text-center">
                          Belum ada blok tambahan pada halaman ini. Klik salah satu widget di atas untuk menambahkan.
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* CENTER PANEL (5 cols): Live Interactive Canvas */}
                <div className="lg:col-span-5 bg-[#09090b] overflow-y-auto p-4 md:p-6 flex flex-col items-center">
                  <div
                    className={`w-full transition-all duration-300 bg-white rounded-2xl overflow-hidden shadow-2xl border border-white/15 ${
                      builderViewport === 'mobile'
                        ? 'max-w-[390px]'
                        : builderViewport === 'tablet'
                        ? 'max-w-[768px]'
                        : 'max-w-full'
                    }`}
                  >
                    {/* Canvas Header Indicator */}
                    <div className="bg-[#18181f] text-gray-300 px-4 py-2 text-[11px] flex items-center justify-between border-b border-white/10">
                      <span>
                        Kanvas Live Preview: <strong className="text-gold uppercase">{builderPage}</strong>
                      </span>
                      <span>Klik blok untuk mengedit di panel kanan</span>
                    </div>

                    {currentPageBlocks.length > 0 ? (
                      currentPageBlocks.map((block, idx) => (
                        <div
                          key={block.id}
                          onClick={() => {
                            setSelectedBlockId(block.id);
                            setInspectorTab('content');
                          }}
                          className={`relative group cursor-pointer transition-all ${
                            selectedBlockId === block.id
                              ? 'ring-2 ring-gold ring-inset'
                              : 'hover:ring-2 hover:ring-gold/50 hover:ring-inset'
                          } ${!block.visible ? 'opacity-40 grayscale' : ''}`}
                        >
                          {/* Floating Elementor Block Toolbar */}
                          <div className="absolute top-2 right-2 z-30 flex items-center gap-1 bg-navy/95 text-white border border-gold/40 rounded-lg px-2 py-1 shadow-lg opacity-95">
                            <span className="text-[10px] font-bold text-gold mr-1.5">
                              {block.name} {!block.visible && '(Hidden)'}
                            </span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleMoveBlock(block.id, 'up');
                              }}
                              disabled={idx === 0}
                              className="p-1 hover:text-gold disabled:opacity-30 cursor-pointer"
                              title="Pindah ke Atas"
                            >
                              <ArrowUp size={12} />
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleMoveBlock(block.id, 'down');
                              }}
                              disabled={idx === currentPageBlocks.length - 1}
                              className="p-1 hover:text-gold disabled:opacity-30 cursor-pointer"
                              title="Pindah ke Bawah"
                            >
                              <ArrowDown size={12} />
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDuplicateBlock(block);
                              }}
                              className="p-1 hover:text-gold cursor-pointer"
                              title="Duplikat Blok"
                            >
                              <Copy size={12} />
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteBlock(block.id);
                              }}
                              className="p-1 hover:text-red-400 cursor-pointer"
                              title="Hapus Blok"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>

                          <BlockRendererItem block={block} isPreview={true} />
                        </div>
                      ))
                    ) : (
                      <div className="p-14 text-center bg-[#121217] text-gray-300">
                        <Layers size={36} className="text-gold mx-auto mb-3 opacity-60" />
                        <h4 className="font-bold text-sm text-white mb-1">
                          Belum Ada Blok Kustom di Halaman Ini
                        </h4>
                        <p className="text-xs text-gray-400 max-w-md mx-auto">
                          Pilih salah satu elemen blok di panel sebelah kiri (misal: Statistik, Hero, Split Gambar, FAQ, atau CTA) untuk menambahkannya ke halaman ini.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* RIGHT PANEL (4 cols): Elementor Inspector (Content, Style, Global Hero) */}
                <div className="lg:col-span-4 bg-[#121217] border-l border-white/10 flex flex-col min-h-0 overflow-y-auto">
                  {/* Inspector Tabs */}
                  <div className="grid grid-cols-3 border-b border-white/10 bg-[#16161d] text-xs font-bold shrink-0">
                    <button
                      type="button"
                      onClick={() => setInspectorTab('content')}
                      className={`py-3 text-center border-b-2 transition-colors cursor-pointer ${
                        inspectorTab === 'content'
                          ? 'border-gold text-gold bg-white/5'
                          : 'border-transparent text-gray-400 hover:text-white'
                      }`}
                    >
                      1. Isi Konten Blok
                    </button>
                    <button
                      type="button"
                      onClick={() => setInspectorTab('style')}
                      className={`py-3 text-center border-b-2 transition-colors cursor-pointer ${
                        inspectorTab === 'style'
                          ? 'border-gold text-gold bg-white/5'
                          : 'border-transparent text-gray-400 hover:text-white'
                      }`}
                    >
                      2. Gaya & Warna
                    </button>
                    <button
                      type="button"
                      onClick={() => setInspectorTab('global')}
                      className={`py-3 text-center border-b-2 transition-colors cursor-pointer ${
                        inspectorTab === 'global'
                          ? 'border-gold text-gold bg-white/5'
                          : 'border-transparent text-gray-400 hover:text-white'
                      }`}
                    >
                      3. Hero Utama
                    </button>
                  </div>

                  <div className="p-5 space-y-4 flex-1 overflow-y-auto">
                    {inspectorTab === 'global' ? (
                      <div className="space-y-4">
                        <div className="text-xs font-bold text-gold uppercase tracking-wider">
                          Edit Hero Utama & CTA Beranda
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">
                            Judul Hero Baris 1
                          </label>
                          <input
                            type="text"
                            value={db.siteSettings.heroTitle}
                            onChange={(e) =>
                              setDb({
                                ...db,
                                siteSettings: { ...db.siteSettings, heroTitle: e.target.value }
                              })
                            }
                            className="w-full px-3 py-2 rounded-lg bg-[#1b1b24] border border-white/15 text-white text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">
                            Judul Highlight Emas
                          </label>
                          <input
                            type="text"
                            value={db.siteSettings.heroHighlight}
                            onChange={(e) =>
                              setDb({
                                ...db,
                                siteSettings: { ...db.siteSettings, heroHighlight: e.target.value }
                              })
                            }
                            className="w-full px-3 py-2 rounded-lg bg-[#1b1b24] border border-white/15 text-gold text-xs font-bold"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">
                            Sub-Judul Hero Beranda
                          </label>
                          <textarea
                            rows={3}
                            value={db.siteSettings.heroSubtitle}
                            onChange={(e) =>
                              setDb({
                                ...db,
                                siteSettings: { ...db.siteSettings, heroSubtitle: e.target.value }
                              })
                            }
                            className="w-full px-3 py-2 rounded-lg bg-[#1b1b24] border border-white/15 text-white text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">
                            URL Video Background Hero
                          </label>
                          <input
                            type="text"
                            value={db.siteSettings.heroVideoUrl}
                            onChange={(e) =>
                              setDb({
                                ...db,
                                siteSettings: { ...db.siteSettings, heroVideoUrl: e.target.value }
                              })
                            }
                            className="w-full px-3 py-2 rounded-lg bg-[#1b1b24] border border-white/15 text-white text-xs font-mono"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => persistCmsData(db, 'Hero utama beranda berhasil diperbarui!')}
                          className="w-full py-2.5 rounded-xl bg-gold text-navy font-bold text-xs uppercase tracking-wider cursor-pointer"
                        >
                          Simpan Perubahan Hero
                        </button>
                      </div>
                    ) : !selectedBlock ? (
                      <div className="text-center py-12 text-xs text-gray-500">
                        Pilih salah satu blok pada Kanvas atau Navigator untuk mengedit isinya.
                      </div>
                    ) : inspectorTab === 'style' ? (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1.5">
                            Nama Label Blok (Navigator)
                          </label>
                          <input
                            type="text"
                            value={selectedBlock.name}
                            onChange={(e) =>
                              handleUpdateSelectedBlock((b) => ({ ...b, name: e.target.value }))
                            }
                            className="w-full px-3 py-2 rounded-lg bg-[#1b1b24] border border-white/15 text-white text-xs"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1.5">
                            Tema Warna Latar (Background)
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            {[
                              { id: 'navy', label: 'Navy Formal (#0A0A0B)' },
                              { id: 'dark', label: 'Dark Charcoal (#111114)' },
                              { id: 'white', label: 'Putih Bersih (#FFFFFF)' },
                              { id: 'gray', label: 'Abu-abu Korporat (#F9FAFB)' }
                            ].map((theme) => (
                              <button
                                key={theme.id}
                                type="button"
                                onClick={() =>
                                  handleUpdateSelectedBlock((b) => ({
                                    ...b,
                                    style: { ...b.style, bgTheme: theme.id as any }
                                  }))
                                }
                                className={`p-2.5 rounded-lg border text-left text-xs font-bold cursor-pointer ${
                                  selectedBlock.style.bgTheme === theme.id
                                    ? 'border-gold bg-gold/15 text-gold'
                                    : 'border-white/10 bg-[#1b1b24] text-gray-300'
                                }`}
                              >
                                {theme.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1.5">
                              Spasi Vertikal (Padding)
                            </label>
                            <select
                              value={selectedBlock.style.paddingY}
                              onChange={(e) =>
                                handleUpdateSelectedBlock((b) => ({
                                  ...b,
                                  style: { ...b.style, paddingY: e.target.value as any }
                                }))
                              }
                              className="w-full px-3 py-2 rounded-lg bg-[#1b1b24] border border-white/15 text-white text-xs"
                            >
                              <option value="sm">Rapat (Compact)</option>
                              <option value="md">Standar (Medium)</option>
                              <option value="lg">Luas (Large)</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1.5">
                              Perataan Teks
                            </label>
                            <select
                              value={selectedBlock.style.align}
                              onChange={(e) =>
                                handleUpdateSelectedBlock((b) => ({
                                  ...b,
                                  style: { ...b.style, align: e.target.value as any }
                                }))
                              }
                              className="w-full px-3 py-2 rounded-lg bg-[#1b1b24] border border-white/15 text-white text-xs"
                            >
                              <option value="center">Tengah (Center)</option>
                              <option value="left">Rata Kiri (Left)</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* CONTENT INSPECTOR FOR SELECTED BLOCK */
                      <div className="space-y-4">
                        <div className="flex items-center justify-between pb-2 border-b border-white/10">
                          <span className="text-xs font-bold text-gold uppercase">
                            Edit Konten: {selectedBlock.name}
                          </span>
                          <span className="text-[10px] font-mono text-gray-400">
                            {selectedBlock.type}
                          </span>
                        </div>

                        {/* Common fields: badge, title, highlight, subtitle */}
                        {selectedBlock.data.badge !== undefined && (
                          <div>
                            <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">
                              Teks Badge Atas
                            </label>
                            <input
                              type="text"
                              value={selectedBlock.data.badge || ''}
                              onChange={(e) =>
                                handleUpdateSelectedBlock((b) => ({
                                  ...b,
                                  data: { ...b.data, badge: e.target.value }
                                }))
                              }
                              className="w-full px-3 py-2 rounded-lg bg-[#1b1b24] border border-white/15 text-white text-xs"
                            />
                          </div>
                        )}

                        {selectedBlock.data.title !== undefined && (
                          <div>
                            <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">
                              Judul Utama Seksi
                            </label>
                            <input
                              type="text"
                              value={selectedBlock.data.title || ''}
                              onChange={(e) =>
                                handleUpdateSelectedBlock((b) => ({
                                  ...b,
                                  data: { ...b.data, title: e.target.value }
                                }))
                              }
                              className="w-full px-3 py-2 rounded-lg bg-[#1b1b24] border border-white/15 text-white text-xs font-bold"
                            />
                          </div>
                        )}

                        {selectedBlock.data.highlight !== undefined && (
                          <div>
                            <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">
                              Teks Highlight Emas
                            </label>
                            <input
                              type="text"
                              value={selectedBlock.data.highlight || ''}
                              onChange={(e) =>
                                handleUpdateSelectedBlock((b) => ({
                                  ...b,
                                  data: { ...b.data, highlight: e.target.value }
                                }))
                              }
                              className="w-full px-3 py-2 rounded-lg bg-[#1b1b24] border border-white/15 text-gold text-xs font-bold"
                            />
                          </div>
                        )}

                        {selectedBlock.data.subtitle !== undefined && (
                          <div>
                            <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">
                              Sub-Judul / Deskripsi Pendek
                            </label>
                            <textarea
                              rows={2}
                              value={selectedBlock.data.subtitle || ''}
                              onChange={(e) =>
                                handleUpdateSelectedBlock((b) => ({
                                  ...b,
                                  data: { ...b.data, subtitle: e.target.value }
                                }))
                              }
                              className="w-full px-3 py-2 rounded-lg bg-[#1b1b24] border border-white/15 text-white text-xs"
                            />
                          </div>
                        )}

                        {selectedBlock.data.desc !== undefined && (
                          <div>
                            <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">
                              Paragraf Penjelasan
                            </label>
                            <textarea
                              rows={3}
                              value={selectedBlock.data.desc || ''}
                              onChange={(e) =>
                                handleUpdateSelectedBlock((b) => ({
                                  ...b,
                                  data: { ...b.data, desc: e.target.value }
                                }))
                              }
                              className="w-full px-3 py-2 rounded-lg bg-[#1b1b24] border border-white/15 text-white text-xs"
                            />
                          </div>
                        )}

                        {selectedBlock.data.body !== undefined && (
                          <div>
                            <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">
                              Konten Paragraf (HTML)
                            </label>
                            <textarea
                              rows={5}
                              value={selectedBlock.data.body || ''}
                              onChange={(e) =>
                                handleUpdateSelectedBlock((b) => ({
                                  ...b,
                                  data: { ...b.data, body: e.target.value }
                                }))
                              }
                              className="w-full px-3 py-2 rounded-lg bg-[#1b1b24] border border-white/15 text-white text-xs font-mono"
                            />
                          </div>
                        )}

                        {selectedBlock.data.html !== undefined && (
                          <div>
                            <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">
                              Kode Custom HTML
                            </label>
                            <textarea
                              rows={6}
                              value={selectedBlock.data.html || ''}
                              onChange={(e) =>
                                handleUpdateSelectedBlock((b) => ({
                                  ...b,
                                  data: { ...b.data, html: e.target.value }
                                }))
                              }
                              className="w-full px-3 py-2 rounded-lg bg-[#1b1b24] border border-white/15 text-white text-xs font-mono"
                            />
                          </div>
                        )}

                        {(selectedBlock.data.image !== undefined ||
                          selectedBlock.data.bgImage !== undefined) && (
                          <div>
                            <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">
                              URL Gambar
                            </label>
                            <input
                              type="text"
                              value={selectedBlock.data.image ?? selectedBlock.data.bgImage ?? ''}
                              onChange={(e) =>
                                handleUpdateSelectedBlock((b) => ({
                                  ...b,
                                  data: {
                                    ...b.data,
                                    ...(b.data.image !== undefined
                                      ? { image: e.target.value }
                                      : { bgImage: e.target.value })
                                  }
                                }))
                              }
                              className="w-full px-3 py-2 rounded-lg bg-[#1b1b24] border border-white/15 text-white text-xs"
                            />
                          </div>
                        )}

                        {selectedBlock.data.buttonText !== undefined && (
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">
                                Teks Tombol
                              </label>
                              <input
                                type="text"
                                value={selectedBlock.data.buttonText || ''}
                                onChange={(e) =>
                                  handleUpdateSelectedBlock((b) => ({
                                    ...b,
                                    data: { ...b.data, buttonText: e.target.value }
                                  }))
                                }
                                className="w-full px-3 py-2 rounded-lg bg-[#1b1b24] border border-white/15 text-white text-xs"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">
                                Link URL Tombol
                              </label>
                              <input
                                type="text"
                                value={selectedBlock.data.buttonUrl || ''}
                                onChange={(e) =>
                                  handleUpdateSelectedBlock((b) => ({
                                    ...b,
                                    data: { ...b.data, buttonUrl: e.target.value }
                                  }))
                                }
                                className="w-full px-3 py-2 rounded-lg bg-[#1b1b24] border border-white/15 text-white text-xs"
                              />
                            </div>
                          </div>
                        )}

                        {/* Dynamic Array Editor for stats_bar, features_grid, faq, testimonials */}
                        {Array.isArray(selectedBlock.data.items) && (
                          <div className="space-y-2.5 pt-2 border-t border-white/10">
                            <div className="flex items-center justify-between">
                              <label className="text-[11px] font-bold text-gold uppercase">
                                Daftar Item ({selectedBlock.data.items.length})
                              </label>
                              <button
                                type="button"
                                onClick={() => {
                                  const newItem =
                                    selectedBlock.type === 'stats_bar'
                                      ? { value: '100+', label: 'Label Baru' }
                                      : selectedBlock.type === 'faq'
                                      ? { q: 'Pertanyaan Baru?', a: 'Jawaban penjelasan...' }
                                      : selectedBlock.type === 'testimonials'
                                      ? { text: 'Testimoni klien...', name: 'Nama Klien', role: 'Jabatan' }
                                      : { title: 'Judul Fitur', desc: 'Deskripsi fitur...' };
                                  handleUpdateSelectedBlock((b) => ({
                                    ...b,
                                    data: { ...b.data, items: [...b.data.items, newItem] }
                                  }));
                                }}
                                className="px-2.5 py-1 rounded bg-gold text-navy text-[10px] font-bold cursor-pointer"
                              >
                                + Tambah Item
                              </button>
                            </div>

                            {selectedBlock.data.items.map((item: any, idx: number) => (
                              <div
                                key={idx}
                                className="p-3 rounded-xl bg-[#1b1b24] border border-white/10 space-y-2"
                              >
                                <div className="flex items-center justify-between text-[10px] text-gray-400 font-bold">
                                  <span>ITEM #{idx + 1}</span>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleUpdateSelectedBlock((b) => ({
                                        ...b,
                                        data: {
                                          ...b.data,
                                          items: b.data.items.filter((_: any, i: number) => i !== idx)
                                        }
                                      }))
                                    }
                                    className="text-red-400 hover:underline cursor-pointer"
                                  >
                                    Hapus
                                  </button>
                                </div>

                                {selectedBlock.type === 'stats_bar' && (
                                  <div className="grid grid-cols-2 gap-2">
                                    <input
                                      type="text"
                                      value={item.value || ''}
                                      onChange={(e) => {
                                        const next = [...selectedBlock.data.items];
                                        next[idx] = { ...item, value: e.target.value };
                                        handleUpdateSelectedBlock((b) => ({
                                          ...b,
                                          data: { ...b.data, items: next }
                                        }));
                                      }}
                                      placeholder="Angka (448+)"
                                      className="px-2.5 py-1.5 rounded bg-[#121217] border border-white/10 text-gold text-xs font-bold"
                                    />
                                    <input
                                      type="text"
                                      value={item.label || ''}
                                      onChange={(e) => {
                                        const next = [...selectedBlock.data.items];
                                        next[idx] = { ...item, label: e.target.value };
                                        handleUpdateSelectedBlock((b) => ({
                                          ...b,
                                          data: { ...b.data, items: next }
                                        }));
                                      }}
                                      placeholder="Label"
                                      className="px-2.5 py-1.5 rounded bg-[#121217] border border-white/10 text-white text-xs"
                                    />
                                  </div>
                                )}

                                {selectedBlock.type === 'features_grid' && (
                                  <>
                                    <input
                                      type="text"
                                      value={item.title || ''}
                                      onChange={(e) => {
                                        const next = [...selectedBlock.data.items];
                                        next[idx] = { ...item, title: e.target.value };
                                        handleUpdateSelectedBlock((b) => ({
                                          ...b,
                                          data: { ...b.data, items: next }
                                        }));
                                      }}
                                      placeholder="Judul Kartu"
                                      className="w-full px-2.5 py-1.5 rounded bg-[#121217] border border-white/10 text-white text-xs font-bold"
                                    />
                                    <textarea
                                      rows={2}
                                      value={item.desc || ''}
                                      onChange={(e) => {
                                        const next = [...selectedBlock.data.items];
                                        next[idx] = { ...item, desc: e.target.value };
                                        handleUpdateSelectedBlock((b) => ({
                                          ...b,
                                          data: { ...b.data, items: next }
                                        }));
                                      }}
                                      placeholder="Deskripsi"
                                      className="w-full px-2.5 py-1.5 rounded bg-[#121217] border border-white/10 text-gray-300 text-xs"
                                    />
                                  </>
                                )}

                                {selectedBlock.type === 'faq' && (
                                  <>
                                    <input
                                      type="text"
                                      value={item.q || ''}
                                      onChange={(e) => {
                                        const next = [...selectedBlock.data.items];
                                        next[idx] = { ...item, q: e.target.value };
                                        handleUpdateSelectedBlock((b) => ({
                                          ...b,
                                          data: { ...b.data, items: next }
                                        }));
                                      }}
                                      placeholder="Pertanyaan"
                                      className="w-full px-2.5 py-1.5 rounded bg-[#121217] border border-white/10 text-white text-xs font-bold"
                                    />
                                    <textarea
                                      rows={2}
                                      value={item.a || ''}
                                      onChange={(e) => {
                                        const next = [...selectedBlock.data.items];
                                        next[idx] = { ...item, a: e.target.value };
                                        handleUpdateSelectedBlock((b) => ({
                                          ...b,
                                          data: { ...b.data, items: next }
                                        }));
                                      }}
                                      placeholder="Jawaban"
                                      className="w-full px-2.5 py-1.5 rounded bg-[#121217] border border-white/10 text-gray-300 text-xs"
                                    />
                                  </>
                                )}

                                {selectedBlock.type === 'testimonials' && (
                                  <>
                                    <textarea
                                      rows={2}
                                      value={item.text || ''}
                                      onChange={(e) => {
                                        const next = [...selectedBlock.data.items];
                                        next[idx] = { ...item, text: e.target.value };
                                        handleUpdateSelectedBlock((b) => ({
                                          ...b,
                                          data: { ...b.data, items: next }
                                        }));
                                      }}
                                      placeholder="Kutipan Testimoni"
                                      className="w-full px-2.5 py-1.5 rounded bg-[#121217] border border-white/10 text-white text-xs"
                                    />
                                    <div className="grid grid-cols-2 gap-2">
                                      <input
                                        type="text"
                                        value={item.name || ''}
                                        onChange={(e) => {
                                          const next = [...selectedBlock.data.items];
                                          next[idx] = { ...item, name: e.target.value };
                                          handleUpdateSelectedBlock((b) => ({
                                            ...b,
                                            data: { ...b.data, items: next }
                                          }));
                                        }}
                                        placeholder="Nama Klien"
                                        className="px-2.5 py-1.5 rounded bg-[#121217] border border-white/10 text-white text-xs"
                                      />
                                      <input
                                        type="text"
                                        value={item.role || ''}
                                        onChange={(e) => {
                                          const next = [...selectedBlock.data.items];
                                          next[idx] = { ...item, role: e.target.value };
                                          handleUpdateSelectedBlock((b) => ({
                                            ...b,
                                            data: { ...b.data, items: next }
                                          }));
                                        }}
                                        placeholder="Jabatan / Perusahaan"
                                        className="px-2.5 py-1.5 rounded bg-[#121217] border border-white/10 text-gold text-xs"
                                      />
                                    </div>
                                  </>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =================================================================
              TAB 5: USER & AUTHOR MANAGEMENT
          ================================================================= */}
          {activeTab === 'users' && canManageBuilderAndUsers && (
            <div className="max-w-7xl mx-auto space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 bg-[#15151c] border border-white/10 rounded-2xl p-5">
                <div>
                  <h3 className="text-base font-bold text-white">
                    Manajemen Akun Pengguna & Penulis Artikel
                  </h3>
                  <p className="text-xs text-gray-400">
                    Tambah atau edit pengguna yang memiliki akses login ke dashboard untuk menulis dan menerbitkan artikel hukum.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setEditingUser({
                      username: '',
                      password: '',
                      name: '',
                      email: '',
                      role: 'author',
                      title: 'Legal Associate & Author',
                      bio: '',
                      profile_photo_url: '/logo.png',
                      active: true
                    })
                  }
                  className="px-5 py-2.5 rounded-xl bg-gold text-navy hover:bg-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer"
                >
                  <Plus size={16} /> Tambah User / Penulis Baru
                </button>
              </div>

              {editingUser && (
                <form
                  onSubmit={handleSaveUser}
                  className="bg-[#15151c] border border-gold/40 rounded-2xl p-6 space-y-4"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <h4 className="text-sm font-bold text-gold uppercase tracking-wider">
                      {editingUser.id ? `Edit User: ${editingUser.username}` : 'Tambah User / Penulis Baru'}
                    </h4>
                    <button
                      type="button"
                      onClick={() => setEditingUser(null)}
                      className="text-gray-400 hover:text-white"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-gray-400 mb-1">
                        Nama Lengkap & Gelar (Tampil di Artikel) *
                      </label>
                      <input
                        type="text"
                        required
                        value={editingUser.name || ''}
                        onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                        placeholder="Contoh: Dr. Hendra Wijaya, S.H., M.H."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#1b1b24] border border-white/15 text-white text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-gray-400 mb-1">
                        Username Login *
                      </label>
                      <input
                        type="text"
                        required
                        disabled={editingUser.username === 'admin_nh'}
                        value={editingUser.username || ''}
                        onChange={(e) => setEditingUser({ ...editingUser, username: e.target.value })}
                        placeholder="username_penulis"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#1b1b24] border border-white/15 text-white text-xs font-mono disabled:opacity-50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-gray-400 mb-1">
                        Password Login *
                      </label>
                      <input
                        type="text"
                        required
                        value={editingUser.password || ''}
                        onChange={(e) => setEditingUser({ ...editingUser, password: e.target.value })}
                        placeholder="Masukkan password"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#1b1b24] border border-white/15 text-gold text-xs font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-gray-400 mb-1">
                        Jabatan / Spesialisasi
                      </label>
                      <input
                        type="text"
                        value={editingUser.title || ''}
                        onChange={(e) => setEditingUser({ ...editingUser, title: e.target.value })}
                        placeholder="Senior Legal Consultant"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#1b1b24] border border-white/15 text-white text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-gray-400 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        value={editingUser.email || ''}
                        onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                        placeholder="nama@narasumberhukum.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#1b1b24] border border-white/15 text-white text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-gray-400 mb-1">
                        Role Hak Akses
                      </label>
                      <select
                        value={editingUser.role || 'author'}
                        onChange={(e) =>
                          setEditingUser({ ...editingUser, role: e.target.value as any })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#1b1b24] border border-white/15 text-white text-xs font-bold"
                      >
                        <option value="author">Penulis Artikel (Author)</option>
                        <option value="editor">Editor Redaksi (Editor)</option>
                        <option value="super_admin">Super Administrator</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-gray-400 mb-1">
                        URL Foto Profil Penulis
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={editingUser.profile_photo_url || ''}
                          onChange={(e) =>
                            setEditingUser({ ...editingUser, profile_photo_url: e.target.value })
                          }
                          placeholder="/logo.png atau https://..."
                          className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#1b1b24] border border-white/15 text-white text-xs"
                        />
                        <label className="px-3 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-gold text-xs font-bold cursor-pointer shrink-0">
                          Upload Foto
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) =>
                              handleImageFileUpload(e, (url) =>
                                setEditingUser({ ...editingUser, profile_photo_url: url })
                              )
                            }
                          />
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-gray-400 mb-1">
                        Bio Singkat Penulis
                      </label>
                      <input
                        type="text"
                        value={editingUser.bio || ''}
                        onChange={(e) => setEditingUser({ ...editingUser, bio: e.target.value })}
                        placeholder="Deskripsi singkat keahlian hukum penulis..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#1b1b24] border border-white/15 text-white text-xs"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-white/10">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editingUser.active !== false}
                        onChange={(e) =>
                          setEditingUser({ ...editingUser, active: e.target.checked })
                        }
                        className="w-4 h-4 accent-gold"
                      />
                      <span className="text-xs font-bold text-white">
                        Akun Aktif (Dapat Login & Menulis Artikel)
                      </span>
                    </label>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setEditingUser(null)}
                        className="px-4 py-2 rounded-xl bg-white/5 text-gray-300 text-xs font-bold cursor-pointer"
                      >
                        Batal
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 rounded-xl bg-gold text-navy font-bold text-xs uppercase tracking-wider cursor-pointer"
                      >
                        Simpan Akun User
                      </button>
                    </div>
                  </div>
                </form>
              )}

              {/* Users Cards Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {db.users.map((u) => {
                  const userArticlesCount = db.articles.filter((a) => a.author_id === u.id).length;
                  return (
                    <div
                      key={u.id}
                      className="bg-[#15151c] border border-white/10 hover:border-gold/40 rounded-2xl p-5 flex flex-col justify-between transition-all"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-3 mb-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={u.profile_photo_url || '/logo.png'}
                              alt={u.name}
                              className="w-12 h-12 rounded-full object-cover border border-gold/40 bg-navy"
                            />
                            <div>
                              <h4 className="font-bold text-white text-sm">{u.name}</h4>
                              <p className="text-xs text-gold font-medium">{u.title}</p>
                            </div>
                          </div>
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                              u.active
                                ? 'bg-emerald-500/15 text-emerald-300'
                                : 'bg-red-500/15 text-red-300'
                            }`}
                          >
                            {u.active ? 'Aktif' : 'Nonaktif'}
                          </span>
                        </div>

                        <p className="text-xs text-gray-400 mb-4 line-clamp-2">
                          {u.bio || 'Penulis artikel edukasi hukum Kantor Narasumber Hukum.'}
                        </p>

                        <div className="p-3 rounded-xl bg-[#1b1b24] border border-white/5 space-y-1.5 text-xs mb-4">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Username:</span>
                            <span className="font-mono font-bold text-white">{u.username}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Password:</span>
                            <span className="font-mono text-gold">{u.password}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Role Akses:</span>
                            <span className="uppercase font-bold text-gray-200">{u.role}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Artikel Ditulis:</span>
                            <span className="font-bold text-white">{userArticlesCount} Artikel</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/10">
                        <button
                          type="button"
                          onClick={() => setEditingUser(u)}
                          className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-gold hover:text-navy text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Edit3 size={13} /> Edit User / Password
                        </button>
                        {u.username !== 'admin_nh' && (
                          <button
                            type="button"
                            onClick={() => handleDeleteUser(u.id)}
                            className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-300 cursor-pointer"
                            title="Hapus User"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* =================================================================
              TAB 6: SITE SETTINGS
          ================================================================= */}
          {activeTab === 'settings' && canManageBuilderAndUsers && (
            <div className="max-w-4xl mx-auto bg-[#15151c] border border-white/10 rounded-2xl p-6 space-y-5">
              <div>
                <h3 className="text-base font-bold text-white">
                  Pengaturan Identitas, Kontak & Kutipan Website
                </h3>
                <p className="text-xs text-gray-400">
                  Perubahan pada pengaturan ini akan langsung diterapkan pada Beranda dan komponen kontak website.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-400 mb-1.5">
                    Nama Kantor / Website
                  </label>
                  <input
                    type="text"
                    value={db.siteSettings.siteName}
                    onChange={(e) =>
                      setDb({
                        ...db,
                        siteSettings: { ...db.siteSettings, siteName: e.target.value }
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-[#1b1b24] border border-white/15 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-400 mb-1.5">
                    Tagline Utama
                  </label>
                  <input
                    type="text"
                    value={db.siteSettings.tagline}
                    onChange={(e) =>
                      setDb({
                        ...db,
                        siteSettings: { ...db.siteSettings, tagline: e.target.value }
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-[#1b1b24] border border-white/15 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-400 mb-1.5">
                    Nomor WhatsApp Utama (Format 628...)
                  </label>
                  <input
                    type="text"
                    value={db.siteSettings.whatsapp}
                    onChange={(e) =>
                      setDb({
                        ...db,
                        siteSettings: { ...db.siteSettings, whatsapp: e.target.value }
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-[#1b1b24] border border-white/15 text-gold font-mono text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-400 mb-1.5">
                    Email Resmi
                  </label>
                  <input
                    type="email"
                    value={db.siteSettings.email}
                    onChange={(e) =>
                      setDb({
                        ...db,
                        siteSettings: { ...db.siteSettings, email: e.target.value }
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-[#1b1b24] border border-white/15 text-white text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-400 mb-1.5">
                  Kutipan Call-To-Action (Bagian Bawah Beranda)
                </label>
                <input
                  type="text"
                  value={db.siteSettings.ctaQuote}
                  onChange={(e) =>
                    setDb({
                      ...db,
                      siteSettings: { ...db.siteSettings, ctaQuote: e.target.value }
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-[#1b1b24] border border-white/15 text-white text-sm mb-2"
                />
                <input
                  type="text"
                  value={db.siteSettings.ctaGold}
                  onChange={(e) =>
                    setDb({
                      ...db,
                      siteSettings: { ...db.siteSettings, ctaGold: e.target.value }
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-[#1b1b24] border border-white/15 text-gold font-bold text-sm"
                />
              </div>

              <div className="pt-3">
                <button
                  type="button"
                  onClick={() => persistCmsData(db, 'Pengaturan website berhasil disimpan!')}
                  className="px-6 py-3 rounded-xl bg-gold text-navy hover:bg-white font-bold text-xs uppercase tracking-widest cursor-pointer"
                >
                  Simpan Pengaturan Website
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
