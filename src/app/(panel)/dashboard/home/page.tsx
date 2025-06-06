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
    // get tickets of user
    const tickets = await db.query.tickets.findMany({
        where: (tickets, { eq }) => eq(tickets.clientMail, session.user.email),
        with: {
            agent: true,
            client: true,
        },
    });
    // console.log(tickets[0].createdAt);
    const dataTable = tickets.map((ticket) => {
        const createdAt = ticket.createdAt!.toISOString();
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
            {/* <TableComponent /> */}
            {/* <div className="bg-gray-900 py-10">
                <h2 className="px-4 text-base/7 font-semibold text-white sm:px-6 lg:px-8">Latest activity</h2>
                <table className="mt-6 w-full text-left whitespace-nowrap">
                    <colgroup>
                        <col className="w-full sm:w-4/12" />
                        <col className="lg:w-4/12" />
                        <col className="lg:w-2/12" />
                        <col className="lg:w-1/12" />
                        <col className="lg:w-1/12" />
                    </colgroup>
                    <thead className="border-b border-white/10 text-sm/6 text-white">
                        <tr>
                            <th scope="col" className="py-2 pr-8 pl-4 font-semibold sm:pl-6 lg:pl-8">
                                User
                            </th>
                            <th scope="col" className="hidden py-2 pr-8 pl-0 font-semibold sm:table-cell">
                                Commit
                            </th>
                            <th scope="col" className="py-2 pr-4 pl-0 text-right font-semibold sm:pr-8 sm:text-left lg:pr-20">
                                Status
                            </th>
                            <th scope="col" className="hidden py-2 pr-8 pl-0 font-semibold md:table-cell lg:pr-20">
                                Duration
                            </th>
                            <th scope="col" className="hidden py-2 pr-4 pl-0 text-right font-semibold sm:table-cell sm:pr-6 lg:pr-8">
                                Deployed at
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {activityItems.map((item) => (
                            <tr key={item.commit}>
                                <td className="py-4 pr-8 pl-4 sm:pl-6 lg:pl-8">
                                    <div className="flex items-center gap-x-4">
                                        <img alt="" src={item.user.imageUrl} className="size-8 rounded-full bg-gray-800" />
                                        <div className="truncate text-sm/6 font-medium text-white">{item.user.name}</div>
                                    </div>
                                </td>
                                <td className="hidden py-4 pr-4 pl-0 sm:table-cell sm:pr-8">
                                    <div className="flex gap-x-3">
                                        <div className="font-mono text-sm/6 text-gray-400">{item.commit}</div>
                                        <div className="rounded-md bg-gray-700/40 px-2 py-1 text-xs font-medium text-gray-400 ring-1 ring-white/10 ring-inset">
                                            {item.branch}
                                        </div>
                                    </div>
                                </td>
                                <td className="py-4 pr-4 pl-0 text-sm/6 sm:pr-8 lg:pr-20">
                                    <div className="flex items-center justify-end gap-x-2 sm:justify-start">
                                        <time dateTime={item.dateTime} className="text-gray-400 sm:hidden">
                                            {item.date}
                                        </time>
                                        <div className={classNames(statuses[item.status], 'flex-none rounded-full p-1')}>
                                            <div className="size-1.5 rounded-full bg-current" />
                                        </div>
                                        <div className="hidden text-white sm:block">{item.status}</div>
                                    </div>
                                </td>
                                <td className="hidden py-4 pr-8 pl-0 text-sm/6 text-gray-400 md:table-cell lg:pr-20">{item.duration}</td>
                                <td className="hidden py-4 pr-4 pl-0 text-right text-sm/6 text-gray-400 sm:table-cell sm:pr-6 lg:pr-8">
                                    <time dateTime={item.dateTime}>{item.date}</time>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div> */}
            <DataTable
                columns={columns}
                data={dataTable}
            />

        </div>
    );
} 