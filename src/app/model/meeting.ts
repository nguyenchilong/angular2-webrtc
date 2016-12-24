export class Meeting {
    id?: number; // not set while the object is not created yet (server creates a new id)
    startDate: Date;
    endDate: Date;
    status: string; // 'active' or 'canceled'
}