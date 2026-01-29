export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  plan: 'free' | 'pro' | 'enterprise'
  createdAt: string
}

export interface Workspace {
  id: string
  name: string
  slug: string
  plan: 'free' | 'pro' | 'enterprise'
  role: 'owner' | 'admin' | 'member'
}
