import { notFound, redirect } from "next/navigation";
import Playground from "./ui/Playground";
import { db } from "@/server";
import { auth } from "@/server/auth";

export default async function TaskIdPage({ params }: { params: { id: string } }) {
    const { id } = await params;
    const session = await auth();
    // console.log(session);
    if (!session) return redirect('/login');

    const userId = Number(session.user.id);
    const role = session.user.role;

    if (isNaN(Number(id))) notFound();

    const ticket = await db.query.tickets.findFirst({
        where: (tickets, { eq }) => eq(tickets.id, Number(id)),
        with: {
            ticketComments: {
                orderBy: (ticketComments, { asc }) => [asc(ticketComments.createdAt)],
                with: {
                    users: {
                        columns: {
                            id: true,
                            name: true,
                            email: true,
                            role: true,
                        }
                    }
                },
            }
        }
    });

    if (!ticket) notFound();

    if (role === 'user') {
        if (ticket.clientId !== userId) notFound();
    }

    if (role === 'agent') {
        if (ticket.agentId !== userId) notFound();
    }

    const comments = ticket.ticketComments;

    // console.log(ticket);

    return (
        <div>
            {/* <h1>Task ID</h1> */}
            {ticket.status === 'in_progress'
                ?
                <Playground userId={userId} role={role} comments={comments} ticketId={ticket.id} />
                :
                ticket.status === 'closed' ?

                    <div className="flex h-dvh w-full flex-col items-center">
                        <img
                            className="h-96 object-cover rounded-full"
                            src="https://cdn.cosmos.so/74fe635e-cb31-41e5-ad2a-c8a7ece4279e?format=jpeg"
                            alt=""
                        />
                        <h1 className="text-xl font-medium italic">Este ticket esta cerrado</h1>
                    </div>
                    :
                    <div className="flex h-dvh w-full flex-col items-center">
                        <img
                            className="h-72 object-cover rounded-full"
                            src="https://cdn.cosmos.so/1adabc9c-fdb5-419e-b860-810235372e93?format=jpeg"
                            alt=""
                        />
                        <h1 className="text-xl font-medium italic">Este ticket esta siendo asignado, espere por favor o recargue la página</h1>
                    </div>
            }
        </div>
    );
}