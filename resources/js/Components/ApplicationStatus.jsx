import React from 'react'

const ApplicationStatus = ({status}) => {
    switch(status){
        case "submitted":
            return (<span className="bg-gray-100 text-gray-500 rounded-full px-6 py-1.5">{status}</span>)
        case "reviewed":
            return (<span className="bg-blue-100 text-blue-500 rounded-full px-6 py-1.5">{status}</span>)
        case "approved":
            return (<span className="bg-green-100 text-green-500 rounded-full px-6 py-1.5">{status}</span>)
        case "overdue":
          return(
            <div className="bg-orange-100 text-orange-500 rounded-full px-6 py-1.5">{status}</div>
          )
        case "rejected":
          return(
            <div className="bg-red-100 text-red-500 rounded-full px-6 py-1.5">{status}</div>
         )
    }
}

export default ApplicationStatus