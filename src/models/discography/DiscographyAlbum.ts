import type { DiscographyBase } from './DiscographyBase';
import type { DiscographyTrack } from './DiscographyTrack';

export type DiscographyAlbum = DiscographyBase & {
    release: {
        year: number;
        month: number;
        day: number;
    };
    discs?: {
        name: string;
        tracks: DiscographyTrack[];
    }[];
};
