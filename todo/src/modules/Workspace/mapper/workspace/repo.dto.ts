export interface WorkspaceRepoDTO {
  _id: string;
  owner: string;
	name: string;
	maxCollaborators: number;
	maxTasks: number;
  collabs: Array<CollabRepoDTO>;
  totalTasks: number;
  createdAt: string;
}

export interface CollabRepoDTO {
  id: string;
  email: string;
  name: string;
}
