import type { Route } from "./+types/_index";

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
        <div className="font-bold">
        TEST
        </div> 
    );
}