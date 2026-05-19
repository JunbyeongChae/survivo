import { useState, useRef, useEffect } from 'react'
import { useSearchStore } from '../../store/searchStore'
import { useAddressSearch } from '../../hooks/useAddressSearch'
import Toast from '../common/Toast'
import type { SearchLocation } from '../../types/store.types'

function SearchBar() {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [toastMsg, setToastMsg] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)

  const { setCurrentLocation, addRecentSearch } = useSearchStore()
  const { suggestions, isLoading, search, clearSuggestions } = useAddressSearch()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    setIsOpen(true)
    search(value)
  }

  const handleSelect = (location: SearchLocation) => {
    setQuery(location.label)
    setIsOpen(false)
    clearSuggestions()
    setCurrentLocation(location)
    addRecentSearch(location)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setIsOpen(false)
      clearSuggestions()
    }
    if (e.key === 'Enter') {
      if (suggestions.length === 1) {
        handleSelect(suggestions[0])
      } else if (!isLoading && suggestions.length === 0 && query.trim()) {
        setToastMsg('서울 내 주소를 입력해주세요')
      }
    }
  }

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const showNoResult =
    isOpen && !isLoading && query.trim().length > 1 && suggestions.length === 0

  return (
    <>
      <div
        ref={containerRef}
        className="absolute top-4 left-1/2 -translate-x-1/2 z-20 w-full max-w-md px-4"
      >
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onFocus={() => { if (query.trim()) setIsOpen(true) }}
            placeholder="서울 내 주소를 입력하세요"
            aria-label="주소 검색"
            aria-autocomplete="list"
            aria-expanded={isOpen && suggestions.length > 0}
            className="w-full rounded-xl border border-gray-200 bg-white/95 backdrop-blur-sm
                       py-3 pl-11 pr-10 text-sm text-gray-900 shadow-lg
                       placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {/* 검색 아이콘 */}
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
          </span>

          {/* 로딩 스피너 */}
          {isLoading && (
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2">
              <svg className="h-4 w-4 animate-spin text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
            </span>
          )}

          {/* 자동완성 드롭다운 */}
          {isOpen && suggestions.length > 0 && (
            <ul
              role="listbox"
              className="absolute left-0 right-0 top-[calc(100%+6px)] z-30 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xl"
            >
              {suggestions.map((s, i) => (
                <li key={i} role="option" aria-selected={false}>
                  <button
                    onMouseDown={(e) => { e.preventDefault(); handleSelect(s) }}
                    className="flex w-full items-center gap-2.5 px-4 py-3 text-left text-sm text-gray-800 hover:bg-indigo-50 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 shrink-0 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="truncate">{s.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}

          {/* 검색 결과 없음 */}
          {showNoResult && (
            <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-30 rounded-xl border border-gray-100 bg-white px-4 py-3 text-sm text-gray-400 shadow-xl">
              서울 내 검색 결과가 없습니다
            </div>
          )}
        </div>
      </div>

      {toastMsg && (
        <Toast message={toastMsg} type="error" onClose={() => setToastMsg('')} />
      )}
    </>
  )
}

export default SearchBar
