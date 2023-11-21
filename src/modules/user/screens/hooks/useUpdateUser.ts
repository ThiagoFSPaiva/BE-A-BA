import { useEffect, useState } from "react";
import { useGlobalReducer } from "../../../../store/reducers/globalReducer/useGlobalReducer";
import { UpdatePassword } from "../../../../shared/dtos/UpdatePassword.dto";
import { useRequests } from "../../../../shared/hooks/useRequests";
import { URL_USER } from "../../../../shared/constants/urls";
import { MethodsEnum } from "../../../../shared/enums/methods.enum";
import { useTheme } from "@mui/material";
import Swal from "sweetalert2";
import { connectionAPIPatch } from "../../../../shared/functions/connection/connectionAPI";


const DEFAULT_UPDATE = {
    password: '',
    newPassword: '',
}


export const useUpdateUser = () => {
    const [changePasswordModalOpen, setChangePasswordModalOpen] = useState(false);
    const [changeProfileModalOpen, setChangeProfileModalOpen] = useState(false);
    const theme = useTheme()
    const [disabledButton, setDisabledButton] = useState(true);
    const [errorPassword, setErrorPassword] = useState(false);
    const { setNotification } = useGlobalReducer();
    const [updatePassword, setUpdatePassword] = useState<UpdatePassword>(DEFAULT_UPDATE);


    useEffect(() => {
        if (updatePassword.password && updatePassword.newPassword) {
            setDisabledButton(false);
        } else {
            setDisabledButton(true);
        }
    }, [updatePassword]);


    const handleOnChangeInput = (event: any, name: string) => {
        setUpdatePassword((currentUser) => ({
            ...currentUser,
            [name]: event.target.value,
        }));
    };


    const handleOpenChangePasswordModal = () => {
        setChangePasswordModalOpen(true);
    };

    const handleUpdatePassword = () => {
        connectionAPIPatch(URL_USER, updatePassword)
            .then(response => {
                setErrorPassword(false)
                setChangePasswordModalOpen(false);
                Swal.fire({
                    icon: "success",
                    title: "Senha alterada!",
                    color: theme.palette.text.primary,
                    background: theme.palette.background.paper,
                    confirmButtonColor: `${theme.palette.primary.main}`,
                    customClass: {
                        popup: 'swal-popup',
                    }
                });
            })
            .catch(error => {
                setErrorPassword(true)
                setNotification(error.message, 'error')

            });
    };


    const handleCloseChangePasswordModal = () => {
        setChangePasswordModalOpen(false);
        setErrorPassword(false)
        setUpdatePassword(DEFAULT_UPDATE)

    };

    const handleOpenChangeProfileModal = () => {
        setChangeProfileModalOpen(true);
    };

    const handleCloseChangeProfileModal = () => {
        setChangeProfileModalOpen(false);
    };

    return {
        errorPassword,
        disabledButton,
        updatePassword,
        changePasswordModalOpen,
        handleOnChangeInput,
        handleUpdatePassword,
        handleCloseChangePasswordModal,
        handleOpenChangePasswordModal
    }
}