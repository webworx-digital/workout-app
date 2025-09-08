'use client'
import { logout } from "@/app/actions/auth";
import Button from "../Button/Button";
import Nav from "../Nav/Nav";
import { localStorageKey } from "@/app/providers/workout-templates/templates";


export default function Header() {
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
        <header className="my-5 flex justify-between items-center">
            <Nav />
            <Button onClick={logOut} size="xl" variant="secondary">Logout</Button>
        </header>
    );
};

