import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import { db } from "@/server";
import { columns } from "./ui/columns";
import { DataTable } from "./ui/DataTable";

export default async function UsersPage() {
    const session = await auth();

    if (!session) {
        return redirect('/login');
    }

    const usersAgent = await db.query.users.findMany({
        columns: {
            id: true,
            name: true,
            role: true,
            email: true,
        }
    });

    return (
        <div className="h-dvh w-full">
            <h1 className="text-white text-3xl py-5">Users</h1>
            <DataTable columns={columns} data={usersAgent} />
        </div>
    );
}