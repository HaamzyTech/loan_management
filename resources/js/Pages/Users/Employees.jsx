import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import Table from '@/Components/Table';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import SearchInput from '@/Components/SearchInput';
import UserTable from './partials/UserTable';
import CreateUserForm from './partials/CreateUserForm';

const Employees = ({users, roles}) => {
    const [modal,setModal] = useState(false)
    return (
        <AuthenticatedLayout
              header={
                  <h2 className="text-xl font-semibold leading-tight text-gray-800">
                      Users
                  </h2>
              }
        >
            <Head title='Users' />

            <div className="bg-white shadow sm:rounded-lg sm:p-8">
              <div className="flex items-center justify-between">
                <SearchInput placeholder={"Search by name or id"} route_path={'application.search'}/>
                <div>
                  <PrimaryButton className="space-x-2" onClick={setModal}>
                    <Plus/> 
                    <span>Add User</span>
                  </PrimaryButton>
                  
                </div>
              </div>

              <Modal show={modal} onClose={setModal}>
                <div className="bg-white rounded-lg p-8">
                    <CreateUserForm roles={roles} />
                </div>
              </Modal>

              <div className="pt-8">
                <h2 className="text-lg font-medium text-gray-900">
                    Employees
                </h2>
                <UserTable employees={users} />
              </div>
            </div>
          </AuthenticatedLayout>
  )
}

export default Employees