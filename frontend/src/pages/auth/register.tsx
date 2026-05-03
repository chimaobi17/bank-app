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
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-5">
                            <div className="grid gap-2">
                                <Label htmlFor="full_name" className="text-slate-300 ml-1 text-sm font-medium">Full Name</Label>
                                <Input
                                    id="full_name"
                                    name="full_name"
                                    type="text"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="name"
                                    placeholder="Jane Doe"
                                    className="h-11 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:ring-purple-500/50 transition-all duration-300"
                                />
                                <InputError message={errors.full_name} />
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="grid gap-2">
                                    <Label htmlFor="email" className="text-slate-300 ml-1 text-sm font-medium">Email Address</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        tabIndex={2}
                                        autoComplete="email"
                                        placeholder="you@example.com"
                                        className="h-11 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:ring-purple-500/50 transition-all duration-300"
                                    />
                                    <InputError message={errors.email} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="phone" className="text-slate-300 ml-1 text-sm font-medium">Phone Number</Label>
                                    <Input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        required
                                        tabIndex={3}
                                        autoComplete="tel"
                                        placeholder="+234 800 000 0000"
                                        className="h-11 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:ring-purple-500/50 transition-all duration-300"
                                    />
                                    <InputError message={errors.phone} />
                                </div>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="grid gap-2">
                                    <Label htmlFor="dob" className="text-slate-300 ml-1 text-sm font-medium">Date of Birth</Label>
                                    <Input
                                        id="dob"
                                        name="dob"
                                        type="date"
                                        required
                                        tabIndex={4}
                                        autoComplete="bday"
                                        className="h-11 bg-white/5 border-white/10 text-white focus:ring-purple-500/50 transition-all duration-300 [color-scheme:dark]"
                                    />
                                    <InputError message={errors.dob} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="nationality" className="text-slate-300 ml-1 text-sm font-medium">Nationality</Label>
                                    <Input
                                        id="nationality"
                                        name="nationality"
                                        type="text"
                                        required
                                        tabIndex={5}
                                        autoComplete="country-name"
                                        placeholder="Nigerian"
                                        className="h-11 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:ring-purple-500/50 transition-all duration-300"
                                    />
                                    <InputError message={errors.nationality} />
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="address" className="text-slate-300 ml-1 text-sm font-medium">Residential Address</Label>
                                <Input
                                    id="address"
                                    name="address"
                                    type="text"
                                    required
                                    tabIndex={6}
                                    autoComplete="street-address"
                                    placeholder="12 Marina, Lagos"
                                    className="h-11 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:ring-purple-500/50 transition-all duration-300"
                                />
                                <InputError message={errors.address} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="gov_id" className="text-slate-300 ml-1 text-sm font-medium">Government ID Number (NIN / BVN)</Label>
                                <Input
                                    id="gov_id"
                                    name="gov_id"
                                    type="text"
                                    required
                                    tabIndex={7}
                                    placeholder="Enter your identification number"
                                    className="h-11 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:ring-purple-500/50 transition-all duration-300"
                                />
                                <InputError message={errors.gov_id} />
                                <p className="text-[10px] text-slate-500 ml-1 italic tracking-wide">SECURELY ENCRYPTED VIA AES-256-GCM</p>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="username" className="text-slate-300 ml-1 text-sm font-medium">Username</Label>
                                <Input
                                    id="username"
                                    name="username"
                                    type="text"
                                    required
                                    tabIndex={8}
                                    autoComplete="username"
                                    placeholder="jane_doe"
                                    className="h-11 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:ring-purple-500/50 transition-all duration-300"
                                />
                                <InputError message={errors.username} />
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="grid gap-2">
                                    <Label htmlFor="password" row={false} className="text-slate-300 ml-1 text-sm font-medium">Create Password</Label>
                                    <PasswordInput
                                        id="password"
                                        name="password"
                                        required
                                        tabIndex={9}
                                        autoComplete="new-password"
                                        placeholder="••••••••"
                                        className="h-11 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:ring-purple-500/50 transition-all duration-300"
                                    />
                                    <InputError message={errors.password} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="password_confirmation" className="text-slate-300 ml-1 text-sm font-medium">Confirm</Label>
                                    <PasswordInput
                                        id="password_confirmation"
                                        name="password_confirmation"
                                        required
                                        tabIndex={10}
                                        autoComplete="new-password"
                                        placeholder="••••••••"
                                        className="h-11 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:ring-purple-500/50 transition-all duration-300"
                                    />
                                    <InputError message={errors.password_confirmation} />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="mt-4 h-12 w-full bg-premium-gradient hover:opacity-90 text-white font-bold text-lg rounded-xl shadow-[0_10px_20px_rgba(124,58,237,0.3)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] border-none"
                                tabIndex={11}
                                disabled={processing}
                                data-test="register-user-button"
                            >
                                {processing && <Spinner className="mr-2 h-5 w-5" />}
                                Open Account
                            </Button>
                        </div>

                        <div className="text-center text-sm text-slate-400 mt-2">
                            Already a member?{' '}
                            <TextLink href={login().url} tabIndex={12} className="text-purple-400 font-bold hover:text-purple-300 transition-colors">
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
