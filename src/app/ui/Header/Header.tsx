
import { logout } from "@/app/actions/auth";
import Button from "../Button/Button";
import Nav from "../Nav/Nav";


export default function Header() {
    return (
        <header className="my-5 flex justify-between items-center">
            <Nav />
            <Button onClick={logout} size="xl" variant="secondary">Logout</Button>
        </header>
    );
};

