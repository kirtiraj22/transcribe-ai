import getDbConnection from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export default async function Dashboard(){
    const user = await currentUser();
    const email = user?.emailAddresses?.[0].emailAddress ?? "";

    const sql = await getDbConnection();
    const response = await sql`SELECT * FROM users WHERE status = 'cancelled' AND email = ${email}`;

    return(
        <section>
            Dashboard status: {JSON.stringify(response)}
        </section>
    )
}