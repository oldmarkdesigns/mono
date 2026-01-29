import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDesignSystemStore } from '@/store/design-system-store'
import { useUserStore } from '@/store/user-store'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Plus,
  Upload,
  Palette,
  Clock,
  Sparkles,
  Code,
  ArrowRight,
} from 'lucide-react'

interface ProjectCard {
  id: string
  name: string
  description: string
  type: 'created' | 'imported'
  status: 'draft' | 'published'
  lastModified: string
  tokensCount: number
  componentsCount: number
  views?: number
}

export function DashboardPage() {
  const { designSystem } = useDesignSystemStore()
  const { user, initializeUser } = useUserStore()

  useEffect(() => {
    initializeUser()
  }, [initializeUser])


  // Convert design system to project format
  const projects: ProjectCard[] = designSystem ? [{
    id: designSystem.id,
    name: designSystem.name,
    description: designSystem.description || 'No description',
    type: 'created',
    status: 'draft',
    lastModified: new Date(designSystem.updatedAt).toLocaleString(),
    tokensCount: designSystem.theme.tokens.colors.length + designSystem.theme.tokens.typography.length,
    componentsCount: designSystem.components.length,
  }] : []

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary/10 via-primary/5 to-background p-6">
        <div className="relative z-10">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <Sparkles className="h-3 w-3" />
            Welcome back, {user?.name.split(' ')[0]}
          </div>
          <h1 className="text-2xl font-bold tracking-tight">
            Your Design Systems
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Create from scratch or import existing code. Build, manage, and publish
            beautiful design systems in minutes.
          </p>
        </div>

        {/* Decorative elements */}
        <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-primary/5 to-transparent" />
      </div>

      {/* Quick Actions - Only show when projects exist */}
      {projects.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="group relative overflow-hidden border transition-colors hover:border-primary">
            <CardHeader className="pb-4">
              <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Sparkles className="h-6 w-6" />
              </div>
              <CardTitle className="text-lg">Create from Scratch</CardTitle>
              <CardDescription className="text-sm">
                Build your design system token by token with our visual creator. Perfect for new projects or establishing design foundations.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/creator">
                <Button className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Start Creating
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Palette className="h-3 w-3" />
                  Colors & Typography
                </span>
                <span className="flex items-center gap-1">
                  <Code className="h-3 w-3" />
                  Components
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden border transition-colors hover:border-primary">
            <CardHeader className="pb-4">
              <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Upload className="h-6 w-6" />
              </div>
              <CardTitle className="text-lg">Import from Code</CardTitle>
              <CardDescription className="text-sm">
                Upload your existing codebase and let AI extract design tokens, colors, typography, and components automatically.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/import">
                <Button variant="secondary" className="w-full">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Code
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Sparkles className="h-3 w-3" />
                  AI-Powered
                </span>
                <span className="flex items-center gap-1">
                  <Code className="h-3 w-3" />
                  React, Vue, Svelte
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Projects List */}
      {projects.length > 0 ? (
        <div>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold tracking-tight">Your Projects</h2>
              <p className="text-sm text-muted-foreground">
                {projects.length} design system{projects.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Link key={project.id} to="/creator/overview">
                <Card className="group h-full border transition-colors hover:border-primary">
                  <CardHeader className="pb-3">
                    <div className="mb-2 flex items-start justify-between">
                      <Badge variant="secondary" className="text-xs">
                        {project.status}
                      </Badge>
                    </div>
                    <CardTitle className="line-clamp-1 text-lg">{project.name}</CardTitle>
                    <CardDescription className="line-clamp-2 text-xs">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Palette className="h-3 w-3" />
                        {project.tokensCount} tokens
                      </span>
                      <span className="flex items-center gap-1">
                        <Code className="h-3 w-3" />
                        {project.componentsCount} components
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      Updated {project.lastModified}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <Sparkles className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">No Design Systems Yet</h3>
            <p className="mb-6 max-w-md text-sm text-muted-foreground">
              Get started by creating a new design system from scratch or importing your existing code.
            </p>
            <div className="flex gap-3">
              <Link to="/creator">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create from Scratch
                </Button>
              </Link>
              <Link to="/import">
                <Button variant="secondary">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Code
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats */}
      {projects.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription className="text-xs">Total Views</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,240</div>
              <p className="text-xs text-muted-foreground">Across all systems</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription className="text-xs">Published</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {projects.filter((p) => p.status === 'published').length}
              </div>
              <p className="text-xs text-muted-foreground">Live design systems</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription className="text-xs">Team Members</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Active collaborators</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
