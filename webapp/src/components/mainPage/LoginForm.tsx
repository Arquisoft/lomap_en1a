import { useState, useEffect} from "react";
import { Button, TextField, FormGroup } from "@material-ui/core";
import { login } from "../../api/api";
import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import type { AlertColor } from '@mui/material/Alert';

export type NotificationType = {
  severity: AlertColor,
  message: string;
}

export default function LoginForm():JSX.Element{
  const [idp, setIdp] = useState("https://inrupt.net");
  const [currentUrl, setCurrentUrl] = useState("http://localhost:3000/map");

  const [notificationStatus, setNotificationStatus] = useState(false);
  const [notification, setNotification] = useState<NotificationType>({ severity: 'warning', message: '' });


  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, [setCurrentUrl]);

  const handleLogin =async () => {
    {
      let supportedProviders = ["https://solidcommunity.net", "https://solidweb.org", "https://inrupt.net", "https://login.inrupt.com"];
      if (!supportedProviders.includes(idp)) {
        setNotificationStatus(true);
        setNotification({
          severity: 'warning',
          message: 'This provider is not supported.'
        });
      } else {
        await login(idp, currentUrl);
      /*await isLoggedIn().then(b => {
        props.setIsLoggedIn(b);
      });*/
      }
    }
  };

  return (
    <div className="centered-block text-area">
      <h1>Log in with your POD!</h1>
      <FormGroup className="login-form">
        <Grid container spacing={2} justifyContent="space-around">
          <TextField
            label="Identity Provider"
            placeholder="Identity Provider"
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
    </div >
  );

  function ProviderButton(props: { text: string, idp: string }) {
    return (
      <button className="btn-login" onClick={() => setIdp(props.idp)}>{props.text}</button>
    )
}
}

