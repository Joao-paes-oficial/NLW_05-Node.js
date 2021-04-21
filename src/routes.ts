import { Router } from "express";
import { MessagesControler } from "./controllers/MessagesController";
import { SettingsController } from "./controllers/SettingsController";
import { UsersController } from "./controllers/UsersController";


const routes = Router();

const settingsController = new SettingsController();
const usersController = new UsersController();
const messagesControler = new MessagesControler();

routes.post("/settings", settingsController.create);

routes.post("/users", usersController.create);

routes.post("/messages", messagesControler.create);
routes.post("/messages/:id", messagesControler.showByUser);

export { routes };