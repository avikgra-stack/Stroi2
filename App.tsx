import React, { useState, useEffect } from 'react';
import { Menu, X, CheckCircle2, DraftingCompass, HardHat, Ruler, Phone, Mail, MapPin, Building2, ChevronRight } from 'lucide-react';
import { Button } from './components/Button';
import { SectionHeader } from './components/SectionHeader';
import { ProjectMap } from './components/ProjectMap';
import { CostCalculator } from './components/CostCalculator';
import { Testimonials } from './components/Testimonials';
import { NavItem, Project, Service, Statistic } from './types';

// --- Data ---
const NAV_ITEMS: NavItem[] = [
  { label: 'Главная', href: '#home' },
  { label: 'Проекты', href: '#projects' },
  { label: 'Услуги', href: '#services' },
  { label: 'Калькулятор', href: '#calculator' },
  { label: 'Отзывы', href: '#testimonials' },
  { label: 'О нас', href: '#about' },
  { label: 'Контакты', href: '#contact' },
];

const STATS: Statistic[] = [
  { value: '15+', label: 'Лет на рынке' },
  { value: '300+', label: 'Реализованных проектов' },
  { value: '50+', label: 'Специалистов в штате' },
  { value: '100%', label: 'Соблюдение сроков' },
];

const SERVICES: Service[] = [
  {
    id: 1,
    title: 'Генеральный подряд',
    description: 'Полный цикл управления строительством от котлована до сдачи объекта в эксплуатацию.',
    icon: <HardHat className="w-10 h-10 text-blue-600" />,
  },
  {
    id: 2,
    title: 'Архитектурное проектирование',
    description: 'Разработка уникальных архитектурных решений, сочетающих эстетику и функциональность.',
    icon: <DraftingCompass className="w-10 h-10 text-blue-600" />,
  },
  {
    id: 3,
    title: 'Инженерные изыскания',
    description: 'Комплексный анализ участка, геодезия и подготовка технической документации.',
    icon: <Ruler className="w-10 h-10 text-blue-600" />,
  },
  {
    id: 4,
    title: 'Реконструкция зданий',
    description: 'Модернизация существующих объектов с сохранением исторического облика и повышением надежности.',
    icon: <Building2 className="w-10 h-10 text-blue-600" />,
  },
];

const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'ЖК "Северное Сияние"',
    category: 'Жилая недвижимость',
    imageUrl: 'https://picsum.photos/800/600?random=1',
    description: 'Современный жилой комплекс на 500 квартир с подземным паркингом.'
  },
  {
    id: 2,
    title: 'Бизнес-центр "Вершина"',
    category: 'Коммерческая недвижимость',
    imageUrl: 'https://picsum.photos/800/600?random=2',
    description: 'Офисное здание класса А+ в центре делового района.'
  },
  {
    id: 3,
    title: 'Торговый центр "Плаза"',
    category: 'Торговые площади',
    imageUrl: 'https://picsum.photos/800/600?random=3',
    description: 'Многофункциональный торговый комплекс площадью 20 000 кв.м.'
  },
  {
    id: 4,
    title: 'Логистический парк',
    category: 'Промышленность',
    imageUrl: 'https://picsum.photos/800/600?random=4',
    description: 'Складской комплекс класса А с автоматизированными системами.'
  },
];

const App: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen font-sans text-slate-800">
      
      {/* --- Navigation --- */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              С
            </div>
            <span className={`text-2xl font-bold tracking-tight ${isScrolled ? 'text-slate-900' : 'text-slate-900 md:text-white'}`}>
              Строй<span className="text-blue-500">Инвест</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <a 
                key={item.label} 
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className={`text-sm font-medium hover:text-blue-500 transition-colors ${
                  isScrolled ? 'text-slate-600' : 'text-slate-200'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="hidden lg:block">
            <Button variant="accent" onClick={() => document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'})}>
              Обсудить проект
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-2 text-slate-900"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} className={isScrolled ? 'text-slate-900' : 'text-slate-900 md:text-white'} />}
          </button>
        </div>

        {/* Mobile Nav Overlay */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-xl p-4 flex flex-col gap-4 lg:hidden border-t border-slate-100">
            {NAV_ITEMS.map((item) => (
              <a 
                key={item.label} 
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className="text-lg font-medium text-slate-800 py-2 border-b border-slate-50 last:border-0"
              >
                {item.label}
              </a>
            ))}
            <Button variant="accent" fullWidth onClick={() => {
              setMobileMenuOpen(false);
              document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'});
            }}>
              Обсудить проект
            </Button>
          </div>
        )}
      </nav>

      {/* --- Hero Section --- */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1920" 
            alt="Современный жилой комплекс" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/60"></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center text-white mt-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6 animate-fade-in-up">
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            <span className="text-sm font-medium tracking-wide uppercase">Лидеры отрасли 2024</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight max-w-5xl mx-auto">
            Строим будущее <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
              на фундаменте опыта
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-200 mb-10 max-w-2xl mx-auto leading-relaxed">
            Мы реализуем строительные проекты любой сложности, сочетая передовые технологии, безупречное качество и строгие сроки.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="accent" size="lg" onClick={() => document.getElementById('projects')?.scrollIntoView({behavior: 'smooth'})}>
              Наши проекты
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-slate-900 bg-transparent">
              Узнать больше
            </Button>
          </div>
        </div>
      </section>

      {/* --- Expertise / Stats Section --- */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {STATS.map((stat, idx) => (
              <div key={idx} className="text-center group">
                <div className="text-4xl md:text-5xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {stat.value}
                </div>
                <div className="text-sm md:text-base text-slate-600 font-medium uppercase tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Projects Section --- */}
      <section id="projects" className="py-24 bg-slate-900 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeader 
            title="Реализованные проекты" 
            subtitle="Гордость нашей компании — объекты, которые формируют облик города"
            light
          />

          {/* Grid Layout for Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {PROJECTS.map((project) => (
              <div key={project.id} className="group relative overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer">
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-80 transition-opacity duration-300"></div>
                
                <div className="absolute bottom-0 left-0 p-8 w-full translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-blue-400 text-sm font-semibold tracking-wider uppercase mb-2 block">
                    {project.category}
                  </span>
                  <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-slate-300 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                    {project.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Interactive Map Section */}
          <div className="mt-20">
            <h3 className="text-2xl font-bold mb-8 text-center">География работ</h3>
            <ProjectMap />
          </div>

        </div>
      </section>

      {/* --- Services Section --- */}
      <section id="services" className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeader 
            title="Наши Услуги" 
            subtitle="Комплексный подход к реализации строительных задач любого масштаба" 
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {SERVICES.map((service) => (
              <div key={service.id} className="p-8 rounded-2xl bg-white border border-slate-100 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-slate-200/80 transition-all duration-300 hover:-translate-y-1 group">
                <div className="mb-6 bg-slate-50 w-16 h-16 rounded-xl flex items-center justify-center group-hover:bg-blue-600/10 transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                <p className="text-slate-600 leading-relaxed">
                  {service.description}
                </p>
                <a href="#contact" className="inline-flex items-center gap-2 mt-6 text-blue-600 font-medium hover:text-blue-700 transition-colors">
                  Подробнее <ChevronRight size={16} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Cost Calculator Section --- */}
      <section id="calculator" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeader 
            title="Рассчитать стоимость" 
            subtitle="Узнайте ориентировочную стоимость вашего будущего объекта за 1 минуту" 
          />
          
          <div className="max-w-4xl mx-auto">
            <CostCalculator />
          </div>
        </div>
      </section>

      {/* --- Testimonials Section --- */}
      <section id="testimonials" className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeader 
            title="Отзывы клиентов" 
            subtitle="Мнение наших заказчиков — лучшая оценка нашей работы" 
          />
          
          <Testimonials />
        </div>
      </section>

      {/* --- About Us Section --- */}
      <section id="about" className="py-24 bg-slate-50 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 relative">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                <img src="https://picsum.photos/800/1000?random=50" alt="Наша команда" className="w-full" />
              </div>
              {/* Decorative background element */}
              <div className="absolute -bottom-10 -left-10 w-full h-full border-4 border-blue-600 rounded-2xl -z-0 hidden md:block"></div>
              
              <div className="absolute -right-8 top-20 bg-white p-6 rounded-xl shadow-xl z-20 hidden md:block max-w-xs">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                    <CheckCircle2 size={24} />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">Гарантия качества</div>
                    <div className="text-sm text-slate-500">ISO 9001 Сертификация</div>
                  </div>
                </div>
                <p className="text-slate-600 text-sm">
                  Мы строго следуем международным стандартам качества и безопасности во всех процессах.
                </p>
              </div>
            </div>

            <div className="lg:w-1/2">
              <span className="text-blue-600 font-bold tracking-wider uppercase mb-2 block">О Компании</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Создаем пространство для жизни и бизнеса с 2008 года
              </h2>
              <div className="space-y-6 text-lg text-slate-600">
                <p>
                  "СтройИнвест" — это команда профессионалов, объединенных страстью к созиданию. Мы не просто строим здания, мы создаем инфраструктуру, которая служит людям десятилетиями.
                </p>
                <p>
                  Наш подход основан на трех китах: инновации, ответственность и прозрачность. Мы используем BIM-технологии для проектирования, что позволяет избежать ошибок еще на этапе планирования.
                </p>
              </div>

              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <div className="mt-1 w-2 h-2 rounded-full bg-blue-600 flex-shrink-0"></div>
                  <p className="text-slate-700 font-medium">Собственный парк спецтехники</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 w-2 h-2 rounded-full bg-blue-600 flex-shrink-0"></div>
                  <p className="text-slate-700 font-medium">Прямые контракты с производителями</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 w-2 h-2 rounded-full bg-blue-600 flex-shrink-0"></div>
                  <p className="text-slate-700 font-medium">Юридическая чистота сделок</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 w-2 h-2 rounded-full bg-blue-600 flex-shrink-0"></div>
                  <p className="text-slate-700 font-medium">Финансовая прозрачность</p>
                </div>
              </div>
              
              <div className="mt-10">
                <Button variant="primary" size="lg">Узнать историю компании</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Contact Section --- */}
      <section id="contact" className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeader title="Контакты" subtitle="Готовы обсудить ваш будущий проект? Свяжитесь с нами прямо сейчас." />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info Cards */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 flex-shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-lg mb-1">Телефон</h4>
                  <p className="text-slate-600 mb-1">+7 (495) 123-45-67</p>
                  <p className="text-slate-500 text-sm">Пн-Пт, 9:00 - 19:00</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 flex-shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-lg mb-1">Email</h4>
                  <p className="text-slate-600 mb-1">info@stroyinvest.ru</p>
                  <p className="text-slate-500 text-sm">Отвечаем в течение часа</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 flex-shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-lg mb-1">Офис</h4>
                  <p className="text-slate-600">г. Москва, Пресненская наб., 12</p>
                  <p className="text-slate-500 text-sm">Башня "Федерация"</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-slate-100 p-8 md:p-10">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Оставьте заявку</h3>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-slate-700">Ваше имя</label>
                  <input type="text" id="name" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="Иван Иванов" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium text-slate-700">Телефон</label>
                  <input type="tel" id="phone" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="+7 (___) ___-__-__" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-slate-700">О проекте</label>
                  <textarea id="message" rows={4} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none" placeholder="Кратко опишите задачу..."></textarea>
                </div>
                <div className="md:col-span-2">
                  <Button variant="accent" size="lg" fullWidth type="submit">
                    Отправить заявку
                  </Button>
                  <p className="text-xs text-slate-400 mt-4 text-center">
                    Нажимая кнопку, вы соглашаетесь с нашей политикой обработки персональных данных.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-lg">
                  С
                </div>
                <span className="text-xl font-bold text-white">
                  Строй<span className="text-blue-500">Инвест</span>
                </span>
              </div>
              <p className="text-sm leading-relaxed mb-6">
                Надежный партнер в сфере строительства и проектирования. Мы создаем будущее, опираясь на опыт прошлого.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6">Разделы</h4>
              <ul className="space-y-3">
                {NAV_ITEMS.map((item) => (
                   <li key={item.label}>
                     <a href={item.href} onClick={(e) => scrollToSection(e, item.href)} className="hover:text-blue-500 transition-colors">{item.label}</a>
                   </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6">Услуги</h4>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-blue-500 transition-colors">Генеральный подряд</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Проектирование</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Реконструкция</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Дизайн интерьеров</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Подписаться</h4>
              <p className="text-sm mb-4">Получайте новости о наших проектах и специальных предложениях.</p>
              <div className="flex gap-2">
                <input type="email" placeholder="Email" className="bg-slate-800 border-none rounded px-4 py-2 w-full focus:ring-2 focus:ring-blue-500 outline-none text-white" />
                <Button variant="accent" size="sm" className="px-3">OK</Button>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p>© 2024 СтройИнвест. Все права защищены.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Политика конфиденциальности</a>
              <a href="#" className="hover:text-white transition-colors">Условия использования</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;