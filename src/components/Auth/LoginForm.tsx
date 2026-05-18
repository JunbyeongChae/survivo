import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

interface FormErrors {
  email?: string
  password?: string
  general?: string
}

function LoginForm() {
  const { handleLogin } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<FormErrors>({})

  const validate = (): boolean => {
    const next: FormErrors = {}
    if (!email) next.email = '이메일을 입력해주세요'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = '유효한 이메일 형식이 아닙니다'
    if (!password) next.password = '비밀번호를 입력해주세요'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    try {
      handleLogin(email, password)
    } catch (err) {
      setErrors({
        general: err instanceof Error ? err.message : '로그인에 실패했습니다',
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-sm font-medium text-gray-700">
          이메일
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@email.com"
          className={`rounded-lg border px-3 py-2 text-sm outline-none transition-shadow focus:ring-2 focus:ring-indigo-400 ${
            errors.email ? 'border-red-400' : 'border-gray-300'
          }`}
        />
        {errors.email && (
          <p className="text-xs text-red-500">{errors.email}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="password" className="text-sm font-medium text-gray-700">
          비밀번호
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호를 입력해주세요"
          className={`rounded-lg border px-3 py-2 text-sm outline-none transition-shadow focus:ring-2 focus:ring-indigo-400 ${
            errors.password ? 'border-red-400' : 'border-gray-300'
          }`}
        />
        {errors.password && (
          <p className="text-xs text-red-500">{errors.password}</p>
        )}
      </div>

      {errors.general && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
          {errors.general}
        </p>
      )}

      <button
        type="submit"
        className="rounded-lg bg-indigo-600 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
      >
        로그인
      </button>

      <p className="text-center text-sm text-gray-500">
        계정이 없으신가요?{' '}
        <Link to="/signup" className="font-medium text-indigo-600 hover:underline">
          회원가입
        </Link>
      </p>
    </form>
  )
}

export default LoginForm
