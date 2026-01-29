import { useState, useEffect } from 'react'
import { useDesignSystemStore } from '@/store/design-system-store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Trash2, Palette } from 'lucide-react'

export function ColorsPage() {
  const { designSystem, addColorToken, updateColorToken, deleteColorToken, initializeDesignSystem } =
    useDesignSystemStore()

  const [newColor, setNewColor] = useState({ name: '', value: '#000000' })

  useEffect(() => {
    if (!designSystem) {
      initializeDesignSystem('My Design System', 'A beautiful design system built with Mockman')
    }
  }, [designSystem, initializeDesignSystem])

  const handleAddColor = () => {
    if (newColor.name.trim()) {
      addColorToken({ name: newColor.name, value: newColor.value })
      setNewColor({ name: '', value: '#000000' })
    }
  }

  if (!designSystem) {
    return (
      <div className="flex h-96 items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  const colors = designSystem.theme.tokens.colors

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Colors</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Build your color palette with base tokens
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add Color Token</CardTitle>
          <CardDescription>Create a new color token for your palette</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1 space-y-2">
              <Label htmlFor="color-name">Token Name</Label>
              <Input
                id="color-name"
                placeholder="e.g., primary, gray-500"
                value={newColor.name}
                onChange={(e) => setNewColor({ ...newColor, name: e.target.value })}
                onKeyDown={(e) => e.key === 'Enter' && handleAddColor()}
              />
            </div>
            <div className="w-32 space-y-2">
              <Label htmlFor="color-value">Color</Label>
              <div className="flex gap-2">
                <Input
                  id="color-value"
                  type="color"
                  value={newColor.value}
                  onChange={(e) => setNewColor({ ...newColor, value: e.target.value })}
                  className="h-10 w-16 cursor-pointer p-1"
                />
                <Input
                  type="text"
                  value={newColor.value}
                  onChange={(e) => setNewColor({ ...newColor, value: e.target.value })}
                  className="w-28"
                />
              </div>
            </div>
            <div className="flex items-end">
              <Button onClick={handleAddColor}>
                <Plus className="mr-2 h-4 w-4" />
                Add
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {colors.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Color Palette</CardTitle>
            <CardDescription>Your design system colors</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {colors.map((color) => (
                <div
                  key={color.id}
                  className="group relative overflow-hidden rounded-lg border"
                >
                  <div
                    className="h-32 w-full"
                    style={{ backgroundColor: color.value }}
                  />
                  <div className="flex items-center justify-between p-4">
                    <div className="flex-1">
                      <Input
                        value={color.name}
                        onChange={(e) =>
                          updateColorToken(color.id, { name: e.target.value })
                        }
                        className="mb-2 font-semibold"
                      />
                      <div className="flex gap-2">
                        <Input
                          type="color"
                          value={color.value}
                          onChange={(e) =>
                            updateColorToken(color.id, { value: e.target.value })
                          }
                          className="h-8 w-12 cursor-pointer p-1"
                        />
                        <Input
                          type="text"
                          value={color.value}
                          onChange={(e) =>
                            updateColorToken(color.id, { value: e.target.value })
                          }
                          className="h-8 text-xs"
                        />
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteColorToken(color.id)}
                      className="ml-2"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {colors.length === 0 && (
        <Card>
          <CardContent className="flex min-h-[200px] items-center justify-center">
            <div className="text-center">
              <Palette className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 font-semibold">No colors yet</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Add your first color token to get started
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
