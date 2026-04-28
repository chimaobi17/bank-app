import { router } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import type { FlashToast } from '@/types/ui';

type FlashBag = {
    toast?: FlashToast;
    success?: string | null;
    error?: string | null;
};

/**
 * Surfaces flash messages as global sonner toasts.
 *
 * Runs inside the root `<Toaster>`, which is mounted as a sibling of `<App>`,
 * so it cannot use `usePage()` (no Inertia context). Instead, we subscribe to
 * the router's lifecycle events and read the page payload directly.
 *
 * Supported flash shapes set by controllers:
 *   1. `flash.toast = { type, message }` — explicit structured form.
 *   2. `flash.success = "…"` / `flash.error = "…"` — flat string form
 *      (used by most existing controllers).
 */
export function useFlashToast(): void {
    useEffect(() => {
        const emit = (flash: FlashBag | undefined) => {
            if (!flash) return;

            if (flash.toast) {
                toast[flash.toast.type](flash.toast.message);
            }
            if (flash.success) {
                toast.success(flash.success);
            }
            if (flash.error) {
                toast.error(flash.error);
            }
        };

        // Fire for flash values on the initial page load.
        const initialFlash = (router as unknown as { page?: { props?: { flash?: FlashBag } } })
            .page?.props?.flash;
        emit(initialFlash);

        // Fire for flash values after every successful navigation / form post.
        const off = router.on('success', (event) => {
            const page = (event as CustomEvent).detail?.page;
            emit(page?.props?.flash as FlashBag | undefined);
        });

        return off;
    }, []);
}
