'use client'
import { logout } from "@/app/actions/auth";
import Button from "../Button/Button";
import Nav from "../Nav/Nav";


export default function Header() {

    const logOut = () => {
        if (typeof window !== 'undefined') {
            try {
                localStorage.removeItem(process.env.TEMPLATE_STORAGE_KEY!);
            } catch (error) {
                console.error('Error removing templates to localStorage:', error);
            }
        }
        if (!localStorage.getItem(process.env.TEMPLATE_STORAGE_KEY!)) {
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

