import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { login } from '@/routes';
import { store } from '@/routes/register';

export default function Register() {
    return (
        <>
            <Head title="Sign Up" />
            <Form
                {...store.form()}
                resetOnSuccess={['password', 'password_confirmation', 'gov_id']}
                disableWhileProcessing
                className="flex flex-col gap-5"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="full_name">Full name</Label>
                                <Input
                                    id="full_name"
                                    name="full_name"
                                    type="text"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="name"
                                    placeholder="Jane Doe"
                                />
                                <InputError message={errors.full_name} />
                            </div>

                            <div className="grid gap-2 sm:grid-cols-2 sm:gap-3">
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        tabIndex={2}
                                        autoComplete="email"
                                        placeholder="you@example.com"
                                    />
                                    <InputError message={errors.email} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="phone">Phone</Label>
                                    <Input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        required
                                        tabIndex={3}
                                        autoComplete="tel"
                                        placeholder="+234 800 000 0000"
                                    />
                                    <InputError message={errors.phone} />
                                </div>
                            </div>

                            <div className="grid gap-2 sm:grid-cols-2 sm:gap-3">
                                <div className="grid gap-2">
                                    <Label htmlFor="dob">Date of birth</Label>
                                    <Input
                                        id="dob"
                                        name="dob"
                                        type="date"
                                        required
                                        tabIndex={4}
                                        autoComplete="bday"
                                    />
                                    <InputError message={errors.dob} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="nationality">Nationality</Label>
                                    <Input
                                        id="nationality"
                                        name="nationality"
                                        type="text"
                                        required
                                        tabIndex={5}
                                        autoComplete="country-name"
                                        placeholder="Nigerian"
                                    />
                                    <InputError message={errors.nationality} />
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="address">Residential address</Label>
                                <Input
                                    id="address"
                                    name="address"
                                    type="text"
                                    required
                                    tabIndex={6}
                                    autoComplete="street-address"
                                    placeholder="12 Marina, Lagos"
                                />
                                <InputError message={errors.address} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="gov_id">Government ID number</Label>
                                <Input
                                    id="gov_id"
                                    name="gov_id"
                                    type="text"
                                    required
                                    tabIndex={7}
                                    placeholder="NIN / Passport / Driver's license"
                                />
                                <InputError message={errors.gov_id} />
                                <p className="text-xs text-slate-500">Encrypted at rest. Used for KYC verification.</p>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username"
                                    name="username"
                                    type="text"
                                    required
                                    tabIndex={8}
                                    autoComplete="username"
                                    placeholder="jane_doe"
                                />
                                <InputError message={errors.username} />
                            </div>

                            <div className="grid gap-2 sm:grid-cols-2 sm:gap-3">
                                <div className="grid gap-2">
                                    <Label htmlFor="password">Password</Label>
                                    <PasswordInput
                                        id="password"
                                        name="password"
                                        required
                                        tabIndex={9}
                                        autoComplete="new-password"
                                        placeholder="Password"
                                    />
                                    <InputError message={errors.password} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="password_confirmation">Confirm</Label>
                                    <PasswordInput
                                        id="password_confirmation"
                                        name="password_confirmation"
                                        required
                                        tabIndex={10}
                                        autoComplete="new-password"
                                        placeholder="Confirm password"
                                    />
                                    <InputError message={errors.password_confirmation} />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="mt-2 w-full"
                                tabIndex={11}
                                disabled={processing}
                                data-test="register-user-button"
                            >
                                {processing && <Spinner />}
                                Create Account
                            </Button>
                        </div>

                        <div className="text-center text-sm text-muted-foreground">
                            Already have an account?{' '}
                            <TextLink href={login().url} tabIndex={12}>
                                Sign In
                            </TextLink>
                        </div>
                    </>
                )}
            </Form>
        </>
    );
}

Register.layout = {
    title: 'Open your account',
    description: 'KYC details are encrypted and never shared.',
};
