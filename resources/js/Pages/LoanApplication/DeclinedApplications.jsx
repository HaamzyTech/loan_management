import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import Table from '@/Components/Table';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import ApplicationsTable from './partials/ApplicationsTable';

const DeclinedApplications = ({applications}) => {
  return (
    <AuthenticatedLayout
              header={
                  <h2 className="text-xl font-semibold leading-tight text-gray-800">
                      Manage Applications
                  </h2>
              }
          >
            <Head title='Approve Applications' />
            <div className="bg-white shadow sm:rounded-lg sm:p-8">
              <div className="flex items-center justify-between">
                <TextInput 
                  placeholder="search"
                />
                <div>
                  {/* <PrimaryButton className="space-x-2" onClick={setCreateAccount}>
                    <Plus/> 
                    <span>Apply for Loan</span>
                  </PrimaryButton> */}
                  
                </div>
              </div>

              {/* <Modal show={createAccount} onClose={setCreateAccount}>
                <div className="bg-white rounded-lg p-8">
                  <LoanApplicationForm />
                </div>
              </Modal> */}

              <div className="pt-8">
                <h2 className="text-lg font-medium text-gray-900">
                   Declined Applications
                </h2>
                
                <ApplicationsTable user_applications={applications} />
              </div>
            </div>
          </AuthenticatedLayout>
  )
}

export default DeclinedApplications