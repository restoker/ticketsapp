import { auth } from "@/server/auth";
import TaskForm from "./ui/TaskForm";

// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";
// import { auth } from "@/server/auth";


export default async function TaskPage() {

    const session = await auth();
    // console.log(session);
    if (!session) {
        redirect('/login');
    }

    if (session.user.role !== 'user') {
        redirect('/dashboard');
    }
    return (
        <div className="h-dvh w-full flex justify-center">
            <TaskForm email={session.user.email} name={session.user.name} />
        </div>
    );
};