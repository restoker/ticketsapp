import { db } from "@/server";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import { columns } from "./ui/columns";
import { DataTable } from "./ui/DataTable";

export default async function GestionPage() {
    const session = await auth();

    if (!session) {
        return redirect('/login');
    }

    const tickets = await db.query.tickets.findMany({
        with: {
            agent: true,
            client: true,
        },
    });
    const ticketsData = tickets.map((ticket) => ({
        id: ticket.id,
        title: ticket.title,
        creado: ticket.createdAt!.toISOString(),
        priority: ticket.priority as 'low' | 'medium' | 'high',
        status: ticket.status as 'open' | 'in_progress' | 'closed',
    }));
    return (
        <div>
            <h1>Gestion</h1>
            <DataTable columns={columns} data={ticketsData} />
        </div>
    );
}