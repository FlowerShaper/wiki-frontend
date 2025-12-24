import type { RawDiscogFile } from './RawDiscogFile';

export type RawAlbumFile = RawDiscogFile & {
    discs?: {
        name: string;
        tracks: string[];
    }[];
};
