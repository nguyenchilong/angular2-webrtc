import { WampService } from './services/wamp.service';
import { AuthService } from './services/auth.service';
import { StudguardService } from './services/studguard.service';
import { ProfguardService } from './services/profguard.service';

import { PeerconnectionService } from './services/peerconnection.service';

export const APP_PROVIDERS = [
    WampService,
    AuthService,
    StudguardService,
    ProfguardService,
    PeerconnectionService
];
