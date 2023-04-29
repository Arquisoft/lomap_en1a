import { Request, Response, Router } from "express";
import { PodManager } from "../repositories/pods/PodManager";
import { UserService } from "../business/user/UserService";
import { Factory } from "../Factory";
import { Assertion } from "../Assertion";
import { CommentRepository } from "../business/repositories/CommentRepository";

module.exports = function (api: Router) {
  //Log in into the pod
  api.get(
    "/login/:provider/:redirect",
    async (req: any, res: Response): Promise<void> => {
      try {
        Assertion.exists(req.params.provider, "A provider must be given");
        Assertion.exists(req.params.redirect, "A redirect url must be given");
        await PodManager.sessionManager.login(req, res);
      } catch (error) {
        console.log(error.message);
      }
    }
  );

  //Login redirect enpoint
  api.get(
    "/login/success",
    async (req: Request, res: Response): Promise<Response> => {
      try {
        return res.send(
          await PodManager.sessionManager.successfulLogin(req, res)
        );
      } catch (error) {
        console.log(error.message);
        return res
          .status(400)
          .send({ error: "There was an error while logging in." });
      }
    }
  );

  //Logout
  api.get("/logout", async (req: any, res: Response): Promise<Response> => {
    try {
      return res.send(await PodManager.sessionManager.logout(req, res));
    } catch (error) {
      console.log(error.message);
      return res
        .status(400)
        .send({ error: "There was an error while logging in." });
    }
  });

  //Profile
  api.get(
    "/profile/:webId",
    async (req: any, res: Response): Promise<Response> => {
      try {
        Assertion.exists(
          req.session.solidSessionId,
          "The user must be logged in."
        );
        Assertion.exists(req.params.webId, "A web id must be provided.");

        let sessionId: string = <string>req.session.solidSessionId;

        let webId = <string>req.params.webId;
        webId = decodeURIComponent(webId);

        let userService: UserService = Factory.services.getUserService();
        return res.send(await userService.getProfile(sessionId, webId));
      } catch (error) {
        console.log(error.message);
        return res.status(400).send({ error: "Profile could not be fetched" });
      }
    }
  );

  //Profile
  api.get("/profile", async (req: any, res: Response): Promise<Response> => {
    try {
      Assertion.exists(
        req.session.solidSessionId,
        "The user must be logged in."
      );

      let sessionId: string = <string>req.session.solidSessionId;
      let webId: string = "OWN";

      let userService: UserService = Factory.services.getUserService();

      return res.send(await userService.getProfile(sessionId, webId));
    } catch (error) {
      console.log(error.message);
      return res.status(400).send({ error: "Profile could not be fetched" });
    }
  });

  api.get(
    "/friends/:webId",
    async (req: any, res: Response): Promise<Response> => {
      try {
        Assertion.exists(
          req.session.solidSessionId,
          "The user must be logged in."
        );
        Assertion.exists(req.params.webId, "A web id must be provided.");

        let sessionId: string = <string>req.session.solidSessionId;
        let webId: string = <string>req.params.webId;
        webId = decodeURIComponent(webId);

        let userService: UserService = Factory.services.getUserService();

        return res.send(await userService.getFriends(sessionId, webId));
      } catch (error) {
        console.log(error.message);
        return res.status(400).send({ error: "Friends could not be fetched" });
      }
    }
  );

  api.get("/isLogged", async (req: any, res: Response) => {
    try {
      let sessionId: string = <string>req.session.solidSessionId;

      let userService: UserService = Factory.services.getUserService();

      return res.send(await userService.isLoggedIn(sessionId));
    } catch (error) {
      console.log(error.message);
      return res.status(400).send({
        error: "There was an error while checking if the user is logged in",
      });
    }
  });

  api.post("/users/friends/add", async (req: any, res: Response) => {
    try {
      let sessionId: string = <string>req.session.solidSessionId;
      let webId = req.body.webId;

      let userService: UserService = Factory.services.getUserService();

      return res.send(await userService.addFriend(sessionId, webId));
    } catch (error) {
      console.log(error.message);
      return res
        .status(400)
        .send({ error: "There was an error while adding a friend" });
    }
  });

  api.post("/users/share", async (req: any, res: Response) => {
    try {
      let sessionId: string = <string>req.session.solidSessionId;

      let userService: UserService = Factory.services.getUserService();

      return res.send(await userService.sharePublicPlaces(sessionId));
    } catch (error) {
      console.log(error.message);
      return res.status(400).send({
        error: "There was an error while checking if the user is logged in",
      });
    }
  });

  api.get("/users/public", async (req: any, res: Response) => {
    try {
      let sessionId: string = <string>req.session.solidSessionId;

      let userService: UserService = Factory.services.getUserService();

      return res.send(await userService.getPublicUsers(sessionId));
    } catch (error) {
      console.log(error.message);
      return res.status(400).send({
        error: "There was an error while checking if the user is logged in",
      });
    }
  });

  api.get("/users/request", async (req: any, res: Response) => {
    try {
      let sessionId: string = <string>req.session.solidSessionId;

      let userService: UserService = Factory.services.getUserService();

      return res.send(await userService.getFriendRequests(sessionId));
    } catch (error) {
      console.log(error.message);
      return res.status(400).send({
        error: "There was an error while checking if the user is logged in",
      });
    }
  });

  // api.get("/test", async (req: any, res: Response) => {
  //   try {
  //     let sessionId: string = <string>req.session.solidSessionId;

  //     let commentRepository: CommentRepository =
  //       Factory.repositories.getCommentRepository();

  //     let response = await commentRepository.findByPlace(
  //       sessionId,
  //       "063c7f35-713c-4617-9e0a-9b0cb2fb6f35"
  //     );

  //     return res.send(response);
  //   } catch (error) {
  //     console.log(error.message);
  //     return res.status(400).send({ error: "There was an error" });
  //   }
  // });
};
