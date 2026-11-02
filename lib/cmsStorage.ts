import fs from 'fs';
import path from 'path';
export * from './cmsTypes';
import { CmsDatabase, INITIAL_CMS_DB } from './cmsTypes';

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'cms-db.json');

export function readCmsDb(): CmsDatabase {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify(INITIAL_CMS_DB, null, 2), 'utf-8');
      return INITIAL_CMS_DB;
    }
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    return {
      users: parsed.users || INITIAL_CMS_DB.users,
      articles: (() => {
        const existingArticles: any[] = Array.isArray(parsed.articles) ? parsed.articles : [];
        const existingSlugs = new Set(existingArticles.map((a: any) => a.slug));
        const missing = INITIAL_CMS_DB.articles.filter((a) => !existingSlugs.has(a.slug));
        return [...existingArticles, ...missing];
      })(),
      messages: parsed.messages || INITIAL_CMS_DB.messages,
      blocks: (() => {
        const existingBlocks: any[] = Array.isArray(parsed.blocks) ? parsed.blocks : [];
        const existingIds = new Set(existingBlocks.map(b => b.id));
        const missingPresets = INITIAL_CMS_DB.blocks.filter(b => !existingIds.has(b.id));
        const merged = [...existingBlocks, ...missingPresets];
        const heroBlock = merged.find(b => b.id === 'blk-home-hero');
        const statsBlock = merged.find(b => b.id === 'blk-home-stats');
        if (heroBlock && statsBlock && heroBlock.order >= statsBlock.order) {
          heroBlock.order = 1;
          statsBlock.order = 2;
        }
        return merged.sort((a, b) => (a.order || 0) - (b.order || 0));
      })(),
      siteSettings: { ...INITIAL_CMS_DB.siteSettings, ...(parsed.siteSettings || {}) }
    };
  } catch (err) {
    console.error('Error reading CMS DB:', err);
    return INITIAL_CMS_DB;
  }
}

export function writeCmsDb(db: CmsDatabase): boolean {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error writing CMS DB:', err);
    return false;
  }
}
