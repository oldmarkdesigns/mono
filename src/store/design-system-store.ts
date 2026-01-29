import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { DesignSystem, ColorToken, SemanticColorToken, TypographyToken, ComponentDefinition } from '@/types/design-system'

interface DesignSystemState {
  designSystem: DesignSystem | null
  
  // Actions
  initializeDesignSystem: (name: string, description?: string) => void
  updateDesignSystemInfo: (name: string, description?: string) => void
  deleteDesignSystem: () => void
  
  // Color actions
  addColorToken: (token: Omit<ColorToken, 'id'>) => void
  updateColorToken: (id: string, token: Partial<ColorToken>) => void
  deleteColorToken: (id: string) => void
  
  addSemanticColorToken: (token: Omit<SemanticColorToken, 'id'>) => void
  updateSemanticColorToken: (id: string, token: Partial<SemanticColorToken>) => void
  deleteSemanticColorToken: (id: string) => void
  
  // Typography actions
  addTypographyToken: (token: Omit<TypographyToken, 'id'>) => void
  updateTypographyToken: (id: string, token: Partial<TypographyToken>) => void
  deleteTypographyToken: (id: string) => void
  
  // Component actions
  addComponent: (component: Omit<ComponentDefinition, 'id'>) => void
  updateComponent: (id: string, component: Partial<ComponentDefinition>) => void
  deleteComponent: (id: string) => void
}

const generateId = () => Math.random().toString(36).substring(2, 11)

export const useDesignSystemStore = create<DesignSystemState>()(
  persist(
    (set) => ({
      designSystem: null,
      
      initializeDesignSystem: (name: string, description?: string) => {
        set({
          designSystem: {
            id: generateId(),
            name,
            description,
            theme: {
              id: generateId(),
              name: 'Default Theme',
              tokens: {
                colors: [],
                semanticColors: [],
                typography: [],
              },
            },
            components: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        })
      },
      
      updateDesignSystemInfo: (name: string, description?: string) => {
        set((state) => {
          if (!state.designSystem) return state
          return {
            designSystem: {
              ...state.designSystem,
              name,
              description,
              updatedAt: new Date().toISOString(),
            },
          }
        })
      },

      deleteDesignSystem: () => {
        set({ designSystem: null })
      },
      
      // Color actions
      addColorToken: (token) => {
        set((state) => {
          if (!state.designSystem) return state
          return {
            designSystem: {
              ...state.designSystem,
              theme: {
                ...state.designSystem.theme,
                tokens: {
                  ...state.designSystem.theme.tokens,
                  colors: [
                    ...state.designSystem.theme.tokens.colors,
                    { ...token, id: generateId() },
                  ],
                },
              },
              updatedAt: new Date().toISOString(),
            },
          }
        })
      },
      
      updateColorToken: (id, token) => {
        set((state) => {
          if (!state.designSystem) return state
          return {
            designSystem: {
              ...state.designSystem,
              theme: {
                ...state.designSystem.theme,
                tokens: {
                  ...state.designSystem.theme.tokens,
                  colors: state.designSystem.theme.tokens.colors.map((c) =>
                    c.id === id ? { ...c, ...token } : c
                  ),
                },
              },
              updatedAt: new Date().toISOString(),
            },
          }
        })
      },
      
      deleteColorToken: (id) => {
        set((state) => {
          if (!state.designSystem) return state
          return {
            designSystem: {
              ...state.designSystem,
              theme: {
                ...state.designSystem.theme,
                tokens: {
                  ...state.designSystem.theme.tokens,
                  colors: state.designSystem.theme.tokens.colors.filter((c) => c.id !== id),
                },
              },
              updatedAt: new Date().toISOString(),
            },
          }
        })
      },
      
      addSemanticColorToken: (token) => {
        set((state) => {
          if (!state.designSystem) return state
          return {
            designSystem: {
              ...state.designSystem,
              theme: {
                ...state.designSystem.theme,
                tokens: {
                  ...state.designSystem.theme.tokens,
                  semanticColors: [
                    ...state.designSystem.theme.tokens.semanticColors,
                    { ...token, id: generateId() },
                  ],
                },
              },
              updatedAt: new Date().toISOString(),
            },
          }
        })
      },
      
      updateSemanticColorToken: (id, token) => {
        set((state) => {
          if (!state.designSystem) return state
          return {
            designSystem: {
              ...state.designSystem,
              theme: {
                ...state.designSystem.theme,
                tokens: {
                  ...state.designSystem.theme.tokens,
                  semanticColors: state.designSystem.theme.tokens.semanticColors.map((c) =>
                    c.id === id ? { ...c, ...token } : c
                  ),
                },
              },
              updatedAt: new Date().toISOString(),
            },
          }
        })
      },
      
      deleteSemanticColorToken: (id) => {
        set((state) => {
          if (!state.designSystem) return state
          return {
            designSystem: {
              ...state.designSystem,
              theme: {
                ...state.designSystem.theme,
                tokens: {
                  ...state.designSystem.theme.tokens,
                  semanticColors: state.designSystem.theme.tokens.semanticColors.filter(
                    (c) => c.id !== id
                  ),
                },
              },
              updatedAt: new Date().toISOString(),
            },
          }
        })
      },
      
      // Typography actions
      addTypographyToken: (token) => {
        set((state) => {
          if (!state.designSystem) return state
          return {
            designSystem: {
              ...state.designSystem,
              theme: {
                ...state.designSystem.theme,
                tokens: {
                  ...state.designSystem.theme.tokens,
                  typography: [
                    ...state.designSystem.theme.tokens.typography,
                    { ...token, id: generateId() },
                  ],
                },
              },
              updatedAt: new Date().toISOString(),
            },
          }
        })
      },
      
      updateTypographyToken: (id, token) => {
        set((state) => {
          if (!state.designSystem) return state
          return {
            designSystem: {
              ...state.designSystem,
              theme: {
                ...state.designSystem.theme,
                tokens: {
                  ...state.designSystem.theme.tokens,
                  typography: state.designSystem.theme.tokens.typography.map((t) =>
                    t.id === id ? { ...t, ...token } : t
                  ),
                },
              },
              updatedAt: new Date().toISOString(),
            },
          }
        })
      },
      
      deleteTypographyToken: (id) => {
        set((state) => {
          if (!state.designSystem) return state
          return {
            designSystem: {
              ...state.designSystem,
              theme: {
                ...state.designSystem.theme,
                tokens: {
                  ...state.designSystem.theme.tokens,
                  typography: state.designSystem.theme.tokens.typography.filter(
                    (t) => t.id !== id
                  ),
                },
              },
              updatedAt: new Date().toISOString(),
            },
          }
        })
      },
      
      // Component actions
      addComponent: (component) => {
        set((state) => {
          if (!state.designSystem) return state
          return {
            designSystem: {
              ...state.designSystem,
              components: [
                ...state.designSystem.components,
                { ...component, id: generateId() },
              ],
              updatedAt: new Date().toISOString(),
            },
          }
        })
      },
      
      updateComponent: (id, component) => {
        set((state) => {
          if (!state.designSystem) return state
          return {
            designSystem: {
              ...state.designSystem,
              components: state.designSystem.components.map((c) =>
                c.id === id ? { ...c, ...component } : c
              ),
              updatedAt: new Date().toISOString(),
            },
          }
        })
      },
      
      deleteComponent: (id) => {
        set((state) => {
          if (!state.designSystem) return state
          return {
            designSystem: {
              ...state.designSystem,
              components: state.designSystem.components.filter((c) => c.id !== id),
              updatedAt: new Date().toISOString(),
            },
          }
        })
      },
    }),
    {
      name: 'design-system-storage',
    }
  )
)
