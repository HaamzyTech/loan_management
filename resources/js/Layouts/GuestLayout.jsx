import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-12 min-h-screen bg-gray-100">
            <div className="hidden  col-span-6 md:flex flex-col sm:justify-center items-center bg-white">
                <div>
                    <Link href="/">
                        <ApplicationLogo className="h-20 w-20 fill-current text-gray-500" />
                    </Link>
                </div>
            </div>
            
            <div className="col-span-1 md:col-span-6 flex flex-col sm:justify-center items-center  pt-6 sm:pt-0">
                <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">
                    <h2 className="font-semibold text-2xl text-center pb-6">JLP Loans</h2>
                    {children}
                </div>
            </div>
        </div>
    );
}
