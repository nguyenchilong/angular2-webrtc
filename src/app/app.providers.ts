import { WampService } from './services/wamp.service';
import { AuthService } from './services/auth.service';
import { PeerconnectionService } from './services/peerconnection.service';

export const APP_PROVIDERS = [
    WampService,
    AuthService,
    PeerconnectionService
];
