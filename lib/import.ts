import importHdfcData from "./imports/hdfc";
import { Transaction } from "./models/Transaction";

export default async function importData(source: String, data: Buffer, config?: Object) : Promise<Array<Transaction>> {
    switch(source) {
        
        case 'HDFC':
            return importHdfcData(data);
        
        case 'IDFC':
            return importIdfcData(data)

        default:
            throw new Error("Invalid source specified.");
    }
}