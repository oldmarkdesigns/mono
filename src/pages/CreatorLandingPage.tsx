import { Link } from 'react-router-dom'
import { useDesignSystemStore } from '@/store/design-system-store'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Sparkles, Pencil, Edit2, Clock, Palette, Code, ArrowRight, Wand2 } from 'lucide-react'

export function CreatorLandingPage() {
  const { designSystem, initializeDesignSystem } = useDesignSystemStore()

  const handleCreateManually = () => {
    // Always create a new blank project
    initializeDesignSystem('Untitled Design System', '')
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Create Your Design System</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Let AI generate it for you, or build it manually with full control
        </p>
      </div>

      {/* Create Options */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* AI-Powered Creation */}
        <Card className="group relative overflow-hidden border transition-colors hover:border-primary">
          <CardHeader className="pb-4">
            <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <Wand2 className="h-6 w-6" />
            </div>
            <CardTitle className="text-lg">Create with AI</CardTitle>
            <CardDescription className="text-sm">
              Let AI analyze your brand, generate color palettes, typography scales, and suggest components based on your preferences.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link to="/creator/ai">
              <Button className="w-full">
                <Sparkles className="mr-2 h-4 w-4" />
                Start AI Creation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Sparkles className="h-3 w-3" />
                AI-Powered
              </span>
              <span className="flex items-center gap-1">
                <Wand2 className="h-3 w-3" />
                Auto-Generate
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Manual Creation */}
        <Card className="group relative overflow-hidden border transition-colors hover:border-primary">
          <CardHeader className="pb-4">
            <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <Pencil className="h-6 w-6" />
            </div>
            <CardTitle className="text-lg">Create Manually</CardTitle>
            <CardDescription className="text-sm">
              Build your design system from scratch with full control. Define colors, typography, and components step by step.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link to="/creator/overview" onClick={handleCreateManually}>
              <Button className="w-full" variant="default">
                <Pencil className="mr-2 h-4 w-4" />
                Start Creating
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Palette className="h-3 w-3" />
                Full Control
              </span>
              <span className="flex items-center gap-1">
                <Code className="h-3 w-3" />
                Step by Step
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Existing System */}
      {designSystem && (
        <div>
          <h2 className="mb-4 text-xl font-bold tracking-tight">Your Design System</h2>
          <Card className="border transition-colors hover:border-primary">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between gap-4">
                <CardTitle className="text-lg">{designSystem.name}</CardTitle>
                <Badge variant="secondary" className="text-xs shrink-0">
                  Draft
                </Badge>
              </div>
              <CardDescription className="text-sm">
                {designSystem.description || 'No description'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Palette className="h-3 w-3" />
                  {designSystem.theme.tokens.colors.length + designSystem.theme.tokens.typography.length} tokens
                </span>
                <span className="flex items-center gap-1">
                  <Code className="h-3 w-3" />
                  {designSystem.components.length} components
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Updated {new Date(designSystem.updatedAt).toLocaleDateString()}
                </span>
              </div>
              <Link to="/creator/overview">
                <Button variant="outline" className="w-full">
                  <Edit2 className="mr-2 h-4 w-4" />
                  Edit
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
