import { User } from './user';
import { Slot } from './slot';

export class Meeting {
    id: number;
    startDate: Date;
    endDate: Date;
    status: string; // 'active' or 'canceled'
    professor?: User;
    slots?: Array<Slot>;
}