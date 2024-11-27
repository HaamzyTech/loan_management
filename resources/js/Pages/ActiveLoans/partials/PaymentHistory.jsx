import { formatDate } from '@/lib/utils'
import React from 'react'

const PaymentHistory = ({className, credit}) => {
    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Repayment History
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Payment History for clients loan.
                </p>
            </header>

            <div className="my-6 space-y-2">
                <div className="grid grid-cols-2">
                    <span className="font-semibold">Client: </span>
                    <span>{credit?.account?.user?.name}</span>
                </div>
                <div className="grid grid-cols-2">
                    <span className="font-semibold">Email: </span>
                    <span>{credit?.account?.user?.email}</span>
                </div>
                <div className="grid grid-cols-2">
                    <span className="font-semibold">Loan Amount: </span>
                    <span>K {credit?.amount}</span>
                </div>
            </div>

            <div className="mt-6">
                <div className="grid grid-cols-2 border px-4 py-2 bg-gray-100 font-semibold">
                    <span>Date</span>
                    <span>Amount</span>
                </div>
                {credit?.repayments && credit?.repayments.map(record => (
                    <div className="grid grid-cols-2 border px-4 py-2">
                        <span>{formatDate(record.date)}</span>
                        <span>{record?.amount}</span>
                    </div>
                ))}
                <div className="grid grid-cols-2 px-4 py-2">
                    <span className="font-bold text-xl">Total</span>
                    <span className="font-bold text-xl">
                        {credit?.repayments?.reduce((sum, item) => sum + Number(item.amount), 0)}
                    </span>
                </div>
            </div>
        </section>  
    )
}

export default PaymentHistory