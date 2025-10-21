import type { AccessBranch, AccessBranchDTO } from '../models';

export const mapAccessBranch = (dto: AccessBranchDTO): AccessBranch => ({
  accessToken: dto.accessToken,
  refreshToken: dto.refreshToken,
});
