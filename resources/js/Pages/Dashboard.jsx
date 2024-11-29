import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Banknote, Briefcase, User, Users } from 'lucide-react';

export default function Dashboard({ users,clients,disbursed }) {
    
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6">
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
                        <div className="overflow-hidden bg-indigo-500 text-white shadow-sm sm:rounded-lg p-6 col-span-1 flex items-center justify-between">
                            <div className="space-y-4">
                                <h4 className="font-semibold text-lg">Total Customers</h4>
                                <h2 className="font-medium text-2xl">{users}</h2>
                            </div>
                            <Users size={35}/>
                        </div>
                        <div className="overflow-hidden bg-blue-500 text-white shadow-sm sm:rounded-lg p-6 col-span-1 flex items-center justify-between">
                            <div className="space-y-4">
                                <h4 className="font-semibold text-lg">Individual Applicants</h4>
                                <h2 className="font-medium text-2xl">{clients && clients.find((client)=>client.type === 'individual').user_count || 0}</h2>
                            </div>
                            <User size={35}/>
                        </div>
                        <div className="overflow-hidden bg-orange-500 text-white shadow-sm sm:rounded-lg p-6 col-span-1 flex items-center justify-between">
                            <div className="space-y-4">
                                <h4 className="font-semibold text-lg">SME Applicants</h4>
                                <h2 className="font-medium text-2xl">{clients && clients.find((client)=>client.type === 'business').user_count || 0}</h2>
                            </div>
                            <Briefcase size={35}/>
                        </div>
                        <div className="overflow-hidden bg-green-500 text-white shadow-sm sm:rounded-lg p-6 col-span-1 flex items-center justify-between">
                            <div className="space-y-4">
                                <h4 className="font-semibold text-lg">Total Disbursed</h4>
                                <h2 className="font-medium text-2xl">K {disbursed}</h2>
                            </div>
                            <Banknote size={35}/>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
