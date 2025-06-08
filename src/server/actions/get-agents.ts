'use server';

import { db } from "..";

export const getAgentsAction = async () => {
    try {
        const agents = await db.query.users.findMany({
            where: (users, { eq }) => eq(users.role, 'agent'),
            columns: {
                id: true,
                name: true,
            }
        });
        return { ok: true, agents };
    } catch (error) {
        console.log(error);
        return { ok: false, agents: [] };
    }
}
