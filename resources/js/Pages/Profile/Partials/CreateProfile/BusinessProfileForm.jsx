import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';

const BusinessProfileForm = ({
    mustVerifyEmail,
    status,
    className = '',
}) => {

    const user = usePage().props.auth.user;

    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            registration_number: '',
            business_name: '',
            address: '',
            registration_certificate: null,
            user_id: user?.id,
            type:"business"
        });

    const submit = (e) => {
        e.preventDefault();

        post(route('account_profile.create'));
    };

  return (
    <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Business Information
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile information.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="registration_number" value="Business Registration Number" />
                    <TextInput
                        id="registration_number"
                        className="mt-1 block w-full"
                        value={data.registration_number}
                        onChange={(e) => setData('registration_number', e.target.value)}
                        required
                        isFocused
                        autoComplete="off"
                    />

                    <InputError className="mt-2" message={errors.registration_number} />
                </div>
                <div>
                    <InputLabel htmlFor="business_name" value="Business Name" />
                    <TextInput
                        id="business_name"
                        className="mt-1 block w-full"
                        value={data.business_name}
                        onChange={(e) => setData('business_name', e.target.value)}
                        required
                        isFocused
                        autoComplete="off"
                    />

                    <InputError className="mt-2" message={errors.business_name} />
                </div>
                <div>
                    <InputLabel htmlFor="address" value="Business Address" />
                    <TextInput
                        id="address"
                        className="mt-1 block w-full"
                        value={data.address}
                        onChange={(e) => setData('address', e.target.value)}
                        required
                        isFocused
                        autoComplete="off"
                    />

                    <InputError className="mt-2" message={errors.address} />
                </div>

                <div>
                    <InputLabel htmlFor="registration_certificate" value="Registration Certificate" />

                    <TextInput
                        id="registration_certificate"
                        type="file"
                        className="mt-1 block w-full p-1 border"
                        // value={data.registration_certificate}
                        onChange={(e) => setData('registration_certificate', e.target.files[0])}
                        required
                        autoComplete="off"
                    />

                    <InputError className="mt-2" message={errors.registration_certificate} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="mt-2 text-sm text-gray-800">
                            Your email address is unverified.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-sm font-medium text-green-600">
                                A new verification link has been sent to your
                                email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">
                            Saved.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
  )
}

export default BusinessProfileForm