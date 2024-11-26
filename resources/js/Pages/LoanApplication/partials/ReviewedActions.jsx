import Modal from '@/Components/Modal'
import PrimaryButton from '@/Components/PrimaryButton'
import { CheckSquare, X } from 'lucide-react'
import React from 'react'

const ReviewedActions = ({
    setApprove,
    setDecline,
    setRecord,
    record,
 }) => {
  return (
    <div className="flex items-center space-x-4">
        <PrimaryButton
            onClick={
                ()=>{
                    setRecord(record)
                    setApprove(true)
                }
            }
            className="space-x-2 bg-green-500"
        >
            <CheckSquare size={15} />
            <span>Approve</span>
        </PrimaryButton>


        <PrimaryButton
        onClick={
            ()=>{
                setRecord(record)
                setDecline(true)
            }
        }
            className="space-x-2 bg-red-500"
        >
            <X size={15} />
            <span>Decline</span>
        </PrimaryButton>
    </div>
  )
}

export default ReviewedActions