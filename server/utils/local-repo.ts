import { openRepository, Repository } from 'es-git';
import path from 'path';

export class LocalRepo {
    static RepoPath = `${path.join(process.cwd(), '../wiki-articles')}`;

    static async Load(): Promise<Repository> {
        const repo = await openRepository(this.RepoPath);
        return repo;
    }
}
