'use strict';

const CATEGORIES = Object.freeze({
  vocabulary: { label: '單字', marker: 'あ' },
  grammar: { label: '文法', marker: '文' },
  conversation: { label: '會話', marker: '話' }
});

const lessons = Array.isArray(window.LESSONS) ? window.LESSONS : [];
const text = (value) => String(value ?? '');

// 所有使用者可編輯內容均透過 textContent 輸出，避免任意 HTML 注入。
function node(tag, className, value) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (value !== undefined) element.textContent = text(value);
  return element;
}

function createCard(lesson) {
  const meta = CATEGORIES[lesson.category];
  const link = node('a', 'lesson-card');
  link.href = `./lesson.html?lesson=${encodeURIComponent(lesson.slug)}`;
  const icon = node('div', `card-icon icon-${lesson.category}`, meta.marker);
  icon.setAttribute('aria-hidden', 'true');
  const badgeLine = node('div', 'card-badges');
  badgeLine.append(node('span', 'category-label', meta.label), node('span', 'level-label', lesson.level));
  const title = node('h3', '', lesson.title);
  const summary = node('p', 'card-summary', lesson.summary);
  const foot = node('div', 'card-foot');
  foot.append(node('span', '', `${lesson.readingMinutes} 分鐘閱讀`), node('span', 'card-arrow', '↗'));
  link.append(icon, badgeLine, title, summary, foot);
  return link;
}

function initHome() {
  const grid = document.getElementById('lesson-grid');
  if (!grid) return;
  const search = document.getElementById('search');
  const count = document.getElementById('lesson-count');
  const empty = document.getElementById('empty-state');
  const filters = [...document.querySelectorAll('.filter')];
  let category = 'all';

  function render() {
    const query = search.value.trim().toLocaleLowerCase();
    const results = lessons.filter((lesson) => {
      const matchesCategory = category === 'all' || lesson.category === category;
      const haystack = [lesson.title, lesson.summary, lesson.level, ...lesson.sections.flatMap((s) => [s.heading, s.text, ...s.examples.flatMap((e) => [e.japanese, e.reading, e.chinese])])].join(' ').toLocaleLowerCase();
      return matchesCategory && haystack.includes(query);
    });
    grid.replaceChildren(...results.map(createCard));
    count.textContent = String(results.length).padStart(2, '0');
    empty.hidden = results.length > 0;
  }

  search.addEventListener('input', render);
  filters.forEach((button) => button.addEventListener('click', () => {
    category = button.dataset.category;
    filters.forEach((item) => {
      const selected = item === button;
      item.classList.toggle('is-active', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    render();
  }));
  render();
}

function initDetail() {
  const container = document.getElementById('lesson-detail');
  if (!container) return;
  const slug = new URLSearchParams(location.search).get('lesson');
  const lesson = lessons.find((item) => item.slug === slug);
  if (!lesson) {
    container.append(node('h1', 'detail-title', '找不到這篇筆記'), node('p', 'detail-summary', '請返回首頁選擇現有的學習筆記。'));
    document.title = '找不到筆記｜Kotoba Notes';
    return;
  }
  document.title = `${lesson.title}｜Kotoba Notes`;
  const header = node('header', 'detail-header');
  const category = CATEGORIES[lesson.category];
  const badges = node('div', 'card-badges');
  badges.append(node('span', 'category-label', category.label), node('span', 'level-label', lesson.level));
  header.append(badges, node('h1', 'detail-title', lesson.title), node('p', 'detail-summary', lesson.summary), node('p', 'detail-meta', `更新於 ${lesson.updated} ・ 約 ${lesson.readingMinutes} 分鐘閱讀`));
  container.append(header);
  lesson.sections.forEach((section, i) => {
    const wrapper = node('section', 'detail-section');
    wrapper.append(node('p', 'eyebrow', `SECTION ${String(i + 1).padStart(2, '0')}`), node('h2', '', section.heading), node('p', 'section-text', section.text));
    const table = node('div', 'examples');
    section.examples.forEach((example) => {
      const item = node('div', 'example');
      item.append(node('strong', 'example-jp', example.japanese), node('span', 'example-reading', example.reading), node('span', 'example-zh', example.chinese));
      table.append(item);
    });
    wrapper.append(table);
    container.append(wrapper);
  });
  const bottom = node('a', 'primary-button bottom-button', '返回筆記列表 ↗');
  bottom.href = './index.html#notes';
  container.append(bottom);
}

initHome();
initDetail();
