import Loader from "./Loader";
import { Button } from "./ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "./ui/dialog";

const Modal = ({
    handleOpen = false,
    title = "Modal Title",
    cancelText = "Close",
    submitText = "Save",
    isProcessing = false,
    handleSubmit,
    handleClose,
    children,
}) => {
    return (
        <>
            <Dialog open={handleOpen}>
                <DialogContent className="max-w-7xl">
                    {isProcessing && (
                        <div className="absolute inset-0 z-20 rounded-md bg-white/75 dark:bg-slate-800/75">
                            <Loader />
                        </div>
                    )}
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                        <DialogDescription></DialogDescription>
                    </DialogHeader>

                    {children}

                    <DialogFooter className="border-t border-input pt-4 mt-4">
                        <DialogClose asChild onClick={handleClose}>
                            <Button type="button" variant="outline">
                                {cancelText}
                            </Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button
                                type="submit"
                                onClick={handleSubmit}
                                disabled={isProcessing}
                            >
                                {submitText}
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default Modal;
