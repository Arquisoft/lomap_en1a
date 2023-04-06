export default function Contact(){
    return (
        <>
          <div className="centered-block text-area">
            <h1>Contact us!</h1>
            <p>
              We are more than happy to answer any question you may have about this app. If you have any, please, do not 
              hesitate to send a message to any of us! We are also willing to receive any kind of feedback, critic or suggestion 
              you may think about.
              <br/>
              <br/>
              These are our contact emails:
              <ul className="email">
                <li>Vanesa Alonso Ramos: <div>uo281801@uniovi.es</div></li>
                <li>Álvaro González Erigoyen: <div>uo282790@uniovi.es</div></li>
                <li>Diego Moragón Merallo: <div>uo284016@uniovi.es</div></li>
                <li>Rubén del Rey Álvarez: <div>uo282497@uniovi.es</div></li> {/* TODO: Change email */}
                <li>Sergio del Rey Álvarez: <div>uo282497@uniovi.es</div></li>
                <li>Pablo Valdés Fernández: <div>uo282655@uniovi.es</div></li>
              </ul>
              We are looking forward to receive your message!
            </p>
          </div>
        </>
      )
}
