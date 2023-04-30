import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

export default function Contact(){
    return (
        <>
          <Grid container className="centered-grid grid-text-area" spacing={3} justifyContent="space-around" 
            width={'80%'} height={'80%'} marginLeft={'auto'} marginRight={'auto'} padding={"1em 1em"}>
            <Grid item xs={12} textAlign={"center"}>
              <Box
                  marginLeft="auto"
                  marginRight="auto"
                  height="10%"
                  display="flex"
                  justifyContent="center"
                  flexDirection="column">
                <h1>Contact us!</h1>
              </Box>
              <Box
                  marginLeft="auto"
                  marginRight="auto"
                  height="90%"
                  display="flex"
                  justifyContent="center"
                  flexDirection="column">
                <p>
                  We are more than happy to answer any question you may have about this app. If you have any, please, do not 
                  hesitate to send a message to any of us! We are also willing to receive any kind of feedback, critic or suggestion 
                  you may think about.
                  <br/>
                  These are our contact emails:
                  <ul className="email">
                    <li>Vanesa Alonso Ramos: <a href="mailto:UO281801@uniovi.es">UO281801@uniovi.es</a></li>
                    <li>Álvaro González Erigoyen: <a href="mailto:UO282790@uniovi.es">UO282790@uniovi.es</a></li>
                    <li>Diego Moragón Merallo: <a href="mailto:UO284016@uniovi.es">UO284016@uniovi.es</a></li>
                    <li>Rubén del Rey Álvarez: <a href="mailto:UO282476@uniovi.es">UO282476@uniovi.es</a></li>
                    <li>Sergio del Rey Álvarez: <a href="mailto:UO282497@uniovi.es">UO282497@uniovi.es</a></li>
                    <li>Pablo Valdés Fernández: <a href="mailto:UO282655@uniovi.es">UO282655@uniovi.es</a></li>
                  </ul>
                </p>
              </Box>
            </Grid>
          </Grid>
        </>
      )
}
