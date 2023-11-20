import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks";
import { UserType } from "../../../modules/login/types/UserType";
import { setNotificationAction, setUserAction } from ".";
import { NotificationEnum } from "../../../shared/types/NotificationType";

export const useGlobalReducer = () => {
    const dispatch = useDispatch();
    const { user,notification } = useAppSelector(state => state.globalReducer);


    const setNotification = (message: string, type: NotificationEnum, description?: string) => {
        dispatch(
          setNotificationAction({
            message,
            type,
            description,
          }),
        );
      };
    const setUser = (user: UserType | undefined) => {
        dispatch(setUserAction(user))
    }

    return {
        user,
        setUser,
        notification,
        setNotification
    }
}