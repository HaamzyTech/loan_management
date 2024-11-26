import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import SearchInput from '@/Components/SearchInput';
import ApplicationsTable from './partials/ApplicationsTable';

const ManageApplications = ({applications,status}) => {
  return (
    <AuthenticatedLayout
              header={
                  <h2 className="text-xl font-semibold leading-tight text-gray-800">
                      Manage Applications
                  </h2>
              }
          >
            <Head title='Applications' />
            <div className="bg-white shadow sm:rounded-lg sm:p-8">
              <div className="flex items-center justify-between">
                <SearchInput placeholder={"Search by Name or Applicant ID"} route_path={'application.search'} />
                <div>
                  
                </div>
              </div>

              <div className="pt-8">
                <h2 className="text-lg font-medium text-gray-900">
                   Past Applications
                </h2>
                
                <ApplicationsTable user_applications={applications} status={status}/>
              </div>
            </div>
          </AuthenticatedLayout>
  )
}

export default ManageApplications