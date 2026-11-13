import type { Dictionary } from './types';

export const ua: Dictionary = {
  meta: {
    title: 'Ольга Щербатюк | Full Stack розробниця',
  },
  header: {
    homeLabel: 'Ольга Щербатюк, на початок сторінки',
    openMenu: 'Відкрити меню',
    closeMenu: 'Закрити меню',
    navLabel: 'Основна навігація',
    languageLabel: 'Мова сайту',
    themeToLight: 'Увімкнути світлу тему',
    themeToDark: 'Увімкнути темну тему',
    cta: 'Звʼязатися',
  },
  nav: {
    home: 'Головна',
    about: 'Про мене',
    skills: 'Навички',
    projects: 'Проєкти',
    contacts: 'Контакти',
  },
  hero: {
    greeting: '',
    name: 'Ольга Щербатюк',
    roles: [
      'Full Stack розробниця',
      'React & TypeScript розробниця',
      'Serverless на Supabase',
    ],
    headline: ['Масштабовані', 'вебдодатки на React', 'і TypeScript.'],
    description:
      'Допомагаю інженерним командам із {суворою типізацією}, {чистою архітектурою}, доступністю за {WCAG} та {serverless}-бекендом.',
    viewProjects: 'Переглянути проєкти',
    contactMe: 'Обговорити проєкт',
    photoAlt: 'Фото Ольги Щербатюк',
    stats: [
      { value: '100%', label: 'Strict TypeScript' },
      { value: 'INP < 200ms', label: 'ціль за затримкою взаємодії' },
      { value: 'Mobile-First', label: 'адаптив від 320px' },
    ],
    cards: {
      speed: {
        kicker: 'Core Web Vitals',
        title: 'Миттєве завантаження та інтерактивність',
      },
      costs: {
        kicker: 'Serverless',
        title: 'Бекенд на Supabase',
      },
    },
    techLabel: 'Інструменти, з якими працюю',
  },
  about: {
    kicker: 'Інженерний підхід',
    title: 'Підтримуваний код, вимірювана швидкодія',
    paragraphs: [
      'Я створюю вебпродукти на {TypeScript} і {React}. Суворі типи документують потік даних, ловлять помилки на етапі збірки та пришвидшують рефакторинг й онбординг. Стан живе в Zustand, стилі — в SCSS Modules.',
      'У Nice Gadgets, e-commerce застосунку, я зробила каталог товарів із фільтрами, кошик із синхронізацією в акаунті, оформлення замовлення з пошуком відділень Нової пошти та {AI-пошук}. Бекенд працює на serverless-функціях і Supabase, тож власної серверної інфраструктури, яку треба оплачувати й підтримувати, немає.',
      'Швидкодія, {доступність} і локалізація входять у definition of done. Lazy loading та оптимізація зображень націлені на Core Web Vitals, семантична розмітка відповідає WCAG, а інтерфейс EN/UA працює з однієї кодової бази.',
    ],
    factsTitle: 'Що ви отримуєте',
    facts: {
      conversion: {
        title: 'Суворий TypeScript',
        text: '→ Менше помилок у рантаймі, швидший рефакторинг і онбординг',
      },
      speed: {
        title: 'Lazy loading і оптимізація зображень',
        text: '→ Кращі Core Web Vitals і швидке перше завантаження',
      },
      costs: {
        title: 'Serverless і Supabase',
        text: '→ Без підтримки серверів і швидкий старт',
      },
      markets: {
        title: 'WCAG та EN/UA i18n',
        text: '→ Доступний інтерфейс, дві мови з однієї кодової бази',
      },
    },
  },
  skills: {
    kicker: 'Навички та досвід',
    title: 'Мій стек',
    description:
      'Типізована екосистема React із безсерверною інфраструктурою: швидкий запуск, надійність у продакшені та проста підтримка.',
  },
  projects: {
    kicker: 'Портфоліо',
    title: 'Мої проєкти',
    description: '',
    code: 'Код',
    personal: 'Персональна версія',
    personalCode: 'Code PV',
    demo: 'Демо',
    screenshotAlt: (title) => `Скріншот проєкту ${title}`,
    items: {
      niceGadgets: {
        title: 'Nice Gadgets',
        kicker: 'E-commerce · Тімлідка й техлідка',
        description:
          'Інтернет-магазин гаджетів з усім шляхом до покупки: фільтри й пошук у каталозі, кошик і обране із синхронізацією в акаунті, оформлення замовлення з пошуком відділень Нової пошти та AI-асистент, який допомагає знайти й порівняти товари.',
        highlights: [
          'Безпечно за замовчуванням: ключі API лишаються на сервері, без витоків і несподіваних рахунків',
          'Каталог працює навіть без бази даних: є запасні вбудовані дані',
          'Дві мови й дві теми з однієї кодової бази',
        ],
      },
      todoApp: {
        title: 'Todo App with API',
        kicker: 'REST API',
        description:
          'Менеджер задач із синхронізацією через REST API. Користувач завжди бачить, що відбувається: лоадери на кожну дію та зрозумілі повідомлення про помилки.',
        highlights: [],
      },
      bikeLanding: {
        title: 'Bike Landing Page',
        kicker: 'Лендинг',
        description:
          'Лендинг веломагазину, точно зверстаний за макетом у Figma, тож бренд виглядає однаково на кожному екрані.',
        highlights: [],
      },
    },
    comingSoon: {
      badge: 'Скоро',
      title: 'Нові проєкти в розробці',
      text: 'Зараз працюю над новими проєктами. Підписуйтеся на мій GitHub, щоб побачити їх першими.',
      link: 'Мій GitHub',
    },
  },
  contacts: {
    kicker: 'Контакти',
    title: 'Звʼяжімося',
    description:
      'Шукаєте розробницю до команди чи продукту? Напишіть мені в LinkedIn чи Telegram або {перегляньте} мій код на GitHub.',
    items: {
      linkedin: { title: 'LinkedIn', text: 'Напишіть мені напряму' },
      github: { title: 'GitHub', text: 'Код усіх моїх проєктів' },
      telegram: { title: 'Telegram', text: 'Напишіть мені в месенджері' },
      email: { title: 'Email', text: 'Напишіть мені на пошту' },
    },
    opensInNewTab: 'відкривається в новій вкладці',
  },
  footer: {
    backToTop: 'Нагору',
    connect: 'Контакти',
    rights: (year) => `© ${year} Ольга Щербатюк. Усі права захищено.`,
    openForHire: 'Відкрита до пропозицій',
  },
};
