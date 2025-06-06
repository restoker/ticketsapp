// import TableComponent from "./ui/TableComponent";

import { db } from "@/server";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import { DataTable } from "./ui/DataTable";
import { columns } from "./ui/columns";


export default async function HomePage() {
    const session = await auth();

    if (!session) {
        return redirect('/login');
    }

    let tickets;

    switch (session.user.role) {
        case 'admin':
            tickets = await db.query.tickets.findMany({
                with: {
                    agent: true,
                    client: true,
                },
            });
            break;
        case 'user':
            tickets = await db.query.tickets.findMany({
                where: (tickets, { eq }) => eq(tickets.clientMail, session.user.email),
                with: {
                    agent: true,
                    client: true,
                },
            });
            break;
        case 'agent':
            tickets = await db.query.tickets.findMany({
                where: (tickets, { eq }) => eq(tickets.agentId, Number(session.user.id)),
                with: {
                    agent: true,
                    client: true,
                },
            });
            break;
        default:
            break;
    }

    if (!tickets) {
        return redirect('/dashboard/login');
    }
    // console.log(tickets[0].createdAt);
    const dataTable = tickets.map((ticket) => {
        return {
            id: ticket.id,
            title: ticket.title,
            creado: ticket.createdAt!.toISOString(),
            priority: ticket.priority as 'low' | 'medium' | 'high',
            status: ticket.status as 'open' | 'in_progress' | 'closed',
        }
    });

    return (
        <div className="h-dvh w-full">
            <h1 className="text-white text-3xl py-5">Tickets creados</h1>
            <DataTable
                columns={columns}
                data={dataTable}
            />
        </div>
    );
} 