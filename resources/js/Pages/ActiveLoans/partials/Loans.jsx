import PrimaryButton from '@/Components/PrimaryButton'
import Status from './Status'

const Loans = ({loans, setRepayment, setSelectedLoan, setHistory}) => {
    
  return (
    <table className="w-full mt-8 border rounded-lg">
        <thead>
            <tr className="w-full bg-gray-100 rounded-lg">
                <th className="p-4 text-start rounded">Account NO</th>
                <th className="p-4 text-start">Customer</th>
                <th className="p-4 text-start">Email</th>
                <th className="p-4 text-start">Amount</th>
                <th className="p-4 text-start">Paid</th>
                <th className="p-4 text-start">Balance</th>
                <th className="p-4 text-start">status</th>
                <th className="p-4 text-start">Action</th>
            </tr>
        </thead>
        {loans && loans.length > 0 ? (
            <tbody>
                {loans?.map((record)=>(
                    <tr className="border hover:bg-slate-50" key={record?.id}>
                        <td className="p-4">
                            {record?.account?.account_number}
                        </td>
                        <td className="p-4">{record?.account?.user?.name}</td>
                        <td className="p-4">{record?.account?.user?.email}</td>
                        <td className="p-4">{record?.amount}</td>
                        <td className="p-4">{record?.repayments.reduce((sum, item) => sum + Number(item.amount), 0)}</td>
                        <td className="p-4">{Number(record?.amount) - record?.repayments.reduce((sum, item) => sum + Number(item.amount), 0)}</td>
                        <td className="p-4">
                            <Status status={record?.status} />
                        </td>
                        <td className="p-4 flex flex-col md:flex-row gap-4">
                            {record?.status && record?.status !== 'closed' && <PrimaryButton 
                                onClick={() => {
                                    setSelectedLoan(record)
                                    setRepayment(true)
                                }
                            }
                            >
                                Repayments
                            </PrimaryButton>}
                            <PrimaryButton
                                onClick={() => {
                                    setSelectedLoan(record)
                                    setHistory(true)
                                }
                            }
                            >History</PrimaryButton>
                        </td>
                    </tr>
                ))}
            </tbody>
        ):(
            <div className="bg-blue-100 text-blue-500 px-4 py-2 rounded-lg mt-4 w-full">
                No data to 
            </div>
        )}
    </table>
  )
}

export default Loans