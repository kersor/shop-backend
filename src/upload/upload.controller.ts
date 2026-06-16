import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Param,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { createStorage } from './utils/file-storage';
import { UploadService } from './upload.service';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { existsSync, mkdirSync } from 'fs';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  /**
   * POST /upload/:folder
   * folder = images | files | avatars | etc
   */
  @Post(':folder')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const folder = req.params.folder || 'files';

          const uploadPath = join('uploads', folder);

          if (!existsSync(uploadPath)) {
            mkdirSync(uploadPath, { recursive: true });
          }

          cb(null, uploadPath);
        },

        filename: (req, file, cb) => {
          const unique =
            Date.now() + '-' + Math.round(Math.random() * 1e9);

          cb(null, unique + extname(file.originalname));
        },
      }),
    }),
  )
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Param('folder') folder: string,
  ) {
    return {
      filename: file.filename,
      path: file.path,
      url: this.uploadService.getFileUrl(
        folder,
        file.filename,
      ),
    };
  }
}