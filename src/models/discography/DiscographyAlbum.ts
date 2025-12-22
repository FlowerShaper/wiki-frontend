import type { DiscographyBase } from './DiscographyBase';
import type { DiscographyTrack } from './DiscographyTrack';

export type DiscographyAlbum = DiscographyBase & {
    discs?: {
        name: string;
        tracks: DiscographyTrack[];
    }[];
};
