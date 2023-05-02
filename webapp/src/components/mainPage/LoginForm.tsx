/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import { TextField } from "@material-ui/core";
import { login } from "../../api/api";
import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useCookies } from "react-cookie";
import { NotificationType } from "../map/CommentForm";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export interface LoginFormProps {
  fail?: boolean;
}

export default function LoginForm(props: LoginFormProps): JSX.Element {
  const [cookies, setCookie] = useCookies();

  const [idp, setIdp] = useState("");
  const [currentUrl, setCurrentUrl] = useState("https://localhost:443/map");

  const [notificationStatus, setNotificationStatus] = useState(false);
  const [notification, setNotification] = useState<NotificationType>({ severity: 'warning', message: '' });


  useEffect(() => {
    if (props.fail != null && props.fail) {
      errorHandler("This provider is not supported.")
    }
    setCurrentUrl(window.location.href);
  }, [setCurrentUrl]);


  function errorHandler(message: string) {
    setNotificationStatus(true);
    setNotification({
      severity: 'warning',
      message: message
    })
  }

  const handleLogin = async () => {
    if (idp.trim().length === 0) {
      errorHandler("The provider cannot be empty.")
    } else {
      login(idp.trim(), currentUrl)
        .then(() => {
          setCookie('isLogged', 'true')
        })
    }
  };

  const handleLoginBtn = async (idp2: string) => {
    if (idp2.trim().length === 0) {
      errorHandler("The provider cannot be empty.")
    } else {
      login(idp2.trim(), currentUrl)
        .then(() => {
          setCookie('isLogged', 'true')
        })
    }
    login(idp2.trim(), currentUrl)
      .then(() => {
        setCookie('isLogged', 'true')
      })
  };

  return (
    <>
      <Grid container className="centered-grid grid-text-area" spacing={3} justifyContent="space-around"
        width={'80%'} height={'80%'} marginLeft={'auto'} marginRight={'auto'} padding={"0em 1em 1em 1em"}>
        <Grid item xs={12} textAlign={"center"}>
          <Box
            sx={{ height: '20%' }}
            display="flex"
            justifyContent="center"
            flexDirection="column">
            <h1>Log in with your POD!</h1>
          </Box>
          <Box
            sx={{ height: '80%' }}
            display="flex"
            justifyContent="center"
            flexDirection="column">
            <Grid container xs={12} spacing={1} justifyContent="space-around">
              <Grid item xs={8} textAlign={"center"}>
                <Box
                  sx={{ height: '25%' }}
                  display="flex"
                  justifyContent="center"
                  flexDirection="column">
                  <Grid container xs={9} spacing={2} justifyContent="space-around"
                    marginLeft={'auto'} marginRight={'auto'}>
                    <Grid item xs={10} textAlign={"center"}>
                      <Box
                        height="100%"
                        display="flex"
                        justifyContent="center"
                        flexDirection="column">
                        <TextField
                          style={{ width: '100%' }}
                          required
                          spellCheck={false}
                          multiline
                          fullWidth
                          label="Identity Provider"
                          placeholder="Write the link of your identity provider or choose one in the list"
                          type="url"
                          value={idp}
                          onChange={(e) => setIdp(e.target.value)}
                        />
                      </Box>

                    </Grid>
                    <Grid item xs={2} textAlign={"center"}>
                      <Box
                        height="100%"
                        width="100%"
                        display="flex"
                        justifyContent="center"
                        flexDirection="column">
                        <Button id="btn-Go" sx={{ height: '100%' }} variant="contained" type="submit" onClick={handleLogin} disabled={idp.length === 0}>
                          Go
                        </Button>
                        <Snackbar id="incorrect-Idp-Alert" open={notificationStatus} autoHideDuration={3000} onClose={() => { setNotificationStatus(false) }}>
                          <Alert severity={notification.severity} sx={{ width: '100%' }}>
                            {notification.message}
                          </Alert>
                        </Snackbar>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
                <Box
                  sx={{ height: '75%' }}
                  display="flex"
                  justifyContent="center"
                  flexDirection="column">
                  <Grid container xs={12} spacing={1} justifyContent="space-around"
                    width={'80%'} marginLeft={'auto'} marginRight={'auto'}>
                    <ProviderButton text="Solid Community" idp="https://solidcommunity.net"></ProviderButton>
                    <ProviderButton text="Solid Web" idp="https://solidweb.org"></ProviderButton>
                    <ProviderButton text="inrupt.net" idp="https://inrupt.net"></ProviderButton>
                    <ProviderButton text="pod.inrupt.com" idp="https://login.inrupt.com"></ProviderButton>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  );

  function ProviderButton(props: { text: string, idp: string }) {
    return (
      <Grid item xs={12} textAlign="center">
        <Box
          height="100%"
          display="flex"
          justifyContent="center"
          flexDirection="column">
          <button className="btn-login" onClick={() => {
            setIdp(props.idp);
            handleLoginBtn(props.idp);
          }}>
            {props.text}
          </button>
        </Box>
      </Grid>
    )
  }
}

