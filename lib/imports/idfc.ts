import { Transaction } from "../models/Transaction";

export default function importHdfcData(data: Buffer): Promise<Array<Transaction>> {
    return new Promise((resolve, reject) => {
        reject("IDFC imports supported yet");
    })
}