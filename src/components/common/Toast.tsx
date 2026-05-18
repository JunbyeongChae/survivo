interface Props {
  message: string
  type?: 'error' | 'info' | 'success'
  onClose: () => void
}

const TYPE_STYLE = {
  error: 'bg-red-500',
  info: 'bg-indigo-500',
  success: 'bg-emerald-500',
} as const

function Toast({ message, type = 'info', onClose }: Props) {
  return (
    <div
      role="alert"
      className={`fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-lg px-4 py-3 text-sm text-white shadow-lg ${TYPE_STYLE[type]}`}
    >
      <span>{message}</span>
      <button
        onClick={onClose}
        aria-label="닫기"
        className="text-white/70 hover:text-white transition-colors"
      >
        ✕
      </button>
    </div>
  )
}

export default Toast
