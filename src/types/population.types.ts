// 원본 JSON 구조 (public/data/peopleData/서울_생활인구_202604.json)
// NaN 값이 존재하므로 number | null 처리
export interface RawLivingPopulation {
  기준일ID: string
  시간대구분: string
  행정동코드: string
  총생활인구수: number
  남자0세부터9세생활인구수: number | null
  남자10세부터14세생활인구수: number | null
  남자15세부터19세생활인구수: number | null
  남자20세부터24세생활인구수: number | null
  남자25세부터29세생활인구수: number | null
  남자30세부터34세생활인구수: number | null
  남자35세부터39세생활인구수: number | null
  남자40세부터44세생활인구수: number | null
  남자45세부터49세생활인구수: number | null
  남자50세부터54세생활인구수: number | null
  남자55세부터59세생활인구수: number | null
  남자60세부터64세생활인구수: number | null
  남자65세부터69세생활인구수: number | null
  남자70세이상생활인구수: number | null
  여자0세부터9세생활인구수: number | null
  여자10세부터14세생활인구수: number | null
  여자15세부터19세생활인구수: number | null
  여자20세부터24세생활인구수: number | null
  여자25세부터29세생활인구수: number | null
  여자30세부터34세생활인구수: number | null
  여자35세부터39세생활인구수: number | null
  여자40세부터44세생활인구수: number | null
  여자45세부터49세생활인구수: number | null
  여자50세부터54세생활인구수: number | null
  여자55세부터59세생활인구수: number | null
  여자60세부터64세생활인구수: number | null
  여자65세부터69세생활인구수: number | null
  여자70세이상생활인구수: number | null
}

// 행정동코드 매핑 (public/data/peopleData/행정동코드_매핑정보.json)
export interface DongCodeMapping {
  통계청행정동코드: number
  행자부행정동코드: number
  시도명: string
  시군구명: string
  행정동명: string
}

// 앱 내부 정규화 타입
export interface LivingPopulation {
  dongCode: string
  timeSlot: string
  totalPopulation: number
}
