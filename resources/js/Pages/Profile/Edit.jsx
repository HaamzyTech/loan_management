import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import Create from './Partials/CreateProfile/Create';
import UpdateBusinessProfile from './Partials/UpdateProfile/UpdateBusinessProfile';
import UpdateIndividualProfile from './Partials/UpdateProfile/UpdatedIndividualProfile';

export default function Edit({ mustVerifyEmail, status, user_type, profile }) {

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Profile
                </h2>
            }
        >
            <Head title="Profile" />

            <div className="py-1">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    {profile === null ? 
                        (
                            <div className="bg-white shadow sm:rounded-lg sm:p-8">
                                <Create />
                            </div>
                        ):(
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                                <div className="col-span-1 md:col-span-6">
                                    <div className="bg-white p-4 shadow sm:rounded-lg sm;p-8">
                                        {user_type && user_type === 'business' && (<div>
                                            <UpdateBusinessProfile profile={profile} />
                                        </div>)}
                                        {user_type && user_type === 'individual' && (<div>
                                            <UpdateIndividualProfile profile={profile} />
                                        </div>)}
                                        {user_type && user_type === 'employee' && (<div>
                                            <UpdateIndividualProfile profile={profile} />
                                        </div>)}
                                    </div>
                                </div>
                                <div className="col-span-1 md:col-span-6 space-y-8">
                                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                                        <UpdateProfileInformationForm
                                            mustVerifyEmail={mustVerifyEmail}
                                            status={status}
                                            className="max-w-xl"
                                        />
                                    </div>
                                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                                        <UpdatePasswordForm className="max-w-xl" />
                                    </div>

                                </div>
                            </div>
                        )
                    }
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
