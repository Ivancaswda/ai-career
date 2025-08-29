"use client"
import Image from "next/image";
import {useAuth} from "@/context/useAuth";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Loader2Icon, LogOut, UserIcon} from "lucide-react";
import {FaHatWizard, FaMagic} from "react-icons/fa";
import {TextHoverEffect} from "@/components/ui/text-hover-effect";
import {DropdownMenu, DropdownMenuContent, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import Link from "next/link";



export default function Home() {


  const { user, loading, logout } = useAuth();
  const router = useRouter()
  console.log(user)


  return (
      <div className="bg-gray-50 dark:bg-neutral-900 min-h-screen">
        {/* Header */}
        <header className="flex  bg-gradient-to-b from-purple-900 via-purple-900 to-purple-800 flex-wrap sm:justify-start sm:flex-nowrap w-full  z-50 py-3 sm:py-0">
          <nav className="relative max-w-[85rem] w-full mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
            <Image src="/logo.png" alt="AI-Career Logo" width={70} height={70} className="rounded-2xl mt-2" />

            <div className="flex items-center gap-3">
              {loading ?  <Button variant="outline" onClick={() => router.push("/sign-in")}>
                <div className="flex items-center gap-2 font-medium text-gray-600 dark:text-neutral-200">
                  <Loader2Icon className='animate-spin text-purple-600'/>  Загрузка
                </div>
              </Button> : !user ? (
                  <Button variant="outline" onClick={() => router.push("/sign-in")}>
                    <div className="flex items-center gap-2 font-medium text-gray-600 dark:text-neutral-200">
                      <UserIcon /> Начать сейчас
                    </div>
                  </Button>
              ) : (
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Avatar>
                        <AvatarImage src={user?.avatarUrl} />
                        <AvatarFallback>{user?.userName.charAt(0).toUpperCase()}</AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='px-2 py-2 flex flex-col gap-4'>
                      <li className='flex items-center cursor-pointer justify-center gap-2'>

                        <Link className='flex items-start gap-2 ' href='/profile' >
                          <UserIcon/>
                          Profile</Link></li>

                      <li onClick={logout} className='flex items-start cursor-pointer justify-center gap-2'>
                        <LogOut/>
                        Выйти
                      </li>
                    </DropdownMenuContent>
                  </DropdownMenu>

              )}
            </div>
          </nav>
        </header>

        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-purple-800 via-purple-700 to-purple-600 text-white py-28 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              AI-Career
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
              — Инструменты для вашей карьеры
            </span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-purple-100">
              Революционизируйте свой карьерный путь с помощью наших ИИ инструментов: резюме, сопроводительные письма, карьерные планы и многое другое.
            </p>
            <Button
                className="bg-white text-purple-600 font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-purple-100 transition"
                onClick={() => {
                  if (user) {
                    router.push("/dashboard")
                } else {
                    router.push("/sign-up")
                  }
                }}
            >
              Начать
            </Button>
          </div>
        </section>

        {/* Features Section */}
        <div className='bg-gradient-to-b from-purple-600 via-purple-500 to-purple-400'>


        <section className="max-w-[85rem]   mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Наши инструменты</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Example Card */}
            <a className="group flex cursor-pointer flex-col justify-center bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-md hover:shadow-lg transition">
              <div className="flex justify-center items-center w-12 h-12 bg-purple-500 rounded-xl mb-4 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 group-hover:text-purple-600">ИИ Карьерный чат-бот</h3>
              <p className="text-gray-600 dark:text-neutral-400 text-sm">Получите советы и рекомендации от ИИ для вашего карьерного роста.</p>
            </a>

            <a className="group cursor-pointer flex flex-col justify-center bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-md hover:shadow-lg transition">
              <div className="flex justify-center items-center w-12 h-12 bg-purple-500 rounded-xl mb-4 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z" />
                  <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 group-hover:text-purple-600">ИИ Генератор писем</h3>
              <p className="text-gray-600 dark:text-neutral-400 text-sm">Создавайте сопроводительные письма и сообщения для работы за секунды.</p>
            </a>
            <a className="group cursor-pointer flex flex-col justify-center bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-md hover:shadow-lg transition">
              <div className="flex justify-center items-center w-12 h-12 bg-purple-500 rounded-xl mb-4 text-white">
                <FaHatWizard/>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 group-hover:text-purple-600">ИИ Генератор планов</h3>
              <p className="text-gray-600 dark:text-neutral-400 text-sm">Создайте ваш план для достижения цели в интерактивном интересном формате за секунды.</p>
            </a>
            <a className="group cursor-pointer flex flex-col justify-center bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-md hover:shadow-lg transition">
              <div className="flex justify-center items-center w-12 h-12 bg-purple-500 rounded-xl mb-4 text-white">
                <FaMagic/>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 group-hover:text-purple-600">ИИ Оценщик резюме</h3>
              <p className="text-gray-600 dark:text-neutral-400 text-sm">Позвольте ИИ оценить ваше резюме и подчеркнуть недочеты чтобы быть готовым.</p>
            </a>

            {/* Можно добавить ещё карточки инструментов аналогично */}
          </div>
        </section>
        </div>
        <div className="h-[40rem] bg-gradient-to-b from-purple-400 via-purple-300 to-purple-200 flex items-center justify-center">
          <TextHoverEffect text="AI-CAREER" />
        </div>

        <section className="bg-purple-50  bg-gradient-to-b from-purple-200 via-purple-100 to-white py-16 text-center px-4 sm:px-6 lg:px-8 ">
          <h2 className="text-3xl font-bold text-purple-600 mb-4">Готовы прокачать карьеру?</h2>
          <p className="text-gray-600 mb-6">Попробуйте все инструменты AI-Career бесплатно и сделайте первый шаг к своей мечте.</p>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg shadow-lg" onClick={() => {
            if (user) {
              router.push("/dashboard")
            } else {
              router.push("/sign-up")
            }
          }}>
            Начать сейчас
          </Button>
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
  );
}
