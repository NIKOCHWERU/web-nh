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
  X,
  AlignLeft,
  Quote,
  List,
  AlertCircle,
  GripVertical,
  Share2
} from 'lucide-react';
import {
  CmsDatabase,
  CmsUser,
  CmsArticle,
  CmsContactMessage,
  PageBlock,
  ArticleVisualBlock,
  htmlToArticleBlocks,
  articleBlocksToHtml,
  INITIAL_CMS_DB
} from '@/lib/cmsTypes';
import { BlockRendererItem } from '@/components/CustomBlocksRenderer';
import LinkTreeManager from '@/components/dashboard/LinkTreeManager';

type ActiveTab = 'overview' | 'articles' | 'messages' | 'builder' | 'users' | 'settings' | 'linktree';

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
      body: 'Kantor Narasumber Hukum berkomitmen menyajikan analisis hukum yang akurat, transparan, dan berorientasi pada solusi terbaik bagi setiap klien individu maupun korporasi.'
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
  const [articleBlocks, setArticleBlocks] = useState<ArticleVisualBlock[]>([]);
  const [articleEditorTab, setArticleEditorTab] = useState<'visual' | 'preview'>('visual');

  // --- MESSAGES MODULE STATE ---
  const [messageSearch, setMessageSearch] = useState('');
  const [messageStatusFilter, setMessageStatusFilter] = useState<'all' | 'unread' | 'read' | 'replied' | 'archived'>('all');
  const [selectedMessage, setSelectedMessage] = useState<CmsContactMessage | null>(null);

  // --- VISUAL BUILDER (ELEMENTOR) STATE ---
  const [builderPage, setBuilderPage] = useState<'home' | 'tentang' | 'services' | 'kontak' | 'global'>('home');
  const [builderViewport, setBuilderViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [canvasFocusMode, setCanvasFocusMode] = useState<'focused' | 'all'>('focused');
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
        const incomingBlocks: PageBlock[] = Array.isArray(data.blocks) ? data.blocks : [];
        const existingIds = new Set(incomingBlocks.map((b: any) => b.id));
        const mergedBlocks = [
          ...incomingBlocks,
          ...INITIAL_CMS_DB.blocks.filter((b) => !existingIds.has(b.id))
        ];
        const mergedDb = { ...data, blocks: mergedBlocks };
        setDb(mergedDb);
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

  const displayedBlocks = useMemo(() => {
    if (canvasFocusMode === 'focused' && selectedBlock) {
      return [selectedBlock];
    }
    return currentPageBlocks;
  }, [canvasFocusMode, selectedBlock, currentPageBlocks]);

  const unreadCount = useMemo(
    () => db.messages.filter((m) => m.status === 'unread').length,
    [db.messages]
  );

  // --- ARTICLE ACTIONS ---
  const openNewArticle = () => {
    const defaultAuthor =
      db.users.find((u) => u.id === currentUser?.id) || db.users[0];
    const initialBlocks: ArticleVisualBlock[] = [
      {
        id: `blk-${Date.now()}-1`,
        type: 'heading',
        text: 'Latar Belakang & Urgensi Hukum'
      },
      {
        id: `blk-${Date.now()}-2`,
        type: 'paragraph',
        text: 'Tuliskan uraian pembahasan edukasi hukum di sini secara mendalam dan berbobot.'
      }
    ];
    setArticleBlocks(initialBlocks);
    setArticleEditorTab('visual');
    setEditingArticle({
      title: '',
      slug: '',
      category: { id: 1, name: 'Hukum Perdata & Bisnis' },
      excerpt: '',
      content: articleBlocksToHtml(initialBlocks),
      image_url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
      supporting_images: [],
      author_id: defaultAuthor.id,
      status: 'published',
      featured: false,
      published_at: new Date().toISOString().slice(0, 10)
    });
  };

  const openEditArticle = (art: CmsArticle) => {
    const parsed = htmlToArticleBlocks(art.content || '');
    setArticleBlocks(parsed);
    setArticleEditorTab('visual');
    setEditingArticle({
      ...art,
      published_at: art.published_at ? art.published_at.slice(0, 10) : new Date().toISOString().slice(0, 10)
    });
  };

  const handleAddArticleBlock = (type: ArticleVisualBlock['type']) => {
    const newId = `blk-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    let newBlock: ArticleVisualBlock;

    switch (type) {
      case 'heading':
        newBlock = { id: newId, type: 'heading', text: '' };
        break;
      case 'paragraph':
        newBlock = { id: newId, type: 'paragraph', text: '' };
        break;
      case 'quote':
        newBlock = { id: newId, type: 'quote', text: '', quoteAuthor: '' };
        break;
      case 'list':
        newBlock = { id: newId, type: 'list', items: [''] };
        break;
      case 'image':
        newBlock = { id: newId, type: 'image', imageUrl: '', caption: '' };
        break;
      case 'callout':
        newBlock = { id: newId, type: 'callout', text: '' };
        break;
      default:
        newBlock = { id: newId, type: 'paragraph', text: '' };
    }

    setArticleBlocks((prev) => [...prev, newBlock]);
  };

  const handleUpdateArticleBlock = (id: string, updates: Partial<ArticleVisualBlock>) => {
    setArticleBlocks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...updates } : b))
    );
  };

  const handleMoveArticleBlock = (index: number, direction: 'up' | 'down') => {
    setArticleBlocks((prev) => {
      const next = [...prev];
      const swapIdx = direction === 'up' ? index - 1 : index + 1;
      if (swapIdx < 0 || swapIdx >= next.length) return prev;
      const temp = next[index];
      next[index] = next[swapIdx];
      next[swapIdx] = temp;
      return next;
    });
  };

  const handleDuplicateArticleBlock = (index: number) => {
    setArticleBlocks((prev) => {
      const target = prev[index];
      const copy: ArticleVisualBlock = {
        ...JSON.parse(JSON.stringify(target)),
        id: `blk-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`
      };
      const next = [...prev];
      next.splice(index + 1, 0, copy);
      return next;
    });
  };

  const handleDeleteArticleBlock = (id: string) => {
    setArticleBlocks((prev) => {
      if (prev.length <= 1) {
        return [{ id: `blk-${Date.now()}`, type: 'paragraph', text: '' }];
      }
      return prev.filter((b) => b.id !== id);
    });
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

    const finalHtml = articleBlocksToHtml(articleBlocks);
    const firstParagraph = articleBlocks.find((b) => b.type === 'paragraph')?.text || '';

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
        firstParagraph.slice(0, 160) ||
        finalHtml.replace(/<[^>]*>/g, '').slice(0, 160),
      content: finalHtml,
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
                id: 'linktree',
                label: 'Link Tree Generator',
                icon: <Share2 size={17} />,
                badge: (db.linktrees || []).length,
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
              {activeTab === 'linktree' && 'Link Tree Corporate & Personal Generator'}
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
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
                  onClick={() => setActiveTab('linktree')}
                  className="bg-[#15151c] border border-white/10 hover:border-gold/40 rounded-2xl p-5 cursor-pointer transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                      Link Tree Generator
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-gold flex items-center justify-center">
                      <Share2 size={18} />
                    </div>
                  </div>
                  <div className="text-3xl font-extrabold text-white mb-1">
                    {(db.linktrees || []).length}
                  </div>
                  <div className="text-xs text-gold font-semibold">
                    {(db.linktrees || []).filter((lt) => lt.active).length} profil aktif (@)
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
                  <button
                    type="button"
                    onClick={() => setActiveTab('linktree')}
                    className="px-4 py-2.5 rounded-xl bg-gold/15 hover:bg-gold text-gold hover:text-navy font-bold text-xs flex items-center gap-2 border border-gold/30 transition-all cursor-pointer"
                  >
                    <Share2 size={15} /> Kelola Link Tree (@)
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
                            openEditArticle(a);
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
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold block mb-1">
                        VISUAL ARTICLE BUILDER
                      </span>
                      <h3 className="text-lg font-bold text-white font-serif">
                        {editingArticle.id ? 'Edit Konten Artikel Hukum' : 'Tulis Artikel Hukum Baru'}
                      </h3>
                      <p className="text-xs text-gray-400">
                        Susun konten artikel secara visual dengan blok judul, paragraf, pasal, dan poin tanpa perlu menulis tag HTML.
                      </p>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <div className="bg-[#1b1b24] p-1 rounded-xl border border-white/10 flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => setArticleEditorTab('visual')}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            articleEditorTab === 'visual'
                              ? 'bg-gold text-navy shadow-md'
                              : 'text-gray-400 hover:text-white'
                          }`}
                        >
                          <Edit3 size={13} className="inline mr-1.5" />
                          Editor Blok Visual
                        </button>
                        <button
                          type="button"
                          onClick={() => setArticleEditorTab('preview')}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            articleEditorTab === 'preview'
                              ? 'bg-gold text-navy shadow-md'
                              : 'text-gray-400 hover:text-white'
                          }`}
                        >
                          <Eye size={13} className="inline mr-1.5 text-navy" />
                          Live Preview Tampilan
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => setEditingArticle(null)}
                        className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-bold cursor-pointer"
                      >
                        Batal
                      </button>
                    </div>
                  </div>

                  <form onSubmit={handleSaveArticle} className="grid lg:grid-cols-12 gap-6">
                    {/* Left 8 cols: Main Content / Preview */}
                    <div className="lg:col-span-8 space-y-4">
                      {articleEditorTab === 'preview' ? (
                        /* Live Preview Mode */
                        <div className="bg-[#101015] border border-white/10 rounded-2xl p-6 md:p-8 space-y-6">
                          <div className="flex items-center gap-2.5">
                            <span className="px-3 py-1 rounded-full bg-gold/20 border border-gold/40 text-gold text-xs font-bold uppercase tracking-wider">
                              {editingArticle.category?.name || 'Hukum & Bisnis'}
                            </span>
                            {editingArticle.featured && (
                              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[11px] font-bold border border-amber-500/30">
                                ★ HEADLINE UTAMA
                              </span>
                            )}
                            <span className="text-xs text-gray-400">
                              {editingArticle.published_at || new Date().toISOString().slice(0, 10)}
                            </span>
                          </div>

                          <h1 className="text-2xl md:text-3xl font-serif font-bold text-white leading-tight">
                            {editingArticle.title || 'Judul Artikel Belum Diisi'}
                          </h1>

                          {editingArticle.excerpt && (
                            <p className="text-sm md:text-base text-gray-300 italic border-l-2 border-gold/50 pl-3">
                              {editingArticle.excerpt}
                            </p>
                          )}

                          {editingArticle.image_url && (
                            <div className="rounded-2xl overflow-hidden border border-white/10 max-h-[380px]">
                              <img
                                src={editingArticle.image_url}
                                alt={editingArticle.title || 'Sampul Artikel'}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}

                          {/* Render Visual Blocks */}
                          <div className="space-y-4 pt-2">
                            {articleBlocks.map((b) => {
                              if (b.type === 'heading') {
                                return (
                                  <h2
                                    key={b.id}
                                    className="text-xl md:text-2xl font-serif font-bold text-white mt-8 mb-3 border-l-4 border-gold pl-3"
                                  >
                                    {b.text || 'Sub-Judul'}
                                  </h2>
                                );
                              }
                              if (b.type === 'paragraph') {
                                return (
                                  <p
                                    key={b.id}
                                    className="text-gray-300 text-sm md:text-base leading-relaxed my-3.5 whitespace-pre-line"
                                  >
                                    {b.text}
                                  </p>
                                );
                              }
                              if (b.type === 'quote') {
                                return (
                                  <blockquote
                                    key={b.id}
                                    className="my-5 p-4 rounded-xl bg-gradient-to-r from-gold/10 to-transparent border-l-4 border-gold italic text-gold-light text-sm md:text-base"
                                  >
                                    <p className="font-serif">"{b.text}"</p>
                                    {b.quoteAuthor && (
                                      <cite className="block text-xs font-sans not-italic text-gray-400 mt-2 font-medium">
                                        — {b.quoteAuthor}
                                      </cite>
                                    )}
                                  </blockquote>
                                );
                              }
                              if (b.type === 'list') {
                                return (
                                  <ul key={b.id} className="my-4 space-y-2">
                                    {(b.items || []).filter(Boolean).map((it, i) => (
                                      <li key={i} className="flex items-start gap-2.5 text-sm md:text-base text-gray-300">
                                        <span className="w-2 h-2 rounded-full bg-gold shrink-0 mt-2" />
                                        <span>{it}</span>
                                      </li>
                                    ))}
                                  </ul>
                                );
                              }
                              if (b.type === 'image') {
                                if (!b.imageUrl) return null;
                                return (
                                  <figure key={b.id} className="my-6">
                                    <img
                                      src={b.imageUrl}
                                      alt={b.caption || ''}
                                      className="w-full rounded-2xl border border-white/10 shadow-lg object-cover max-h-[420px]"
                                    />
                                    {b.caption && (
                                      <figcaption className="text-xs text-center text-gray-400 mt-2 italic">
                                        {b.caption}
                                      </figcaption>
                                    )}
                                  </figure>
                                );
                              }
                              if (b.type === 'callout') {
                                return (
                                  <div
                                    key={b.id}
                                    className="my-5 p-4 rounded-xl bg-gold/10 border border-gold/30 text-gold-light text-sm md:text-base font-medium flex items-start gap-3"
                                  >
                                    <AlertCircle className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                                    <div className="leading-relaxed">{b.text}</div>
                                  </div>
                                );
                              }
                              return null;
                            })}
                          </div>
                        </div>
                      ) : (
                        /* Visual Editor Mode */
                        <>
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
                              Ringkasan Singkat (Excerpt / Cuplikan Artikel)
                            </label>
                            <textarea
                              rows={2}
                              value={editingArticle.excerpt || ''}
                              onChange={(e) => setEditingArticle({ ...editingArticle, excerpt: e.target.value })}
                              placeholder="Ringkasan 1-2 kalimat yang tampil pada kartu daftar artikel dan headline..."
                              className="w-full px-4 py-2.5 rounded-xl bg-[#1b1b24] border border-white/15 focus:border-gold text-white text-sm focus:outline-none"
                            />
                          </div>

                          {/* Visual Content Blocks Builder */}
                          <div className="space-y-4 pt-2">
                            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-white/10">
                              <div>
                                <label className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                                  <Layers size={14} className="text-gold" />
                                  Susunan Blok Konten Artikel ({articleBlocks.length} Blok)
                                </label>
                                <p className="text-[11px] text-gray-400 mt-0.5">
                                  Klik tombol blok untuk menambah bagian. Geser urutan dengan tombol panah tanpa mengetik HTML.
                                </p>
                              </div>

                              {/* Quick-Add Toolbar */}
                              <div className="flex flex-wrap items-center gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => handleAddArticleBlock('heading')}
                                  className="px-2.5 py-1.5 rounded-lg bg-purple-500/15 hover:bg-purple-500/25 border border-purple-500/30 text-purple-200 text-[11px] font-semibold flex items-center gap-1 transition-all cursor-pointer"
                                >
                                  <Type size={12} className="text-purple-400" /> + Sub-Judul
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleAddArticleBlock('paragraph')}
                                  className="px-2.5 py-1.5 rounded-lg bg-blue-500/15 hover:bg-blue-500/25 border border-blue-500/30 text-blue-200 text-[11px] font-semibold flex items-center gap-1 transition-all cursor-pointer"
                                >
                                  <AlignLeft size={12} className="text-blue-400" /> + Paragraf
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleAddArticleBlock('quote')}
                                  className="px-2.5 py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-200 text-[11px] font-semibold flex items-center gap-1 transition-all cursor-pointer"
                                >
                                  <Quote size={12} className="text-amber-400" /> + Kutipan / Pasal
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleAddArticleBlock('list')}
                                  className="px-2.5 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-200 text-[11px] font-semibold flex items-center gap-1 transition-all cursor-pointer"
                                >
                                  <List size={12} className="text-emerald-400" /> + Daftar Poin
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleAddArticleBlock('image')}
                                  className="px-2.5 py-1.5 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-200 text-[11px] font-semibold flex items-center gap-1 transition-all cursor-pointer"
                                >
                                  <ImageIcon size={12} className="text-cyan-400" /> + Gambar
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleAddArticleBlock('callout')}
                                  className="px-2.5 py-1.5 rounded-lg bg-gold/15 hover:bg-gold/25 border border-gold/30 text-gold-light text-[11px] font-semibold flex items-center gap-1 transition-all cursor-pointer"
                                >
                                  <AlertCircle size={12} className="text-gold" /> + Catatan
                                </button>
                              </div>
                            </div>

                            {/* Block Cards List */}
                            <div className="space-y-3.5">
                              {articleBlocks.map((block, idx) => (
                                <div
                                  key={block.id}
                                  className="bg-[#16161e] border border-white/10 hover:border-gold/40 rounded-xl p-4 transition-all shadow-md group relative"
                                >
                                  {/* Block Card Header */}
                                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/5">
                                    <div className="flex items-center gap-2">
                                      <span className="w-6 h-6 rounded-md bg-white/5 text-gray-400 flex items-center justify-center text-xs font-mono font-bold">
                                        #{idx + 1}
                                      </span>
                                      {block.type === 'heading' && (
                                        <span className="px-2.5 py-0.5 rounded-md bg-purple-500/20 text-purple-300 text-[11px] font-bold flex items-center gap-1">
                                          <Type size={12} /> Sub-Judul (Heading)
                                        </span>
                                      )}
                                      {block.type === 'paragraph' && (
                                        <span className="px-2.5 py-0.5 rounded-md bg-blue-500/20 text-blue-300 text-[11px] font-bold flex items-center gap-1">
                                          <AlignLeft size={12} /> Paragraf Penjelasan
                                        </span>
                                      )}
                                      {block.type === 'quote' && (
                                        <span className="px-2.5 py-0.5 rounded-md bg-amber-500/20 text-amber-300 text-[11px] font-bold flex items-center gap-1">
                                          <Quote size={12} /> Kutipan / Bunyi Pasal
                                        </span>
                                      )}
                                      {block.type === 'list' && (
                                        <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 text-[11px] font-bold flex items-center gap-1">
                                          <List size={12} /> Daftar Poin (Bullet List)
                                        </span>
                                      )}
                                      {block.type === 'image' && (
                                        <span className="px-2.5 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 text-[11px] font-bold flex items-center gap-1">
                                          <ImageIcon size={12} /> Gambar Pendukung
                                        </span>
                                      )}
                                      {block.type === 'callout' && (
                                        <span className="px-2.5 py-0.5 rounded-md bg-gold/20 text-gold text-[11px] font-bold flex items-center gap-1">
                                          <AlertCircle size={12} /> Catatan Penting
                                        </span>
                                      )}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex items-center gap-1">
                                      <button
                                        type="button"
                                        disabled={idx === 0}
                                        onClick={() => handleMoveArticleBlock(idx, 'up')}
                                        className={`p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors ${
                                          idx === 0 ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'
                                        }`}
                                        title="Pindah ke Atas"
                                      >
                                        <ArrowUp size={14} />
                                      </button>
                                      <button
                                        type="button"
                                        disabled={idx === articleBlocks.length - 1}
                                        onClick={() => handleMoveArticleBlock(idx, 'down')}
                                        className={`p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors ${
                                          idx === articleBlocks.length - 1 ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'
                                        }`}
                                        title="Pindah ke Bawah"
                                      >
                                        <ArrowDown size={14} />
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => handleDuplicateArticleBlock(idx)}
                                        className="p-1.5 rounded-lg text-gray-400 hover:text-gold hover:bg-white/10 transition-colors cursor-pointer"
                                        title="Duplikat Blok"
                                      >
                                        <Copy size={14} />
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => handleDeleteArticleBlock(block.id)}
                                        className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                                        title="Hapus Blok"
                                      >
                                        <Trash2 size={14} />
                                      </button>
                                    </div>
                                  </div>

                                  {/* Block Card Content */}
                                  <div>
                                    {block.type === 'heading' && (
                                      <input
                                        type="text"
                                        value={block.text || ''}
                                        onChange={(e) => handleUpdateArticleBlock(block.id, { text: e.target.value })}
                                        placeholder="Tulis sub-judul pembahasan di sini (contoh: 1. Dasar Hukum dan Peraturan Terkait)..."
                                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#111116] border border-white/15 focus:border-purple-400 text-white font-bold text-sm focus:outline-none"
                                      />
                                    )}

                                    {block.type === 'paragraph' && (
                                      <textarea
                                        rows={4}
                                        value={block.text || ''}
                                        onChange={(e) => handleUpdateArticleBlock(block.id, { text: e.target.value })}
                                        placeholder="Tulis penjelasan hukum di sini secara bebas tanpa kode HTML (tekan Enter untuk baris baru)..."
                                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#111116] border border-white/15 focus:border-blue-400 text-gray-200 text-sm leading-relaxed focus:outline-none"
                                      />
                                    )}

                                    {block.type === 'quote' && (
                                      <div className="space-y-2.5 pl-3 border-l-2 border-amber-400">
                                        <div>
                                          <label className="block text-[10px] font-bold uppercase text-amber-300 mb-1">
                                            Isi Kutipan / Bunyi Pasal
                                          </label>
                                          <textarea
                                            rows={3}
                                            value={block.text || ''}
                                            onChange={(e) => handleUpdateArticleBlock(block.id, { text: e.target.value })}
                                            placeholder="Ketik bunyi pasal undang-undang atau kutipan putusan pengadilan..."
                                            className="w-full px-3.5 py-2 rounded-xl bg-[#111116] border border-white/15 focus:border-amber-400 text-white text-sm italic focus:outline-none"
                                          />
                                        </div>
                                        <div>
                                          <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">
                                            Sumber Kutipan / Nama Peraturan
                                          </label>
                                          <input
                                            type="text"
                                            value={block.quoteAuthor || ''}
                                            onChange={(e) => handleUpdateArticleBlock(block.id, { quoteAuthor: e.target.value })}
                                            placeholder="Contoh: Pasal 1365 KUHPerdata / Putusan MA RI No. 123 K/Pdt"
                                            className="w-full px-3.5 py-2 rounded-xl bg-[#111116] border border-white/15 focus:border-amber-400 text-gray-300 text-xs focus:outline-none"
                                          />
                                        </div>
                                      </div>
                                    )}

                                    {block.type === 'list' && (
                                      <div className="space-y-2">
                                        <label className="block text-[10px] font-bold uppercase text-emerald-300">
                                          Daftar Butir Poin
                                        </label>
                                        {(block.items || ['']).map((item, itemIdx) => (
                                          <div key={itemIdx} className="flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 ml-1" />
                                            <input
                                              type="text"
                                              value={item}
                                              onChange={(e) => {
                                                const nextItems = [...(block.items || [''])];
                                                nextItems[itemIdx] = e.target.value;
                                                handleUpdateArticleBlock(block.id, { items: nextItems });
                                              }}
                                              placeholder={`Poin pembahasan #${itemIdx + 1}...`}
                                              className="flex-1 px-3 py-2 rounded-xl bg-[#111116] border border-white/15 focus:border-emerald-400 text-white text-xs focus:outline-none"
                                            />
                                            <button
                                              type="button"
                                              onClick={() => {
                                                const nextItems = (block.items || ['']).filter((_, i) => i !== itemIdx);
                                                handleUpdateArticleBlock(block.id, {
                                                  items: nextItems.length > 0 ? nextItems : ['']
                                                });
                                              }}
                                              className="p-2 rounded-lg text-gray-500 hover:text-red-400 hover:bg-white/5 transition-colors cursor-pointer"
                                              title="Hapus Poin"
                                            >
                                              <X size={14} />
                                            </button>
                                          </div>
                                        ))}
                                        <button
                                          type="button"
                                          onClick={() => {
                                            handleUpdateArticleBlock(block.id, {
                                              items: [...(block.items || []), '']
                                            });
                                          }}
                                          className="mt-1 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                                        >
                                          <Plus size={13} /> Tambah Butir Poin Baru
                                        </button>
                                      </div>
                                    )}

                                    {block.type === 'image' && (
                                      <div className="space-y-3">
                                        <div className="flex flex-col sm:flex-row gap-3">
                                          <div className="flex-1 space-y-2">
                                            <label className="block text-[10px] font-bold uppercase text-cyan-300">
                                              URL Gambar atau Unggah Foto
                                            </label>
                                            <input
                                              type="text"
                                              value={block.imageUrl || ''}
                                              onChange={(e) => handleUpdateArticleBlock(block.id, { imageUrl: e.target.value })}
                                              placeholder="https://... atau klik tombol unggah"
                                              className="w-full px-3 py-2 rounded-xl bg-[#111116] border border-white/15 focus:border-cyan-400 text-white text-xs focus:outline-none"
                                            />
                                            <div className="flex items-center gap-2">
                                              <label className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-cyan-500/20 hover:text-cyan-300 text-gray-300 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors">
                                                <ImageIcon size={13} />
                                                Unggah dari Laptop
                                                <input
                                                  type="file"
                                                  accept="image/*"
                                                  className="hidden"
                                                  onChange={(e) =>
                                                    handleImageFileUpload(e, (dataUrl) =>
                                                      handleUpdateArticleBlock(block.id, { imageUrl: dataUrl })
                                                    )
                                                  }
                                                />
                                              </label>
                                            </div>
                                          </div>
                                          {block.imageUrl && (
                                            <div className="w-32 h-20 rounded-xl overflow-hidden border border-white/15 shrink-0 bg-black/40">
                                              <img
                                                src={block.imageUrl}
                                                alt="Preview"
                                                className="w-full h-full object-cover"
                                              />
                                            </div>
                                          )}
                                        </div>
                                        <div>
                                          <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">
                                            Keterangan / Caption Gambar (Opsional)
                                          </label>
                                          <input
                                            type="text"
                                            value={block.caption || ''}
                                            onChange={(e) => handleUpdateArticleBlock(block.id, { caption: e.target.value })}
                                            placeholder="Contoh: Diskusi tim konsultan Narasumber Hukum bersama mitra strategis."
                                            className="w-full px-3 py-2 rounded-xl bg-[#111116] border border-white/15 focus:border-cyan-400 text-gray-300 text-xs focus:outline-none"
                                          />
                                        </div>
                                      </div>
                                    )}

                                    {block.type === 'callout' && (
                                      <div className="p-3.5 rounded-xl bg-gold/10 border border-gold/30 space-y-2">
                                        <label className="block text-[10px] font-bold uppercase text-gold flex items-center gap-1.5">
                                          <AlertCircle size={13} /> Isi Kotak Catatan / Rekomendasi Penting
                                        </label>
                                        <textarea
                                          rows={3}
                                          value={block.text || ''}
                                          onChange={(e) => handleUpdateArticleBlock(block.id, { text: e.target.value })}
                                          placeholder="Tuliskan catatan penting, peringatan hukum, atau klausul perhatian..."
                                          className="w-full px-3.5 py-2 rounded-xl bg-[#111116] border border-gold/30 focus:border-gold text-gold-light text-sm leading-relaxed focus:outline-none"
                                        />
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>

                            {/* Bottom Quick-Add Bar */}
                            <div className="p-4 rounded-xl border border-dashed border-white/15 bg-white/[0.02] flex flex-col items-center justify-center text-center gap-2.5">
                              <span className="text-xs font-semibold text-gray-400">
                                Tambah Bagian / Blok Konten Baru:
                              </span>
                              <div className="flex flex-wrap items-center justify-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => handleAddArticleBlock('heading')}
                                  className="px-3 py-1.5 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 border border-purple-500/30 text-purple-200 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                                >
                                  <Type size={13} /> + Sub-Judul
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleAddArticleBlock('paragraph')}
                                  className="px-3 py-1.5 rounded-xl bg-blue-500/15 hover:bg-blue-500/25 border border-blue-500/30 text-blue-200 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                                >
                                  <AlignLeft size={13} /> + Paragraf
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleAddArticleBlock('quote')}
                                  className="px-3 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-200 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                                >
                                  <Quote size={13} /> + Kutipan / Pasal
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleAddArticleBlock('list')}
                                  className="px-3 py-1.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-200 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                                >
                                  <List size={13} /> + Daftar Poin
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleAddArticleBlock('image')}
                                  className="px-3 py-1.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-200 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                                >
                                  <ImageIcon size={13} /> + Gambar
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleAddArticleBlock('callout')}
                                  className="px-3 py-1.5 rounded-xl bg-gold/15 hover:bg-gold/25 border border-gold/30 text-gold-light text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                                >
                                  <AlertCircle size={13} /> + Catatan Penting
                                </button>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
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
                                    onClick={() => openEditArticle(art)}
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
                      const pageBlocks = db.blocks.filter((b) => b.page === nextPage);
                      setSelectedBlockId(pageBlocks[0]?.id || null);
                    }}
                    className="px-3.5 py-1.5 rounded-lg bg-[#0e0e12] border border-gold/40 text-white text-xs font-bold focus:outline-none cursor-pointer"
                  >
                    <option value="global">🌐 Global (Header Navbar & Footer)</option>
                    <option value="home">🏠 Beranda (/)</option>
                    <option value="tentang">📄 Tentang Kami (/tentang)</option>
                    <option value="services">⚖️ Layanan (/services)</option>
                    <option value="kontak">📞 Kontak (/kontak)</option>
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
                    <div className="bg-[#18181f] text-gray-300 px-4 py-2 text-[11px] flex flex-wrap items-center justify-between gap-2 border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                        <span>
                          Live Preview: <strong className="text-gold uppercase">{builderPage}</strong>
                        </span>
                        {selectedBlock && (
                          <span className="bg-gold/15 text-gold border border-gold/30 px-2 py-0.5 rounded text-[10px] font-bold">
                            Fokus: {selectedBlock.name}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px]">
                        <span className="text-gray-400">Mode:</span>
                        <button
                          type="button"
                          onClick={() => setCanvasFocusMode('focused')}
                          className={`px-2 py-0.5 rounded font-bold transition cursor-pointer ${
                            canvasFocusMode === 'focused' ? 'bg-gold text-navy' : 'bg-white/10 text-gray-300 hover:text-white'
                          }`}
                          title="Hanya tampilkan potongan div/komponen yang sedang aktif diedit"
                        >
                          Potongan Komponen
                        </button>
                        <button
                          type="button"
                          onClick={() => setCanvasFocusMode('all')}
                          className={`px-2 py-0.5 rounded font-bold transition cursor-pointer ${
                            canvasFocusMode === 'all' ? 'bg-gold text-navy' : 'bg-white/10 text-gray-300 hover:text-white'
                          }`}
                          title="Tampilkan semua blok di halaman ini"
                        >
                          Semua Blok
                        </button>
                      </div>
                    </div>

                    {displayedBlocks.length > 0 ? (
                      displayedBlocks.map((block, idx) => (
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

                        
                                                {selectedBlock.type === 'hero' && (
                          <div className="space-y-3 p-3 bg-white/5 rounded-xl border border-gold/30">
                            <div className="text-xs font-bold text-gold uppercase">Background Video & Tombol Hero</div>
                            <div>
                              <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">URL Background Video (MP4)</label>
                              <input
                                type="text"
                                value={selectedBlock.data.bgVideoUrl || ''}
                                onChange={(e) => handleUpdateSelectedBlock(b => ({ ...b, data: { ...b.data, bgVideoUrl: e.target.value } }))}
                                placeholder="https://res.cloudinary.com/.../video.mp4"
                                className="w-full px-3 py-2 rounded-lg bg-[#1b1b24] border border-white/15 text-white text-xs font-mono"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">Teks Tombol Ke-2</label>
                                <input
                                  type="text"
                                  value={selectedBlock.data.secondaryBtnText || ''}
                                  onChange={(e) => handleUpdateSelectedBlock(b => ({ ...b, data: { ...b.data, secondaryBtnText: e.target.value } }))}
                                  placeholder="KONSULTASI SEKARANG"
                                  className="w-full px-3 py-2 rounded-lg bg-[#1b1b24] border border-white/15 text-white text-xs"
                                />
                              </div>
                              <div>
                                <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">Link Tombol Ke-2</label>
                                <input
                                  type="text"
                                  value={selectedBlock.data.secondaryBtnUrl || ''}
                                  onChange={(e) => handleUpdateSelectedBlock(b => ({ ...b, data: { ...b.data, secondaryBtnUrl: e.target.value } }))}
                                  placeholder="/kontak"
                                  className="w-full px-3 py-2 rounded-lg bg-[#1b1b24] border border-white/15 text-white text-xs"
                                />
                              </div>
                            </div>
                          </div>
                        )}


                        {/* NAVBAR SECTION EDITORS */}
                        {selectedBlock.type === 'navbar_section' && (
                          <div className="space-y-3 p-3 bg-white/5 rounded-xl border border-gold/30">
                            <div className="text-xs font-bold text-gold uppercase">Pengaturan Navbar Header</div>
                            <div>
                              <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">Nama Brand / Judul</label>
                              <input
                                type="text"
                                value={selectedBlock.data.brandName || ''}
                                onChange={(e) => handleUpdateSelectedBlock(b => ({ ...b, data: { ...b.data, brandName: e.target.value } }))}
                                className="w-full px-3 py-2 rounded-lg bg-[#1b1b24] border border-white/15 text-white text-xs font-bold"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">Tagline Navbar</label>
                              <input
                                type="text"
                                value={selectedBlock.data.tagline || ''}
                                onChange={(e) => handleUpdateSelectedBlock(b => ({ ...b, data: { ...b.data, tagline: e.target.value } }))}
                                className="w-full px-3 py-2 rounded-lg bg-[#1b1b24] border border-white/15 text-white text-xs"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">URL Logo (Contoh: /logo.png)</label>
                              <input
                                type="text"
                                value={selectedBlock.data.logoUrl || ''}
                                onChange={(e) => handleUpdateSelectedBlock(b => ({ ...b, data: { ...b.data, logoUrl: e.target.value } }))}
                                className="w-full px-3 py-2 rounded-lg bg-[#1b1b24] border border-white/15 text-white text-xs font-mono"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">Teks Tombol CTA</label>
                                <input
                                  type="text"
                                  value={selectedBlock.data.ctaText || ''}
                                  onChange={(e) => handleUpdateSelectedBlock(b => ({ ...b, data: { ...b.data, ctaText: e.target.value } }))}
                                  className="w-full px-3 py-2 rounded-lg bg-[#1b1b24] border border-white/15 text-white text-xs"
                                />
                              </div>
                              <div>
                                <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">Link Tombol CTA</label>
                                <input
                                  type="text"
                                  value={selectedBlock.data.ctaUrl || ''}
                                  onChange={(e) => handleUpdateSelectedBlock(b => ({ ...b, data: { ...b.data, ctaUrl: e.target.value } }))}
                                  className="w-full px-3 py-2 rounded-lg bg-[#1b1b24] border border-white/15 text-white text-xs"
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        {/* FOOTER SECTION EDITORS */}
                        {selectedBlock.type === 'footer_section' && (
                          <div className="space-y-3 p-3 bg-white/5 rounded-xl border border-gold/30">
                            <div className="text-xs font-bold text-gold uppercase">Pengaturan Footer</div>
                            <div>
                              <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">Deskripsi Singkat Footer</label>
                              <textarea
                                rows={3}
                                value={selectedBlock.data.aboutSummary || ''}
                                onChange={(e) => handleUpdateSelectedBlock(b => ({ ...b, data: { ...b.data, aboutSummary: e.target.value } }))}
                                className="w-full px-3 py-2 rounded-lg bg-[#1b1b24] border border-white/15 text-white text-xs"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">Nomor WhatsApp</label>
                                <input
                                  type="text"
                                  value={selectedBlock.data.whatsapp || ''}
                                  onChange={(e) => handleUpdateSelectedBlock(b => ({ ...b, data: { ...b.data, whatsapp: e.target.value } }))}
                                  className="w-full px-3 py-2 rounded-lg bg-[#1b1b24] border border-white/15 text-white text-xs font-mono"
                                />
                              </div>
                              <div>
                                <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">Teks Hak Cipta</label>
                                <input
                                  type="text"
                                  value={selectedBlock.data.copyright || ''}
                                  onChange={(e) => handleUpdateSelectedBlock(b => ({ ...b, data: { ...b.data, copyright: e.target.value } }))}
                                  className="w-full px-3 py-2 rounded-lg bg-[#1b1b24] border border-white/15 text-white text-xs"
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        {/* ABOUT STORY PARAGRAPHS */}
                        {selectedBlock.type === 'about_story' && Array.isArray(selectedBlock.data.paragraphs) && (
                          <div className="space-y-3 p-3 bg-white/5 rounded-xl border border-gold/30">
                            <div className="text-xs font-bold text-gold uppercase">Paragraf Kisah & Profil</div>
                            {selectedBlock.data.paragraphs.map((p: string, idx: number) => (
                              <div key={idx}>
                                <label className="block text-[10px] font-bold text-gray-400 mb-1">Paragraf {idx + 1}</label>
                                <textarea
                                  rows={4}
                                  value={p}
                                  onChange={(e) => {
                                    const next = [...selectedBlock.data.paragraphs];
                                    next[idx] = e.target.value;
                                    handleUpdateSelectedBlock(b => ({ ...b, data: { ...b.data, paragraphs: next } }));
                                  }}
                                  className="w-full px-3 py-2 rounded-lg bg-[#1b1b24] border border-white/15 text-white text-xs"
                                />
                              </div>
                            ))}
                          </div>
                        )}

                        {/* ABOUT VISION MISSION */}
                        {selectedBlock.type === 'about_vision_mission' && (
                          <div className="space-y-3 p-3 bg-white/5 rounded-xl border border-gold/30">
                            <div className="text-xs font-bold text-gold uppercase">Visi & Misi</div>
                            <div>
                              <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">Judul Visi</label>
                              <input
                                type="text"
                                value={selectedBlock.data.visionTitle || ''}
                                onChange={(e) => handleUpdateSelectedBlock(b => ({ ...b, data: { ...b.data, visionTitle: e.target.value } }))}
                                className="w-full px-3 py-1.5 rounded-lg bg-[#1b1b24] border border-white/15 text-gold text-xs font-bold mb-2"
                              />
                              <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">Uraian Visi</label>
                              <textarea
                                rows={3}
                                value={selectedBlock.data.visionDesc || ''}
                                onChange={(e) => handleUpdateSelectedBlock(b => ({ ...b, data: { ...b.data, visionDesc: e.target.value } }))}
                                className="w-full px-3 py-2 rounded-lg bg-[#1b1b24] border border-white/15 text-white text-xs mb-3"
                              />
                            </div>
                            {Array.isArray(selectedBlock.data.missions) && (
                              <div className="space-y-2 pt-2 border-t border-white/10">
                                <label className="block text-[11px] font-bold text-gold uppercase">Daftar Misi ({selectedBlock.data.missions.length})</label>
                                {selectedBlock.data.missions.map((m: any, mIdx: number) => (
                                  <div key={mIdx} className="p-2.5 rounded bg-[#121217] border border-white/10 space-y-1.5">
                                    <div className="text-[10px] text-gray-400 font-bold">MISI #{mIdx + 1}</div>
                                    <input
                                      type="text"
                                      value={m.title || ''}
                                      onChange={(e) => {
                                        const nextM = [...selectedBlock.data.missions];
                                        nextM[mIdx] = { ...m, title: e.target.value };
                                        handleUpdateSelectedBlock(b => ({ ...b, data: { ...b.data, missions: nextM } }));
                                      }}
                                      placeholder="Judul Misi"
                                      className="w-full px-2 py-1 rounded bg-[#1b1b24] border border-white/10 text-gold text-xs font-bold"
                                    />
                                    <textarea
                                      rows={2}
                                      value={m.desc || ''}
                                      onChange={(e) => {
                                        const nextM = [...selectedBlock.data.missions];
                                        nextM[mIdx] = { ...m, desc: e.target.value };
                                        handleUpdateSelectedBlock(b => ({ ...b, data: { ...b.data, missions: nextM } }));
                                      }}
                                      placeholder="Uraian Misi"
                                      className="w-full px-2 py-1 rounded bg-[#1b1b24] border border-white/10 text-white text-xs"
                                    />
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}

                        {/* SERVICES CATALOG SLIDES */}
                        {selectedBlock.type === 'services_catalog' && (
                          <div className="space-y-3 p-3 bg-white/5 rounded-xl border border-gold/30">
                            <div className="text-xs font-bold text-gold uppercase">Uraian 3 Slide Layanan</div>
                            <div>
                              <label className="block text-[10px] font-bold text-gray-400 mb-0.5">Judul Slide 1</label>
                              <input
                                type="text"
                                value={selectedBlock.data.slide1Title || ''}
                                onChange={(e) => handleUpdateSelectedBlock(b => ({ ...b, data: { ...b.data, slide1Title: e.target.value } }))}
                                className="w-full px-3 py-1.5 rounded bg-[#1b1b24] border border-white/15 text-white text-xs mb-1"
                              />
                              <textarea
                                rows={2}
                                value={selectedBlock.data.slide1Desc || ''}
                                onChange={(e) => handleUpdateSelectedBlock(b => ({ ...b, data: { ...b.data, slide1Desc: e.target.value } }))}
                                className="w-full px-3 py-1.5 rounded bg-[#1b1b24] border border-white/15 text-white text-xs"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-gray-400 mb-0.5">Judul Slide 2</label>
                              <input
                                type="text"
                                value={selectedBlock.data.slide2Title || ''}
                                onChange={(e) => handleUpdateSelectedBlock(b => ({ ...b, data: { ...b.data, slide2Title: e.target.value } }))}
                                className="w-full px-3 py-1.5 rounded bg-[#1b1b24] border border-white/15 text-white text-xs mb-1"
                              />
                              <textarea
                                rows={2}
                                value={selectedBlock.data.slide2Desc || ''}
                                onChange={(e) => handleUpdateSelectedBlock(b => ({ ...b, data: { ...b.data, slide2Desc: e.target.value } }))}
                                className="w-full px-3 py-1.5 rounded bg-[#1b1b24] border border-white/15 text-white text-xs"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-gray-400 mb-0.5">Judul Slide 3</label>
                              <input
                                type="text"
                                value={selectedBlock.data.slide3Title || ''}
                                onChange={(e) => handleUpdateSelectedBlock(b => ({ ...b, data: { ...b.data, slide3Title: e.target.value } }))}
                                className="w-full px-3 py-1.5 rounded bg-[#1b1b24] border border-white/15 text-white text-xs mb-1"
                              />
                              <textarea
                                rows={2}
                                value={selectedBlock.data.slide3Desc || ''}
                                onChange={(e) => handleUpdateSelectedBlock(b => ({ ...b, data: { ...b.data, slide3Desc: e.target.value } }))}
                                className="w-full px-3 py-1.5 rounded bg-[#1b1b24] border border-white/15 text-white text-xs"
                              />
                            </div>
                          </div>
                        )}


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
                              Uraian Paragraf (Teks Bebas)
                            </label>
                            <textarea
                              rows={5}
                              value={(selectedBlock.data.body || '').replace(/<\/?p>/gi, '')}
                              onChange={(e) =>
                                handleUpdateSelectedBlock((b) => ({
                                  ...b,
                                  data: { ...b.data, body: e.target.value }
                                }))
                              }
                              placeholder="Tulis uraian paragraf atau penjelasan di sini..."
                              className="w-full px-3 py-2 rounded-lg bg-[#1b1b24] border border-white/15 text-white text-xs leading-relaxed"
                            />
                            <p className="text-[10px] text-gray-500 mt-1">
                              Tulis teks biasa tanpa tag HTML. Format paragraf akan diatur otomatis.
                            </p>
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
                                      : selectedBlock.type === 'about_values'
                                      ? { title: 'NILAI BARU', desc: 'Uraian prinsip dan nilai...' }
                                      : { title: 'Judul Fitur', desc: 'Deskripsi fitur...' };
                                  handleUpdateSelectedBlock((b) => ({
                                    ...b,
                                    data: { ...b.data, items: [...b.data.items, newItem] }
                                  }));
                                }}
                                className="px-2.5 py-1 rounded bg-gold text-navy text-[10px] font-bold cursor-pointer hover:bg-white transition"
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
                                  <span className="text-gold font-mono">ITEM #{idx + 1}</span>
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
                                    className="text-red-400 hover:text-red-300 hover:underline cursor-pointer"
                                  >
                                    Hapus
                                  </button>
                                </div>

                                {selectedBlock.type === 'stats_bar' && (
                                  <div className="grid grid-cols-2 gap-2">
                                    <div>
                                      <label className="block text-[9px] font-bold text-gray-400 uppercase mb-0.5">Nilai / Angka</label>
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
                                        className="w-full px-2.5 py-1.5 rounded bg-[#121217] border border-white/10 text-gold text-xs font-bold"
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-[9px] font-bold text-gray-400 uppercase mb-0.5">Label Statistik</label>
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
                                        className="w-full px-2.5 py-1.5 rounded bg-[#121217] border border-white/10 text-white text-xs"
                                      />
                                    </div>
                                  </div>
                                )}

                                {(selectedBlock.type === 'features_grid' || selectedBlock.type === 'about_values' || (!['stats_bar', 'faq', 'testimonials'].includes(selectedBlock.type))) && (
                                  <div className="space-y-2">
                                    <div>
                                      <label className="block text-[9px] font-bold text-gray-400 uppercase mb-0.5">
                                        {selectedBlock.type === 'about_values' ? 'Nama Nilai / Prinsip' : 'Judul Item / Fitur'}
                                      </label>
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
                                        placeholder="Judul (misal: R - RESPONSIVE)"
                                        className="w-full px-2.5 py-1.5 rounded bg-[#121217] border border-white/10 text-white text-xs font-bold"
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-[9px] font-bold text-gray-400 uppercase mb-0.5">Deskripsi / Uraian</label>
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
                                        placeholder="Deskripsi penjelasan..."
                                        className="w-full px-2.5 py-1.5 rounded bg-[#121217] border border-white/10 text-gray-300 text-xs"
                                      />
                                    </div>
                                    {selectedBlock.type === 'features_grid' && (
                                      <div className="grid grid-cols-2 gap-2 pt-1">
                                        <div>
                                          <label className="block text-[9px] font-bold text-gray-400 uppercase mb-0.5">Badge Kartu</label>
                                          <input
                                            type="text"
                                            value={item.badge || ''}
                                            onChange={(e) => {
                                              const next = [...selectedBlock.data.items];
                                              next[idx] = { ...item, badge: e.target.value };
                                              handleUpdateSelectedBlock((b) => ({
                                                ...b,
                                                data: { ...b.data, items: next }
                                              }));
                                            }}
                                            placeholder="misal: 34 Cakupan Perkara"
                                            className="w-full px-2 py-1 rounded bg-[#121217] border border-white/10 text-gold text-[11px]"
                                          />
                                        </div>
                                        <div>
                                          <label className="block text-[9px] font-bold text-gray-400 uppercase mb-0.5">URL Gambar</label>
                                          <input
                                            type="text"
                                            value={item.image || ''}
                                            onChange={(e) => {
                                              const next = [...selectedBlock.data.items];
                                              next[idx] = { ...item, image: e.target.value };
                                              handleUpdateSelectedBlock((b) => ({
                                                ...b,
                                                data: { ...b.data, items: next }
                                              }));
                                            }}
                                            placeholder="https://..."
                                            className="w-full px-2 py-1 rounded bg-[#121217] border border-white/10 text-gray-300 text-[11px]"
                                          />
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                )}

                                {selectedBlock.type === 'faq' && (
                                  <div className="space-y-2">
                                    <div>
                                      <label className="block text-[9px] font-bold text-gray-400 uppercase mb-0.5">Pertanyaan</label>
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
                                    </div>
                                    <div>
                                      <label className="block text-[9px] font-bold text-gray-400 uppercase mb-0.5">Jawaban</label>
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
                                    </div>
                                  </div>
                                )}

                                {selectedBlock.type === 'testimonials' && (
                                  <div className="space-y-2">
                                    <div>
                                      <label className="block text-[9px] font-bold text-gray-400 uppercase mb-0.5">Kutipan Testimoni</label>
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
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                      <div>
                                        <label className="block text-[9px] font-bold text-gray-400 uppercase mb-0.5">Nama Klien</label>
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
                                          className="w-full px-2.5 py-1.5 rounded bg-[#121217] border border-white/10 text-white text-xs"
                                        />
                                      </div>
                                      <div>
                                        <label className="block text-[9px] font-bold text-gray-400 uppercase mb-0.5">Jabatan / Peran</label>
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
                                          className="w-full px-2.5 py-1.5 rounded bg-[#121217] border border-white/10 text-gold text-xs"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Bullets Array Editor for split_content */}
                        {Array.isArray(selectedBlock.data.bullets) && (
                          <div className="space-y-2.5 pt-2 border-t border-white/10">
                            <div className="flex items-center justify-between">
                              <label className="text-[11px] font-bold text-gold uppercase">
                                Poin Keunggulan / Bullets ({selectedBlock.data.bullets.length})
                              </label>
                              <button
                                type="button"
                                onClick={() => {
                                  handleUpdateSelectedBlock((b) => ({
                                    ...b,
                                    data: { ...b.data, bullets: [...b.data.bullets, 'Poin keunggulan baru...'] }
                                  }));
                                }}
                                className="px-2.5 py-1 rounded bg-gold text-navy text-[10px] font-bold cursor-pointer hover:bg-white transition"
                              >
                                + Tambah Poin
                              </button>
                            </div>
                            {selectedBlock.data.bullets.map((bullet: string, bIdx: number) => (
                              <div key={bIdx} className="flex items-center gap-2">
                                <input
                                  type="text"
                                  value={bullet}
                                  onChange={(e) => {
                                    const nextB = [...selectedBlock.data.bullets];
                                    nextB[bIdx] = e.target.value;
                                    handleUpdateSelectedBlock((b) => ({
                                      ...b,
                                      data: { ...b.data, bullets: nextB }
                                    }));
                                  }}
                                  className="flex-1 px-2.5 py-1.5 rounded bg-[#1b1b24] border border-white/10 text-white text-xs"
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    handleUpdateSelectedBlock((b) => ({
                                      ...b,
                                      data: {
                                        ...b.data,
                                        bullets: b.data.bullets.filter((_: any, i: number) => i !== bIdx)
                                      }
                                    }));
                                  }}
                                  className="text-red-400 hover:text-red-300 text-xs px-2 py-1 cursor-pointer"
                                >
                                  Hapus
                                </button>
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

          {/* =================================================================
              TAB 7: LINK TREE GENERATOR
          ================================================================= */}
          {activeTab === 'linktree' && (
            <LinkTreeManager
              db={db}
              onSaveDb={persistCmsData}
              showToast={showToast}
              savingDb={savingDb}
            />
          )}
        </main>
      </div>
    </div>
  );
}
