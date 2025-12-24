import type { RawDiscogFile } from './RawDiscogFile';

export type RawTrackFile = RawDiscogFile & {
    length?: string;
    bpm?: string;
    single?: boolean;
    albums?: string[];
};
