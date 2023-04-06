import { useState, useEffect } from "react";
import { Button, TextField, FormGroup} from "@material-ui/core";
import { login } from "../../api/api";

const LoginForm = () => {
  const [idp, setIdp] = useState("https://inrupt.net");
  const [currentUrl, setCurrentUrl] = useState("https://localhost:3000");

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, [setCurrentUrl]);

  return (
    <div className="login-div">
        <FormGroup className="login-form">
            <TextField
              label="Identity Provider"
              placeholder="Identity Provider"
              type="url"
              value={idp}
              onChange={(e) => setIdp(e.target.value)}
              InputProps={{
                endAdornment: (
                    <Button className="login-button" variant="contained" color="primary" onClick = {() => {login(idp, currentUrl)}}>
                      Login
                      </Button>
                ),
              }}
            />
        </FormGroup>
    </div>
  );
}

export default LoginForm;