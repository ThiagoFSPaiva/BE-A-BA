import { useEffect, useState } from "react";
import { InsertUser } from "../../../../shared/dtos/InsertUser.dto";
import { useRequests } from "../../../../shared/hooks/useRequests";
import { URL_USER, URL_USER_ID } from "../../../../shared/constants/urls";
import { MethodsEnum } from "../../../../shared/enums/methods.enum";
import { UsuarioRoutesEnum } from "../routes";
import { useNavigate, useParams } from "react-router-dom";
import { UserTypeEnum } from "../../../../shared/enums/userType.enum";
import { useUserReducer } from "../../../../store/reducers/userReducer/useUserReducer";


const DEFAULT_USER = {
  name: '',
  cpf: '',
  email: '',
  matricula: '',
  password: '',
  typeUser: UserTypeEnum.User,
};


export const useUserInsert = () => {
  const navigate = useNavigate();
  const { request } = useRequests();
  const { userId } = useParams<{ userId: string }>();
  const [isEdit, setIsEdit] = useState(false);
  const { user: userReducer, setUser: setUserReducer } = useUserReducer();
  const [emailError, setEmailError] = useState(false);
  const [matriculaError, setMatriculaError] = useState(false);
  const [disabledButton, setDisabledButton] = useState(true);
  const [user, setUser] = useState<InsertUser>(DEFAULT_USER);


  useEffect(() => {
    if (user.cpf && user.email && user.name && user.matricula && user.typeUser) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [user]);


  useEffect(() => {
    if (userReducer) {
      setUser({
        name: userReducer.name,
        cpf: userReducer.cpf,
        email: userReducer.email,
        matricula: userReducer.matricula,
        password: '',
        typeUser: userReducer.typeUser
      });
    }
  }, [userReducer]);


  useEffect(() => {
    const findProduct = async () => {
      await request(
        URL_USER_ID.replace('{userId}', userId || ''),
        MethodsEnum.GET,
        setUserReducer,
      );
    };

    if (userId) {
      setIsEdit(true);
      findProduct();
    } else {
      setUserReducer(undefined);
      setUser(DEFAULT_USER);
    }
  }, [userId]);



  const handleOnChangeInput = (event: any, name: string) => {

    if (name === 'email') {
      if (!/\S+@\S+\.\S+/.test(event.target.value)) {
        setEmailError(true);
      } else {
        setEmailError(false);
      }
    }

    if (name === 'matricula') {
      if ((event.target.value.length !== 6)) {
        setMatriculaError(true)
      } else {
        setMatriculaError(false)
      }
    }

    setUser((currentUser) => ({
      ...currentUser,
      [name]: event.target.value,
    }));
  };


  const handleInsertUser = async () => {

    if (userId) {
      await request(
        URL_USER_ID.replace('{userId}', userId),
        MethodsEnum.PUT,
        undefined,
        user,
        'Usuário atualizado!'
      );
      navigate(UsuarioRoutesEnum.Usuario);
    } else {
      await request(URL_USER, MethodsEnum.POST, undefined, user, 'Usuário cadastrado!');
      navigate(UsuarioRoutesEnum.Usuario);
    }
  };


  return {
    isEdit,
    user,
    disabledButton,
    emailError,
    matriculaError,
    handleInsertUser,
    handleOnChangeInput,
  };
}