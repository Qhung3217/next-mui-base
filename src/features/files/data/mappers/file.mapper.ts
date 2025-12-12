import type { File, FileDTO, FileShort, FileShortDTO } from '../models';

export const mapFile = (dto: FileDTO): File => ({
  createdAt: dto.createdAt,
  updatedAt: dto.updatedAt,
  filename: dto.filename,
  originalName: dto.originalName,
  mimetype: dto.mimetype,
  size: dto.size,
  path: dto.path,
  type: dto.type,
  id: dto.id,
});

export const mapFileList = (list: FileDTO[]): File[] => list.map(mapFile);

export const mapFileShort = (dto: FileShortDTO): FileShort => ({
  id: dto.id,
  filename: dto.filename,
  originalName: dto.originalName,
  path: dto.path,
});

export const mapFileShortList = (list: FileShortDTO[]): FileShort[] => list.map(mapFileShort);
