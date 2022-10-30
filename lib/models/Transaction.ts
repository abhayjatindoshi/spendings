export class Transaction {
    _id: string | undefined;
    source!: string;
    date!: Date;
    summary: string | undefined;
    details: string | undefined;
    type: string | undefined;
    credit!: Number;
    debit!: Number;
}