import { Controller } from "egg";
import { ResponseFailed, responseSuccess } from "../utils/response";
import * as webPush from "web-push";

const publicKey =
  "BJ3VZdhuXTM2VDHD8QN_48drusn_eAW5GVPViTT2s-y3V4TkbNfw1mH9mr5UmXWTa0Rb26fqe6durpJh2vxmlRQ";
const privateKey = "Rke_9FQRND0lKomWe4OuI7tmvCoGTe6bwoMv-hLAwxE";
const gcmAPIKey = "AIzaSyDap_NkX4ux_rACyjF2knh0FmH-dsyj0R0";

const suscriptions: Array<any> = [];

export default class Subscription extends Controller {
  public async add() {
    try {
      const { subscription } = this.ctx.request.body;
      const targetSubscription = JSON.parse(subscription);
      suscriptions.push(targetSubscription);
    } catch (e) {
      return new ResponseFailed(this.ctx).default({ message: e.message });
    }
    responseSuccess(this.ctx);
  }
  public async send() {
    const options = {
      gcmAPIKey,
      vapidDetails: {
        subject: "mailto:carlos.zj.mail@gmail.com",
        publicKey,
        privateKey,
      },
    };

    const payload = {
      title: "来自服务器推送消息",
      body: "点开看看吧",
      icon: "/html/app-manifest/logo_512.png",
      data: { url: "https://www.baidu.com?search=react" },
    };
    await Promise.all(
      suscriptions.map((subscription) => {
        return webPush.sendNotification(subscription, JSON.stringify(payload), options);
      })
    ).catch(e => {
      return new ResponseFailed(this.ctx).default({ message: e.message });
    });
    responseSuccess(this.ctx);
  }
}
