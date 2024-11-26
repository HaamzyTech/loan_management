import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';

const CreateAccountForm = ({className, user}) => {

    const { data, setData, post, errors, processing, recentlySuccessful } =
    useForm({
      account_number: '',
      status: '',
      user_id: user.id,
    });

    const submit = (e) => {
      e.preventDefault();

      post(route('account.create'));
    };
    return (
      <section className={className}>
        <header>
            <h2 className="text-lg font-medium text-gray-900">
                Create Account
            </h2>

            <p className="mt-1 text-sm text-gray-600">
                Create a loan account for the applicant.
            </p>
        </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="account_number" value="Account Number" />

                    <TextInput
                        id="account_number"
                        className="mt-1 block w-full"
                        value={data.account_number}
                        onChange={(e) => setData('account_number', e.target.value)}
                        required
                        isFocused
                        autoComplete="account_number"
                    />

                    <InputError className="mt-2" message={errors.account_number} />
                </div>

                <div>
                    <InputLabel htmlFor="status" value="Status" />

                    <select 
                        id="status" 
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        value={data.status}
                        onChange={(e) => setData('status', e.target.value)}
                    >
                        <option>Select</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>

                    <InputError className="mt-2" message={errors.status} />
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

export default CreateAccountForm