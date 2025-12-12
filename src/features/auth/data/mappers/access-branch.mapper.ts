import type { AccessBranch } from '../models';
import type { AccessBranchDTO } from '../dto';

export const mapAccessBranch = (dto: AccessBranchDTO): AccessBranch => ({
  accessToken: dto.accessToken,
  refreshToken: dto.refreshToken,
});
