import { useState, useEffect} from "react";
import { Button, TextField, FormGroup } from "@material-ui/core";
import { login } from "../../api/api";
import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useCookies } from "react-cookie";
import { NotificationType } from "../map/CommentForm";

export interface LoginFormProps {
  fail?:boolean;
}

export default function LoginForm(props:LoginFormProps):JSX.Element{
  const [cookies,setCookie] = useCookies();

  const [idp, setIdp] = useState("");
  const [currentUrl, setCurrentUrl] = useState("http://localhost:3000/map");

  const [notificationStatus, setNotificationStatus] = useState(false);
  const [notification, setNotification] = useState<NotificationType>({ severity: 'warning', message: '' });


  useEffect(() => {
    if (props.fail != null && props.fail) {
      errorHandler("This provider is not supported.")
    }
    setCurrentUrl(window.location.href);
  }, [setCurrentUrl]);


  function errorHandler(message:string) {
    setNotificationStatus(true);
    setNotification({
      severity: 'warning',
      message: message
    })
  }

  const handleLogin =async () => {
    if (idp.trim().length === 0) {
      errorHandler("The provider cannot be empty.")
    } else {
      login(idp.trim(), currentUrl)
      .then(()=>{
        setCookie('isLogged','true')
      })
    }
  };

  const handleLoginBtn =async (idp2:string) => {
    if (idp2.trim().length === 0) {
      errorHandler("The provider cannot be empty.")
    } else {
      login(idp2.trim(), currentUrl)
      .then(()=>{
        setCookie('isLogged','true')
      })
    }
    login(idp2.trim(), currentUrl)
      .then(()=>{
        setCookie('isLogged','true')
      })
  };

  return (
    <div className="centered-block text-area">
      <h1>Log in with your POD!</h1>
      <div className="login-div centered-block">
        <FormGroup className="login-form">
          <Grid container spacing={2} justifyContent="space-around">
            <TextField
              label="Identity Provider"
              placeholder="Write the link of your identity provider or choose one in the list"
              type="url"
              value={idp}
              onChange={(e) => setIdp(e.target.value)}
            />
            <Button id="btn-Go" variant="contained" type="submit" onClick={handleLogin}>
                Go
            </Button>
            <Snackbar id="incorrect-Idp-Alert" open={notificationStatus} autoHideDuration={3000} onClose={() => { setNotificationStatus(false) }}>
              <Alert severity={notification.severity} sx={{ width: '100%' }}>
                {notification.message}
              </Alert>
            </Snackbar>
          </Grid>
        </FormGroup>
        <div className="btn-group">
          <ProviderButton text="Solid Community" idp="https://solidcommunity.net"></ProviderButton>
          <ProviderButton text="Solid Web" idp="https://solidweb.org"></ProviderButton>
          <ProviderButton text="inrupt.net" idp="https://inrupt.net"></ProviderButton>
          <ProviderButton text="pod.inrupt.com" idp="https://login.inrupt.com"></ProviderButton>
        </div>
      </div>
    </div >
  );

  function ProviderButton(props: { text: string, idp: string }) {
    return (
      <button className="btn-login" onClick={() => {
        setIdp(props.idp);
        handleLoginBtn(props.idp);
      }}
      >{props.text}</button>
    )
}
}

