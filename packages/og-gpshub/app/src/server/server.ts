import { InMemorySessionGateway } from "../lib/gateway/inMemorySessionGateway";
import { FiveMServerNetworkDriver } from "og-core/src/driver/fivemServerNetworkDriver";
import { ServerEventUseCase } from "og-core/src/usecase/EventUseCase";
import { CreateSessionUseCase } from "src/lib/usecase/createSessionUseCase";
import { JoinSessionUseCase } from "src/lib/usecase/joinSessionUseCase";
import { LeaveSessionUseCase } from "src/lib/usecase/leaveSessionUseCase";
import { InMemorySessionDriver } from "src/lib/driver/inMemorySessionDriver";
import { FindSessionUseCase } from "src/lib/usecase/findSessionUseCase";
import { Status } from "./status";
import { RecordLocation } from "./recordLocation";
import { Leave } from "./leave";
import { Join } from "./join";
import { Create } from "./create";
import { FindPlayerUseCase } from "../lib/usecase/findPlayerUseCase";
import { GatewayFactory } from "../lib/factories/gatewayFactory";

// drivers
const fivemNetworkDriver = new FiveMServerNetworkDriver();
const inMemorySessionDriver = new InMemorySessionDriver();

// gateways
const sessionGateway = new InMemorySessionGateway(inMemorySessionDriver);
const playerGateway = GatewayFactory.createServerPlayerGateway();

// usecases
const serverEvent = new ServerEventUseCase("og-gpshub", fivemNetworkDriver);
const createSessionUseCase = new CreateSessionUseCase(sessionGateway);
const joinSessionUseCase = new JoinSessionUseCase(sessionGateway);
const leaveSessionUseCase = new LeaveSessionUseCase(sessionGateway);
const findSessionUseCase = new FindSessionUseCase(sessionGateway);
const findPlayerUseCase = new FindPlayerUseCase(playerGateway);

// App Services
new Create(serverEvent, createSessionUseCase, findPlayerUseCase);
new Join(serverEvent, joinSessionUseCase);
new Leave(serverEvent, leaveSessionUseCase, findPlayerUseCase);
new RecordLocation(serverEvent, findSessionUseCase, findPlayerUseCase);
new Status(serverEvent, findSessionUseCase);
