import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-12 min-h-screen bg-gray-100">
            <div className="hidden  col-span-6 md:flex flex-col sm:justify-center items-center bg-white">
                <div className='w-2/3 flex flex-col items-center'>
                    {/* <Link href="/">
                        <ApplicationLogo className="h-20 w-20 fill-current text-gray-500" />
                    </Link> */}
                    <h2 className="pb-10 font-bold text-center text-xl">JLP Loans</h2>
                    <img src='images/money_pile.jpg' alt="JLP Loans" className="w-2/3 pb-8" />
                    <h2 className="font-bold text-center text-2xl">Justina Lombe Phiri</h2>
                    <h2 className="font-bold text-center text-2xl">Information and Communications University</h2>
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
