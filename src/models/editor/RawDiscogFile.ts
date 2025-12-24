export type RawDiscogFile = {
    title: string;
    title_romanized: string;
    content?: string;
    covers?: {
        name: string;
        url: string;
    }[];
    release?: {
        year: number;
        month: number;
        day: number;
    };
    credits?: {
        role: string;
        name: string;
    }[];
    links?: {
        label: string;
        url: string;
    }[];
};
