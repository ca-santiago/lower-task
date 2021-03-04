import { Router } from "express";
import {createWorkspaceController} from ".";
import {authenticateRequest} from "./middlewares/authenticate";

const SpaceRouter = Router();

SpaceRouter.put('/',
	authenticateRequest,
  (req, res) => createWorkspaceController.execute(req, res)
)


export { SpaceRouter }
