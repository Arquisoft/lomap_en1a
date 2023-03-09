// Imports
import express, { Request, Response, Router } from "express";
// Use of solid-client-authn for login
import {
  handleIncomingRedirect,
  login,
  fetch,
  getDefaultSession,
} from "@inrupt/solid-client-authn-browser";
const {
  getSessionFromStorage,
  getSessionIdFromStorageAll,
  Session,
} = require("@inrupt/solid-client-authn-node");
import { getSolidDataset, saveSolidDatasetAt } from "@inrupt/solid-client";
import { randomUUID } from "crypto";
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");

// Fields
const api: Router = express.Router();

const appUrl: string = "http://localhost";
const handle: string = "/pod";
const port: string = ":5000";

// Used to include the JSON body parser
api.use(bodyParser.json());

// Accepted requests
// -----------------
api.get("/pod/test", async (req, res) => {
  return res.sendStatus(200);
});

let solidSession:typeof Session;

// --------------
// LOGIN
// --------------
api.get("/pod/login", async (req, res) => {loginFunc(req, res)});

api.post("/pod/login", async (req, res) => {loginFunc(req, res)});

async function loginFunc(req: Request, res: Response) {
  // Session object from solid. Set the internal ID
  solidSession = new Session(randomUUID());

  // Save in request the session ID
  console.log(`[INFO] Setting the sessionID field: ${solidSession.info.sessionId}`);
  req.body.sessionId = solidSession.info.sessionId;
  console.log(`[DEBUG] Session ID stored as: ${req.body.sessionId}`);
  // Get the IDP from the request
  // let idp:string = req.body.idp;
  let idp: string = "https://inrupt.net";

  await solidSession.login({
    // Once the result has been received, where to go next
    redirectUrl: `${appUrl}${port}${handle}/login-successful`,
    // IDP
    oidcIssuer: idp,
    // What to show to IDP when asking for permission
    clientName: "LoMap (en2a)",
    // Function that actually redirects to the IDP
    handleRedirect: (url: string) => res.redirect(url),
  });
}

// --------------
// LOGIN REDIRECT
// --------------
api.get(`${handle}/login-successful`, async (req, res) => {

  console.log(`[DEBUG] Request contents:`);
  for (var o in req.body){
    console.log(`   > ${o}`);
  }


  // Retrieve the session that the IDP provides to us once logged in
  const session = await getSessionFromStorage(req.body.sessionId);

  console.log(`[INFO] Recovered session from IDP. Returned from: ${req.url}`);
  console.log(`[INFO] Handling redirect: ${appUrl}${port}${req.url}`);
  await solidSession.handleIncomingRedirect(`${appUrl}${port}${req.url}`);

  if (solidSession.info.isLoggedIn) {
    return res.send(`<p>Logged in with the WebID ${solidSession.info.webId}.</p>`);
  }else{
    return res.status(500).send(`<p>A problem with the login has occurred. Please, revise the logs for further information.</p>`);
  }

  // Si llegamos aquí, ya estamos loggeados en la aplicación y podemos empezar a manejar el POD
});

api.get("/pod/fetch", async (req, res, next) => {
  if (typeof req.query["resource"] === "undefined") {
    res.send(
      "<p>Please pass the (encoded) URL of the Resource you want to fetch using `?resource=&lt;resource URL&gt;`.</p>"
    );
  }
  const session = await getSessionFromStorage(req.body.session.sessionId);
  console.log(await (await session.fetch(req.query["resource"])).text());
  res.send("<p>Performed authenticated fetch.</p>");
});

// --------------
// LOGOUT
// --------------
api.get("/pod/logout", async (req, res, next) => {
  const session = await getSessionFromStorage(req.body.session.sessionId);
  session.logout();
  res.send(`<p>Logged out.</p>`);
});

api.get("/pod", async (req, res, next) => {
  const sessionIds = await getSessionIdFromStorageAll();
  let ret:string = `<h1>Sessions:</h1>`;
  for (const sessionId in sessionIds) {
    ret += `<p>${sessionId}</p>`;
  }
  res.send(`${ret}<p>There are currently [${sessionIds.length}] visitors.</p>`);
});

// The following snippet ensures that the server identifies each user's session
// with a cookie using an express-specific mechanism
api.use(
  cookieSession({
    name: "session",
    // These keys are required by cookie-session to sign the cookies.
    keys: [
      "Required, but value not relevant for this demo - key1",
      "Required, but value not relevant for this demo - key2",
    ],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);

export default api;
