import { Typography,useTheme } from "@mui/material";
import { Header } from "../../../components/common/Header";
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';


export const UploadsPage = () => {

  const theme = useTheme();

  return (
    <Header title="Uploads" icon={<UploadFileOutlinedIcon sx={{color: theme.palette.primary.contrastText ,fontSize: 60}} />}>
    </Header>
    
  )
}

