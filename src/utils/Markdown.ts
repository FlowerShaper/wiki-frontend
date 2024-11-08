import ParsedMarkdown from "@/models/markdown/ParsedMarkdown";
import { marked, type RendererObject } from "marked";

export default class Markdown {
    static Parse(md: string): ParsedMarkdown {
        const data = new ParsedMarkdown(md)

        // TODO: actual section parsing

        return data
    }

    static Render(md: string): string {
        const config: RendererObject = {

        };

        marked.use({ renderer: config })
        return marked.parse(md).toString()
    }
}