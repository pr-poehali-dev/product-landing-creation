import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

/* ─────────────── DATA ─────────────── */

const CATALOG: {
  id: string;
  title: string;
  desc?: string;
  img: string;
  products: string[];
  accent?: boolean;
}[] = [
  {
    id: "marinades",
    title: "Маринады",
    img: "https://cdn.poehali.dev/projects/8b724216-7c50-4a02-97ca-5acd31a5a5d0/files/2f5edc72-9bc7-409c-b7ff-3262703cc264.jpg",
    products: ["Маринад Люкс", "Маринад Универсал", "Маринад Экспресс"],
  },
  {
    id: "korean",
    title: "Корейские заправки",
    img: "https://cdn.poehali.dev/projects/8b724216-7c50-4a02-97ca-5acd31a5a5d0/files/0e203b1d-2a2d-4743-92b4-2636485e75a1.jpg",
    products: [
      "Корейская заправка для моркови",
      "Корейская заправка для спаржи",
      "Корейская заправка для фунчозы",
      "Корейская заправка для хе",
    ],
  },
  {
    id: "sauces",
    title: "Соусы",
    img: "https://cdn.poehali.dev/projects/8b724216-7c50-4a02-97ca-5acd31a5a5d0/files/e6a870ad-2e50-48ba-ae6b-407fa6fe64c7.jpg",
    products: ["Европейские", "FoodService", "Азиатские"],
  },
  {
    id: "grill",
    title: "Гриль-приправы",
    desc: "Тщательно разработанные композиции специй, трав и пряностей, созданные, чтобы преобразить вкус и подготовить продукт перед дальнейшей тепловой обработкой.",
    img: "https://cdn.poehali.dev/projects/8b724216-7c50-4a02-97ca-5acd31a5a5d0/files/84a860e5-7779-47e9-b6c5-13ee2190b55c.jpg",
    products: [
      "Гриль-приправа Грузинская",
      "Гриль-приправа для курицы",
      "Гриль-приправа Классическая",
    ],
    accent: true,
  },
  {
    id: "smoke",
    title: "Коптильные ароматизаторы",
    img: "https://cdn.poehali.dev/projects/8b724216-7c50-4a02-97ca-5acd31a5a5d0/files/4e935373-b16f-4ce0-8007-0ca93cd3b3c3.jpg",
    products: [
      "Ароматизатор коптильный Гурмикс",
      "Ароматизатор коптильный Деликарома",
    ],
  },
  {
    id: "soups",
    title: "Основы для супов",
    desc: "Кулинарные решения для быстрого приготовления популярных супов азиатской кухни. Комплексные смеси ингредиентов со сбалансированным набором аутентичных специй.",
    img: "https://cdn.poehali.dev/projects/8b724216-7c50-4a02-97ca-5acd31a5a5d0/files/ebec5ad9-de64-4586-bcce-fe7f4a6a9172.jpg",
    products: [
      "Основа для супа Рамен мисо",
      "Основа для супа Том Кха",
      "Основа для супа Том Ям",
      "Основа для супа Фо Бо",
    ],
    accent: true,
  },
  {
    id: "broths",
    title: "Бульоны",
    desc: "Концентрированные экстракты из говядины и курицы. Сохраняют богатый, естественный вкус домашнего бульона. Небольшое количество продукта мгновенно превращается в ароматный бульон для супов, соусов и ризотто.",
    img: "https://cdn.poehali.dev/projects/8b724216-7c50-4a02-97ca-5acd31a5a5d0/files/5cb9232d-de9a-4745-86d6-a1fdcd8a718d.jpg",
    products: ["Бульон говяжий", "Бульон куриный"],
  },
  {
    id: "breading",
    title: "Панировочные смеси",
    img: "https://cdn.poehali.dev/projects/8b724216-7c50-4a02-97ca-5acd31a5a5d0/files/a179238b-467e-4fcf-a847-c92dfb1468eb.jpg",
    products: ["Панировка Нежная", "Панировка Острая", "Панировка Оригинальная"],
  },
  {
    id: "concentrates",
    title: "Концентраты и пунши",
    img: "https://cdn.poehali.dev/projects/8b724216-7c50-4a02-97ca-5acd31a5a5d0/files/529faba3-51a3-4411-b084-51ce004eae2f.jpg",
    products: [],
  },
];

const NAV_ITEMS = [
  { id: "catalog", label: "Каталог" },
  { id: "price", label: "Прайс" },
  { id: "contacts", label: "Контакты" },
];

/* ─────────────── HOOK ─────────────── */
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, visible };
}

/* ─────────────── CATALOG SECTION ─────────────── */
function CatalogSection({ cat, index }: { cat: typeof CATALOG[0]; index: number }) {
  const { ref, visible } = useInView();
  const isEven = index % 2 === 0;
  const bgClass = cat.accent
    ? "bg-gurmix-dark"
    : index % 2 === 0
    ? "bg-white"
    : "bg-gurmix-light";

  return (
    <div id={cat.id} ref={ref} className={`py-16 md:py-20 ${bgClass}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} gap-12 items-center`}>

          {/* Image */}
          <div className={`w-full lg:w-5/12 transition-all duration-700 ${visible ? "opacity-100 translate-x-0" : isEven ? "opacity-0 -translate-x-10" : "opacity-0 translate-x-10"}`}>
            <div className="relative overflow-hidden aspect-[4/3]">
              <img src={cat.img} alt={cat.title} className="w-full h-full object-cover" />
              <div className="absolute top-4 left-4 w-12 h-12 bg-gurmix-green flex items-center justify-center">
                <span className="font-oswald text-white text-lg font-bold">{String(index + 1).padStart(2, "0")}</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className={`w-full lg:w-7/12 transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <h2 className={`font-oswald text-4xl md:text-5xl font-bold mb-5 ${cat.accent ? "text-white" : "text-gurmix-dark"}`}>
              {cat.title}
            </h2>

            {cat.desc && (
              <p className={`text-base leading-relaxed mb-8 max-w-xl ${cat.accent ? "text-white/70" : "text-gurmix-gray"}`}>
                {cat.desc}
              </p>
            )}

            {cat.products.length > 0 && (
              <ul className="space-y-3 mb-8">
                {cat.products.map((p, i) => (
                  <li
                    key={p}
                    className={`flex items-center gap-4 transition-all duration-500 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
                    style={{ transitionDelay: `${300 + i * 80}ms` }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gurmix-green flex-shrink-0" />
                    <span className={`text-base font-medium ${cat.accent ? "text-white/90" : "text-gurmix-dark"}`}>{p}</span>
                  </li>
                ))}
              </ul>
            )}

            <button
              onClick={() => document.getElementById("price")?.scrollIntoView({ behavior: "smooth" })}
              className={`text-sm font-semibold tracking-wider px-7 py-3.5 transition-all hover:scale-105 ${
                cat.accent
                  ? "bg-gurmix-green text-white hover:bg-[#6aa030]"
                  : "border-2 border-gurmix-green text-gurmix-green hover:bg-gurmix-green hover:text-white"
              }`}
            >
              ЗАПРОСИТЬ ПРАЙС
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────── MAIN ─────────────── */
export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const heroSection = useInView(0.01);
  const priceSection = useInView();
  const contactSection = useInView();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
    setDropOpen(false);
  };

  return (
    <div className="min-h-screen bg-white font-montserrat overflow-x-hidden">

      {/* ── HEADER ── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => scrollTo("hero")} className="flex items-center gap-3">
            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
              <polygon points="16,2 30,28 2,28" fill="#7DB53A" opacity="0.15"/>
              <polygon points="16,6 28,26 4,26" fill="#7DB53A" opacity="0.4"/>
              <polygon points="16,10 26,24 6,24" fill="#7DB53A"/>
            </svg>
            <span className="font-oswald text-xl font-bold tracking-wider text-gurmix-dark">
              ГУРМИКС<sup className="text-[10px] font-montserrat font-normal ml-0.5">®</sup>
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map(({ id, label }) => (
              <button key={id} onClick={() => scrollTo(id)}
                className="text-sm font-medium text-gurmix-gray hover:text-gurmix-green transition-colors tracking-wide">
                {label}
              </button>
            ))}
            <div className="relative">
              <button
                onClick={() => setDropOpen(!dropOpen)}
                className="text-sm font-medium text-gurmix-gray hover:text-gurmix-green transition-colors tracking-wide flex items-center gap-1">
                Разделы <Icon name="ChevronDown" size={14} />
              </button>
              {dropOpen && (
                <div className="absolute top-full left-0 mt-2 w-60 bg-white border border-gray-100 shadow-xl z-50">
                  {CATALOG.map((c) => (
                    <button key={c.id} onClick={() => scrollTo(c.id)}
                      className="block w-full text-left px-4 py-2.5 text-sm text-gurmix-gray hover:bg-gurmix-light hover:text-gurmix-green transition-colors">
                      {c.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>

          <div className="flex items-center gap-3">
            <button onClick={() => scrollTo("price")}
              className="hidden md:block bg-gurmix-green text-white text-sm font-semibold px-5 py-2.5 tracking-wide hover:bg-[#6aa030] transition-colors">
              Запросить прайс
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 text-gurmix-dark">
              <Icon name={menuOpen ? "X" : "Menu"} size={22} />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-1 max-h-[80vh] overflow-y-auto">
            {NAV_ITEMS.map(({ id, label }) => (
              <button key={id} onClick={() => scrollTo(id)}
                className="text-left text-base font-medium text-gurmix-gray hover:text-gurmix-green py-2 transition-colors">
                {label}
              </button>
            ))}
            <div className="border-t border-gray-100 mt-2 pt-3">
              <p className="text-xs text-gurmix-gray uppercase tracking-widest mb-2 font-semibold">Разделы</p>
              {CATALOG.map((c) => (
                <button key={c.id} onClick={() => scrollTo(c.id)}
                  className="text-left text-sm text-gurmix-gray hover:text-gurmix-green py-1.5 block w-full transition-colors">
                  {c.title}
                </button>
              ))}
            </div>
            <button onClick={() => scrollTo("price")}
              className="bg-gurmix-green text-white text-sm font-semibold px-5 py-3 tracking-wide hover:bg-[#6aa030] transition-colors w-full text-center mt-3">
              Запросить прайс
            </button>
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section id="hero" className="relative min-h-screen flex items-center overflow-hidden pt-16" ref={heroSection.ref}>
        <div className="absolute inset-0">
          <img
            src="https://cdn.poehali.dev/projects/8b724216-7c50-4a02-97ca-5acd31a5a5d0/files/5e1ce3e7-e5ba-4fd5-8a75-cfd90fe6408c.jpg"
            alt="ГУРМИКС"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gurmix-dark" style={{ opacity: 0.82 }} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-gurmix-dark/60 via-transparent to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full py-28">
          <div className="max-w-2xl">
            <p className={`text-gurmix-green font-oswald text-sm tracking-[0.3em] mb-5 transition-all duration-700 ${heroSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              ПРОФЕССИОНАЛЬНЫЕ ВКУСОВЫЕ РЕШЕНИЯ
            </p>
            <h1 className={`font-oswald text-6xl md:text-8xl font-bold text-white leading-[1.0] mb-6 transition-all duration-700 delay-100 ${heroSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              ГУР<span className="text-gurmix-green">МИКС</span><sup className="text-2xl font-montserrat font-light">®</sup>
            </h1>
            <p className={`text-white/70 text-lg font-light leading-relaxed mb-8 max-w-lg transition-all duration-700 delay-200 ${heroSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              Маринады, корейские заправки, соусы, гриль-приправы, коптильные ароматизаторы, бульоны и многое другое. Оптовые поставки по всей России.
            </p>

            <div className={`flex flex-wrap gap-2 mb-10 transition-all duration-700 delay-300 ${heroSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              {CATALOG.map((c) => (
                <button key={c.id} onClick={() => scrollTo(c.id)}
                  className="text-xs font-medium px-3 py-1.5 border border-white/25 text-white/70 hover:border-gurmix-green hover:text-gurmix-green transition-all">
                  {c.title}
                </button>
              ))}
            </div>

            <div className={`flex flex-wrap gap-4 transition-all duration-700 delay-400 ${heroSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              <button onClick={() => scrollTo("catalog")}
                className="bg-gurmix-green text-white font-semibold px-8 py-4 text-sm tracking-wider hover:bg-[#6aa030] transition-all hover:scale-105">
                СМОТРЕТЬ КАТАЛОГ
              </button>
              <button onClick={() => scrollTo("price")}
                className="border border-white/40 text-white font-semibold px-8 py-4 text-sm tracking-wider hover:bg-white/10 transition-all">
                ЗАПРОСИТЬ ПРАЙС
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-10">
          <div className="bg-gurmix-green">
            <div className="max-w-7xl mx-auto px-6 py-0 grid grid-cols-2 md:grid-cols-4">
              {[["10+","Линеек продуктов","🧪"],["90+","Позиций в ассортименте","📦"],["15 лет","На рынке","🏆"],["500+","Клиентов по России","🤝"]].map(([val, label, emoji], i) => (
                <div
                  key={label}
                  className={`flex flex-col items-center justify-center py-6 gap-1 relative
                    ${i < 3 ? "md:border-r border-white/20" : ""}
                    ${i < 2 ? "border-b md:border-b-0 border-white/20" : ""}
                  `}
                >
                  <span className="text-2xl mb-1 leading-none">{emoji}</span>
                  <span className="font-oswald text-4xl md:text-5xl font-bold text-white leading-none">{val}</span>
                  <span className="text-xs text-white/75 font-medium tracking-wide text-center mt-1 max-w-[110px] leading-tight">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CATALOG ── */}
      <div id="catalog" />
      {CATALOG.map((cat, i) => (
        <CatalogSection key={cat.id} cat={cat} index={i} />
      ))}

      {/* ── PRICE REQUEST ── */}
      <section id="price" className="py-24 bg-gurmix-green" ref={priceSection.ref}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="font-oswald text-sm tracking-[0.3em] text-white/60 mb-4">ДЛЯ ПАРТНЁРОВ</p>
          <h2 className={`font-oswald text-4xl md:text-5xl font-bold text-white mb-6 transition-all duration-700 ${priceSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            Получите актуальный<br/>прайс-лист
          </h2>
          <p className="text-white/80 text-base leading-relaxed mb-10 max-w-xl mx-auto">
            Отправьте заявку — пришлём полный прайс с оптовыми ценами и специальными условиями для вашего бизнеса.
          </p>
          <div className={`bg-white p-8 max-w-lg mx-auto text-left transition-all duration-700 delay-200 ${priceSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="space-y-4">
              <input type="text" placeholder="Ваше имя"
                className="w-full border border-gray-200 px-4 py-3.5 text-sm text-gurmix-dark placeholder-gray-400 outline-none focus:border-gurmix-green transition-colors" />
              <input type="tel" placeholder="Номер телефона"
                className="w-full border border-gray-200 px-4 py-3.5 text-sm text-gurmix-dark placeholder-gray-400 outline-none focus:border-gurmix-green transition-colors" />
              <input type="text" placeholder="Название компании (необязательно)"
                className="w-full border border-gray-200 px-4 py-3.5 text-sm text-gurmix-dark placeholder-gray-400 outline-none focus:border-gurmix-green transition-colors" />
              <button className="w-full bg-gurmix-dark text-white font-semibold py-4 text-sm tracking-wider hover:bg-[#2a2a2a] transition-colors">
                ОТПРАВИТЬ ЗАЯВКУ
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-4 leading-relaxed text-center">
              Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных
            </p>
          </div>
        </div>
      </section>

      {/* ── CONTACTS ── */}
      <section id="contacts" className="py-24 bg-white" ref={contactSection.ref}>
        <div className="max-w-7xl mx-auto px-6">
          <div className={`mb-14 transition-all duration-700 ${contactSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <p className="text-gurmix-green font-oswald text-sm tracking-[0.3em] mb-3">СВЯЗАТЬСЯ С НАМИ</p>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold text-gurmix-dark">
              Контакты и <span className="green-underline">реквизиты</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className={`lg:col-span-1 transition-all duration-700 delay-100 ${contactSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <h3 className="font-oswald text-xl font-semibold text-gurmix-dark mb-6 pb-4 border-b border-gray-100">
                Контактная информация
              </h3>
              <div className="space-y-5">
                {[
                  { icon: "Phone", label: "Телефон", value: "+7 (000) 000-00-00" },
                  { icon: "Mail", label: "Email", value: "info@gurmix.ru" },
                  { icon: "MapPin", label: "Адрес", value: "г. Москва, ул. Примерная, д. 1" },
                  { icon: "Clock", label: "Режим работы", value: "Пн–Пт: 9:00 – 18:00" },
                ].map((c) => (
                  <div key={c.label} className="flex gap-4 items-start">
                    <div className="w-10 h-10 bg-gurmix-light flex items-center justify-center flex-shrink-0">
                      <Icon name={c.icon as "Phone"} size={18} className="text-gurmix-green" fallback="Info" />
                    </div>
                    <div>
                      <p className="text-xs text-gurmix-gray mb-0.5">{c.label}</p>
                      <p className="text-sm font-semibold text-gurmix-dark">{c.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={`lg:col-span-2 transition-all duration-700 delay-200 ${contactSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <h3 className="font-oswald text-xl font-semibold text-gurmix-dark mb-6 pb-4 border-b border-gray-100">
                Реквизиты компании
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5">
                {[
                  ["Полное наименование","ООО «ГУРМИКС»"],
                  ["ИНН","0000000000"],
                  ["КПП","000000000"],
                  ["ОГРН","0000000000000"],
                  ["Расчётный счёт","00000000000000000000"],
                  ["Банк","АО «Альфа-Банк»"],
                  ["БИК","000000000"],
                  ["Кор. счёт","30101810000000000000"],
                ].map(([label, value]) => (
                  <div key={label} className="border-b border-gray-50 pb-4">
                    <p className="text-xs text-gurmix-gray mb-1 uppercase tracking-wide">{label}</p>
                    <p className="text-sm font-semibold text-gurmix-dark">{value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 p-5 bg-gurmix-light">
                <p className="text-sm text-gurmix-gray leading-relaxed">
                  Для заключения договора и получения коммерческого предложения свяжитесь с нашим отделом продаж
                  или заполните форму запроса прайс-листа выше.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-gurmix-dark py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
              <polygon points="16,2 30,28 2,28" fill="#7DB53A" opacity="0.3"/>
              <polygon points="16,6 28,26 4,26" fill="#7DB53A" opacity="0.6"/>
              <polygon points="16,10 26,24 6,24" fill="#7DB53A"/>
            </svg>
            <span className="font-oswald text-white tracking-widest text-sm">
              ГУРМИКС<sup className="text-[9px] font-montserrat font-normal">®</sup>
            </span>
          </div>
          <p className="text-white/40 text-xs text-center">© 2024 ООО «ГУРМИКС». Все права защищены.</p>
          <button className="text-white/40 text-xs hover:text-white/70 transition-colors">
            Политика конфиденциальности
          </button>
        </div>
      </footer>
    </div>
  );
}