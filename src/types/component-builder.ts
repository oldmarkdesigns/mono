export type ElementType = 'container' | 'text' | 'button' | 'divider' | 'spacer'

export interface ComponentElement {
  id: string
  type: ElementType
  props: {
    // Container props
    backgroundColor?: string
    padding?: string
    borderRadius?: string
    border?: string
    width?: string
    height?: string
    gap?: string
    direction?: 'row' | 'column'
    
    // Text props
    content?: string
    typographyToken?: string
    fontSize?: string
    fontWeight?: string
    color?: string
    textAlign?: 'left' | 'center' | 'right'
    
    // Button props
    text?: string
    variant?: string
    size?: string
    
    // Divider props
    orientation?: 'horizontal' | 'vertical'
    
    // Common
    marginTop?: string
    marginBottom?: string
  }
  children?: ComponentElement[]
}

export interface CustomComponent {
  id: string
  name: string
  description?: string
  elements: ComponentElement[]
  createdAt: string
  updatedAt: string
}
