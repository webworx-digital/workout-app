'use client'
import Link from "next/link";
import { animate } from 'animejs';
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { useDeviceInfo } from "@/app/hooks/useWindowResize";

const navLinks = [
    { label: 'Dashboard', url: '/' },
    { label: 'History', url: '/history' },
    { label: 'Templates', url: '/templates' }
];

export default function Nav() {
    const deviceInfo = useDeviceInfo();
    const pathname = usePathname();
    const activeStateRef = useRef<HTMLDivElement>(null);
    const linksRef = useRef<HTMLLIElement[]>([]);
    const isInitial = useRef(true);
    
    useEffect(() => {
        const activeIndex = navLinks.findIndex(link =>
            link.url === '/' ? pathname === '/' : pathname.startsWith(link.url)
        );

        if (activeIndex === -1 || !linksRef.current[activeIndex] || !activeStateRef.current) return;

        const activeLink = linksRef.current[activeIndex];
        const nav = activeStateRef.current.parentElement!;
        const navRect = nav.getBoundingClientRect();
        const linkRect = activeLink.getBoundingClientRect();
        const targetX = linkRect.left - navRect.left;
        const targetWidth = linkRect.width;

        if (isInitial.current) {
            setTimeout(() => {
                activeStateRef.current!.style.transform = `translateX(${targetX}px)`;
                activeStateRef.current!.style.width = `${targetWidth}px`;
                activeLink.style.color = 'white';
            }, 0);
            isInitial.current = false;
        } else {
            animate(activeStateRef.current, { translateX: targetX, width: targetWidth, duration: 200, easing: 'easeInOut' });
            animate(activeLink, { color: 'white', delay: 100, duration: 200, easing: 'easeInOut' });
            animate(linksRef.current.filter((_, i) => i !== activeIndex), { color: 'inherit', duration: 200, easing: 'easeInOut' });
        }
    }, [pathname, deviceInfo]);

    return (
        <nav className="bg-accent my-0 md:my-5 md:w-fit w-full left-1/2 -translate-x-1/2 md:left-[unset] md:translate-x-[unset] overflow-clip rounded-[40px] absolute top-10 md:top-[unset] md:relative">
            <div className="h-full bg-primary absolute left-0 top-0 rounded-[40px]" ref={activeStateRef} />
            <ul className="flex relative justify-between gap-[unset] md:gap-4 w-full md:w-fit z-10">
                {navLinks.map((link, i) =>
                    <li className="transition-all px-4 py-3 md:px-7 md:py-5 uppercase text-sm md:text-base font-medium tracking-widest hover:text-primary hover:scale-[110%]"
                        ref={el => { if (el) linksRef.current[i] = el; }} key={link.label}>
                        <Link href={link.url}>{link.label}</Link>
                    </li>
                )}
            </ul>
        </nav>
    );
}