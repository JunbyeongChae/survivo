import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'

function Header() {
  const { isLoggedIn, user, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-6 shrink-0">
      <div className="flex items-center gap-3">
        <Link to="/" className="text-lg font-bold text-gray-900 hover:text-indigo-600 transition-colors">
          살아남을지도
        </Link>
        <span className="hidden md:block text-sm text-gray-400">
          서울 창업자를 위한 상권 생존 분석 도구
        </span>
      </div>

      <nav className="flex items-center gap-2">
        {isLoggedIn ? (
          <>
            <span className="hidden md:block text-sm text-gray-600 mr-1">
              {user?.nickname}
            </span>
            <button
              onClick={handleLogout}
              className="text-sm text-gray-500 hover:text-gray-800 px-3 py-1.5 rounded-md hover:bg-gray-100 transition-colors"
            >
              로그아웃
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-sm text-gray-600 hover:text-gray-900 px-3 py-1.5 rounded-md hover:bg-gray-100 transition-colors"
            >
              로그인
            </Link>
            <Link
              to="/signup"
              className="text-sm text-white bg-indigo-600 hover:bg-indigo-700 px-3 py-1.5 rounded-md transition-colors"
            >
              회원가입
            </Link>
          </>
        )}
      </nav>
    </header>
  )
}

export default Header
