import { useState, useEffect } from "react";
import { Button, TextField, FormGroup } from "@material-ui/core";
import { getProfile, login } from "../../api/api";

const LoginForm = () => {
  const [idp, setIdp] = useState("https://inrupt.net");
  const [currentUrl, setCurrentUrl] = useState("http://localhost:3000/map");

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, [setCurrentUrl]);

  const handleLogin = () => {
    {
      login(idp, currentUrl);
      // getProfile().then(user => alert(user.username))
    }
  };

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
              <Button className="login-button" variant="contained" color="primary" onClick={handleLogin}>
                Login
              </Button>
            ),
          }}
        />
      </FormGroup>
    </div >
  );
}

export default LoginForm;