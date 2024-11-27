import PrimaryButton from '@/Components/PrimaryButton'
import React from 'react'

const UserTable = ({employees}) => {
    
  return (
    <table className="w-full mt-8 border rounded-lg">
        <thead>
            <tr className="w-full bg-gray-100 rounded-lg">
                <th className="p-4 text-start rounded">Name</th>
                <th className="p-4 text-start">National ID</th>
                <th className="p-4 text-start">Birth Date</th>
                <th className="p-4 text-start">Email</th>
                <th className="p-4 text-start">Action</th>
            </tr>
        </thead>
        {employees && employees.length > 0 ? (
            <tbody>
                {employees?.map((record)=>(
                    <tr className="border hover:bg-slate-50" key={record.id}>
                        <td className="p-4">
                        {record && 
                                `${record?.firstName } 
                                 ${record?.otherName ? 
                                    record?.otherName : ""
                                } ${record?.lastName}`}
                        </td>
                        <td className="p-4">{record.nrc}</td>
                        <td className="p-4">{record?.dob}</td>
                        <td className="p-4">{record?.user?.email}</td>
                        <td className="p-4">
                            <PrimaryButton>Edit</PrimaryButton>
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

export default UserTable