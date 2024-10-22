import { InMemorySessionGateway } from "../lib/gateway/inMemorySessionGateway";
import { FiveMServerNetworkDriver } from "og-core/src/driver/fivemServerNetworkDriver";
import { ServerEventUseCase } from "og-core/src/usecase/EventUseCase";
import { CreateSessionUseCase } from "src/lib/usecase/createSessionUseCase";
import { JoinSessionUseCase } from "src/lib/usecase/joinSessionUseCase";
import { LeaveSessionUseCase } from "src/lib/usecase/leaveSessionUseCase";
import { InMemorySessionDriver } from "src/lib/driver/inMemorySessionDriver";
import { FindSessionUseCase } from "src/lib/usecase/findSessionUseCase";
import { Status } from "./status";
import { Broadcast } from "./broadcast";
import { RecordLocation } from "./recordLocation";
import { Leave } from "./leave";
import { Join } from "./join";
import { Create } from "./create";

// drivers
const fivemNetworkDriver = new FiveMServerNetworkDriver();
const inMemorySessionDriver = new InMemorySessionDriver();

// gateways
const sessionGateway = new InMemorySessionGateway(inMemorySessionDriver);

// usecases
const serverEvent = new ServerEventUseCase("og-gpshub", fivemNetworkDriver);
const createSessionUseCase = new CreateSessionUseCase(sessionGateway);
const joinSessionUseCase = new JoinSessionUseCase(sessionGateway);
const leaveSessionUseCase = new LeaveSessionUseCase(sessionGateway);
const findSessionUseCase = new FindSessionUseCase(sessionGateway);

new Create(serverEvent, createSessionUseCase);
new Join(serverEvent, joinSessionUseCase);
new Leave(serverEvent, leaveSessionUseCase);
new RecordLocation(serverEvent, findSessionUseCase);
new Status(serverEvent, findSessionUseCase);
new Broadcast(serverEvent, findSessionUseCase);
