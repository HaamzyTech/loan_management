import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm } from '@inertiajs/react';

const LoanApplicationForm = ({className}) => {

    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            amount: '',
            repaymet_period: '',
        });

    const submit = (e) => {
        e.preventDefault();

        post(route('application.apply'));
    };

  return (
    <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Loan Application
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Apply for an loan amount less than K 500,000.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="amount" value="Loan Amount" />

                    <TextInput
                        id="amount"
                        type="number"
                        max="500000"
                        step="0.01"
                        className="mt-1 block w-full"
                        value={data.amount}
                        onChange={(e) => setData('amount', e.target.value)}
                        required
                        isFocused
                        autoComplete="amount"
                    />

                    <InputError className="mt-2" message={errors.amount} />
                </div>

                <div>
                    <InputLabel htmlFor="repaymet_period" value="Repayment Period" />

                    <select 
                        id="repaymet_period" 
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        value={data.repaymet_period}
                        onChange={(e) => setData('repaymet_period', e.target.value)}
                    >
                        <option>Select</option>
                        <option value="1">One (1) Month</option>
                        <option value="3">One (3) Months</option>
                        <option value="6">One (6) Months</option>
                        <option value="12">One (12) Months</option>
                    </select>

                    <InputError className="mt-2" message={errors.repaymet_period} />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Apply</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                        className="bg-green-200 px-4 py-2 w-full rounded-lg"
                    >
                        <p className="text-sm text-green-700">
                            Saved.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
  )
}

export default LoanApplicationForm