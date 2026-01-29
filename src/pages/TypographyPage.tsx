import { useState, useEffect } from 'react'
import { useDesignSystemStore } from '@/store/design-system-store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Trash2, Type } from 'lucide-react'

const TYPE_SCALE_RATIOS = [
  { name: 'Minor Second', value: 1.067 },
  { name: 'Major Second', value: 1.125 },
  { name: 'Minor Third', value: 1.2 },
  { name: 'Major Third', value: 1.25 },
  { name: 'Perfect Fourth', value: 1.333 },
  { name: 'Golden Ratio', value: 1.618 },
]

export function TypographyPage() {
  const {
    designSystem,
    addTypographyToken,
    deleteTypographyToken,
    initializeDesignSystem,
  } = useDesignSystemStore()

  const [baseSize, setBaseSize] = useState(16)
  const [ratio, setRatio] = useState(1.25)
  const [fontFamily, setFontFamily] = useState('DM Sans, sans-serif')

  useEffect(() => {
    if (!designSystem) {
      initializeDesignSystem('My Design System', 'A beautiful design system built with Mockman')
    }
  }, [designSystem, initializeDesignSystem])

  const generateTypeScale = () => {
    const scales = [
      { name: 'text-xs', multiplier: Math.pow(ratio, -2), weight: '400', lineHeight: '1.5' },
      { name: 'text-sm', multiplier: Math.pow(ratio, -1), weight: '400', lineHeight: '1.5' },
      { name: 'text-base', multiplier: 1, weight: '400', lineHeight: '1.5' },
      { name: 'text-lg', multiplier: ratio, weight: '400', lineHeight: '1.5' },
      { name: 'text-xl', multiplier: Math.pow(ratio, 2), weight: '600', lineHeight: '1.4' },
      { name: 'text-2xl', multiplier: Math.pow(ratio, 3), weight: '600', lineHeight: '1.3' },
      { name: 'text-3xl', multiplier: Math.pow(ratio, 4), weight: '700', lineHeight: '1.2' },
      { name: 'text-4xl', multiplier: Math.pow(ratio, 5), weight: '700', lineHeight: '1.1' },
    ]

    scales.forEach((scale) => {
      addTypographyToken({
        name: scale.name,
        fontSize: `${(baseSize * scale.multiplier).toFixed(2)}px`,
        lineHeight: scale.lineHeight,
        fontWeight: scale.weight,
      })
    })
  }

  if (!designSystem) {
    return (
      <div className="flex h-96 items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  const typography = designSystem.theme.tokens.typography

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Typography</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Define your type scale and typography tokens
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Generate Type Scale</CardTitle>
          <CardDescription>
            Create a harmonious type scale based on a base size and ratio
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="base-size">Base Font Size (px)</Label>
              <Input
                id="base-size"
                type="number"
                value={baseSize}
                onChange={(e) => setBaseSize(Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ratio">Scale Ratio</Label>
              <select
                id="ratio"
                value={ratio}
                onChange={(e) => setRatio(Number(e.target.value))}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {TYPE_SCALE_RATIOS.map((r) => (
                  <option key={r.value} value={r.value}>
                    {r.name} ({r.value})
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="font-family">Font Family</Label>
              <Input
                id="font-family"
                value={fontFamily}
                onChange={(e) => setFontFamily(e.target.value)}
              />
            </div>
          </div>
          <Button onClick={generateTypeScale}>
            <Plus className="mr-2 h-4 w-4" />
            Generate Type Scale
          </Button>
        </CardContent>
      </Card>

      {typography.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Typography Tokens</CardTitle>
            <CardDescription>Preview and edit your typography scale</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {typography.map((token) => (
                <div
                  key={token.id}
                  className="flex items-center gap-4 border-b pb-4 last:border-0"
                >
                  <div className="flex-1">
                    <p
                      style={{
                        fontSize: token.fontSize,
                        fontWeight: token.fontWeight,
                        lineHeight: token.lineHeight,
                        fontFamily: fontFamily,
                      }}
                    >
                      The quick brown fox jumps over the lazy dog
                    </p>
                    <div className="mt-2 flex gap-2 text-xs text-muted-foreground">
                      <span className="font-mono">{token.name}</span>
                      <span>•</span>
                      <span>{token.fontSize}</span>
                      <span>•</span>
                      <span>Weight {token.fontWeight}</span>
                      <span>•</span>
                      <span>Line {token.lineHeight}</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteTypographyToken(token.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {typography.length === 0 && (
        <Card>
          <CardContent className="flex min-h-[200px] items-center justify-center">
            <div className="text-center">
              <Type className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 font-semibold">No typography tokens yet</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Generate a type scale to get started
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
