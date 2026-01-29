import { Card, CardContent } from '@/components/ui/card'

export function GuidelinesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Guidelines</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Document your design principles and usage guidelines
        </p>
      </div>

      <Card>
        <CardContent className="flex min-h-[400px] items-center justify-center">
          <div className="text-center">
            <h3 className="font-semibold">Coming Soon</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Guidelines editor will be available in Phase 6
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
