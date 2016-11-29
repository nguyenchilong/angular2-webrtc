export const MOBILE = (typeof window !== 'undefined') ? (window.screen.availWidth < 800) : true;
export const API_BASE_URL: string = `http://${HOST}:${PORT}`;
export const SOCKET: string = 'https://chor-am-killesberg.de:1234';
export const REST: string = 'http://chor-am-killesberg.de:8001';
export const WAMP: string = 'ws://chor-am-killesberg.de:8001';
