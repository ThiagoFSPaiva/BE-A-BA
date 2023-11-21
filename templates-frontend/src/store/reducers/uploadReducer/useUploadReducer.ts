import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks";
import { setUploadsAction } from ".";
import { UploadType } from "../../../modules/Uploads/types/UploadType";


export const useUploadsReducer = () => {
  const dispatch = useDispatch();
  const { uploads } = useAppSelector((state) => state.uploadReducer);

  const setUploads = (uploads: UploadType[]) => {
    dispatch(setUploadsAction(uploads));
  };

  return {
    uploads,
    setUploads,
  };
};