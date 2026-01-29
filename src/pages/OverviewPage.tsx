import { useEffect, useState } from 'react'
import { useDesignSystemStore } from '@/store/design-system-store'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Palette, Type, Blocks, CheckCircle2, Edit2, ArrowRight, EyeOff, RotateCcw, Save, Pencil, Globe, FileText, Trash2, Check } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'

const GETTING_STARTED_STORAGE_KEY = 'mockman-getting-started-dismissed'

export function OverviewPage() {
  const navigate = useNavigate()
  const { designSystem, initializeDesignSystem, updateDesignSystemInfo, deleteDesignSystem } = useDesignSystemStore()
  const [isGettingStartedDismissed, setIsGettingStartedDismissed] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editedName, setEditedName] = useState('')
  const [editedDescription, setEditedDescription] = useState('')
  const [isPublishing, setIsPublishing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isPublished, setIsPublished] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    const dismissed = localStorage.getItem(GETTING_STARTED_STORAGE_KEY)
    setIsGettingStartedDismissed(dismissed === 'true')
  }, [])

  useEffect(() => {
    if (designSystem) {
      setEditedName(designSystem.name)
      setEditedDescription(designSystem.description || '')
    }
  }, [designSystem])

  useEffect(() => {
    if (!designSystem) {
      initializeDesignSystem('My Design System', '')
    }
  }, [designSystem, initializeDesignSystem])

  if (!designSystem) {
    return null
  }

  const colors = designSystem.theme.tokens.colors
  const typography = designSystem.theme.tokens.typography
  const components = designSystem.components

  const hasColors = colors.length > 0
  const hasTypography = typography.length > 0
  const hasComponents = components.length > 0
  const allTasksCompleted = hasColors && hasTypography && hasComponents

  const handleDismissGettingStarted = () => {
    localStorage.setItem(GETTING_STARTED_STORAGE_KEY, 'true')
    setIsGettingStartedDismissed(true)
  }

  const handleRestoreGettingStarted = () => {
    localStorage.removeItem(GETTING_STARTED_STORAGE_KEY)
    setIsGettingStartedDismissed(false)
  }

  const handleSaveInfo = () => {
    updateDesignSystemInfo(editedName, editedDescription)
    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    setEditedName(designSystem?.name || '')
    setEditedDescription(designSystem?.description || '')
    setIsEditing(false)
  }

  const handlePublish = () => {
    setIsPublishing(true)
    setIsPublished(false)
    // Simulate publish delay
    setTimeout(() => {
      updateDesignSystemInfo(designSystem.name, designSystem.description)
      setIsPublishing(false)
      setIsPublished(true)
      // In a real app, this would publish to a CDN/hosting service
    }, 1500)
  }

  const handleSaveDraft = () => {
    setIsSaving(true)
    setIsSaved(false)
    // Simulate save delay
    setTimeout(() => {
      updateDesignSystemInfo(designSystem.name, designSystem.description)
      setIsSaving(false)
      setIsSaved(true)
      // Auto-hide saved state after 3 seconds
      setTimeout(() => {
        setIsSaved(false)
      }, 3000)
    }, 1000)
  }

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete "${designSystem.name}"? This action cannot be undone.`)) {
      deleteDesignSystem()
      navigate('/')
    }
  }

  const stats = [
    {
      name: 'Colors',
      value: colors.length,
      icon: Palette,
      href: '/creator/colors',
    },
    {
      name: 'Typography Tokens',
      value: typography.length,
      icon: Type,
      href: '/creator/typography',
    },
    {
      name: 'Components',
      value: components.length,
      icon: Blocks,
      href: '/creator/components',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Actions Bar */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">
            {hasColors || hasTypography || hasComponents 
              ? 'Your design system is ready to publish' 
              : 'Start building your design system'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline"
            size="sm"
            onClick={handleSaveDraft}
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <FileText className="mr-2 h-4 w-4 animate-pulse" />
                Saving...
              </>
            ) : isSaved ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Saved
              </>
            ) : (
              <>
                <FileText className="mr-2 h-4 w-4" />
                Save Draft
              </>
            )}
          </Button>
          <Button 
            size="sm"
            onClick={handlePublish}
            disabled={isPublishing || (!hasColors && !hasTypography && !hasComponents)}
          >
            {isPublishing ? (
              <>
                <Globe className="mr-2 h-4 w-4 animate-pulse" />
                Publishing...
              </>
            ) : isPublished ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Published
              </>
            ) : (
              <>
                <Globe className="mr-2 h-4 w-4" />
                Publish
              </>
            )}
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleDelete}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Design System Info */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-4">
              {isEditing ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="system-name">Design System Name</Label>
                    <Input
                      id="system-name"
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      placeholder="e.g., Acme Design System"
                      className="text-2xl font-bold"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="system-description">Instructions</Label>
                    <textarea
                      id="system-description"
                      value={editedDescription}
                      onChange={(e) => setEditedDescription(e.target.value)}
                      placeholder="Add usage guidelines, design principles, or implementation notes for your team..."
                      rows={3}
                      className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleSaveInfo} size="sm">
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </Button>
                    <Button onClick={handleCancelEdit} variant="outline" size="sm">
                      Cancel
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <h1 className="text-2xl font-bold tracking-tight">{designSystem.name}</h1>
                    {designSystem.description ? (
                      <p className="mt-2 text-sm text-muted-foreground whitespace-pre-wrap">
                        {designSystem.description}
                      </p>
                    ) : (
                      <p className="mt-2 text-sm text-muted-foreground italic">
                        No instructions added yet. Click Edit to add guidelines or notes.
                      </p>
                    )}
                  </div>
                  <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
                    <Pencil className="mr-2 h-3 w-3" />
                    Edit Info
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <Link key={stat.name} to={stat.href}>
            <Card className="border transition-colors hover:border-primary">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {!isGettingStartedDismissed && !allTasksCompleted && (
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>Getting Started</CardTitle>
                <CardDescription>Build your design system step by step</CardDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDismissGettingStarted}
              >
                <EyeOff className="mr-2 h-4 w-4" />
                Hide
              </Button>
            </div>
          </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-4">
            <div className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full transition-colors",
              hasColors 
                ? "bg-green-500 text-white" 
                : "bg-primary text-primary-foreground"
            )}>
              {hasColors ? <CheckCircle2 className="h-5 w-5" /> : "1"}
            </div>
            <div className="flex-1">
              <h3 className={cn(
                "font-semibold",
                hasColors && "text-muted-foreground line-through"
              )}>
                Define your color palette
              </h3>
              <p className="text-sm text-muted-foreground">
                {hasColors 
                  ? `✓ ${colors.length} color${colors.length !== 1 ? 's' : ''} added`
                  : "Create base colors and semantic tokens for your design system"
                }
              </p>
              <Button asChild variant="link" className="mt-2 h-auto p-0">
                <Link to="/creator/colors">
                  {hasColors ? "Edit Colors →" : "Go to Colors →"}
                </Link>
              </Button>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full transition-colors",
              hasTypography 
                ? "bg-green-500 text-white" 
                : "bg-primary text-primary-foreground"
            )}>
              {hasTypography ? <CheckCircle2 className="h-5 w-5" /> : "2"}
            </div>
            <div className="flex-1">
              <h3 className={cn(
                "font-semibold",
                hasTypography && "text-muted-foreground line-through"
              )}>
                Set up typography
              </h3>
              <p className="text-sm text-muted-foreground">
                {hasTypography 
                  ? `✓ ${typography.length} token${typography.length !== 1 ? 's' : ''} added`
                  : "Define font families and create a type scale"
                }
              </p>
              <Button asChild variant="link" className="mt-2 h-auto p-0">
                <Link to="/creator/typography">
                  {hasTypography ? "Edit Typography →" : "Go to Typography →"}
                </Link>
              </Button>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full transition-colors",
              hasComponents 
                ? "bg-green-500 text-white" 
                : "bg-primary text-primary-foreground"
            )}>
              {hasComponents ? <CheckCircle2 className="h-5 w-5" /> : "3"}
            </div>
            <div className="flex-1">
              <h3 className={cn(
                "font-semibold",
                hasComponents && "text-muted-foreground line-through"
              )}>
                Build components
              </h3>
              <p className="text-sm text-muted-foreground">
                {hasComponents 
                  ? `✓ ${components.length} component${components.length !== 1 ? 's' : ''} added`
                  : "Create token-driven components with variants and states"
                }
              </p>
              <Button asChild variant="link" className="mt-2 h-auto p-0">
                <Link to="/creator/buttons">
                  {hasComponents ? "Edit Components →" : "Start with Buttons →"}
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      )}

      {/* Restore Getting Started */}
      {isGettingStartedDismissed && !allTasksCompleted && (
        <Card className="border-dashed">
          <CardContent className="flex items-center justify-between py-4">
            <p className="text-sm text-muted-foreground">
              Getting Started guide is hidden
            </p>
            <Button variant="outline" size="sm" onClick={handleRestoreGettingStarted}>
              <RotateCcw className="mr-2 h-3 w-3" />
              Show Again
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Recent Additions */}
      {(hasColors || hasTypography || hasComponents) && (
        <Card>
          <CardHeader>
            <CardTitle>Your Design Tokens</CardTitle>
            <CardDescription>Quick access to your tokens and components</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Colors */}
            {hasColors && (
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Palette className="h-4 w-4 text-muted-foreground" />
                    <h3 className="font-semibold">Colors</h3>
                    <Badge variant="secondary">{colors.length}</Badge>
                  </div>
                  <Link to="/creator/colors">
                    <Button variant="ghost" size="sm">
                      <Edit2 className="mr-2 h-3 w-3" />
                      Edit
                    </Button>
                  </Link>
                </div>
                <div className="flex flex-wrap gap-2">
                  {colors.slice(0, 8).map((color) => (
                    <div
                      key={color.id}
                      className="group relative flex flex-col items-center gap-1"
                    >
                      <div
                        className="h-12 w-12 rounded-lg border shadow-sm transition-transform hover:scale-110"
                        style={{ backgroundColor: color.value }}
                        title={color.name}
                      />
                      <span className="text-xs text-muted-foreground">
                        {color.name}
                      </span>
                    </div>
                  ))}
                  {colors.length > 8 && (
                    <Link to="/creator/colors">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-dashed text-xs text-muted-foreground hover:border-primary hover:text-primary">
                        +{colors.length - 8}
                      </div>
                    </Link>
                  )}
                </div>
              </div>
            )}

            {/* Typography */}
            {hasTypography && (
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Type className="h-4 w-4 text-muted-foreground" />
                    <h3 className="font-semibold">Typography</h3>
                    <Badge variant="secondary">{typography.length}</Badge>
                  </div>
                  <Link to="/creator/typography">
                    <Button variant="ghost" size="sm">
                      <Edit2 className="mr-2 h-3 w-3" />
                      Edit
                    </Button>
                  </Link>
                </div>
                <div className="space-y-2">
                  {typography.slice(0, 5).map((token) => (
                    <div
                      key={token.id}
                      className="flex items-center justify-between rounded-lg border p-3 hover:bg-accent"
                    >
                      <div className="flex items-center gap-3">
                        <code className="text-xs font-medium text-muted-foreground">
                          {token.name}
                        </code>
                        <span
                          style={{
                            fontSize: token.fontSize,
                            fontWeight: token.fontWeight,
                          }}
                        >
                          Aa
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {token.fontSize} / {token.fontWeight}
                      </div>
                    </div>
                  ))}
                  {typography.length > 5 && (
                    <Link to="/creator/typography">
                      <div className="flex items-center justify-center rounded-lg border border-dashed p-3 text-sm text-muted-foreground hover:border-primary hover:text-primary">
                        View all {typography.length} tokens
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </div>
                    </Link>
                  )}
                </div>
              </div>
            )}

            {/* Components */}
            {hasComponents && (
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Blocks className="h-4 w-4 text-muted-foreground" />
                    <h3 className="font-semibold">Components</h3>
                    <Badge variant="secondary">{components.length}</Badge>
                  </div>
                  <Link to="/creator/components">
                    <Button variant="ghost" size="sm">
                      <Edit2 className="mr-2 h-3 w-3" />
                      Edit
                    </Button>
                  </Link>
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  {components.slice(0, 4).map((component) => (
                    <div
                      key={component.id}
                      className="flex items-center justify-between rounded-lg border p-3 hover:bg-accent"
                    >
                      <div className="flex items-center gap-2">
                        <Blocks className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{component.name}</span>
                      </div>
                      <Badge variant="outline">{component.type}</Badge>
                    </div>
                  ))}
                  {components.length > 4 && (
                    <Link to="/creator/components">
                      <div className="flex items-center justify-center rounded-lg border border-dashed p-3 text-sm text-muted-foreground hover:border-primary hover:text-primary">
                        +{components.length - 4} more
                      </div>
                    </Link>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
