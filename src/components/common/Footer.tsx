function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white py-4 px-4 md:px-6 shrink-0">
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-1 text-xs text-gray-400">
        <p>
          데이터 출처&nbsp;·&nbsp;
          <span>소상공인시장진흥공단 상가정보 (2026.03)</span>
          <span className="mx-1">·</span>
          <span>서울시 생활인구 (2026.04)</span>
          <span className="mx-1">·</span>
          <span>한국부동산원 임대동향 (2025.06)</span>
        </p>
        <p className="shrink-0">© 2026 살아남을지도</p>
      </div>
    </footer>
  )
}

export default Footer
