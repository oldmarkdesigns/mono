import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import {
  Bell,
  BookOpen,
  BarChart3,
  HelpCircle,
  Home,
  ArrowLeft,
  MessageSquareMore,
  Palette,
  Search,
  Settings,
  UserPlus,
  Zap,
} from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'
import { UserMenu } from '@/components/user-menu'
import { useUserStore } from '@/store/user-store'
import { Button } from '@/components/ui/button'
import logoLight from '../../../Assets/Logo/Logo Light Mode.png'
import logoDark from '../../../Assets/Logo/Logo Dark Mode.png'

type NavItem = {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  startsWith?: boolean
}

const primaryNav: NavItem[] = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Documentation', href: '/creator/guidelines', icon: BookOpen },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Design Systems', href: '/creator', icon: Palette, startsWith: true },
]

const bottomNav: NavItem[] = [
  { name: 'Notifications', href: '/notifications', icon: Bell },
  { name: 'Search', href: '/search', icon: Search },
  { name: 'Invite Team', href: '/invite-team', icon: UserPlus },
  { name: 'Settings', href: '/settings', icon: Settings, startsWith: true },
  { name: 'Contact Support', href: '/support', icon: MessageSquareMore },
  { name: 'Help', href: '/help', icon: HelpCircle },
]

export function AppLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  const { initializeUser, user } = useUserStore()

  useEffect(() => {
    initializeUser()
  }, [initializeUser])

  const showUpgradeBanner = user?.plan === 'free'
  const isCreatorMode = location.pathname.startsWith('/creator/')
  const isAICreatorPage = location.pathname === '/creator/ai'

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      {!isAICreatorPage && (
        <aside className="flex w-64 flex-col border-r bg-card">
        {/* Header */}
        <div className="flex h-16 items-center justify-between border-b px-6">
          <Link to="/" className="hover:opacity-80 transition-opacity">
            <img src={logoLight} alt="Mockman" className="h-7 w-auto dark:hidden" />
            <img src={logoDark} alt="Mockman" className="hidden h-7 w-auto dark:block" />
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
            {primaryNav.map((item) => {
              const isActive = item.startsWith
                ? location.pathname.startsWith(item.href)
                : location.pathname === item.href
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
          {showUpgradeBanner && (
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
              const isActive = item.startsWith
                ? location.pathname.startsWith(item.href)
                : location.pathname === item.href
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
