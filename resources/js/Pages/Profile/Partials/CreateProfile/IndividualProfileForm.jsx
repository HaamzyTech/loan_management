import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';

const IndividualProfileForm = ({
    mustVerifyEmail,
    status,
    className = '',
}) => {

    const user = usePage().props.auth.user;

    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            firstName: '',
            lastName: '',
            otherName: '',
            nrc:'',
            dob:'',
            nationality:'Zambian',
            gender:'',
            user_id: user?.id,
            type:"individual",
            nrc_front:null,
            nrc_back:null
        });

    const submit = (e) => {
        e.preventDefault();

        post(route('account_profile.create'));
    };

  return (
    <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Personal Information
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile information.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="firstName" value="First Name" />

                    <TextInput
                        id="firstName"
                        className="mt-1 block w-full"
                        value={data.firstName}
                        onChange={(e) => setData('firstName', e.target.value)}
                        required
                        isFocused
                        autoComplete="firstName"
                    />

                    <InputError className="mt-2" message={errors.firstName} />
                </div>
                <div>
                    <InputLabel htmlFor="lastName" value="Last Name" />

                    <TextInput
                        id="lastName"
                        className="mt-1 block w-full"
                        value={data.lastName}
                        onChange={(e) => setData('lastName', e.target.value)}
                        required
                        isFocused
                        autoComplete="lastName"
                    />

                    <InputError className="mt-2" message={errors.lastName} />
                </div>
                <div>
                    <InputLabel htmlFor="otherName" value="Other Name" />

                    <TextInput
                        id="otherName"
                        className="mt-1 block w-full"
                        value={data.otherName}
                        onChange={(e) => setData('otherName', e.target.value)}
                        isFocused
                        autoComplete="otherName"
                    />

                    <InputError className="mt-2" message={errors.otherName} />
                </div>
                <div>
                    <InputLabel htmlFor="dob" value="Date of Birth" />

                    <TextInput
                        id="dob"
                        type="date"
                        className="mt-1 block w-full"
                        value={data.dob}
                        onChange={(e) => setData('dob', e.target.value)}
                        required
                        isFocused
                        autoComplete="dob"
                    />

                    <InputError className="mt-2" message={errors.dob} />
                </div>
                <div>
                    <InputLabel htmlFor="nrc" value="NRC Number" />

                    <TextInput
                        id="nrc"
                        className="mt-1 block w-full"
                        value={data.nrc}
                        onChange={(e) => setData('nrc', e.target.value)}
                        required
                        isFocused
                        autoComplete="nrc"
                    />

                    <InputError className="mt-2" message={errors.nrc} />
                </div>
                <div>
                    <InputLabel htmlFor="nationality" value="Nationality" />

                    <TextInput
                        id="nationality"
                        disabled={true}
                        className="mt-1 block w-full"
                        value={data.nationality}
                        onChange={(e) => setData('nationality', e.target.value)}
                        required
                        isFocused
                        autoComplete="nationality"
                    />

                    <InputError className="mt-2" message={errors.nationality} />
                </div>
                <div>
                    <InputLabel htmlFor="gender" value="Gender" />

                    <select 
                        id="gender" 
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        value={data.gender}
                        onChange={(e) => setData('gender', e.target.value)}
                    >
                        <option>Select</option>
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                    </select>
                    {/* <TextInput
                        id="gender"
                        className="mt-1 block w-full"
                        value={data.gender}
                        onChange={(e) => setData('gender', e.target.value)}
                        required
                        isFocused
                        autoComplete="gender"
                    /> */}

                    <InputError className="mt-2" message={errors.gender} />
                </div>

                <div>
                    <InputLabel htmlFor="nrc_front" value="NRC Front" />

                    <TextInput
                        id="nrc_front"
                        type="file"
                        className="mt-1 block w-full p-1 border"
                        onChange={(e) => setData('nrc_front', e.target.files[0])}
                        required
                        autoComplete="off"
                    />

                    <InputError className="mt-2" message={errors.nrc_front} />
                </div>
                <div>
                    <InputLabel htmlFor="nrc_back" value="NRC Back" />

                    <TextInput
                        id="nrc_back"
                        type="file"
                        className="mt-1 block w-full p-1 border"
                        onChange={(e) => setData('nrc_back', e.target.files[0])}
                        required
                        autoComplete="off"
                    />

                    <InputError className="mt-2" message={errors.nrc_back} />
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

                        {/* {status === 'verification-link-sent' && (
                            <div className="mt-2 text-sm font-medium text-green-600">
                                A new verification link has been sent to your
                                email address.
                            </div>
                        )} */}
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

export default IndividualProfileForm