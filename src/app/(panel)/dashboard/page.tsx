import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import Sidebard from "./ui/Sidebard";

export default async function DashboardPage() {
    const session = await auth();

    if (!session) {
        return redirect('/login');
    }

    return (
        <div className="flex h-dvh w-full">
            <Sidebard />
            <div className="w-full flex-1 flex-col p-4">
                <header className="flex items-center gap-3 rounded-medium border-small border-divider p-4">
                    <h2 className="text-medium font-medium text-default-700">Overview</h2>
                </header>
                <main className="mt-4 h-full w-full overflow-visible">
                    <div className="flex h-[90%] w-full flex-col gap-4 rounded-medium border-small border-divider" />
                </main>
            </div>
        </div>
    );
}