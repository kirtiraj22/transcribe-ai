import { NeonQueryFunction } from "@neondatabase/serverless";

export async function doesUserExist(
    sql: NeonQueryFunction<false, false>,
    email: string
){
    const query = await sql`SELECT * FROM users WHERE email = ${email}`;

    if(query && query.length > 0){
        return query;
    }

    return null;
}