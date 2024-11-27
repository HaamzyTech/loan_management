import React from 'react'
import { SendIcon, SquarePenIcon } from 'lucide-react'
import PrimaryButton from '@/Components/PrimaryButton'

const SubmittedActions = ({record, setRecord,setEditCreateAccount, setCreateAccount, handleSubmit}) => {
  return (
    <div className='flex items-center space-x-4'>
        {record?.user?.loan_account !== null ? (
            <PrimaryButton
                // disabled={record?.user?.loan_account?.status === 'active'} 
                onClick={()=>{
                    setRecord(record?.user)
                    setEditCreateAccount(true)
                }}
                className={`space-x-2 ${record?.user?.loan_account?.status === 'active' ? 'bg-green-500' : 'bg-orange-500'}`}
            >
                <SquarePenIcon size={20} />
                <span>{record?.user?.loan_account?.status === 'active' ? 'Deactivate' :'Activate' }</span>
            </PrimaryButton>
        ):(
            <PrimaryButton 
                onClick={()=>{
                    setRecord(record.user)
                    setCreateAccount(true)
                }}
                className="space-x-2"
            >
                <SquarePenIcon size={15} />
                <span>Create ACC</span>
            </PrimaryButton>
        )}

        <PrimaryButton
            disabled={record?.user?.loan_account?.status === 'inactive'}
            className="space-x-2"
            onClick={()=>handleSubmit(record?.id)}
        >
            <SendIcon size={15} />
            <span>Submit</span>
        </PrimaryButton>
    </div>
  )
}

export default SubmittedActions