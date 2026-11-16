import fs from 'node:fs';
import vm from 'node:vm';

const source = fs.readFileSync(new URL('../data/lessons.js', import.meta.url), 'utf8');
const sandbox = { window: {} };
vm.runInNewContext(source, sandbox, { timeout: 2000 });
const lessons = sandbox.window.LESSONS;
const categories = new Set(['vocabulary', 'grammar', 'conversation']);
const levels = new Set(['N5', 'N4', 'N3', 'N2', 'N1']);
const errors = [];
const slugs = new Set();
const requiredString = (value, name) => { if (typeof value !== 'string' || !value.trim()) errors.push(`${name} 必須是非空字串`); };
if (!Array.isArray(lessons) || lessons.length === 0) errors.push('LESSONS 必須是非空陣列');
for (const [index, lesson] of (Array.isArray(lessons) ? lessons : []).entries()) {
  const base = `lessons[${index}]`;
  for (const key of ['slug', 'title', 'category', 'level', 'summary', 'updated']) requiredString(lesson[key], `${base}.${key}`);
  if (!/^[a-z]+(?:-[a-z]+)*$/.test(lesson.slug)) errors.push(`${base}.slug 只能使用英文小寫和連字號`);
  if (slugs.has(lesson.slug)) errors.push(`${base}.slug 重複：${lesson.slug}`);
  slugs.add(lesson.slug);
  if (!categories.has(lesson.category)) errors.push(`${base}.category 無效`);
  if (!levels.has(lesson.level)) errors.push(`${base}.level 無效`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(lesson.updated) || Number.isNaN(Date.parse(lesson.updated))) errors.push(`${base}.updated 日期格式錯誤`);
  if (!Number.isInteger(lesson.readingMinutes) || lesson.readingMinutes < 1) errors.push(`${base}.readingMinutes 必須是正整數`);
  if (!Array.isArray(lesson.sections) || lesson.sections.length === 0) { errors.push(`${base}.sections 至少需要一章`); continue; }
  lesson.sections.forEach((section, s) => {
    const sb = `${base}.sections[${s}]`;
    requiredString(section.heading, `${sb}.heading`);
    requiredString(section.text, `${sb}.text`);
    if (!Array.isArray(section.examples) || section.examples.length === 0) { errors.push(`${sb}.examples 至少需要一組`); return; }
    section.examples.forEach((example, e) => {
      for (const key of ['japanese', 'reading', 'chinese']) requiredString(example[key], `${sb}.examples[${e}].${key}`);
      if (typeof example.reading === 'string' && /[\u4e00-\u9fff\u30a0-\u30ff]/.test(example.reading)) errors.push(`${sb}.examples[${e}].reading 不能含漢字或片假名`);
    });
  });
}
if (errors.length) {
  console.error(`✗ 驗證失敗，發現 ${errors.length} 個問題：\n${errors.map((e) => `- ${e}`).join('\n')}`);
  process.exitCode = 1;
} else {
  console.log(`✓ 驗證成功：${lessons.length} 篇筆記、${lessons.reduce((count, lesson) => count + lesson.sections.length, 0)} 個章節、所有 slug 唯一且格式正確。`);
}
