import React from 'react'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import {Calendar, HistoryIcon, Home, Inbox, Search, Settings, User2Icon} from "lucide-react"
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {FaMagic} from "react-icons/fa";
import {IoInformation} from "react-icons/io5";
import Link from "next/link";

const items = [
    {
        title: "Главная",
        url: "#",
        icon: Home,
    },
    {
        title: "ИИ АГЕНТ",
        url: "/dashboard",
        icon: FaMagic,
    },
    {
        title: "История",
        url: "/dashboard/history",
        icon: HistoryIcon,
    },
    {
        title: "О нас",
        url: "/about",
        icon: IoInformation,
    },
    {
        title: "Профиль",
        url: "/profile",
        icon: User2Icon,
    },
]

export function AppSidebar() {
    const path = usePathname();
    return (
        <Sidebar>
            <SidebarHeader>
                <div className='p-4'>
                    <Link href='/'>
                        <Image src={'/logo.png'} width={60} height={60}  alt='logo'
                               className='w-[60px] h-[60px] rounded-2xl' />
                    </Link>


                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>

                    <SidebarGroupContent>
                        <SidebarMenu className='mt-5'>
                            {items.map((item, index) => (
                                // <SidebarMenuItem key={item.title} className='p-2'>
                                //     <SidebarMenuButton asChild className=''>
                                <a href={item.url} key={index} className={`p-2 text-lg flex gap-2 items-center
                                 hover:bg-gray-100 rounded-lg ${path.includes(item.url) && 'bg-gray-200ß'}`}>
                                    <item.icon className='h-5 w-5' />
                                    <span>{item.title}</span>
                                </a>
                                //     </SidebarMenuButton>
                                // </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <h2 className='p-2 text-gray-400 text-sm text-center'>Copyright @IvanKatkovsky
                <hr/>
                    <b className='text-center py-4'>Все права защищены</b>
                </h2>

            </SidebarFooter>
        </Sidebar>
    )
}