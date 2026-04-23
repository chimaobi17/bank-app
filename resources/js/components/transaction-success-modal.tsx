import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle } from 'lucide-react';
import { usePage, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function TransactionSuccessModal() {
    const { flash } = usePage().props as { flash: { success?: any; error?: any } };
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        if (flash?.success) {
            setTitle('Transaction Successful');
            setMessage(typeof flash.success === 'string' ? flash.success : JSON.stringify(flash.success));
            setIsError(false);
            setOpen(true);
        } else if (flash?.error) {
            setTitle('Transaction Failed');
            setMessage(typeof flash.error === 'string' ? flash.error : JSON.stringify(flash.error));
            setIsError(true);
            setOpen(true);
        }
    }, [flash]);

    const handleClose = () => {
        setOpen(false);
        // Clear flash so it doesn't pop up again when navigating back, optional depending on SSR vs CSR.
        // Usually handled by inertia passing new props.
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px] rounded-[2rem] border-border bg-card shadow-2xl p-6 text-center">
                <DialogHeader className="flex flex-col items-center justify-center space-y-4">
                    <div className={`p-4 rounded-full ${isError ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-500'}`}>
                        {isError ? <XCircle size={48} /> : <CheckCircle2 size={48} />}
                    </div>
                    <DialogTitle className="text-2xl font-black">{title}</DialogTitle>
                </DialogHeader>
                
                <div className="py-4">
                    <p className="text-muted-foreground text-sm font-medium">{message}</p>
                </div>

                <DialogFooter className="sm:justify-center">
                    <Button 
                        onClick={handleClose}
                        className={`w-full rounded-xl h-12 font-bold ${isError ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-amber-500 hover:bg-amber-600 text-black'}`}
                    >
                        Done
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
