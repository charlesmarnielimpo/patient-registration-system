import { useReducer } from "react";
import { useForm } from "@inertiajs/react";

export const useModalForm = (formDefaults) => {
    const formHandler = useForm(formDefaults);
    const [modal, setModal] = useReducer((current, update) => update, null);

    const clearForm = () => {
        formHandler.clearErrors();
        formHandler.reset();
    };

    const handleOpenModal = (modal, payload) => {
        clearForm();

        switch (modal) {
            case "create":
                break;
            case "edit":
                formHandler.setData(payload);
                break;
            case "delete":
                formHandler.setData(payload);
                break;
            case "view":
                formHandler.setData(payload);
                break;
            default:
                console.error("Invalid mode passed.");
                break;
        }

        setModal(modal);
    };

    const handleCloseModal = () => {
        clearForm();
        formHandler.setData(formDefaults);
        setModal(null);
    };

    return { formHandler, modal, handleOpenModal, handleCloseModal };
};
