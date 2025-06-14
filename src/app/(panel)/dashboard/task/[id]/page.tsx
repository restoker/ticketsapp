import { notFound, redirect } from "next/navigation";
import Playground from "./ui/Playground";
import { db } from "@/server";
import { auth } from "@/server/auth";

export default async function TaskIdPage({ params }: { params: { id: string } }) {
    const { id } = await params;
    const session = await auth();
    if (!session) return redirect('/login');

    const userId = Number(session.user.id);
    const role = session.user.role;

    const realId = id.toString();

    if (!id) return notFound();
    if (isNaN(Number(realId))) return notFound();

    const ticket = await db.query.tickets.findFirst({
        where: (tickets, { eq }) => eq(tickets.id, Number(realId)) && eq(tickets.agentId, Number(userId)),
        with: {
            ticketComments: {
                orderBy: (ticketComments, { asc }) => [asc(ticketComments.createdAt)],
            },
            agent: {
                columns: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                }
            },
            client: {
                columns: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                },
            },
        }
    });

    if (!ticket) return notFound();

    const comments = ticket.ticketComments;

    // console.log(ticket);

    return (
        <div>
            {/* <h1>Task ID</h1> */}
            <Playground userId={userId} role={role} comments={comments} />
        </div>
    );
}