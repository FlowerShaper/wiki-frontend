import { defineComarkPlugin } from 'comark';

export default defineComarkPlugin(() => ({
    name: 'cw-fn',
    post(state) {
        const regex = /\[(?<text>[^\]]+)\]\((?<url>[^)]+)\)/;
        const last = state.tree.nodes.findLast(_ => true);

        if (last && last[0] == "section") {
            const ol: any = last[2]!;
            const items = ol.slice(2);

            items.forEach((x: any) => {
                let content: string = x[2];
                const match = content.match(regex);

                if (match) {
                    const { text, url } = match.groups!;
                    x[2] = ["a", { "href": url }, text];
                }
            });
        }
    }
}))