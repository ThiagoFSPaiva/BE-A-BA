import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks";
import { UserType } from "../../../modules/login/types/UserType";
import { setUserAction } from ".";

export const useGlobalReducer = () => {
    const dispatch = useDispatch();
    const { user } = useAppSelector(state => state.globalReducer);

    const setUser = (user: UserType) => {
        dispatch(setUserAction(user))
    }

    return {
        user,
        setUser
    }
}