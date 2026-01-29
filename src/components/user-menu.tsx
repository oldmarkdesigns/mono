import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useUserStore } from '@/store/user-store'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  User,
  Settings,
  CreditCard,
  LogOut,
  ChevronDown,
  Check,
} from 'lucide-react'

export function UserMenu() {
  const { user, currentWorkspace, workspaces, switchWorkspace } = useUserStore()
  const [isOpen, setIsOpen] = useState(false)
  const [showWorkspaces, setShowWorkspaces] = useState(false)

  if (!user || !currentWorkspace) return null

  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()

  return (
    <div className="relative">
      <Button
        variant="ghost"
        className="flex items-center gap-3 px-3 py-2 h-auto"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Avatar className="h-8 w-8">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-start text-sm">
          <span className="font-medium">{user.name}</span>
          <span className="text-xs text-muted-foreground">{currentWorkspace.name}</span>
        </div>
        <ChevronDown className="h-4 w-4 text-muted-foreground" />
      </Button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => {
              setIsOpen(false)
              setShowWorkspaces(false)
            }}
          />
          <div className="absolute bottom-full left-0 mb-2 w-64 rounded-lg border bg-popover p-1 shadow-lg z-50">
            <div className="px-3 py-2 mb-1">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
              </div>
            </div>

            <div className="h-px bg-border my-1" />

            {/* Workspace Switcher */}
            <div className="mb-1">
              <button
                onClick={() => setShowWorkspaces(!showWorkspaces)}
                className="flex w-full items-center justify-between rounded-sm px-3 py-2 text-sm hover:bg-accent"
              >
                <span className="text-muted-foreground">Workspace</span>
                <span className="text-xs">{currentWorkspace.name}</span>
              </button>
              {showWorkspaces && (
                <div className="ml-2 mt-1 space-y-1">
                  {workspaces.map((workspace) => (
                    <button
                      key={workspace.id}
                      onClick={() => {
                        switchWorkspace(workspace.id)
                        setShowWorkspaces(false)
                        setIsOpen(false)
                      }}
                      className="flex w-full items-center justify-between rounded-sm px-3 py-1.5 text-sm hover:bg-accent"
                    >
                      <span>{workspace.name}</span>
                      {workspace.id === currentWorkspace.id && (
                        <Check className="h-4 w-4" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="h-px bg-border my-1" />

            <Link
              to="/settings/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 rounded-sm px-3 py-2 text-sm hover:bg-accent"
            >
              <User className="h-4 w-4" />
              Profile
            </Link>

            <Link
              to="/settings"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 rounded-sm px-3 py-2 text-sm hover:bg-accent"
            >
              <Settings className="h-4 w-4" />
              Settings
            </Link>

            <Link
              to="/settings/billing"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 rounded-sm px-3 py-2 text-sm hover:bg-accent"
            >
              <CreditCard className="h-4 w-4" />
              Billing
              <span className="ml-auto rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                {user.plan.toUpperCase()}
              </span>
            </Link>

            <div className="h-px bg-border my-1" />

            <button className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-sm text-destructive hover:bg-accent">
              <LogOut className="h-4 w-4" />
              Log out
            </button>
          </div>
        </>
      )}
    </div>
  )
}
