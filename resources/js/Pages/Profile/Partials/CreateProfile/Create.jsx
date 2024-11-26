import React from 'react'
import { useQueryState } from 'nuqs'
import IndividualProfileForm from './IndividualProfileForm'
import BusinessProfileForm from './BusinessProfileForm'

const Create = ({className}) => {
    const [type, setType] = useQueryState('type')
    
    return (
        <div>
            <section className={className}>
                <header>
                    <h2 className="text-lg font-medium text-gray-900">
                        Profile Information
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Create your account's profile information Select individual if you are applying as an individual or.
                    </p>
                </header>
                <div className="flex items-center space-x-8 mt-8    ">
                    <button 
                        className={`border border-gray-400 px-4 py-2 rounded-lg w-full ${type === "individual" && "bg-indigo-400 text-white"}`} 
                        onClick={() => setType("individual")}
                    >
                        Create Individual Account
                    </button>
                    <button 
                        className={`border border-gray-400 px-4 py-2 rounded-lg w-full ${type === "business" && "bg-indigo-400 text-white"}`} 
                        onClick={() => setType("business")}
                    >
                        Create SME Account
                    </button>
                </div>

                <div className="mt-12">
                    {type && type === "individual"  && (
                        <IndividualProfileForm />
                    )}
                    {type && type === "business" && (
                        <BusinessProfileForm />
                    ) }
                </div>
            </section>
        </div>
    )
}

export default Create