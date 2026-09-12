export type WikiArticle = {
    url: string
    lang: string
    meta: WikiArticleMetadata
    content: string
}

export type WikiArticleMetadata = {
    title: string
    description: string
    author: string
    image: string
    layout: string
    type: number
    date: number
}