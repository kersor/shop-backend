import { diskStorage } from 'multer';
import { existsSync, mkdirSync } from 'fs';
import { extname, join } from 'path';

/**
 * Универсальная папка загрузки
 */
const UPLOAD_ROOT = 'uploads';

/**
 * создаём папки если их нет
 */
const ensureDir = (dir: string) => {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
};

/**
 * универсальный storage
 */
export const createStorage = (folder: string = 'files') => {
  const uploadPath = join(UPLOAD_ROOT, folder);

  ensureDir(uploadPath);

  return diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadPath);
    },

    filename: (req, file, cb) => {
      const unique =
        Date.now() + '-' + Math.round(Math.random() * 1e9);

      cb(null, unique + extname(file.originalname));
    },
  });
};