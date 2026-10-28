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
      articles: parsed.articles || INITIAL_CMS_DB.articles,
      messages: parsed.messages || INITIAL_CMS_DB.messages,
      blocks: parsed.blocks || INITIAL_CMS_DB.blocks,
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
