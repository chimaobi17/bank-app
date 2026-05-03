import { PublicMainBar } from '@/components/public-main-bar';
import { PublicTopBar } from '@/components/public-top-bar';
import type { AuthLayoutProps } from '@/types';

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    return (
        <div className="relative min-h-svh bg-[#000000] text-slate-200 selection:bg-purple-500/30">
            {/* Premium Background Elements */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <div className="absolute -left-[10%] -top-[10%] h-[60%] w-[60%] rounded-full bg-purple-600/20 blur-[120px] animate-shimmer" />
                <div className="absolute -right-[10%] bottom-[10%] h-[50%] w-[50%] rounded-full bg-blue-600/10 blur-[100px] animate-float" />
                <div className="absolute left-[30%] top-[40%] h-[30%] w-[30%] rounded-full bg-purple-900/10 blur-[80px]" />
            </div>

            <div className="relative z-10 flex min-h-svh flex-col">
                <PublicTopBar />
                <PublicMainBar />

                <main className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:p-12">
                    <div className="w-full max-w-md animate-float" style={{ animationDuration: '4s' }}>
                        <div className="glass-card flex flex-col gap-8 rounded-[2rem] p-8 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] border-white/5 relative overflow-hidden">
                            {/* Subtle Inner Glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                            
                            <div className="relative z-10 space-y-3 text-center">
                                <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                                    <span className="text-gradient-primary">{title}</span>
                                </h1>
                                {description && (
                                    <p className="text-sm text-slate-400 font-medium tracking-wide uppercase">{description}</p>
                                )}
                            </div>

                            <div className="relative z-10">
                                {children}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
