import { Transaction } from "../models/Transaction";
import { parse } from "csv-parse/sync";
import moment from "moment";

export default function importHdfcData(data: Buffer): Promise<Array<Transaction>> {
    return new Promise((resolve, reject) => {
        const csvRawData = data.toString();
        const csvParsedData = parse(csvRawData, {
            relax_column_count: true,
            skip_empty_lines: true,
            trim: true
        })
        csvParsedData.shift()
        const transactions = csvParsedData.map((row: any[]) => {
            const t = new Transaction();
            t.source = 'HDFC'
            t.date = moment(row[0],'DD/MM/YYYY').toDate()
            t.summary = row[1]
            t.details = row[5]
            t.type = 'Uncategorised'
            t.credit = parseFloat(row[3])
            t.debit = parseFloat(row[4])
            return t;
        })
        resolve(transactions);
    })
}