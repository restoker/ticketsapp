import { auth } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
    // const session = await auth();

    // if (!session) {
    //     return redirect('/login');
    // }
    return (
        <>
            <h1>Dashboard</h1>
        </>
    );
}