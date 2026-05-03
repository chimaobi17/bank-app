import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';

type Props = {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
};

export default function Login({
    status,
    canResetPassword,
    canRegister,
}: Props) {
    return (
        <>
            <Head title="Sign In" />

            <Form
                {...store.form()}
                resetOnSuccess={['password']}
                className="flex flex-col gap-8"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-6">
                            <div className="grid gap-2.5">
                                <Label htmlFor="email" className="text-slate-300 ml-1">Email address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="email"
                                    placeholder="email@example.com"
                                    className="h-12 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:ring-purple-500/50 transition-all duration-300"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-2.5">
                                <div className="flex items-center ml-1">
                                    <Label htmlFor="password" title="Enter your password" row={false} className="text-slate-300">Password</Label>
                                    {canResetPassword && (
                                        <TextLink
                                            href={request().url}
                                            className="ml-auto text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors"
                                            tabIndex={5}
                                        >
                                            Forgot password?
                                        </TextLink>
                                    )}
                                </div>
                                <PasswordInput
                                    id="password"
                                    name="password"
                                    required
                                    tabIndex={2}
                                    autoComplete="current-password"
                                    placeholder="••••••••"
                                    className="h-12 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:ring-purple-500/50 transition-all duration-300"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="flex items-center space-x-3 ml-1">
                                <Checkbox
                                    id="remember"
                                    name="remember"
                                    tabIndex={3}
                                    className="border-white/20 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                                />
                                <Label htmlFor="remember" className="text-sm text-slate-400 font-normal">Remember me for 30 days</Label>
                            </div>

                            <Button
                                type="submit"
                                className="mt-4 h-12 w-full bg-premium-gradient hover:opacity-90 text-white font-bold text-lg rounded-xl shadow-[0_10px_20px_rgba(124,58,237,0.3)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] border-none"
                                tabIndex={4}
                                disabled={processing}
                                data-test="login-button"
                            >
                                {processing && <Spinner className="mr-2 h-5 w-5" />}
                                Sign In
                            </Button>
                        </div>

                        {canRegister && (
                            <div className="text-center text-sm text-slate-400 mt-2">
                                New to ApexBank?{' '}
                                <TextLink href={register().url} tabIndex={5} className="text-purple-400 font-bold hover:text-purple-300 transition-colors">
                                    Create Account
                                </TextLink>
                            </div>
                        )}
                    </>
                )}
            </Form>

            {status && (
                <div className="mb-4 text-center text-sm font-medium text-green-600">
                    {status}
                </div>
            )}
        </>
    );
}

Login.layout = {
    title: 'Log in to your account',
    description: 'Enter your email and password below to log in',
};
