// This is an example of how to read a JSON Web Token from an API route
import { getToken } from "next-auth/jwt"

import type { NextApiRequest, NextApiResponse } from "next"
import clientPromise from "../../../lib/mongodb"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // If you don't have the NEXTAUTH_SECRET environment variable set,
  // you will have to pass your secret as `secret` to `getToken`
//   const token = await getToken({ req })
//   res.send(JSON.stringify(token, null, 2))

    try {
        const client = await clientPromise
        const db = client.db('spendings')
        // `await clientPromise` will use the default database passed in the MONGODB_URI
        // However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the following code:
        //
        // `const client = await clientPromise`
        // `const db = client.db("myDatabase")`
        //
        // Then you can execute queries against your database like so:
        // db.find({}) or any of the MongoDB Node Driver commands

        db.collection("transactions").find({}).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            res.send({
                props: { isConnected: true },
                results: result
            })
        });
        
    } catch (e) {
        console.error(e)
        res.send({
            props: { isConnected: false },
        })
    }
}
