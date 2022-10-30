import Layout from "../components/layout";
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material"

export default function TransactionPage() {
    const { data: session }  = useSession()
    const [transactions, setTransactions]  = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("/api/transactions")
            const json = await res.json()
            if(json){
                setTransactions(json)
            }
        }
        fetchData()
    }, [session])
    
    if(transactions) {
        return (
            <Layout>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Source</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Summary</TableCell>
                                <TableCell>Details</TableCell>
                                <TableCell>Category</TableCell>
                                <TableCell>Credit</TableCell>
                                <TableCell>Debit</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {transactions.map((transaction: any) => (
                                <TableRow>
                                    <TableCell>{transaction.source}</TableCell>
                                    <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                                    <TableCell>{transaction.summary}</TableCell>
                                    <TableCell>{transaction.details}</TableCell>
                                    <TableCell>{transaction.category}</TableCell>
                                    <TableCell>{transaction.credit}</TableCell>
                                    <TableCell>{transaction.debit}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Layout>
        )

    }
}