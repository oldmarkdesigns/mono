import { useState, useEffect } from 'react'
import { useDesignSystemStore } from '@/store/design-system-store'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { 
  Plus, 
  Box, 
  Type, 
  Square, 
  Minus,
  Copy,
  Trash2,
  Code,
  Save,
  Eye,
  Settings2,
  ChevronDown,
  ChevronUp,
  Check,
  Edit2,
  Library
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ComponentElement, ElementType } from '@/types/component-builder'

const ELEMENT_TYPES = [
  { type: 'container' as ElementType, icon: Box, label: 'Container', description: 'Box with padding' },
  { type: 'text' as ElementType, icon: Type, label: 'Text', description: 'Typography element' },
  { type: 'button' as ElementType, icon: Square, label: 'Button', description: 'Button component' },
  { type: 'divider' as ElementType, icon: Minus, label: 'Divider', description: 'Horizontal line' },
]

export function ComponentsPage() {
  const { designSystem, initializeDesignSystem, addComponent, updateComponent, deleteComponent } = useDesignSystemStore()
  const [elements, setElements] = useState<ComponentElement[]>([])
  const [selectedElement, setSelectedElement] = useState<string | null>(null)
  const [componentName, setComponentName] = useState('MyComponent')
  const [isSaving, setIsSaving] = useState(false)
  const [showSaveSuccess, setShowSaveSuccess] = useState(false)
  const [editingComponentId, setEditingComponentId] = useState<string | null>(null)

  useEffect(() => {
    if (!designSystem) {
      initializeDesignSystem('My Design System', 'A beautiful design system built with Mockman')
    }
  }, [designSystem, initializeDesignSystem])

  if (!designSystem) {
    return (
      <div className="flex h-96 items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  const colors = designSystem.theme.tokens.colors
  const typography = designSystem.theme.tokens.typography

  const generateId = () => Math.random().toString(36).substring(2, 11)

  const addElement = (type: ElementType) => {
    const defaultProps: Record<ElementType, ComponentElement['props']> = {
      container: {
        backgroundColor: colors[0]?.value || '#ffffff',
        padding: '16px',
        borderRadius: '8px',
        direction: 'column' as const,
        gap: '8px',
      },
      text: {
        content: 'Sample text',
        fontSize: typography[2]?.fontSize || '16px',
        fontWeight: typography[2]?.fontWeight || '400',
        color: '#18181b',
      },
      button: {
        text: 'Click me',
        variant: 'primary',
        size: 'md',
      },
      divider: {
        orientation: 'horizontal' as const,
      },
      spacer: {
        height: '16px',
      },
    }

    const newElement: ComponentElement = {
      id: generateId(),
      type,
      props: defaultProps[type] || {},
    }

    setElements([...elements, newElement])
    setSelectedElement(newElement.id)
  }

  const updateElement = (id: string, props: Partial<ComponentElement['props']>) => {
    setElements(
      elements.map((el) =>
        el.id === id ? { ...el, props: { ...el.props, ...props } } : el
      )
    )
  }

  const deleteElement = (id: string) => {
    setElements(elements.filter((el) => el.id !== id))
    if (selectedElement === id) {
      setSelectedElement(null)
    }
  }

  const moveElement = (id: string, direction: 'up' | 'down') => {
    const index = elements.findIndex((el) => el.id === id)
    if (
      (direction === 'up' && index > 0) ||
      (direction === 'down' && index < elements.length - 1)
    ) {
      const newElements = [...elements]
      const targetIndex = direction === 'up' ? index - 1 : index + 1
      ;[newElements[index], newElements[targetIndex]] = [
        newElements[targetIndex],
        newElements[index],
      ]
      setElements(newElements)
    }
  }

  const renderElement = (element: ComponentElement) => {
    const isSelected = selectedElement === element.id

    switch (element.type) {
      case 'container':
        return (
          <div
            style={{
              backgroundColor: element.props.backgroundColor,
              padding: element.props.padding,
              borderRadius: element.props.borderRadius,
              border: element.props.border,
              display: 'flex',
              flexDirection: element.props.direction,
              gap: element.props.gap,
              marginTop: element.props.marginTop,
              marginBottom: element.props.marginBottom,
            }}
            className={cn(
              'relative transition-all',
              isSelected && 'ring-2 ring-primary'
            )}
          >
            <div className="text-sm text-muted-foreground">Container</div>
          </div>
        )

      case 'text':
        return (
          <div
            style={{
              fontSize: element.props.fontSize,
              fontWeight: element.props.fontWeight,
              color: element.props.color,
              textAlign: element.props.textAlign,
              marginTop: element.props.marginTop,
              marginBottom: element.props.marginBottom,
            }}
            className={cn(
              'relative transition-all',
              isSelected && 'ring-2 ring-primary rounded'
            )}
          >
            {element.props.content || 'Sample text'}
          </div>
        )

      case 'button':
        return (
          <button
            style={{
              padding: '10px 16px',
              borderRadius: '8px',
              backgroundColor: element.props.variant === 'primary' ? '#18181b' : '#f4f4f5',
              color: element.props.variant === 'primary' ? '#ffffff' : '#18181b',
              border: element.props.variant === 'outline' ? '1px solid #e4e4e7' : 'none',
              fontWeight: '500',
              marginTop: element.props.marginTop,
              marginBottom: element.props.marginBottom,
            }}
            className={cn(
              'transition-all',
              isSelected && 'ring-2 ring-primary ring-offset-2'
            )}
          >
            {element.props.text || 'Button'}
          </button>
        )

      case 'divider':
        return (
          <div
            style={{
              height: element.props.orientation === 'horizontal' ? '1px' : '100%',
              width: element.props.orientation === 'horizontal' ? '100%' : '1px',
              backgroundColor: '#e4e4e7',
              marginTop: element.props.marginTop,
              marginBottom: element.props.marginBottom,
            }}
            className={cn(
              'transition-all',
              isSelected && 'ring-2 ring-primary'
            )}
          />
        )

      default:
        return null
    }
  }

  const selectedEl = elements.find((el) => el.id === selectedElement)

  const generateCode = () => {
    let code = `function ${componentName}() {\n  return (\n    <div className="component">\n`
    
    elements.forEach((el) => {
      if (el.type === 'container') {
        code += `      <div style={{ padding: '${el.props.padding}', backgroundColor: '${el.props.backgroundColor}', borderRadius: '${el.props.borderRadius}' }}>\n`
        code += `      </div>\n`
      } else if (el.type === 'text') {
        code += `      <p style={{ fontSize: '${el.props.fontSize}', color: '${el.props.color}' }}>\n`
        code += `        ${el.props.content}\n`
        code += `      </p>\n`
      } else if (el.type === 'button') {
        code += `      <button>${el.props.text}</button>\n`
      } else if (el.type === 'divider') {
        code += `      <hr />\n`
      }
    })
    
    code += `    </div>\n  )\n}`
    return code
  }

  const handleSaveComponent = () => {
    if (!componentName.trim() || elements.length === 0) return
    
    setIsSaving(true)
    
    // Simulate save delay for better UX
    setTimeout(() => {
      const componentData = {
        name: componentName,
        type: 'custom' as const,
        code: generateCode(),
        props: {
          elements: elements.length,
          elementsData: elements, // Store the actual elements for editing
        },
      }

      if (editingComponentId) {
        // Update existing component
        updateComponent(editingComponentId, componentData)
      } else {
        // Create new component
        addComponent(componentData)
      }
      
      setIsSaving(false)
      setShowSaveSuccess(true)
      
      // Reset builder after save
      setTimeout(() => {
        setShowSaveSuccess(false)
        handleNewComponent()
      }, 2000)
    }, 500)
  }

  const handleLoadComponent = (component: any) => {
    // Load component data into the builder
    if (component.props?.elementsData) {
      setElements(component.props.elementsData)
      setComponentName(component.name)
      setEditingComponentId(component.id)
      setSelectedElement(null)
    }
  }

  const handleDeleteComponent = (componentId: string) => {
    if (confirm('Are you sure you want to delete this component?')) {
      deleteComponent(componentId)
      if (editingComponentId === componentId) {
        handleNewComponent()
      }
    }
  }

  const handleNewComponent = () => {
    setElements([])
    setComponentName('MyComponent')
    setEditingComponentId(null)
    setSelectedElement(null)
  }

  const savedComponents = designSystem?.components || []

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Component Builder</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Combine colors, typography, and buttons to create custom components
          </p>
        </div>
        {elements.length > 0 && (
          <Button onClick={handleNewComponent} variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            New Component
          </Button>
        )}
      </div>

      {/* Saved Components Library */}
      {savedComponents.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Library className="h-5 w-5" />
              Your Components
            </CardTitle>
            <CardDescription>
              {savedComponents.length} saved component{savedComponents.length !== 1 ? 's' : ''}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {savedComponents.map((component) => (
                <div
                  key={component.id}
                  className={cn(
                    "group relative rounded-lg border-2 p-4 transition-colors hover:border-primary",
                    editingComponentId === component.id 
                      ? "border-primary bg-primary/5" 
                      : "border-border hover:border-primary/50"
                  )}
                >
                  <div className="mb-3 flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">{component.name}</h3>
                      <p className="text-xs text-muted-foreground">
                        {component.props?.elements || 0} element{component.props?.elements !== 1 ? 's' : ''}
                      </p>
                    </div>
                    {editingComponentId === component.id && (
                      <Badge variant="default" className="text-xs">Editing</Badge>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={() => handleLoadComponent(component)}
                    >
                      <Edit2 className="mr-2 h-3 w-3" />
                      {editingComponentId === component.id ? 'Editing' : 'Edit'}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDeleteComponent(component.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 lg:grid-cols-[300px_1fr_320px]">
        {/* Element Palette */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Elements
            </CardTitle>
            <CardDescription>Drag or click to add</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {ELEMENT_TYPES.map((elementType) => (
              <button
                key={elementType.type}
                onClick={() => addElement(elementType.type)}
                className="flex w-full items-start gap-3 rounded-lg border border-dashed p-3 text-left transition-all hover:border-primary hover:bg-accent"
              >
                <elementType.icon className="mt-0.5 h-5 w-5 text-muted-foreground" />
                <div className="flex-1">
                  <div className="font-medium">{elementType.label}</div>
                  <div className="text-xs text-muted-foreground">
                    {elementType.description}
                  </div>
                </div>
              </button>
            ))}
          </CardContent>
        </Card>

        {/* Canvas */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    Canvas
                  </CardTitle>
                  <CardDescription>Build your component</CardDescription>
                </div>
                <Input
                  value={componentName}
                  onChange={(e) => setComponentName(e.target.value)}
                  className="w-40"
                  placeholder="Component name"
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="min-h-[400px] rounded-lg border border-dashed bg-muted/20 p-6">
                {elements.length === 0 ? (
                  <div className="flex h-full items-center justify-center text-center">
                    <div>
                      <Box className="mx-auto h-12 w-12 text-muted-foreground" />
                      <p className="mt-4 font-medium">No elements yet</p>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Add elements from the left panel to start building
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {elements.map((element) => (
                      <div
                        key={element.id}
                        onClick={() => setSelectedElement(element.id)}
                        className="group relative cursor-pointer"
                      >
                        {renderElement(element)}
                        
                        {/* Element Controls */}
                        <div className="absolute -right-2 -top-2 hidden gap-1 group-hover:flex">
                          <Button
                            variant="secondary"
                            size="icon"
                            className="h-6 w-6"
                            onClick={(e) => {
                              e.stopPropagation()
                              moveElement(element.id, 'up')
                            }}
                          >
                            <ChevronUp className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="secondary"
                            size="icon"
                            className="h-6 w-6"
                            onClick={(e) => {
                              e.stopPropagation()
                              moveElement(element.id, 'down')
                            }}
                          >
                            <ChevronDown className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="icon"
                            className="h-6 w-6"
                            onClick={(e) => {
                              e.stopPropagation()
                              deleteElement(element.id)
                            }}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Code Export */}
          {elements.length > 0 && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5" />
                    Generated Code
                  </CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigator.clipboard.writeText(generateCode())}
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    Copy
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-xs">
                  <code>{generateCode()}</code>
                </pre>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Properties Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings2 className="h-5 w-5" />
              Properties
            </CardTitle>
            <CardDescription>
              {selectedEl ? `Edit ${selectedEl.type}` : 'Select an element'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!selectedEl ? (
              <div className="flex h-40 items-center justify-center text-center">
                <p className="text-sm text-muted-foreground">
                  Select an element to edit its properties
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <Badge variant="secondary">{selectedEl.type}</Badge>

                {/* Container Properties */}
                {selectedEl.type === 'container' && (
                  <>
                    <div className="space-y-2">
                      <Label>Background Color</Label>
                      <div className="flex gap-2">
                        <Input
                          type="color"
                          value={selectedEl.props.backgroundColor}
                          onChange={(e) =>
                            updateElement(selectedEl.id, {
                              backgroundColor: e.target.value,
                            })
                          }
                          className="h-10 w-16 cursor-pointer"
                        />
                        <select
                          value={selectedEl.props.backgroundColor}
                          onChange={(e) =>
                            updateElement(selectedEl.id, {
                              backgroundColor: e.target.value,
                            })
                          }
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        >
                          {colors.map((color) => (
                            <option key={color.id} value={color.value}>
                              {color.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Padding</Label>
                      <Input
                        value={selectedEl.props.padding}
                        onChange={(e) =>
                          updateElement(selectedEl.id, { padding: e.target.value })
                        }
                        placeholder="16px"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Border Radius</Label>
                      <Input
                        value={selectedEl.props.borderRadius}
                        onChange={(e) =>
                          updateElement(selectedEl.id, {
                            borderRadius: e.target.value,
                          })
                        }
                        placeholder="8px"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Direction</Label>
                      <select
                        value={selectedEl.props.direction}
                        onChange={(e) =>
                          updateElement(selectedEl.id, {
                            direction: e.target.value as 'row' | 'column',
                          })
                        }
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      >
                        <option value="column">Column</option>
                        <option value="row">Row</option>
                      </select>
                    </div>
                  </>
                )}

                {/* Text Properties */}
                {selectedEl.type === 'text' && (
                  <>
                    <div className="space-y-2">
                      <Label>Content</Label>
                      <Input
                        value={selectedEl.props.content}
                        onChange={(e) =>
                          updateElement(selectedEl.id, { content: e.target.value })
                        }
                        placeholder="Enter text"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Typography Token</Label>
                      <select
                        onChange={(e) => {
                          const token = typography.find((t) => t.id === e.target.value)
                          if (token) {
                            updateElement(selectedEl.id, {
                              fontSize: token.fontSize,
                              fontWeight: token.fontWeight,
                            })
                          }
                        }}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      >
                        <option value="">Select token</option>
                        {typography.map((token) => (
                          <option key={token.id} value={token.id}>
                            {token.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label>Font Size</Label>
                      <Input
                        value={selectedEl.props.fontSize}
                        onChange={(e) =>
                          updateElement(selectedEl.id, { fontSize: e.target.value })
                        }
                        placeholder="16px"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Text Color</Label>
                      <div className="flex gap-2">
                        <Input
                          type="color"
                          value={selectedEl.props.color}
                          onChange={(e) =>
                            updateElement(selectedEl.id, { color: e.target.value })
                          }
                          className="h-10 w-16 cursor-pointer"
                        />
                        <select
                          value={selectedEl.props.color}
                          onChange={(e) =>
                            updateElement(selectedEl.id, { color: e.target.value })
                          }
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        >
                          {colors.map((color) => (
                            <option key={color.id} value={color.value}>
                              {color.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </>
                )}

                {/* Button Properties */}
                {selectedEl.type === 'button' && (
                  <>
                    <div className="space-y-2">
                      <Label>Button Text</Label>
                      <Input
                        value={selectedEl.props.text}
                        onChange={(e) =>
                          updateElement(selectedEl.id, { text: e.target.value })
                        }
                        placeholder="Click me"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Variant</Label>
                      <select
                        value={selectedEl.props.variant}
                        onChange={(e) =>
                          updateElement(selectedEl.id, { variant: e.target.value })
                        }
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      >
                        <option value="primary">Primary</option>
                        <option value="secondary">Secondary</option>
                        <option value="outline">Outline</option>
                        <option value="ghost">Ghost</option>
                      </select>
                    </div>
                  </>
                )}

                {/* Common Spacing */}
                <div className="space-y-2">
                  <Label>Margin Top</Label>
                  <Input
                    value={selectedEl.props.marginTop || ''}
                    onChange={(e) =>
                      updateElement(selectedEl.id, { marginTop: e.target.value })
                    }
                    placeholder="0px"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Margin Bottom</Label>
                  <Input
                    value={selectedEl.props.marginBottom || ''}
                    onChange={(e) =>
                      updateElement(selectedEl.id, { marginBottom: e.target.value })
                    }
                    placeholder="0px"
                  />
                </div>

                <Button
                  variant="destructive"
                  className="w-full"
                  onClick={() => deleteElement(selectedEl.id)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Element
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Save Component */}
      {elements.length > 0 && (
        <Card>
          <CardContent className="flex items-center justify-between pt-6">
            <div>
              <p className="font-semibold">
                {showSaveSuccess ? (
                  <span className="flex items-center gap-2">
                    <Check className="h-5 w-5" />
                    {editingComponentId ? 'Component Updated!' : 'Component Saved!'}
                  </span>
                ) : (
                  editingComponentId ? "Update Component" : "Save Component"
                )}
              </p>
              <p className="text-sm text-muted-foreground">
                {showSaveSuccess 
                  ? `"${componentName}" ${editingComponentId ? 'updated in' : 'added to'} your component library`
                  : `${elements.length} element${elements.length !== 1 ? 's' : ''} in this component`
                }
              </p>
            </div>
            {!showSaveSuccess && (
                    <Button 
                size="lg" 
                onClick={handleSaveComponent}
                disabled={isSaving || !componentName.trim()}
              >
                <Save className="mr-2 h-4 w-4" />
                {isSaving ? 'Saving...' : editingComponentId ? 'Update Component' : 'Save to Library'}
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
