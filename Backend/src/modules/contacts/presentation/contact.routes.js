import { Router } from "express";

export function createContactRouter(contactController) {
  const router = Router();

  router.post("/", contactController.create);

  router.get("/", contactController.search);

  router.get("/:id", contactController.getById);

  router.patch("/:id", contactController.update);

  router.delete("/:id", contactController.delete);

  return router;
}