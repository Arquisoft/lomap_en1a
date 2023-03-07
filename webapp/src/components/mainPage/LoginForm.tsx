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
    <div className="login-div">
      <SessionProvider sessionId="log-in-example">
        <FormGroup className="login-form">
            <TextField
              label="Identity Provider"
              placeholder="Identity Provider"
              type="url"
              value={idp}
              onChange={(e) => setIdp(e.target.value)}
              InputProps={{
                endAdornment: (
                  <LoginButton oidcIssuer={idp} redirectUrl={currentUrl}>
                    <Button className="login-button" variant="contained" color="primary">
                      Login
                      </Button>
                  </LoginButton>
                ),
              }}
            />
        </FormGroup>
      </SessionProvider>
    </div>
  );
}

export default LoginForm;