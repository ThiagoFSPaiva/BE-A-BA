import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks";
import { UserType } from "../../../modules/login/types/UserType";
import { setUsersAction } from ".";


export const useUserReducer = () => {
  const dispatch = useDispatch();
  const { users } = useAppSelector((state) => state.userReducer);

  const setUsers = (users: UserType[]) => {
    dispatch(setUsersAction(users));
  };

  return {
    users,
    setUsers,
  };
};