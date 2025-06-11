import { columns } from './ui/columns';
import { db } from '@/server';
import { auth } from '@/server/auth';
import { redirect } from 'next/navigation';
import { DataTable } from './ui/DataTable';


export default async function AgentDashboardPage() {

    const session = await auth();

    if (!session) return redirect('/login');

    const designTask = await db.query.tickets.findMany({
        where: (tickets, { eq }) => eq(tickets.agentId, Number(session.user.id)),
        with: {
            agent: true,
            client: true,
        },
    });
    const agentData = designTask.map((ticket) => {
        return {
            id: ticket.id,
            title: ticket.title,
            creado: ticket.createdAt!.toISOString(),
            priority: ticket.priority as 'low' | 'medium' | 'high',
            status: ticket.status as 'open' | 'in_progress' | 'closed',
            // updated: ticket.updatedAt!.toISOString(),
        }
    });



    return (
        <div className="h-dvh w-full">
            <h1 className="text-white text-3xl py-5">Tickets Asignados</h1>

            <DataTable columns={columns} data={agentData} />
        </div>
    );
}