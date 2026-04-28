import { MapPin, Globe, Phone, Sun, Moon, Accessibility } from 'lucide-react';
import { useAppearance } from '@/hooks/use-appearance';

export function PublicTopBar() {
    const { resolvedAppearance, updateAppearance } = useAppearance();
    const isDark = resolvedAppearance === 'dark';

    return (
        <div className="hidden border-b border-slate-900/50 bg-black/40 text-slate-400 backdrop-blur-md md:block">
            <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-6 text-[11px] font-medium uppercase tracking-wider lg:px-12">
                <div className="flex items-center gap-6">
                    <a href="/#branches" className="flex items-center gap-1.5 hover:text-amber-500 transition-colors">
                        <MapPin className="h-3 w-3" />
                        Branch Locator
                    </a>
                    <a href="/#contact" className="flex items-center gap-1.5 hover:text-amber-500 transition-colors">
                        <Phone className="h-3 w-3" />
                        Contact
                    </a>
                </div>

                <div className="flex items-center gap-5">
                    <button
                        type="button"
                        onClick={() => updateAppearance(isDark ? 'light' : 'dark')}
                        className="flex items-center gap-1.5 hover:text-amber-500 transition-colors"
                        aria-label="Toggle theme"
                    >
                        {isDark ? <Sun className="h-3 w-3" /> : <Moon className="h-3 w-3" />}
                        {isDark ? 'Light' : 'Dark'} Mode
                    </button>

                    <span className="flex items-center gap-1.5">
                        <Globe className="h-3 w-3" />
                        EN / NGN
                    </span>

                    <span className="flex items-center gap-1.5" aria-label="Accessibility">
                        <Accessibility className="h-3 w-3" />
                        A11y
                    </span>
                </div>
            </div>
        </div>
    );
}
