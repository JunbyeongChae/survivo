import type { User } from '../types/auth.types'

const USERS_KEY = 'users'
const AUTH_USER_KEY = 'authUser'

function getUsers(): User[] {
  const raw = localStorage.getItem(USERS_KEY)
  return raw ? (JSON.parse(raw) as User[]) : []
}

export function signUp(email: string, password: string, nickname: string): User {
  const users = getUsers()

  if (users.some((u) => u.email === email)) {
    throw new Error('이미 사용 중인 이메일입니다')
  }

  const user: User = {
    id: crypto.randomUUID(),
    email,
    password,
    nickname,
    createdAt: new Date().toISOString(),
  }

  localStorage.setItem(USERS_KEY, JSON.stringify([...users, user]))
  return user
}

export function login(email: string, password: string): User {
  const users = getUsers()
  const user = users.find((u) => u.email === email && u.password === password)

  if (!user) {
    throw new Error('이메일 또는 비밀번호를 확인해주세요')
  }

  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user))
  return user
}

export function logout(): void {
  localStorage.removeItem(AUTH_USER_KEY)
}
