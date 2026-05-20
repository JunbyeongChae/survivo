import { useFilterStore } from '../../store/filterStore'
import { CATEGORY_MAP, CATEGORY_MAIN_LIST } from '../../constants/categories'

function CategorySelect() {
  const { categoryMain, categorySub, setCategoryMain, setCategorySub } = useFilterStore()

  const subList = categoryMain ? CATEGORY_MAP[categoryMain] ?? [] : []

  return (
    <div className="flex flex-col gap-2">
      {/* 대분류 */}
      <select
        value={categoryMain}
        onChange={(e) => setCategoryMain(e.target.value)}
        className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2
                   text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="">업종 대분류 선택</option>
        {CATEGORY_MAIN_LIST.map((main) => (
          <option key={main} value={main}>{main}</option>
        ))}
      </select>

      {/* 소분류 */}
      <select
        value={categorySub}
        onChange={(e) => setCategorySub(e.target.value)}
        disabled={!categoryMain}
        className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2
                   text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500
                   disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed"
      >
        <option value="">업종 소분류 선택</option>
        {subList.map((sub) => (
          <option key={sub} value={sub}>{sub}</option>
        ))}
      </select>
    </div>
  )
}

export default CategorySelect
