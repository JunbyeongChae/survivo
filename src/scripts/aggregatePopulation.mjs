// 생활인구 원본(485MB)을 동코드 × 시간대 평균으로 집계
// 실행: node src/scripts/aggregatePopulation.mjs
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '../../');

console.log('집계 시작...');

const raw = fs
  .readFileSync(path.join(ROOT, 'public/data/peopleData/서울_생활인구_202604.json'), 'utf-8')
  .replace(/: NaN/g, ': null');

const records = JSON.parse(raw);
console.log(`총 레코드: ${records.length}개`);

const sums = {};
const counts = {};

for (const r of records) {
  const dongCode = r['시간대구분'];
  const hour = parseInt(r['기준일ID'], 10);
  const pop = parseFloat(r['행정동코드']);
  if (!dongCode || isNaN(hour) || isNaN(pop)) continue;

  if (!sums[dongCode]) {
    sums[dongCode] = new Array(24).fill(0);
    counts[dongCode] = new Array(24).fill(0);
  }
  sums[dongCode][hour] += pop;
  counts[dongCode][hour]++;
}

const result = {};
for (const [code, hourSums] of Object.entries(sums)) {
  result[code] = hourSums.map((s, h) =>
    counts[code][h] > 0 ? Math.round(s / counts[code][h]) : 0,
  );
}

const outPath = path.join(ROOT, 'public/data/peopleData/서울_생활인구_시간대평균.json');
fs.writeFileSync(outPath, JSON.stringify(result), 'utf-8');

const size = fs.statSync(outPath).size;
console.log(`완료: ${Object.keys(result).length}개 동, ${(size / 1024).toFixed(0)}KB`);
