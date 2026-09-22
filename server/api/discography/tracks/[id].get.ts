import * as fs from 'fs';
import path from 'path';
import { parse } from 'yaml';
import type { RawTrackFile } from '~~/wiki-lib/models/editor/RawTrackFile';

export default defineEventHandler(async (ev) => {
    const id = getRouterParam(ev, 'id');
    const root = path.join(LocalRepo.RepoPath, '_data/tracks');
    const files = fs.globSync(`${root}/**/${id}.yaml`);

    if (!files.length || !files[0]) {
        setResponseStatus(ev, 404);
        return {} as RawTrackFile;
    }

    const parsed: RawTrackFile = parse(fs.readFileSync(files[0], 'utf8'));
    parsed.id = id;

    const md = files[0].replace('.yaml', '.md');
    if (fs.existsSync(md)) parsed.content = fs.readFileSync(md, 'utf8')

    return parsed;
});
