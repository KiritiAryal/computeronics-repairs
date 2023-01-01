import { ReactElement, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  openDialogAction,
  loginMenuClickedValueAction,
} from "../common/actions";
import { CUSTOMER } from "../../constants/appConstants";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";

export interface MultiActionAreaCardProps {
  image: string;
  title: string;
  description?: string;
  buttonText: string;
  path: string;
  buttonAction: () => void;
  name: string;
}
export default function MultiActionAreaCard({
  image,
  title,
  description,
  buttonText,
  path,
}: MultiActionAreaCardProps): ReactElement {
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.user);
  const navigate = useNavigate();
  const onClick = () => {
    if (userData?.data?._id) {
      navigate(path);
    } else {
      dispatch(loginMenuClickedValueAction(CUSTOMER));
      dispatch(openDialogAction(true));
    }
  };
  return (
    <Card sx={{ width: "400px", height: "500px", margin: "10px" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="280"
          image={image}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={onClick}>
          {buttonText}
        </Button>
      </CardActions>
    </Card>
  );
}
