
'use client'

import Link from "next/link";
import { animate } from 'animejs';
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";


export default function Nav() {
    'use client'
    const pathname = usePathname();
    const activeStateRef = useRef<HTMLDivElement>(null);
    const linksRef = useRef<HTMLLIElement[]>([])

    const navLinks = [{
        label: 'Dashboard',
        url: '/'
    }, {
        label: 'History',
        url: '/history'
    }, {
        label: 'Templates',
        url: '/templates'
    }]

    useEffect(() => {
        linksRef.current = linksRef.current.slice(0, navLinks.length);
    }, [navLinks]);

    useEffect(() => {
        const activeIndex = navLinks.findIndex(link => link.url === pathname);

        if (activeIndex !== -1 && linksRef.current[activeIndex] && activeStateRef.current) {
            const activeLink = linksRef.current[activeIndex];
            const nav = activeStateRef.current.parentElement;
            const inActiveLinks = linksRef.current.filter((_, index) => index !== activeIndex);

            if (nav) {
                const navRect = nav.getBoundingClientRect();
                const linkRect = activeLink.getBoundingClientRect();
                
                // Calculate position relative to nav container
                const targetX = linkRect.left - navRect.left;
                const targetWidth = linkRect.width;

                animate(activeStateRef.current, {
                    translateX: targetX,
                    width: targetWidth,
                    duration: 200,
                    easing: 'easeInOut'
                });

                animate(activeLink, {
                    color: 'white',
                    delay: 100,
                    duration: 200,
                    easing: 'easeInOut'
                });

                animate([inActiveLinks], {
                    color: 'inherit',
                    duration: 200,
                    easing: 'easeInOut'
                });
            }
        }
    }, [pathname])

    return (
        <nav className="bg-accent my-5 w-fit relative rounded-[40px]">
            <div className="h-full w-1/3 bg-primary absolute left-0 top-0 rounded-[40px]" ref={activeStateRef}></div>
            <ul className="flex relative gap-4 w-fit z-10">
                {navLinks.map((link, index) =>
                    <li className={`'flex-1 px-7 py-5 uppercase text-base font-medium tracking-widest `} ref={el => { if (el) linksRef.current[index] = el; }} key={link.label}>
                        <Link href={link.url}>{link.label}</Link>
                    </li>
                )}
            </ul>
        </nav>
    );
};

