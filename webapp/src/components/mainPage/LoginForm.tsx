import "../../App.css"
import Grid from '@mui/material/Grid';
import { useState, useEffect } from "react";
import { LoginButton } from "@inrupt/solid-ui-react";
import { Button, TextField, FormGroup, Container } from "@material-ui/core";
import { SessionProvider } from "@inrupt/solid-ui-react";

const LoginForm = () => {
  const [idp, setIdp] = useState("https://inrupt.net");
  const [currentUrl, setCurrentUrl] = useState("https://localhost:3000");

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, [setCurrentUrl]);

  return (
    <SessionProvider sessionId="log-in-example">
    <Container fixed className="login-container">
      <FormGroup>
        <Grid container className="centered-container">
          <Grid item xs={4}>
          <TextField
            label="Identity Provider"
            placeholder="Identity Provider"
            type="url"
            value={idp}
            onChange={(e) => setIdp(e.target.value)}
            InputProps={{
              endAdornment: (
                <LoginButton oidcIssuer={idp} redirectUrl={currentUrl}>
                  <Button variant="contained" color="primary">
                    Login
                    </Button>
                </LoginButton>
              ),
            }}
          />
          </Grid>
        </Grid>
      </FormGroup>
    </Container>
    </SessionProvider>

  );
}

export default LoginForm;