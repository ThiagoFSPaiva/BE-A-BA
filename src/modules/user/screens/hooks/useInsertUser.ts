import { useEffect, useState } from "react";
import { InsertUser } from "../../../../shared/dtos/InsertUser.dto";
import { useRequests } from "../../../../shared/hooks/useRequests";
import { URL_USER } from "../../../../shared/constants/urls";
import { MethodsEnum } from "../../../../shared/enums/methods.enum";
import { UsuarioRoutesEnum } from "../routes";
import { useNavigate } from "react-router-dom";
import { UserTypeEnum } from "../../../../shared/enums/userType.enum";

export const useUserInsert = () => {
    const navigate = useNavigate();
    const { request } = useRequests();
    const [emailError, setEmailError] = useState(false);
    const [disabledButton, setDisabledButton] = useState(true);
    const [user, setUser] = useState<InsertUser>({
        cpf: '',
        email: '',
        name: '',
        password: '',
        typeUser: UserTypeEnum.User,
      });


      useEffect(() => {
        if (user.cpf && user.email && user.name && user.password) {
          setDisabledButton(false);
        } else {
          setDisabledButton(true);
        }
      }, [user]);

      const handleOnChangeInput = (event: any , name: string) => {

        if (name === 'email') {
            if (!/\S+@\S+\.\S+/.test(event.target.value)) {
              setEmailError(true);
            } else {
              setEmailError(false);
            }
          }

        setUser((currentUser) => ({
          ...currentUser,
          [name]: event.target.value,
        }));
      };


      const handleInsertAdmin = async () => {
        
        request(URL_USER, MethodsEnum.POST, undefined, user,'Usuário cadastrado')
        .then((response) => {
            if (response) {
              navigate(UsuarioRoutesEnum.Usuario);
            }
        }).catch((erro) => erro)
      };


      return {
        user,
        disabledButton,
        emailError,
        handleInsertAdmin,
        handleOnChangeInput,
      };
}