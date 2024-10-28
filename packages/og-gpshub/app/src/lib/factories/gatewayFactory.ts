import {
  NativeClientPlayerGateway,
  NativeServerPlayerGateway,
} from "../gateway/nativePlayerGateway";
import { QbCitizenGateway } from "../gateway/qbCitizenGateway";
import { PlayerPort } from "../port/playerPort";
import { ServerQBDriver } from "../driver/qbDriver";
import { serversQBCore } from "../driver/qbCore";

export class GatewayFactory {
  static createClientPlayerGateway(): PlayerPort {
    const framework = __APP_CONFIG__.app.framework;
    switch (framework) {
      case "qb-framework":
        return new QbCitizenGateway(new ServerQBDriver(serversQBCore));
      case "native":
        return new NativeClientPlayerGateway();
      default:
        throw new Error("Framework not supported");
    }
  }

  static createServerPlayerGateway(): PlayerPort {
    const framework = __APP_CONFIG__.app.framework;
    switch (framework) {
      case "qb-framework":
        return new QbCitizenGateway(new ServerQBDriver(serversQBCore));
      case "native":
        return new NativeServerPlayerGateway();
      default:
        throw new Error("Framework not supported");
    }
  }
}
