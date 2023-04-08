import { useState, useEffect} from "react";
import { Button, TextField, FormGroup } from "@material-ui/core";
import { login } from "../../api/api";



export default function LoginForm():JSX.Element{
  const [idp, setIdp] = useState("https://inrupt.net");
  const [currentUrl, setCurrentUrl] = useState("http://localhost:3000/map");



  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, [setCurrentUrl]);

  const handleLogin =async () => {
    {
      await login(idp, currentUrl);
      /*await isLoggedIn().then(b => {
        props.setIsLoggedIn(b);
      });*/
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

