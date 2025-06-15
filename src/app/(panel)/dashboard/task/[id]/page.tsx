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
            <Playground userId={userId} role={role} comments={comments} ticketId={ticket.id} />
        </div>
    );
}