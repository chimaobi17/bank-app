import { Link } from '@inertiajs/react';
import { Landmark } from 'lucide-react';

const columns: Array<{ title: string; links: Array<{ label: string; href: string }> }> = [
    {
        title: 'Personal',
        links: [
            { label: 'Savings Account', href: '/#savings' },
            { label: 'Current Account', href: '/#current' },
            { label: 'Cards', href: '/#cards' },
            { label: 'Loans', href: '/#loans' },
        ],
    },
    {
        title: 'Business',
        links: [
            { label: 'SME Banking', href: '/#sme' },
            { label: 'Corporate', href: '/#corporate' },
            { label: 'Trade Finance', href: '/#trade' },
            { label: 'Cash Management', href: '/#cash' },
        ],
    },
    {
        title: 'Digital',
        links: [
            { label: 'Internet Banking', href: '/login' },
            { label: 'Mobile App', href: '/#mobile' },
            { label: 'USSD', href: '/#ussd' },
            { label: 'API', href: '/#api' },
        ],
    },
    {
        title: 'Company',
        links: [
            { label: 'About Us', href: '/#about' },
            { label: 'Careers', href: '/#careers' },
            { label: 'Investor Relations', href: '/#ir' },
            { label: 'Contact', href: '/#contact' },
        ],
    },
];

export function PublicFooter() {
    return (
        <footer className="border-t border-slate-900 bg-[#050505] text-slate-400">
            <div className="mx-auto max-w-7xl px-6 py-16 lg:px-12">
                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
                    <div className="lg:col-span-1">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 shadow-[0_0_20px_rgba(245,158,11,0.3)]">
                                <Landmark className="h-5 w-5 text-white" />
                            </div>
                            <span className="text-lg font-bold uppercase tracking-tight text-white">
                                Apex<span className="text-amber-500">Bank</span>
                            </span>
                        </Link>
                        <p className="mt-4 text-sm leading-relaxed text-slate-500">
                            Institutional-grade digital banking, built on an Oracle 21c core.
                        </p>
                    </div>

                    {columns.map((col) => (
                        <div key={col.title}>
                            <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-amber-500">
                                {col.title}
                            </h4>
                            <ul className="space-y-2">
                                {col.links.map((link) => (
                                    <li key={link.label}>
                                        <a
                                            href={link.href}
                                            className="text-sm text-slate-400 transition-colors hover:text-white"
                                        >
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="mt-12 flex flex-col gap-4 border-t border-slate-900 pt-8 text-xs text-slate-600 sm:flex-row sm:items-center sm:justify-between">
                    <div>&copy; {new Date().getFullYear()} ApexBank Systems Group. All rights reserved.</div>
                    <div className="flex gap-4">
                        <a href="/#privacy" className="hover:text-amber-500">Privacy</a>
                        <a href="/#terms" className="hover:text-amber-500">Terms</a>
                        <a href="/#security" className="hover:text-amber-500">Security</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
