import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadService {
  getFileUrl(folder: string, filename: string) {
    return `/uploads/${folder}/${filename}`;
  }
}