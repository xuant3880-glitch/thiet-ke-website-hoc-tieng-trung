'use client'

import { useEffect, useState } from 'react'
import { User, LogOut, Settings } from 'lucide-react'
import { loadUser, logout } from '@/lib/auth'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export function UserMenu() {
  const router = useRouter()
  const [user, setUser] = useState(loadUser())
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handleUserChange = () => {
      setUser(loadUser())
      setOpen(false)
    }
    window.addEventListener('hnd-user', handleUserChange)
    return () => window.removeEventListener('hnd-user', handleUserChange)
  }, [])

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  if (!user) return null

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setOpen(!open)}
        className="gap-2"
      >
        <User className="h-4 w-4" />
        <span className="hidden sm:inline">{user.name}</span>
      </Button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 top-full z-50 mt-2 w-48 rounded-lg border border-border bg-card p-2 shadow-lg">
            <div className="px-3 py-2 text-sm font-medium">{user.name}</div>
            <div className="px-3 py-1 text-xs text-muted-foreground">{user.email}</div>
            <div className="my-2 border-t border-border" />
            <button
              onClick={() => {
                setOpen(false)
                router.push('/pricing')
              }}
              className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-foreground hover:bg-secondary"
            >
              <Settings className="h-4 w-4" />
              Gói học
            </button>
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-destructive hover:bg-destructive/10"
            >
              <LogOut className="h-4 w-4" />
              Đăng xuất
            </button>
          </div>
        </>
      )}
    </div>
  )
}
