import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const CATEGORIES = [
  {
    title: "Маринады",
    desc: "Готовые решения для мяса, птицы и рыбы",
    img: "https://cdn.poehali.dev/projects/8b724216-7c50-4a02-97ca-5acd31a5a5d0/files/f613acc1-03c0-4cd5-9d3b-b1953643fdd3.jpg",
    count: "24 продукта",
    tag: "ХИТ",
  },
  {
    title: "Специи и смеси",
    desc: "Профессиональные смеси для кухни и производства",
    img: "https://cdn.poehali.dev/projects/8b724216-7c50-4a02-97ca-5acd31a5a5d0/files/25e9c164-90a1-43ed-8698-aa5bf3af8c66.jpg",
    count: "38 продуктов",
    tag: "",
  },
  {
    title: "Соусы и заправки",
    desc: "Готовые соусы для ресторанов и розницы",
    img: "https://cdn.poehali.dev/projects/8b724216-7c50-4a02-97ca-5acd31a5a5d0/files/95878497-bc2d-4231-8908-517fd2d338a0.jpg",
    count: "19 продуктов",
    tag: "НОВИНКА",
  },
  {
    title: "Мясные решения",
    desc: "Полный цикл подготовки мяса для HoReCa",
    img: "https://cdn.poehali.dev/projects/8b724216-7c50-4a02-97ca-5acd31a5a5d0/files/4c6eefa9-0b5c-4fbe-b628-ae37f2603bb7.jpg",
    count: "12 продуктов",
    tag: "",
  },
];

const ADVANTAGES = [
  { icon: "Factory", title: "Собственное производство", desc: "Полный контроль качества от сырья до готового продукта" },
  { icon: "Truck", title: "Доставка по всей России", desc: "Отгрузка от 1 дня, работаем с транспортными компаниями" },
  { icon: "ShieldCheck", title: "Сертифицированная продукция", desc: "Все продукты имеют необходимые сертификаты и декларации" },
  { icon: "Headphones", title: "Персональный менеджер", desc: "Индивидуальный подход и поддержка на всех этапах" },
];

const DISCOUNTS = [
  { range: "от 50 кг", discount: "5%", dark: false },
  { range: "от 200 кг", discount: "10%", dark: false },
  { range: "от 500 кг", discount: "15%", dark: true },
];

function useInView(threshold = 0.15) {
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

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const catalogSection = useInView();
  const discountSection = useInView();
  const advantageSection = useInView();
  const contactSection = useInView();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white font-montserrat overflow-x-hidden">

      {/* ── HEADER ── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
              <polygon points="16,2 30,28 2,28" fill="#7DB53A" opacity="0.15"/>
              <polygon points="16,6 28,26 4,26" fill="#7DB53A" opacity="0.4"/>
              <polygon points="16,10 26,24 6,24" fill="#7DB53A"/>
            </svg>
            <span className="font-oswald text-xl font-bold tracking-wider text-gurmix-dark">
              ГУРМИКС<sup className="text-xs font-montserrat font-normal">®</sup>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {[["catalog","Каталог"],["discounts","Скидки"],["advantages","О нас"],["contacts","Контакты"]].map(([id, label]) => (
              <button key={id} onClick={() => scrollTo(id)}
                className="text-sm font-medium text-gurmix-gray hover:text-gurmix-green transition-colors tracking-wide">
                {label}
              </button>
            ))}
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
          <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4">
            {[["catalog","Каталог"],["discounts","Скидки"],["advantages","О нас"],["contacts","Контакты"]].map(([id, label]) => (
              <button key={id} onClick={() => scrollTo(id)}
                className="text-left text-base font-medium text-gurmix-gray hover:text-gurmix-green transition-colors">
                {label}
              </button>
            ))}
            <button onClick={() => scrollTo("price")}
              className="bg-gurmix-green text-white text-sm font-semibold px-5 py-3 tracking-wide hover:bg-[#6aa030] transition-colors w-full text-center mt-2">
              Запросить прайс
            </button>
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
        <div className="absolute inset-0 flex">
          <div className="w-1/2 bg-gurmix-dark relative overflow-hidden">
            <img
              src="https://cdn.poehali.dev/files/f9230d3a-676e-443e-938c-8209a44edb27.JPG"
              alt="ГУРМИКС продукция"
              className="absolute inset-0 w-full h-full object-cover opacity-60 scale-105"
            />
          </div>
          <div className="w-1/2 bg-gurmix-green relative">
            <div className="absolute inset-0 opacity-10"
              style={{backgroundImage:"repeating-linear-gradient(45deg,transparent,transparent 20px,rgba(255,255,255,0.05) 20px,rgba(255,255,255,0.05) 40px)"}}>
            </div>
          </div>
        </div>

        <div className="absolute inset-0" style={{background:"linear-gradient(105deg, rgba(26,26,26,0.6) 48%, transparent 58%)"}} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full py-24">
          <div className="max-w-2xl">
            <p className="text-gurmix-green font-oswald text-sm tracking-[0.3em] mb-4 animate-fade-in-up delay-100">
              ГОТОВЫЕ РЕШЕНИЯ ДЛЯ ВАШЕГО БИЗНЕСА
            </p>
            <h1 className="font-oswald text-5xl md:text-7xl font-bold text-white leading-tight mb-6 animate-fade-in-up delay-200">
              МАРИНАДЫ.<br/>СПЕЦИИ.<br/>СОУСЫ.
            </h1>
            <p className="text-white/80 text-lg font-light leading-relaxed mb-10 animate-fade-in-up delay-300 max-w-md">
              Профессиональные продукты для ресторанов, кафе и производств. Оптовые поставки по всей России.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in-up delay-400">
              <button onClick={() => scrollTo("catalog")}
                className="bg-gurmix-green text-white font-semibold px-8 py-4 text-sm tracking-wider hover:bg-[#6aa030] transition-all hover:scale-105">
                СМОТРЕТЬ КАТАЛОГ
              </button>
              <button onClick={() => scrollTo("price")}
                className="border border-white/50 text-white font-semibold px-8 py-4 text-sm tracking-wider hover:bg-white/10 transition-all">
                ЗАПРОСИТЬ ПРАЙС
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-10">
          <div className="max-w-7xl mx-auto px-6 py-5 flex flex-wrap justify-between gap-6">
            {[["90+","Продуктов в линейке"],["15 лет","На рынке"],["500+","Клиентов по России"],["1 день","Минимальный срок отгрузки"]].map(([val, label]) => (
              <div key={label} className="flex items-center gap-4">
                <span className="font-oswald text-2xl font-bold text-gurmix-green">{val}</span>
                <span className="text-xs text-gurmix-gray font-medium leading-tight max-w-[100px]">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATALOG ── */}
      <section id="catalog" className="py-24 bg-gurmix-light" ref={catalogSection.ref}>
        <div className="max-w-7xl mx-auto px-6">
          <div className={`mb-14 transition-all duration-700 ${catalogSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <p className="text-gurmix-green font-oswald text-sm tracking-[0.3em] mb-3">АССОРТИМЕНТ</p>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold text-gurmix-dark">
              Каталог <span className="green-underline">продукции</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CATEGORIES.map((cat, i) => (
              <div key={cat.title}
                className={`product-card bg-white overflow-hidden cursor-pointer group transition-all duration-700 ${catalogSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
                style={{ transitionDelay: `${i * 120}ms` }}>
                <div className="relative h-56 overflow-hidden">
                  <img src={cat.img} alt={cat.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  {cat.tag && (
                    <span className="absolute top-3 left-3 bg-gurmix-green text-white text-xs font-bold px-3 py-1 tracking-wider">
                      {cat.tag}
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-oswald text-xl font-semibold text-gurmix-dark mb-2">{cat.title}</h3>
                  <p className="text-sm text-gurmix-gray leading-relaxed mb-4">{cat.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gurmix-green font-semibold">{cat.count}</span>
                    <Icon name="ArrowRight" size={16} className="text-gurmix-green group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={`mt-10 text-center transition-all duration-700 delay-500 ${catalogSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <button onClick={() => scrollTo("price")}
              className="border-2 border-gurmix-green text-gurmix-green font-semibold px-8 py-3.5 text-sm tracking-wider hover:bg-gurmix-green hover:text-white transition-all">
              ЗАПРОСИТЬ ПОЛНЫЙ КАТАЛОГ
            </button>
          </div>
        </div>
      </section>

      {/* ── DISCOUNTS ── */}
      <section id="discounts" className="py-24 bg-white" ref={discountSection.ref}>
        <div className="max-w-7xl mx-auto px-6">
          <div className={`mb-14 transition-all duration-700 ${discountSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <p className="text-gurmix-green font-oswald text-sm tracking-[0.3em] mb-3">ВЫГОДА ДЛЯ БИЗНЕСА</p>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold text-gurmix-dark">
              Оптовые <span className="green-underline">скидки</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className={`transition-all duration-700 delay-200 ${discountSection.visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
              <div className="border border-gray-100 overflow-hidden">
                <div className="bg-gurmix-dark text-white px-6 py-4 flex justify-between">
                  <span className="font-oswald text-sm tracking-wider">ОБЪЁМ ЗАКАЗА</span>
                  <span className="font-oswald text-sm tracking-wider">СКИДКА</span>
                </div>
                {DISCOUNTS.map((d) => (
                  <div key={d.range}
                    className={`px-6 py-5 flex justify-between items-center border-b border-gray-100 last:border-0 ${d.dark ? "bg-gurmix-green" : "bg-white"}`}>
                    <span className={`font-oswald text-xl font-semibold ${d.dark ? "text-white" : "text-gurmix-dark"}`}>{d.range}</span>
                    <span className={`font-oswald text-3xl font-bold ${d.dark ? "text-white" : "text-gurmix-green"}`}>{d.discount}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gurmix-gray mt-4 leading-relaxed">
                * Скидки суммируются с акционными предложениями. Уточняйте условия у менеджера.
              </p>
            </div>

            <div className={`transition-all duration-700 delay-300 ${discountSection.visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
              <div className="space-y-6">
                {[
                  ["Гибкая система скидок","Скидки от объёма + сезонные акции и специальные условия для постоянных партнёров"],
                  ["Рассрочка оплаты","Работаем с отсрочкой платежа для проверенных клиентов"],
                  ["Индивидуальные рецептуры","Разработаем рецептуру специально под ваш бизнес или формат блюда"],
                  ["Брендирование","Нанесение вашего логотипа на упаковку при заказе от 100 кг"],
                ].map(([title, text]) => (
                  <div key={title} className="flex gap-4">
                    <div className="w-6 h-6 rounded-full bg-gurmix-green flex-shrink-0 mt-0.5 flex items-center justify-center">
                      <Icon name="Check" size={13} className="text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gurmix-dark text-sm mb-1">{title}</p>
                      <p className="text-sm text-gurmix-gray leading-relaxed">{text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ADVANTAGES ── */}
      <section id="advantages" className="py-24 bg-gurmix-dark" ref={advantageSection.ref}>
        <div className="max-w-7xl mx-auto px-6">
          <div className={`mb-14 transition-all duration-700 ${advantageSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <p className="text-gurmix-green font-oswald text-sm tracking-[0.3em] mb-3">ПОЧЕМУ МЫ</p>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold text-white">
              Наши <span className="green-underline">преимущества</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {ADVANTAGES.map((adv, i) => (
              <div key={adv.title}
                className={`transition-all duration-700 ${advantageSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="w-12 h-12 border border-gurmix-green/40 flex items-center justify-center mb-5">
                  <Icon name={adv.icon as "Factory"} size={22} className="text-gurmix-green" fallback="Star" />
                </div>
                <h3 className="font-oswald text-lg font-semibold text-white mb-3">{adv.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{adv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICE REQUEST ── */}
      <section id="price" className="py-24 bg-gurmix-green">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="font-oswald text-sm tracking-[0.3em] text-white/70 mb-4">ВАША ВЫГОДА</p>
          <h2 className="font-oswald text-4xl md:text-5xl font-bold text-white mb-6">
            Получите актуальный<br/>прайс-лист
          </h2>
          <p className="text-white/80 text-base leading-relaxed mb-10 max-w-xl mx-auto">
            Отправьте заявку — и мы пришлём полный прайс с оптовыми ценами и специальными условиями для вашего бизнеса.
          </p>
          <div className="bg-white p-8 max-w-lg mx-auto text-left">
            <div className="space-y-4">
              <input type="text" placeholder="Ваше имя"
                className="w-full border border-gray-200 px-4 py-3.5 text-sm text-gurmix-dark placeholder-gray-400 outline-none focus:border-gurmix-green transition-colors font-montserrat" />
              <input type="tel" placeholder="Номер телефона"
                className="w-full border border-gray-200 px-4 py-3.5 text-sm text-gurmix-dark placeholder-gray-400 outline-none focus:border-gurmix-green transition-colors font-montserrat" />
              <input type="text" placeholder="Название компании (необязательно)"
                className="w-full border border-gray-200 px-4 py-3.5 text-sm text-gurmix-dark placeholder-gray-400 outline-none focus:border-gurmix-green transition-colors font-montserrat" />
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
              ГУРМИКС<sup className="text-xs font-montserrat font-normal">®</sup>
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
