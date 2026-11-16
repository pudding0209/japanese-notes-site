/*
 * 每新增一篇筆記，只需在 lessons 陣列加入一個物件。
 * 必填欄位與規則請參閱專案根目錄的 AGENTS.md。
 */
window.LESSONS = [
  {
    slug: 'time-expressions',
    title: '日文時間怎麼說？',
    category: 'grammar',
    level: 'N5',
    summary: '學會幾點、幾分、半，以及「前」的用法。',
    updated: '2026-11-16',
    readingMinutes: 5,
    sections: [
      { heading: '基本句型', text: '詢問時間可以說「今、何時ですか。」回答時用「〜時」「〜分」。', examples: [
        { japanese: '今、何時ですか。', reading: 'いま、なんじですか。', chinese: '現在幾點？' },
        { japanese: '今、七時です。', reading: 'いま、しちじです。', chinese: '現在七點。' }
      ] },
      { heading: '「半」與「前」', text: '「半（はん）」表示半小時；「前（まえ）」表示距離某個時間還有幾分鐘。', examples: [
        { japanese: '八時半です。', reading: 'はちじはんです。', chinese: '八點半。' },
        { japanese: '九時十分前です。', reading: 'くじじゅっぷんまえです。', chinese: '九點差十分，也就是八點五十分。' }
      ] },
      { heading: '小練習', text: '試著用日文問「現在幾點？」並回答「六點半」。', examples: [
        { japanese: '今、何時ですか。六時半です。', reading: 'いま、なんじですか。ろくじはんです。', chinese: '現在幾點？六點半。' }
      ] }
    ]
  },
  {
    slug: 'self-introduction',
    title: '第一次見面的自我介紹',
    category: 'conversation',
    level: 'N5',
    summary: '用自然且簡潔的句子介紹姓名、出身與興趣。',
    updated: '2026-11-16',
    readingMinutes: 4,
    sections: [
      { heading: '見面時的開場', text: '第一次見面時常用「はじめまして」作為開場，結尾用「どうぞよろしくお願いします」。', examples: [
        { japanese: 'はじめまして。高です。', reading: 'はじめまして。こうです。', chinese: '初次見面。我姓高。' },
        { japanese: 'どうぞよろしくお願いします。', reading: 'どうぞよろしくおねがいします。', chinese: '請多多指教。' }
      ] },
      { heading: '介紹自己的背景', text: '「〜から来ました」可表示來自某地；「〜が好きです」可表示喜好。', examples: [
        { japanese: '台湾から来ました。', reading: 'たいわんからきました。', chinese: '我來自台灣。' },
        { japanese: '日本の音楽が好きです。', reading: 'にほんのおんがくがすきです。', chinese: '我喜歡日本音樂。' }
      ] }
    ]
  },
  {
    slug: 'daily-vocabulary',
    title: '日常生活常用單字',
    category: 'vocabulary',
    level: 'N5',
    summary: '從每天都會用到的名詞與動詞開始累積詞彙。',
    updated: '2026-11-16',
    readingMinutes: 3,
    sections: [
      { heading: '生活中的名詞', text: '先熟悉日常接觸得到的事物，再試著放進完整句子。', examples: [
        { japanese: '学校', reading: 'がっこう', chinese: '學校' },
        { japanese: '図書館', reading: 'としょかん', chinese: '圖書館' },
        { japanese: '音楽', reading: 'おんがく', chinese: '音樂' }
      ] },
      { heading: '常用動詞', text: '動詞先記住辭書形，之後再慢慢練習不同變化。', examples: [
        { japanese: '食べる', reading: 'たべる', chinese: '吃' },
        { japanese: '聞く', reading: 'きく', chinese: '聽／詢問' },
        { japanese: '勉強する', reading: 'べんきょうする', chinese: '讀書、學習' }
      ] }
    ]
  }
];
