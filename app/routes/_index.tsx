import Header from "~/components/layout/Header";
import type { Route } from "./+types/_index";
import { LoginForm } from "~/features/auth/components/LoginForm";
export function meta({}: Route.MetaArgs) {
    return [
        {title: "CLDRS Portal"},
        {
            name: "CLDRS Portal", 
            content: "Computer Laboratory Damage Report System Portal"
        }
    ];
}

export default function Home() {
    return (
        <div className="flex flex-col gap-8 ">
            <Header/>
            <div className="mx-auto w-full max-w-md mt-10 sm:mt-8">
                <LoginForm />
            </div>
        </div>
    );
}