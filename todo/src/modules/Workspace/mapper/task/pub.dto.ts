export interface TaskOwnerDTO {
  id: string;
  content: string;
  createAt: string;
  owner: string;
  workspace: string;
}

export interface TaskPublicDTO {
  id: string;
  content: string;
  createAt: string;
}
