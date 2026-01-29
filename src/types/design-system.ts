export interface ColorToken {
  id: string
  name: string
  value: string // hex color
  description?: string
}

export interface SemanticColorToken {
  id: string
  name: string
  value: string // reference to ColorToken.id or hex value
  description?: string
}

export interface TypographyToken {
  id: string
  name: string
  fontSize: string
  lineHeight: string
  fontWeight: string
  letterSpacing?: string
  description?: string
}

export interface TokenSet {
  colors: ColorToken[]
  semanticColors: SemanticColorToken[]
  typography: TypographyToken[]
}

export interface ButtonVariant {
  name: string
  background: string
  foreground: string
  border?: string
}

export interface ButtonSize {
  name: string
  height: string
  paddingX: string
  fontSize: string
}

export interface ComponentDefinition {
  id: string
  name: string
  type: 'button' | 'input' | 'card' | 'custom'
  code?: string
  props?: Record<string, any>
}

export interface Theme {
  id: string
  name: string
  tokens: TokenSet
}

export interface DesignSystem {
  id: string
  name: string
  description?: string
  theme: Theme
  components: ComponentDefinition[]
  createdAt: string
  updatedAt: string
}
