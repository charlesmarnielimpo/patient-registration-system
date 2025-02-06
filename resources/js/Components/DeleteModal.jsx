import { OctagonAlert, TriangleAlert } from "lucide-react";
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

const DeleteModal = ({
    handleOpen = false,
    title = "Modal Title",
    cancelText = "Close",
    submitText = "Save",
    variant = "default",
    isProcessing = false,
    handleSubmit,
    handleClose,
    data,
}) => {
    return (
        <>
            <Dialog open={handleOpen}>
                <DialogContent>
                    {isProcessing && (
                        <div className="absolute inset-0 z-20 rounded-md bg-white/75 dark:bg-slate-800/75">
                            <Loader />
                        </div>
                    )}
                    <DialogHeader className="sm:!text-center">
                        <div className="place-self-center border border-destructive/20 rounded-full p-4 bg-destructive/20 mb-3">
                            <OctagonAlert className="text-red-600 size-7" />
                        </div>
                        <DialogTitle>{title}</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete{" "}
                            <span className="font-semibold">{data}</span>? All
                            related data will be permanently removed.
                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter className="border-t border-input pt-4 mt-4">
                        <DialogClose
                            asChild
                            onClick={handleClose}
                            className="w-full"
                        >
                            <Button type="button" variant="outline">
                                {cancelText}
                            </Button>
                        </DialogClose>
                        <DialogClose asChild className="w-full">
                            <Button
                                variant={variant}
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

export default DeleteModal;
