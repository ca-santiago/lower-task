
export interface OwnerWorkspaceDTO {
  id: string;
  owner: string;
  name: string;
  maxCollaborators: number;
  maxTasks: number;
  collabs: OwnerCollabDTO[];
  totalTasks: number;
  createAt: string;
}

export interface OwnerCollabDTO {
  id: string;
  email: string;
  name: string;
}

export interface PublicWorkspaceDTO {
  owner: string;
  createAt: string;
  name: string;
}