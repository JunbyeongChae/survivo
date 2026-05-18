import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

interface FormErrors {
  nickname?: string
  email?: string
  password?: string
  general?: string
}

function SignUpForm() {
  const { handleSignUp } = useAuth()
  const [nickname, setNickname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<FormErrors>({})

  const validate = (): boolean => {
    const next: FormErrors = {}
    if (!nickname) next.nickname = '닉네임을 입력해주세요'
    else if (nickname.length < 2) next.nickname = '닉네임은 2자 이상이어야 합니다'
    if (!email) next.email = '이메일을 입력해주세요'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = '유효한 이메일 형식이 아닙니다'
    if (!password) next.password = '비밀번호를 입력해주세요'
    else if (password.length < 8) next.password = '비밀번호는 8자 이상이어야 합니다'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    try {
      handleSignUp(email, password, nickname)
    } catch (err) {
      setErrors({
        general: err instanceof Error ? err.message : '회원가입에 실패했습니다',
      })
    }
  }

  const fieldClass = (hasError: boolean) =>
    `rounded-lg border px-3 py-2 text-sm outline-none transition-shadow focus:ring-2 focus:ring-indigo-400 ${
      hasError ? 'border-red-400' : 'border-gray-300'
    }`

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="nickname" className="text-sm font-medium text-gray-700">
          닉네임
        </label>
        <input
          id="nickname"
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="2자 이상 입력해주세요"
          className={fieldClass(!!errors.nickname)}
        />
        {errors.nickname && (
          <p className="text-xs text-red-500">{errors.nickname}</p>
        )}
      </div>

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
          className={fieldClass(!!errors.email)}
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
          placeholder="8자 이상 입력해주세요"
          className={fieldClass(!!errors.password)}
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
        회원가입
      </button>

      <p className="text-center text-sm text-gray-500">
        이미 계정이 있으신가요?{' '}
        <Link to="/login" className="font-medium text-indigo-600 hover:underline">
          로그인
        </Link>
      </p>
    </form>
  )
}

export default SignUpForm
