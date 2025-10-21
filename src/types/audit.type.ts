export type Timestamp = {
  createdAt: string;
  updatedAt: string;
};

export type Auditable = Timestamp & {
  createdBy: string | null;
  updatedBy: string | null;
};
