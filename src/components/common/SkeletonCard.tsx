interface Props {
  height?: string
  className?: string
}

function SkeletonCard({ height = 'h-32', className = '' }: Props) {
  return (
    <div className={`animate-pulse rounded-xl bg-gray-200 ${height} ${className}`} />
  )
}

export default SkeletonCard
