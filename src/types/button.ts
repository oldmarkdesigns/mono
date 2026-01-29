export interface ButtonVariant {
  id: string
  name: string
  background: string
  foreground: string
  border?: string
  hoverBackground?: string
  hoverForeground?: string
  description?: string
}

export interface ButtonSize {
  id: string
  name: string
  height: string
  paddingX: string
  paddingY: string
  fontSize: string
  borderRadius: string
}

export interface ButtonConfig {
  id: string
  name: string
  variants: ButtonVariant[]
  sizes: ButtonSize[]
  defaultVariant: string
  defaultSize: string
}
