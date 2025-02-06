import { useToast } from "@/hooks/use-toast";
import Modal from "@/Components/Modal";
import PatientBaseForm from "../PatientBaseForm";

const CreatePatientModal = ({
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

        formHandler.post(route("patients.store"), {
            onSuccess: () => {
                handleClose();

                toast({
                    title: "New Patient Added!",
                    description:
                        "A new patient has been successfully added to the system. You can now manage it within the platform.",
                });
            },
            onError: () => {
                toast({
                    title: "Oops!",
                    description: "Something went wrong. Please try again.",
                });
            },
        });
    };

    return (
        <Modal
            title="Create Patient"
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

export default CreatePatientModal;
