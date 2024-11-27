import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import SearchInput from '@/Components/SearchInput';
import Loans from './partials/Loans';
import LoanRepaymentForm from './partials/LoanRepaymentForm';
import PaymentHistory from './partials/PaymentHistory';

const PaidLoans = ({loans}) => {

    const [repayment,setRepayment] = useState(false)
    const [history, setHistory] = useState(false)
    const [selectedLoan, setSelectedLoan] = useState(null);
    return (
        <AuthenticatedLayout
              header={
                  <h2 className="text-xl font-semibold leading-tight text-gray-800">
                      Loans
                  </h2>
              }
        >
            <Head title='Users' />

            <div className="bg-white shadow sm:rounded-lg sm:p-8">
                <div className="flex items-center justify-between">
                    <SearchInput placeholder={"Search by name or id"} route_path={'application.search'}/>
                    <div>
                        {/* <PrimaryButton className="space-x-2" onClick={setModal}>
                            <Plus/> 
                            <span>Add User</span>
                        </PrimaryButton> */}
                        
                    </div>
                </div>

              {/* <Modal show={repayment} onClose={setRepayment}>
                <div className="bg-white rounded-lg p-8">
                    <LoanRepaymentForm credit={selectedLoan} />
                </div>
              </Modal> */}

              <Modal show={history} onClose={setHistory}>
                <div className="bg-white rounded-lg p-8">
                    <PaymentHistory credit={selectedLoan} />
                </div>
              </Modal>

              <div className="pt-8">
                <h2 className="text-lg font-medium text-gray-900">
                    Active Loans
                </h2>
                <Loans loans={loans} setRepayment={setRepayment} setSelectedLoan={setSelectedLoan} setHistory={setHistory} />
              </div>
            </div>
        </AuthenticatedLayout>
    )
}

export default PaidLoans