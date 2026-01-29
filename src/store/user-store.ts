import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User, Workspace } from '@/types/user'

interface UserState {
  user: User | null
  currentWorkspace: Workspace | null
  workspaces: Workspace[]
  
  initializeUser: () => void
  updateUser: (user: Partial<User>) => void
  switchWorkspace: (workspaceId: string) => void
}

const generateId = () => Math.random().toString(36).substring(2, 11)

// Mock user data
const createMockUser = (): User => ({
  id: generateId(),
  name: 'Sarah Chen',
  email: 'sarah@example.com',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
  plan: 'pro',
  createdAt: new Date().toISOString(),
})

const createMockWorkspaces = (): Workspace[] => [
  {
    id: generateId(),
    name: 'My Design System',
    slug: 'my-design-system',
    plan: 'pro',
    role: 'owner',
  },
  {
    id: generateId(),
    name: 'Acme Corp',
    slug: 'acme-corp',
    plan: 'enterprise',
    role: 'admin',
  },
]

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      currentWorkspace: null,
      workspaces: [],
      
      initializeUser: () => {
        set((state) => {
          if (state.user) return state
          const workspaces = createMockWorkspaces()
          return {
            user: createMockUser(),
            workspaces,
            currentWorkspace: workspaces[0],
          }
        })
      },
      
      updateUser: (userData) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        }))
      },
      
      switchWorkspace: (workspaceId) => {
        set((state) => ({
          currentWorkspace: state.workspaces.find((w) => w.id === workspaceId) || state.currentWorkspace,
        }))
      },
    }),
    {
      name: 'user-storage',
    }
  )
)
