export type UserRole = 'admin' | 'staff' | 'client';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  company?: string;
  phone?: string;
}

export interface Request {
  id: string;
  clientId: string;
  clientName: string;
  title: string;
  description: string;
  category: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in-progress' | 'completed' | 'rejected';
  createdAt: string;
  updatedAt: string;
  assignedTo?: string;
  attachments: Attachment[];
  comments: Comment[];
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  uploadedAt: string;
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  content: string;
  createdAt: string;
}
