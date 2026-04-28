import { PublicFooter } from '@/components/public-footer';
import { PublicMainBar } from '@/components/public-main-bar';
import { PublicTopBar } from '@/components/public-top-bar';

interface Props {
    children: React.ReactNode;
    canRegister?: boolean;
    hideFooter?: boolean;
}

export default function PublicLayout({ children, canRegister = true, hideFooter = false }: Props) {
    return (
        <div className="relative min-h-screen bg-[#050505] text-slate-200 selection:bg-amber-500/30 selection:text-amber-200">
            {/* Ambient glow */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <div className="absolute -left-[10%] -top-[25%] h-[70%] w-[70%] rounded-full bg-blue-600/10 blur-[120px]" />
                <div className="absolute -right-[5%] top-[20%] h-[50%] w-[50%] rounded-full bg-amber-600/5 blur-[100px]" />
            </div>

            <div className="relative z-10 flex min-h-screen flex-col">
                <PublicTopBar />
                <PublicMainBar canRegister={canRegister} />

                <main className="flex-1">{children}</main>

                {!hideFooter && <PublicFooter />}
            </div>
        </div>
    );
}
