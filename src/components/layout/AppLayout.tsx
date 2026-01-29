import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import {
  Palette,
  Type,
  Square,
  Blocks,
  FileText,
  LayoutDashboard,
  Settings,
  HelpCircle,
  Zap,
  Upload,
  Home,
  ArrowLeft,
  Sparkles,
} from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'
import { UserMenu } from '@/components/user-menu'
import { useUserStore } from '@/store/user-store'
import { Button } from '@/components/ui/button'

// Dashboard navigation
const dashboardNavigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Creator', href: '/creator', icon: Sparkles },
  { name: 'Import Code', href: '/import', icon: Upload },
]

// Creator mode navigation
const creatorNavigation = [
  { name: 'Overview', href: '/creator/overview', icon: LayoutDashboard },
  { name: 'Colors', href: '/creator/colors', icon: Palette },
  { name: 'Typography', href: '/creator/typography', icon: Type },
  { name: 'Buttons', href: '/creator/buttons', icon: Square },
  { name: 'Components', href: '/creator/components', icon: Blocks },
  { name: 'Guidelines', href: '/creator/guidelines', icon: FileText },
]

const bottomNav = [
  { name: 'Help & Support', href: '/help', icon: HelpCircle },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export function AppLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  const { initializeUser, user } = useUserStore()

  useEffect(() => {
    initializeUser()
  }, [initializeUser])

  const showUpgradeBanner = user?.plan === 'free'
  
  // Determine which mode we're in
  const isCreatorMode = location.pathname.startsWith('/creator/')
  const isAICreatorPage = location.pathname === '/creator/ai'
  const navigation = isCreatorMode ? creatorNavigation : dashboardNavigation

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      {!isAICreatorPage && (
        <aside className="flex w-64 flex-col border-r bg-card">
        {/* Header */}
        <div className="flex h-16 items-center justify-between border-b px-6">
          <Link to="/" className="text-xl font-bold hover:opacity-80 transition-opacity">
            Mockman
          </Link>
          <ThemeToggle />
        </div>

        {/* Mode Switcher / Back Button */}
        {isCreatorMode && (
          <div className="border-b p-4">
            <Link to="/creator">
              <Button variant="ghost" size="sm" className="w-full justify-start text-muted-foreground hover:text-foreground">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            </Link>
          </div>
        )}

        {/* Main Navigation */}
        <div className="flex-1 overflow-y-auto">
          <nav className="space-y-1 p-3">
            {isCreatorMode && (
              <div className="mb-3 px-3 py-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Design System
                </p>
              </div>
            )}
            
            {navigation.map((item) => {
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* Upgrade Banner */}
          {showUpgradeBanner && !isCreatorMode && (
            <div className="mx-3 my-4 rounded-lg border bg-gradient-to-br from-primary/10 via-primary/5 to-background p-4">
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Zap className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold">Upgrade to Pro</p>
                  <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                    Unlock unlimited design systems
                  </p>
                  <Link
                    to="/settings/billing"
                    className="mt-3 block rounded-md bg-primary px-3 py-1.5 text-center text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    Upgrade Now
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Section */}
        <div className="border-t">
          <nav className="space-y-1 p-3">
            {bottomNav.map((item) => {
              const isActive = location.pathname.startsWith(item.href)
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-accent text-foreground'
                      : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* User Menu */}
          <div className="border-t p-3">
            <UserMenu />
          </div>
        </div>
      </aside>
      )}

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className={cn(
          "mx-auto p-8",
          isAICreatorPage ? "max-w-5xl" : "container"
        )}>
          {children}
        </div>
      </main>
    </div>
  )
}
