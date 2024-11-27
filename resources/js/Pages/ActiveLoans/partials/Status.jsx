import React from 'react'

const Status = ({status}) => {
    switch(status){
        case "running":
            return (<span className="bg-blue-100 text-blue-500 rounded-full px-6 py-1.5 py">{status}</span>)
        case "closed":
            return (<span className="bg-green-100 text-green-500 rounded-full px-6 py-1.5 py">{status}</span>)
        case "overdue":
          return(
            <div className="bg-orange-100 text-orange-500 rounded-full px-6 py-1.5 py">{Status}</div>
          )
        case "danger":
          return(
            <div className="bg-red-100 text-red-500 rounded-full px-6 py-1.5 py">{Status}</div>
         )
    }
}

export default Status