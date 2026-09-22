import * as fs from 'fs';
import path from 'path';
import { parse } from 'yaml';
import z from 'zod';
import type { RawTrackFile } from '~~/wiki-lib/models/editor/RawTrackFile';

const qs = z.object({
    page: z.coerce.number().int().positive().default(1),
});

export default defineEventHandler(async (ev) => {
    const root = path.join(LocalRepo.RepoPath, '_data/tracks');
    const files = fs
        .readdirSync(root, {
            recursive: true,
            withFileTypes: true,
        })
        .filter((x) => x.isFile() && x.name.endsWith('.yaml'));

    const query = await getValidatedQuery(ev, (q) => qs.safeParse(q));
    if (!query.success || !query.data) throw createError({ statusCode: 400, message: JSON.stringify(query.error.issues) });

    return {
        count: files.length,
        items: files
            .slice((query.data.page - 1) * 12)
            .slice(0, 12)
            .map((x) => {
                let p = path.join(x.parentPath, x.name);
                let data: RawTrackFile = parse(fs.readFileSync(p, 'utf8'));
                data.id = x.name.replace('.yaml', '');
                return data;
            }),
    };
});
