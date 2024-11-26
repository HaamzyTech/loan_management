import React, { useState } from 'react'
import PrimaryButton from './PrimaryButton'
import { SquarePenIcon } from 'lucide-react'
import Modal from './Modal'
import EditLoanApplicationForm from '@/Pages/LoanApplication/partials/EditLoanApplicationForm'
import { formatDate } from '@/lib/utils'

const Table = ({user_applications, status}) => {
    const [edit,setEdit] = useState(false)
    const [record,setRecord] = useState(null)
    
    return (
        <table className="w-full mt-8 border rounded-lg">
            <thead>
                <tr className="w-full bg-gray-100 rounded-lg">
                    <th className="p-4 text-start rounded">Application Date</th>
                    <th className="p-4 text-start">Applied Amount</th>
                    <th className="p-4 text-start">Application Status</th>
                    <th className="p-4 text-start">Action</th>
                </tr>
            </thead>
            <tbody className="">
                {user_applications && user_applications.map((record)=>(
                    <tr className="border hover:bg-slate-50" key={record.id}>
                        <td className="p-4">{formatDate(record.created_at)}</td>
                        <td className="p-4">{record.amount}</td>
                        <td className="p-4">{record.status}</td>
                        <td className="p-4">
                            <PrimaryButton 
                                disabled={record.status && record.status !== "submitted"}
                                onClick={()=>{
                                    setRecord(record);
                                    setEdit(true);
                                }}
                                className="space-x-2 bg-orange-500"
                            >
                                <SquarePenIcon size={15} />
                                <span>Edit Application</span>
                            </PrimaryButton>
                        </td>
                    </tr>
                ))}
            </tbody>
            <Modal show={edit} onClose={setEdit}>
                <div className="bg-white rounded-lg p-8">
                    <EditLoanApplicationForm record={record} />
                </div>
            </Modal>
        </table>
    )
}

export default Table