import React, { useState } from 'react'
import { SendIcon, SquarePenIcon } from 'lucide-react'
import PrimaryButton from '@/Components/PrimaryButton'
import Modal from '@/Components/Modal'
import { formatDate } from '@/lib/utils'
import CreateAccountForm from './CreateAccountForm'
import EditAccountForm from './EditAccountForm'
import { Inertia } from '@inertiajs/inertia';
import SubmittedActions from './SubmittedActions'
import ReviewedActions from './ReviewedActions'

const ApplicationsTable = ({user_applications,status}) => {
    const [createAccount,setCreateAccount] = useState(false)
    const [editCreateAccount,setEditCreateAccount] = useState(false)
    const [record,setRecord] = useState(null)
    const [approve,setApprove] = useState(false)
    const [decline,setDecline] = useState(false)

    const handleSubmit = (application_id) => {
        Inertia.patch(route('application.submit',{id:application_id}));
    }

    const handleApprove = (application_id)=>{
        Inertia.patch(route('application.approve',{id:application_id}));
    }

    const handleDecline = (application_id)=>{
        Inertia.patch(route('application.decline',{id:application_id}));
    }

  return (
    <table className="w-full mt-8 border rounded-lg">
            <thead>
                <tr className="w-full bg-gray-100 rounded-lg">
                    <th className="p-4 text-start rounded">Applicant</th>
                    <th className="p-4 text-start rounded">Applicant ID</th>
                    <th className="p-4 text-start rounded">Application Date</th>
                    <th className="p-4 text-start">Applied Amount</th>
                    <th className="p-4 text-start">Application Status</th>
                    <th className="p-4 text-start">Action</th>
                </tr>
            </thead>
            <tbody className="">
                {user_applications && user_applications.map((record)=>(
                    <tr className="border hover:bg-slate-50" key={record.id}>
                        <td className="p-4">
                            {record.user?.individual_profile && 
                                `${record.user.individual_profile.firstName } 
                                 ${record?.user?.individual_profile?.otherName ? 
                                    record?.user?.individual_profile?.otherName : ""
                                } ${record.user.individual_profile.lastName}`}
                            {record.user?.business_profile && record.user.business_profile !== null && 
                                `${record.user?.business_profile?.business_name}`
                            }
                        </td>
                        <td className="p-4">
                            {record.user?.individual_profile && 
                                `${record.user.individual_profile.nrc }
                            `}
                            {record.user?.business_profile && record.user.business_profile !== null && 
                                `${record.user?.business_profile?.registration_number}`
                            }
                        </td>
                        <td className="p-4">{formatDate(record.created_at)}</td>
                        <td className="p-4">{record.amount}</td>
                        <td className="p-4">{record.status}</td>
                        <td className="p-4">
                            {status && status === 'submitted' && (
                                <SubmittedActions 
                                    record={record} 
                                    setRecord={setRecord}
                                    setEditCreateAccount={setEditCreateAccount}
                                    setCreateAccount={setCreateAccount} 
                                    handleSubmit={handleSubmit} 
                                />
                            )}

                            {status && status === 'reviewed' && (
                                <ReviewedActions 
                                    setApprove={setApprove}
                                    setDecline={setDecline}
                                    setRecord={setRecord}
                                    record={record} 
                                />
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
            <Modal show={createAccount} onClose={setCreateAccount}>
                <div className="bg-white rounded-lg p-8">
                    <CreateAccountForm user={record} />
                </div>
            </Modal>
            <Modal show={editCreateAccount} onClose={setEditCreateAccount}>
                <div className="bg-white rounded-lg p-8">
                    <EditAccountForm user={record} />
                </div>
            </Modal>
            <Modal show={approve} onClose={setApprove}>
                <div className="bg-white ruonded-lg p-8">
                    <div className='grid grid-cols-2 border p-2 rounded-t-md'>
                       <strong>APPLICANT: </strong>
                       <p className="capitalize">
                            {record && record.user?.individual_profile && 
                                `${record.user.individual_profile.firstName } 
                                    ${record?.user?.individual_profile?.otherName ? 
                                    record?.user?.individual_profile?.otherName : ""
                                } ${record.user.individual_profile.lastName}`}
                            {record && record.user?.business_profile && record.user.business_profile !== null && 
                                `${record.user?.business_profile?.business_name}`
                            }
                       </p>
                    </div>
                    <div className='grid grid-cols-2 border p-2'>
                       <strong>APPLICANT-ID: </strong>
                       <p>
                            {record && record.user?.individual_profile && 
                                `${record.user.individual_profile.nrc }
                            `}
                            {record && record.user?.business_profile && record.user.business_profile !== null && 
                                `${record.user?.business_profile?.registration_number}`
                            }
                       </p>
                    </div>
                    <div className='grid grid-cols-2 border p-2'>
                       <strong>REPAYMENT: </strong>
                       <p>
                            {record && record.repaymet_period} Months
                       </p>
                    </div>
                    <div className='grid grid-cols-2 border p-2 rounded-b-md'>
                       <strong>AMOUNT: </strong>
                       <p>K {record && record.amount}</p>
                    </div>
                    <p className='mt-4'>you are about to approve this loan application are you sure you want to proceed?</p>
                    <div className="flex items-center space-x-4 mt-4">
                        <PrimaryButton
                            onClick={()=>{
                                handleApprove(record.id)
                            }}
                            className="bg-green-500"
                        >
                            Approve
                        </PrimaryButton>
                        <PrimaryButton
                            className="bg-transparent !border !border-gray-500 !text-gray-500"
                            onClick={()=>setApprove(false)}
                        >
                            Cancel
                        </PrimaryButton>
                    </div>
                </div>
            </Modal>
            <Modal show={decline} onClose={setDecline}>
            <div className="bg-white ruonded-lg p-8">
                    <div className='grid grid-cols-2 border p-2 rounded-t-md'>
                       <strong>APPLICANT: </strong>
                       <p className="capitalize">
                            {record && record.user?.individual_profile && 
                                `${record.user.individual_profile.firstName } 
                                    ${record?.user?.individual_profile?.otherName ? 
                                    record?.user?.individual_profile?.otherName : ""
                                } ${record.user.individual_profile.lastName}`}
                            {record && record.user?.business_profile && record.user.business_profile !== null && 
                                `${record.user?.business_profile?.business_name}`
                            }
                       </p>
                    </div>
                    <div className='grid grid-cols-2 border p-2'>
                       <strong>APPLICANT-ID: </strong>
                       <p>
                            {record && record.user?.individual_profile && 
                                `${record.user.individual_profile.nrc }
                            `}
                            {record && record.user?.business_profile && record.user.business_profile !== null && 
                                `${record.user?.business_profile?.registration_number}`
                            }
                       </p>
                    </div>
                    <div className='grid grid-cols-2 border p-2'>
                       <strong>REPAYMENT: </strong>
                       <p>
                            {record && record.repaymet_period} Months
                       </p>
                    </div>
                    <div className='grid grid-cols-2 border p-2 rounded-b-md'>
                       <strong>AMOUNT: </strong>
                       <p>K {record && record.amount}</p>
                    </div>
                    <p className='mt-4'>you are about to decline this loan application are you sure you want to proceed?</p>
                    <div className="flex items-center space-x-4 mt-4">
                        <PrimaryButton
                            onClick = {()=>{
                                handleDecline(record?.id)
                            }}
                            className="bg-red-500"
                        >
                            Decline
                        </PrimaryButton>
                        <PrimaryButton
                            className="bg-transparent !border !border-gray-500 !text-gray-500"
                            onClick={()=>setDecline(false)}
                        >
                            Cancel
                        </PrimaryButton>
                    </div>
                </div>
            </Modal>
        </table>
  )
}

export default ApplicationsTable