import { auth } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
    // const session = await auth();

    // if (!session) {
    //     return redirect('/login');
    // }

    redirect("/dashboard/home")
    // return (
    //     <>
    //         <h1 className="text-white ">Dashboard</h1>
    //     </>
    // );
}