import React from 'react'
import {ContainerScroll} from "@/components/ui/container-scroll-animation";
import Carousel from "@/components/ui/carousel";
import AppHeader from "@/app/_components/AppHeader";
import {SidebarProvider} from "@/components/ui/sidebar";
import {StickyBanner} from "@/components/ui/sticky-banner";

import {FaBrain, FaFile, FaGoogle, FaInstagram, FaRocket, FaTiktok, FaTwitch, FaUsers} from "react-icons/fa";
import Image from "next/image";

const AboutPage = () => {
    const slideData = [
        {
            title: "AI Career Assistant",
            button: "Попробовать чат",
            src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=3500&auto=format&fit=crop&ixlib=rb-4.0.3",
            description:
                "Персональный карьерный помощник на базе искусственного интеллекта. Общайся и получай советы в реальном времени.",
        },
        {
            title: "Анализ резюме",
            button: "Загрузить резюме",
            src: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=3500&auto=format&fit=crop&ixlib=rb-4.0.3",
            description:
                "Загрузи своё резюме и получи мгновенный анализ с рекомендациями, как его улучшить и повысить шанс на успех.",
        },
        {
            title: "Построй карьерный roadmap",
            button: "Сгенерировать план",
            src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=3500&auto=format&fit=crop&ixlib=rb-4.0.3",
            description:
                "Наш AI создаст индивидуальную карту развития: от базовых шагов до продвинутых навыков в выбранной профессии.",
        },
        {
            title: "Генератор сопроводительных писем",
            button: "Создать письмо",
            src: "https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?q=80&w=3500&auto=format&fit=crop&ixlib=rb-4.0.3",
            description:
                "Получай персонализированные сопроводительные письма под каждую вакансию — быстро и профессионально.",
        },
    ];

    return (
        <div>
            <StickyBanner className="bg-gradient-to-b from-violet-500 to-violet-600 text-end">
                <p className="mx-0 max-w-[90%]  text-white drop-shadow-md">
                    Успейте воспользоваться нашими инструментами до 31 сентября 2025 абсолютно бесплатно.{" "}
                    <a href="#" className="transition cursor-pointer duration-200 hover:underline">
                        Почему так
                    </a>
                </p>
            </StickyBanner>

            <div>


                <div className="flex flex-col overflow-hidden">
                    <ContainerScroll
                        titleComponent={
                            <>
                                <h1 className="text-4xl font-semibold text-black dark:text-white">
                                    Раскрой силу ИИ от <br />
                                    <span className="text-4xl md:text-[6rem] text-violet-600 font-bold mt-1 leading-none">
                    AI-Career
                  </span>
                                </h1>
                            </>
                        }
                    >
                        <img
                            src={`/logo.png`}
                            alt="hero"
                            height={720}
                            width={1400}
                            className="mx-auto rounded-2xl object-cover h-full object-left-top"
                            draggable={false}
                        />
                    </ContainerScroll>
                </div>
                <section className="py-20 bg-white dark:bg-gray-800">
                    <div className="max-w-6xl mx-auto px-6 text-center">
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                            Что такое <span className="text-violet-600">AI-Career?</span>
                        </h2>
                        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12">
                            Это умный карьерный помощник, который помогает студентам, специалистам и компаниям достигать целей быстрее.
                            Мы соединяем <span className="font-semibold">искусственный интеллект</span> с практическим опытом в HR,
                            чтобы сделать построение карьеры простым, прозрачным и эффективным.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                            <div className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 shadow hover:shadow-lg transition">
                                <FaBrain className="w-12 h-12 mx-auto text-violet-600 mb-4"/>
                                <h3 className="font-semibold text-xl text-gray-800 dark:text-white mb-2">ИИ Консультации</h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Получай советы и аналитику от AI в реальном времени для карьерных решений.
                                </p>
                            </div>
                            <div className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 shadow hover:shadow-lg transition">
                                <FaFile className="w-12 h-12 mx-auto text-violet-600 mb-4"/>
                                <h3 className="font-semibold text-xl text-gray-800 dark:text-white mb-2">Анализ резюме</h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Мгновенная обратная связь по твоему резюме и рекомендации для улучшения.
                                </p>
                            </div>
                            <div className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 shadow hover:shadow-lg transition">
                                <FaRocket className="w-12 h-12 mx-auto text-violet-600 mb-4"/>
                                <h3 className="font-semibold text-xl text-gray-800 dark:text-white mb-2">Roadmap развития</h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Персонализированный карьерный план: шаг за шагом к успеху.
                                </p>
                            </div>
                            <div className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 shadow hover:shadow-lg transition">
                                <FaUsers className="w-12 h-12 mx-auto text-violet-600 mb-4"/>
                                <h3 className="font-semibold text-xl text-gray-800 dark:text-white mb-2">Комьюнити</h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Подключайся к сообществу специалистов, делись опытом и находи возможности.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="relative overflow-hidden w-full h-full py-20">
                    <Carousel slides={slideData} />
                </div>


                <section className="py-20 bg-gray-50 dark:bg-gray-900">
                    <div className="max-w-6xl mx-auto text-center px-6">
                        <h2 className="text-2xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-10">
                            Бренды, которые нам доверяют
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 items-center">
                            <FaGoogle className="w-40 h-40 mx-auto opacity-70 hover:opacity-100 transition"/>
                            <FaInstagram className="w-40 h-40 mx-auto opacity-70 hover:opacity-100 transition"/>
                            <FaTwitch className="w-40 h-40 mx-auto opacity-70 hover:opacity-100 transition"/>
                            <FaTiktok className="w-40 h-40 mx-auto opacity-70 hover:opacity-100 transition"/>
                        </div>
                    </div>
                </section>
                <footer className="bg-gradient-to-t from-purple-900 via-purple-800 to-purple-700 text-white py-12">
                    <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">

                        <div>
                            <Image src='/logo.png' className='rounded-2xl' alt='logo' width={60} height={60} />
                            <p className="text-gray-300 text-sm mt-2">
                                Революционные ИИ-инструменты для вашей карьеры: чат-бот, генератор резюме, писем и карьерных планов.
                                Начните прокачивать свою карьеру уже сегодня!
                            </p>
                        </div>


                        <div>
                            <h3 className="text-xl font-semibold mb-4">Ссылки</h3>
                            <ul className="space-y-2 text-gray-300 text-sm">
                                <li>
                                    <a href="/dashboard" className="hover:text-purple-300 transition">Панель инструментов</a>
                                </li>
                                <li>
                                    <a href="/ai-tools" className="hover:text-purple-300 transition">Все инструменты</a>
                                </li>
                                <li>
                                    <a href="/about" className="hover:text-purple-300 transition">О нас</a>
                                </li>
                                <li>
                                    <a href="/contact" className="hover:text-purple-300 transition">Контакты</a>
                                </li>
                            </ul>
                        </div>


                        <div>
                            <h3 className="text-xl font-semibold mb-4">Следите за нами</h3>
                            <div className="flex items-center gap-4">
                                <a href="#" className="hover:text-purple-300 transition">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 4.557a9.93 9.93 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724 9.864 9.864 0 0 1-3.127 1.195 4.924 4.924 0 0 0-8.39 4.49A13.978 13.978 0 0 1 1.671 3.149 4.923 4.923 0 0 0 3.195 9.723 4.904 4.904 0 0 1 .96 9.1v.06a4.924 4.924 0 0 0 3.946 4.827 4.904 4.904 0 0 1-2.212.084 4.927 4.927 0 0 0 4.6 3.417 9.868 9.868 0 0 1-6.102 2.104c-.396 0-.787-.023-1.174-.069A13.945 13.945 0 0 0 7.548 21c9.142 0 14.307-7.721 13.995-14.646A9.936 9.936 0 0 0 24 4.557z"/>
                                    </svg>
                                </a>
                                <a href="#" className="hover:text-purple-300 transition">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.97.24 2.428.403a4.91 4.91 0 0 1 1.77 1.077 4.91 4.91 0 0 1 1.077 1.77c.163.458.349 1.258.403 2.428.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.24 1.97-.403 2.428a4.92 4.92 0 0 1-1.077 1.77 4.919 4.919 0 0 1-1.77 1.077c-.458.163-1.258.349-2.428.403-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.97-.24-2.428-.403a4.91 4.91 0 0 1-1.77-1.077 4.91 4.91 0 0 1-1.077-1.77c-.163-.458-.349-1.258-.403-2.428-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.054-1.17.24-1.97.403-2.428a4.91 4.91 0 0 1 1.077-1.77 4.91 4.91 0 0 1 1.77-1.077c.458-.163 1.258-.349 2.428-.403C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.775.131 4.798.306 4.01.584a6.926 6.926 0 0 0-2.51 1.64A6.926 6.926 0 0 0 .584 4.01C.306 4.798.131 5.775.072 7.052.013 8.332 0 8.741 0 12s.013 3.668.072 4.948c.059 1.277.234 2.254.512 3.042a6.926 6.926 0 0 0 1.64 2.51 6.926 6.926 0 0 0 2.51 1.64c.788.278 1.765.453 3.042.512C8.332 23.987 8.741 24 12 24s3.668-.013 4.948-.072c1.277-.059 2.254-.234 3.042-.512a6.926 6.926 0 0 0 2.51-1.64 6.926 6.926 0 0 0 1.64-2.51c.278-.788.453-1.765.512-3.042C23.987 15.668 24 15.259 24 12s-.013-3.668-.072-4.948c-.059-1.277-.234-2.254-.512-3.042a6.926 6.926 0 0 0-1.64-2.51 6.926 6.926 0 0 0-2.51-1.64c-.788-.278-1.765-.453-3.042-.512C15.668.013 15.259 0 12 0z"/>
                                        <circle cx="12" cy="12" r="3.2"/>
                                        <path d="M18.4 5.6a1.44 1.44 0 0 1-2.88 0 1.44 1.44 0 0 1 2.88 0z"/>
                                    </svg>
                                </a>
                                <a href="#" className="hover:text-purple-300 transition">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.41c0-3.1 1.893-4.788 4.657-4.788 1.325 0 2.464.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.312h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.324-.593 1.324-1.324V1.325C24 .593 23.407 0 22.675 0z"/>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>


                    <div className="mt-12 border-t border-purple-600 pt-6 text-center text-gray-300 text-sm">
                        &copy; {new Date().getFullYear()} AI-Career. Все права защищены.
                    </div>
                </footer>



            </div>
        </div>
    )
}
export default AboutPage
