import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

export default function About() {
  return (
    <>

      <Grid container className="centered-grid grid-text-area" spacing={3} justifyContent="space-around" 
            width={'80%'} height={'80%'} marginLeft={'auto'} marginRight={'auto'} padding={"1.5em 1em"}>
        <Grid item xs={12} textAlign={"center"}>
          <Box
              marginLeft="auto"
              marginRight="auto"
              height="10%"
              display="flex"
              justifyContent="center"
              flexDirection="column">
            <h1>Who are we?</h1>
          </Box>
          <Box
              marginLeft="auto"
              marginRight="auto"
              height="90%"
              display="flex"
              justifyContent="center"
              flexDirection="column">
            <p>
              We are a group of students from the University of Oviedo (UniOvi), from the Software Engineering degree.
              This app has been developed for the Software Architecture subject, whose goal is to help us practice working
              on big projects in teams composed by many people.
              <br/>
              <br/>
              Our team is made up from six programming beginners who are passionate about learning everything they can 
              about all the things related to software and computing, and this app is the result of all the hard work 
              and time we have spent over two months.
            </p>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}
