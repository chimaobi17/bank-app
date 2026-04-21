import { Link, usePage } from '@inertiajs/react';
import { ArrowLeftRight, Banknote, Bell, CreditCard, LayoutGrid, PiggyBank, Receipt, ShieldCheck } from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import type { Auth, NavItem } from '@/types';

const mainNavItems: NavItem[] = [
    { title: 'Dashboard', href: '/dashboard', icon: LayoutGrid },
    { title: 'Accounts', href: '/banking/accounts', icon: PiggyBank },
    { title: 'Transfers', href: '/banking/transfers', icon: ArrowLeftRight },
    { title: 'Loans', href: '/banking/loans', icon: Banknote },
    { title: 'Payments', href: '/banking/payments', icon: Receipt },
    { title: 'Cards', href: '/banking/accounts', icon: CreditCard },
    { title: 'Notifications', href: '/banking/notifications', icon: Bell },
];

const adminNavItems: NavItem[] = [
    { title: 'Admin Dashboard', href: '/admin', icon: ShieldCheck },
    { title: 'Users', href: '/admin/users', icon: LayoutGrid },
    { title: 'Accounts', href: '/admin/accounts', icon: PiggyBank },
    { title: 'Loans', href: '/admin/loans', icon: Banknote },
    { title: 'Audit Log', href: '/admin/audit', icon: ShieldCheck },
];

export function AppSidebar() {
    const { auth } = usePage<{ auth: Auth }>().props;

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard().url} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
                {auth?.is_admin && (
                    <SidebarGroup>
                        <SidebarGroupLabel>Administration</SidebarGroupLabel>
                        <NavMain items={adminNavItems} />
                    </SidebarGroup>
                )}
            </SidebarContent>
        </Sidebar>
    );
}
