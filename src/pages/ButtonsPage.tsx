import { useState, useEffect } from 'react'
import { useDesignSystemStore } from '@/store/design-system-store'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  Play, 
  Copy, 
  Plus, 
  Settings2, 
  Palette as PaletteIcon,
  Code,
  Eye,
  Loader2
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ButtonVariant, ButtonSize } from '@/types/button'

export function ButtonsPage() {
  const { designSystem, initializeDesignSystem } = useDesignSystemStore()
  
  // Button configuration state
  const [selectedVariant, setSelectedVariant] = useState('primary')
  const [selectedSize, setSelectedSize] = useState('md')
  const [buttonText, setButtonText] = useState('Button')
  const [showIcon, setShowIcon] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

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

  // Define button variants using design system colors
  const variants: ButtonVariant[] = [
    {
      id: 'primary',
      name: 'Primary',
      background: colors[0]?.value || '#18181b',
      foreground: '#ffffff',
      hoverBackground: colors[0]?.value || '#27272a',
      description: 'Main call-to-action',
    },
    {
      id: 'secondary',
      name: 'Secondary',
      background: '#f4f4f5',
      foreground: '#18181b',
      hoverBackground: '#e4e4e7',
      description: 'Secondary actions',
    },
    {
      id: 'outline',
      name: 'Outline',
      background: 'transparent',
      foreground: '#18181b',
      border: '1px solid #e4e4e7',
      hoverBackground: '#f4f4f5',
      description: 'Outlined style',
    },
    {
      id: 'ghost',
      name: 'Ghost',
      background: 'transparent',
      foreground: '#18181b',
      hoverBackground: '#f4f4f5',
      description: 'Minimal style',
    },
    {
      id: 'destructive',
      name: 'Destructive',
      background: '#ef4444',
      foreground: '#ffffff',
      hoverBackground: '#dc2626',
      description: 'Dangerous actions',
    },
  ]

  const sizes: ButtonSize[] = [
    {
      id: 'sm',
      name: 'Small',
      height: '36px',
      paddingX: '12px',
      paddingY: '8px',
      fontSize: '14px',
      borderRadius: '6px',
    },
    {
      id: 'md',
      name: 'Medium',
      height: '40px',
      paddingX: '16px',
      paddingY: '10px',
      fontSize: '14px',
      borderRadius: '8px',
    },
    {
      id: 'lg',
      name: 'Large',
      height: '48px',
      paddingX: '24px',
      paddingY: '12px',
      fontSize: '16px',
      borderRadius: '8px',
    },
  ]

  const currentVariant = variants.find((v) => v.id === selectedVariant) || variants[0]
  const currentSize = sizes.find((s) => s.id === selectedSize) || sizes[1]

  const getButtonStyles = () => {
    const styles: React.CSSProperties = {
      background: currentVariant.background,
      color: currentVariant.foreground,
      border: currentVariant.border || 'none',
      height: currentSize.height,
      padding: `${currentSize.paddingY} ${currentSize.paddingX}`,
      fontSize: currentSize.fontSize,
      borderRadius: currentSize.borderRadius,
      fontWeight: '500',
      cursor: isDisabled || isLoading ? 'not-allowed' : 'pointer',
      opacity: isDisabled ? 0.5 : 1,
      transition: 'all 0.2s',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
    }

    return styles
  }

  const generateCode = () => {
    const props = [
      selectedVariant !== 'primary' && `variant="${selectedVariant}"`,
      selectedSize !== 'md' && `size="${selectedSize}"`,
      isDisabled && 'disabled',
      isLoading && 'loading',
    ].filter(Boolean)

    return `<Button${props.length ? ' ' + props.join(' ') : ''}>
  ${showIcon && isLoading ? '<Loader2 className="h-4 w-4 animate-spin" />' : ''}${buttonText}
</Button>`
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Buttons</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Build and customize token-driven button components
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        {/* Main Editor */}
        <div className="space-y-4">
          {/* Preview */}
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Eye className="h-5 w-5" />
                  Preview
                </CardTitle>
                <Button variant="outline" size="sm" onClick={() => setIsLoading(!isLoading)}>
                  <Play className="mr-2 h-3 w-3" />
                  Test States
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex min-h-[150px] items-center justify-center rounded-lg border border-dashed bg-muted/20 p-6">
                <button
                  style={getButtonStyles()}
                  disabled={isDisabled}
                  onMouseEnter={(e) => {
                    if (!isDisabled && !isLoading) {
                      e.currentTarget.style.background = currentVariant.hoverBackground || currentVariant.background
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = currentVariant.background
                  }}
                >
                  {isLoading && showIcon && <Loader2 className="h-4 w-4 animate-spin" />}
                  {buttonText}
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Variants & Sizes Combined */}
          <div className="grid gap-4 md:grid-cols-2">
            {/* Variants */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Settings2 className="h-4 w-4" />
                  Variants
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  {variants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant.id)}
                      className={cn(
                        'flex items-center justify-between rounded-lg border-2 p-3 text-left transition-colors hover:border-primary',
                        selectedVariant === variant.id
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      )}
                    >
                      <div className="flex-1">
                        <span className="font-medium text-sm">{variant.name}</span>
                        <div
                          className="mt-2 rounded px-3 py-1 text-xs font-medium inline-block"
                          style={{
                            background: variant.background,
                            color: variant.foreground,
                            border: variant.border || 'none',
                          }}
                        >
                          Button
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Sizes */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Sizes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size.id}
                      onClick={() => setSelectedSize(size.id)}
                      className={cn(
                        'flex items-center justify-between rounded-lg border-2 p-3 text-left transition-colors hover:border-primary',
                        selectedSize === size.id
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      )}
                    >
                      <span className="font-medium text-sm">{size.name}</span>
                      <div
                        className="rounded-md bg-primary px-3 py-1 text-xs font-medium text-primary-foreground"
                        style={{
                          height: size.height,
                          fontSize: '11px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        Aa
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Code Export */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Code className="h-4 w-4" />
                Code
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-sm">
                  <code>{generateCode()}</code>
                </pre>
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute right-2 top-2"
                  onClick={() => {
                    navigator.clipboard.writeText(generateCode())
                  }}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar - Controls */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Button Text */}
              <div className="space-y-2">
                <Label htmlFor="button-text">Button Text</Label>
                <Input
                  id="button-text"
                  value={buttonText}
                  onChange={(e) => setButtonText(e.target.value)}
                  placeholder="Enter text"
                />
              </div>

              {/* States */}
              <div className="space-y-2">
                <Label className="text-xs">States</Label>
                <div className="space-y-1.5">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={isDisabled}
                      onChange={(e) => setIsDisabled(e.target.checked)}
                      className="h-3.5 w-3.5"
                    />
                    <span className="text-xs">Disabled</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={isLoading}
                      onChange={(e) => setIsLoading(e.target.checked)}
                      className="h-3.5 w-3.5"
                    />
                    <span className="text-xs">Loading</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={showIcon}
                      onChange={(e) => setShowIcon(e.target.checked)}
                      className="h-3.5 w-3.5"
                    />
                    <span className="text-xs">Show Icon</span>
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Token Colors */}
          {colors.length > 0 && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <PaletteIcon className="h-4 w-4" />
                  Design Tokens
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 gap-1.5">
                  {colors.slice(0, 10).map((color) => (
                    <button
                      key={color.id}
                      className="aspect-square rounded border transition-all hover:scale-110 hover:z-10"
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    />
                  ))}
                </div>
                {colors.length > 10 && (
                  <p className="mt-2 text-[10px] text-muted-foreground">
                    +{colors.length - 10} more
                  </p>
                )}
              </CardContent>
            </Card>
          )}

          {/* Quick Actions */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1.5">
              <Button variant="outline" size="sm" className="w-full justify-start text-xs h-8">
                <Plus className="mr-2 h-3 w-3" />
                Save as Preset
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start text-xs h-8">
                <Copy className="mr-2 h-3 w-3" />
                Duplicate
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* All Variants Showcase */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">Component Showcase</CardTitle>
          <CardDescription className="text-sm">All variants and sizes at a glance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {variants.map((variant) => (
              <div key={variant.id}>
                <h3 className="mb-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {variant.name}
                </h3>
                <div className="flex flex-wrap items-center gap-3">
                  {sizes.map((size) => (
                    <button
                      key={size.id}
                      style={{
                        background: variant.background,
                        color: variant.foreground,
                        border: variant.border || 'none',
                        height: size.height,
                        padding: `${size.paddingY} ${size.paddingX}`,
                        fontSize: size.fontSize,
                        borderRadius: size.borderRadius,
                        fontWeight: '500',
                      }}
                      className="transition-all hover:scale-105"
                    >
                      {size.name}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
