import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import { db } from "@/server";

export default async function UsersPage() {
    const session = await auth();

    if (!session) {
        return redirect('/login');
    }

    const usersAgent = await db.query.users.findMany({
        where: (users, { eq }) => eq(users.role, 'agent'),
    });


    // console.log(usersAgent);

    return (
        <div>
            <h1>Users</h1>
        </div>
    );
}