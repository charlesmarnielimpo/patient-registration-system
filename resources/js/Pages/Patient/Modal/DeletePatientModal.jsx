import { useToast } from "@/hooks/use-toast";
import DeleteModal from "@/Components/DeleteModal";

const DeletePatientModal = ({ handleOpenModal, handleClose, formHandler }) => {
    const { toast } = useToast();

    const handleSubmit = (e) => {
        e.preventDefault();

        formHandler.delete(
            route("patients.destroy", { patient: formHandler.data.id }),
            {
                onSuccess: () => {
                    handleClose();

                    toast({
                        title: "Patient Removed!",
                        description:
                            "The patient has been successfully deleted from the system. All associated records have been erased.",
                    });
                },
                onError: () => {
                    toast({
                        title: "Oops!",
                        description: "Something went wrong. Please try again.",
                    });
                },
            }
        );
    };

    return (
        <DeleteModal
            title="Delete Patient"
            submitText="Yes, Im sure!"
            variant="destructive"
            handleSubmit={handleSubmit}
            handleOpen={handleOpenModal}
            handleClose={handleClose}
            isProcessing={formHandler.processing}
            data={formHandler.data.complete_name}
        />
    );
};

export default DeletePatientModal;
