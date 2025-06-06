import { auth } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
    const session = await auth();

    if (!session) {
        return redirect('/login');
    }
    const rol = session.user.role;

    if (rol === 'admin') {
        redirect("/dashboard/gestion")
    }
    if (rol === 'user') {
        redirect("/dashboard/home")
    }
    if (rol === 'agent') {
        redirect("/dashboard/agent")
    }

}