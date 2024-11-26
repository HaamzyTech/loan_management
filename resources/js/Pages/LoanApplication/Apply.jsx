import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import Table from '@/Components/Table';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import LoanApplicationForm from './partials/LoanApplicationForm';
import SearchInput from '@/Components/SearchInput';

const Apply = ({applications, hasLoan}) => {
    
  const [modal,setModal] = useState(false)  

    return (
      <AuthenticatedLayout
              header={
                  <h2 className="text-xl font-semibold leading-tight text-gray-800">
                      Loan Application
                  </h2>
              }
          >
            <Head title='Apply' />
            <div className="bg-white shadow sm:rounded-lg sm:p-8">
              <div className="flex items-center justify-between">
                <SearchInput placeholder={"Search by amount"} route_path={'application.search'}/>
                <div>
                  <PrimaryButton 
                    disabled={hasLoan}
                    className="space-x-2" 
                    onClick={setModal}
                  >
                    <Plus/> 
                    <span>{hasLoan ? "Loan is Active" : "Apply for Loan"}</span>
                  </PrimaryButton>
                  
                </div>
              </div>

              <Modal show={modal} onClose={setModal}>
                <div className="bg-white rounded-lg p-8">
                  <LoanApplicationForm />
                </div>
              </Modal>

              <div className="pt-8">
                <h2 className="text-lg font-medium text-gray-900">
                   Past Applications
                </h2>
                
                <Table user_applications={applications}/>
              </div>
            </div>
          </AuthenticatedLayout>
    )
}

export default Apply