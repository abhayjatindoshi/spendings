import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth"
import clientPromise from "../../lib/mongodb";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await unstable_getServerSession(req, res, authOptions)
    if(!session) {
        res.redirect('/api/auth/signin');
        return;
    }
    
    const client = await clientPromise;
    const db = client.db('spendings')
    db.collection("transactions").find({}).toArray((err, data) => {
        res.json(data)
    })

}