import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';

const LoanRepaymentForm = ({className, credit}) => {

    const { data, setData, post, errors, processing, recentlySuccessful } =
    useForm({
      date: '',
      amount: '',
      credit_id: credit?.id,
    });

    const submit = (e) => {
      e.preventDefault();

      post(route('repayment.create'));
    };

  return (
    <section className={className}>
        <header>
            <h2 className="text-lg font-medium text-gray-900">
                Repayment
            </h2>

            <p className="mt-1 text-sm text-gray-600">
                Add a loan Repayment.
            </p>
        </header>
            <div className="my-6 space-y-3">
                <div className="grid grid-cols-2">
                    <span className="font-semibold">Client: </span>
                    <span>{credit?.account?.user?.name}</span>
                </div>
                <div className="grid grid-cols-2">
                    <span className="font-semibold">Email: </span>
                    <span>{credit?.account?.user?.email}</span>
                </div>
                <div className="grid grid-cols-2">
                    <span className="font-semibold">Loan Amount: </span>
                    <span>K {credit?.amount}</span>
                </div>
            </div>
            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="date" value="Date" />

                    <TextInput
                        id="date"
                        type="date"
                        className="mt-1 block w-full"
                        value={data.date}
                        onChange={(e) => setData('date', e.target.value)}
                        required
                        isFocused
                        autoComplete="date"
                    />

                    <InputError className="mt-2" message={errors.date} />
                </div>

                <div>
                    <InputLabel htmlFor="amount" value="Amount" />

                    <TextInput
                        id="amount"
                        type="number"
                        step="o.01"
                        min="1"
                        className="mt-1 block w-full"
                        value={data.amount}
                        onChange={(e) => setData('amount', e.target.value)}
                        required
                        isFocused
                        autoComplete="amount"
                    />

                    <InputError className="mt-2" message={errors.amount} />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

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

export default LoanRepaymentForm