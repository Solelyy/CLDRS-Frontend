import { Link } from "react-router";

export default function Header(){
    return(
        <header className="mx-auto mt-4 w-fit flex items-center justify-between gap-10 pl-8 pr-6 py-2 border border-black/10 dark:border-white/20 rounded-full bg-white/60 dark:bg-zinc-900/80 backdrop-blur-md shadow-sm dark:shadow-[0_8px_30px_rgba(0,0,0,0.8)] dark:ring-1 dark:ring-white/10">                
            <Link to="/">
                <img src="/CLDRS.svg" className="w-auto h-6 cursor-pointer transition-all duration-300 hover:opacity-80" alt="CLDRS Logo" />
            </Link>
        </header>
    );
}