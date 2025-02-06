import { useToast } from "@/hooks/use-toast";
import Modal from "@/Components/Modal";
import PatientBaseForm from "../PatientBaseForm";

const EditPatientModal = ({
    handleOpenModal,
    handleClose,
    formHandler,
    prefixes,
    suffixes,
    sexes,
    civilStatuses,
    educationalAttainments,
    bloodTypes,
    employmentStatuses,
}) => {
    const { toast } = useToast();

    const handleSubmit = (e) => {
        e.preventDefault();

        formHandler.put(
            route("patients.update", { patient: formHandler.data.id }),
            {
                onSuccess: () => {
                    handleClose();

                    toast({
                        title: "Changes Applied!",
                        description:
                            "Patient has been updated with the latest changes. Have a great experience!",
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
        <Modal
            title="Edit Patient"
            submitText="Update"
            handleSubmit={handleSubmit}
            handleOpen={handleOpenModal}
            handleClose={handleClose}
            isProcessing={formHandler.processing}
        >
            <form onSubmit={handleSubmit}>
                <PatientBaseForm
                    formHandler={formHandler}
                    prefixes={prefixes}
                    suffixes={suffixes}
                    sexes={sexes}
                    civilStatuses={civilStatuses}
                    educationalAttainments={educationalAttainments}
                    bloodTypes={bloodTypes}
                    employmentStatuses={employmentStatuses}
                />
            </form>
        </Modal>
    );
};

export default EditPatientModal;
