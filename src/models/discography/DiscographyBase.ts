export type DiscographyBase = {
    id: string;
    title: string;
    title_romanized: string;
    content?: string;
    release?: {
        year: number;
        month: number;
        day: number;
    };
    covers?: {
        name: string;
        url: string;
    }[];
    credits?: {
        role: string;
        name: string;
    }[];
    links?: {
        label: string;
        url: string;
    }[];
};
