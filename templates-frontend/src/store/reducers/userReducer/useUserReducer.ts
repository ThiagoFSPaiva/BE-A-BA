import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks";
import { UserType } from "../../../modules/login/types/UserType";
import { setUserAction, setUsersAction } from ".";


export const useUserReducer = () => {
  const dispatch = useDispatch();
  const { users,user } = useAppSelector((state) => state.userReducer);

  const setUsers = (users: UserType[]) => {
    dispatch(setUsersAction(users));
  };
  const setUser = (user: UserType | undefined) => {
    dispatch(setUserAction(user));
  };

  return {
    users,
    setUsers,
    user,
    setUser
  };
};