import { Application } from "egg";

export default (app: Application) => {
  const { controller, router } = app;

  router.get("/", controller.home.index);
  router.post("/subscription/add", controller.subscription.add);
  router.get("/subscription/send", controller.subscription.send);
};
