import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

type PlaceholderPageProps = {
  title: string
  description: string
}

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        <p className="mt-2 text-muted-foreground">{description}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
          <CardDescription>
            This section is now available in navigation and ready for content implementation.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          We can build out this page next with real data, actions, and UI flows.
        </CardContent>
      </Card>
    </div>
  )
}
