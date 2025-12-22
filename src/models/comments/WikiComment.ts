import type WikiUser from "../users/WikiUser"

export type WikiComment = {
    id: string
    author: WikiUser
    content: string
    slug: string
    time: number
    edited: number
    ups: number
    downs: number
    vote: number
    parent: string
    replies: WikiComment[]
}