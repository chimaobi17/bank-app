import { PublicMainBar } from '@/components/public-main-bar';
import { PublicTopBar } from '@/components/public-top-bar';
import type { AuthLayoutProps } from '@/types';

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    return (
        <div className="relative min-h-svh bg-[#050505] text-slate-200">
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <div className="absolute -left-[10%] -top-[25%] h-[70%] w-[70%] rounded-full bg-blue-600/10 blur-[120px]" />
                <div className="absolute -right-[5%] top-[20%] h-[50%] w-[50%] rounded-full bg-amber-600/5 blur-[100px]" />
            </div>

            <div className="relative z-10 flex min-h-svh flex-col">
                <PublicTopBar />
                <PublicMainBar />

                <main className="flex flex-1 items-center justify-center px-4 py-8 sm:px-6 sm:py-12 md:p-10">
                    <div className="w-full max-w-md">
                        <div className="flex flex-col gap-6 rounded-2xl border border-slate-900 bg-slate-900/20 p-6 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] sm:gap-8 sm:rounded-3xl sm:p-8">
                            <div className="space-y-2 text-center">
                                <h1 className="text-xl font-bold text-white sm:text-2xl">{title}</h1>
                                {description && (
                                    <p className="text-sm text-slate-400">{description}</p>
                                )}
                            </div>
                            {children}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
