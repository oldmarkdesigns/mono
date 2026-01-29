import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { BookOpen, MessageCircle, Mail, FileText, Video, Search } from 'lucide-react'

export function HelpPage() {
  const resources = [
    {
      icon: BookOpen,
      title: 'Documentation',
      description: 'Comprehensive guides and API references',
      action: 'View Docs',
    },
    {
      icon: Video,
      title: 'Video Tutorials',
      description: 'Step-by-step video guides',
      action: 'Watch Videos',
    },
    {
      icon: FileText,
      title: 'Blog & Updates',
      description: 'Latest news and best practices',
      action: 'Read Blog',
    },
    {
      icon: MessageCircle,
      title: 'Community Forum',
      description: 'Connect with other users',
      action: 'Join Forum',
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Help & Support</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Get help and learn how to make the most of Mockman
        </p>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search for help articles, guides, and more..."
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Resources Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {resources.map((resource) => (
          <Card key={resource.title} className="border transition-colors hover:border-primary">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <resource.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">{resource.title}</CardTitle>
                  <CardDescription className="mt-1">
                    {resource.description}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                {resource.action}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Contact Support */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Contact Support
          </CardTitle>
          <CardDescription>
            Can't find what you're looking for? Our team is here to help
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-semibold">Email Support</p>
                <p className="text-sm text-muted-foreground">
                  Response within 24 hours
                </p>
              </div>
              <Button>Send Email</Button>
            </div>
          </div>
          <div className="rounded-lg border p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-semibold">Live Chat</p>
                <p className="text-sm text-muted-foreground">
                  Available Monday-Friday, 9am-5pm PST
                </p>
              </div>
              <Button>Start Chat</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Popular Articles */}
      <Card>
        <CardHeader>
          <CardTitle>Popular Articles</CardTitle>
          <CardDescription>Frequently accessed help articles</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              'Getting started with Mockman',
              'Creating your first design system',
              'Exporting tokens to code',
              'Managing team members',
              'Publishing your design system',
            ].map((article) => (
              <button
                key={article}
                className="flex w-full items-center justify-between rounded-lg border p-3 text-left hover:bg-accent"
              >
                <span className="text-sm">{article}</span>
                <span className="text-xs text-muted-foreground">→</span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
