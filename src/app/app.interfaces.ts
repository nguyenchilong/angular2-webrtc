export interface meeting { // Slot
    id: number;
    title: string;
    start: Date;
    end: Date;
    color: Color;
    prof: string;
    vorlesung: string;
    time: string;
}

interface Color {
    primary: string;
    secondary: string;
}