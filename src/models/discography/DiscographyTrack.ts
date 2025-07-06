import type { DiscographyBase } from './DiscographyBase';

export type DiscographyTrack = DiscographyBase & {
    length: string;
    bpm?: string;
    albums?: DiscographyBase[];
};
