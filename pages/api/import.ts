import fs from "fs";
import { unstable_getServerSession } from "next-auth"
import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "./auth/[...nextauth]";
import { IncomingForm, File } from "formidable";
import importData from "../../lib/import";
import clientPromise from "../../lib/mongodb";

export const config = {
    api: {
        bodyParser: false
    }
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await unstable_getServerSession(req, res, authOptions)
    if(!session) {
        res.redirect('/api/auth/signin');
        return;
    }
    
    if(req.method != 'POST') {
        res.statusCode = 405
        res.json({
            message: 'Invalid method'
        })
        return;
    }

    new IncomingForm().parse(req, async (err, fields, files) => {
        const source = fields.source as string;
        if(!source) {
            res.statusCode = 400
            res.json({
                message: 'Source not set'
            })
            return;
        }
        const dataFile = files.data as File;
        if(!dataFile) {
            res.statusCode = 400
            res.json({
                message: 'File not found'
            })
            return;
        }

        const data = fs.readFileSync(dataFile.filepath);
        const transactions = await importData(source, data)
        const documents: any[] = transactions.map(t => Object.assign({}, t));
        
        const client = await clientPromise
        const db = client.db('spendings');
        db.collection('transactions').insertMany(documents)
        res.json(documents);
    })

}