export type User = {
  id: string
  email: string
  name: string
  createdAt: string
}

const KEY = 'hnd-user-v1'

export function loadUser(): User | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return null
    return JSON.parse(raw) as User
  } catch {
    return null
  }
}

export function saveUser(user: User) {
  localStorage.setItem(KEY, JSON.stringify(user))
  window.dispatchEvent(new Event('hnd-user'))
}

export function logout() {
  localStorage.removeItem(KEY)
  window.dispatchEvent(new Event('hnd-user'))
}

export function login(email: string, password: string): { success: boolean; user?: User; error?: string } {
  const users = loadAllUsers()
  const user = users.find((u) => u.email === email && u.password === password)

  if (!user) {
    return { success: false, error: 'Email hoặc mật khẩu không đúng' }
  }

  const userWithoutPassword: User = {
    id: user.id,
    email: user.email,
    name: user.name,
    createdAt: user.createdAt,
  }

  saveUser(userWithoutPassword)
  return { success: true, user: userWithoutPassword }
}

export function register(
  email: string,
  password: string,
  name: string
): { success: boolean; user?: User; error?: string } {
  const users = loadAllUsers()

  if (users.find((u) => u.email === email)) {
    return { success: false, error: 'Email đã được sử dụng' }
  }

  if (password.length < 6) {
    return { success: false, error: 'Mật khẩu phải có ít nhất 6 ký tự' }
  }

  const newUser = {
    id: Date.now().toString(),
    email,
    password,
    name,
    createdAt: new Date().toISOString(),
  }

  users.push(newUser)
  saveAllUsers(users)

  const userWithoutPassword: User = {
    id: newUser.id,
    email: newUser.email,
    name: newUser.name,
    createdAt: newUser.createdAt,
  }

  saveUser(userWithoutPassword)
  return { success: true, user: userWithoutPassword }
}

const USERS_KEY = 'hnd-users-v1'

function loadAllUsers(): Array<{ id: string; email: string; password: string; name: string; createdAt: string }> {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(USERS_KEY)
    if (!raw) return []
    return JSON.parse(raw)
  } catch {
    return []
  }
}

function saveAllUsers(users: Array<{ id: string; email: string; password: string; name: string; createdAt: string }>) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export function isLoggedIn(): boolean {
  return loadUser() !== null
}

export function getCurrentUserId(): string | null {
  const user = loadUser()
  return user?.id || null
}
