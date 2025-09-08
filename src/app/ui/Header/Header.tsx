'use client'
import { logout } from "@/app/actions/auth";
import Button from "../Button/Button";
import Nav from "../Nav/Nav";
import { localStorageKey } from "@/app/providers/workout-templates/templates";
import { useDeviceInfo } from "@/app/hooks/useWindowResize";


export default function Header() {
    const deviceInfo = useDeviceInfo();
    const logOut = () => {
        if (typeof window !== 'undefined') {
            try {
                localStorage.removeItem(localStorageKey);
            } catch (error) {
                console.error('Error removing templates to localStorage:', error);
            }
        }
        if (!localStorage.getItem(localStorageKey)) {
            logout();
        }
    }
    return (
        <header className="my-5 relative flex justify-between items-center h-25">
            <Nav />
            <Button onClick={logOut} size={!deviceInfo.isMobile ? 'xl' : 'md'} variant="secondary" className="w-full md:w-[inherit] absolute -top-2 md:relative">Logout</Button>
        </header>
    );
};

