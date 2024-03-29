"use server"
import { headers } from "next/headers"

export const generateSearchParams = async ({ show, search, page }:
    {
        show?: number | string,
        search?: string,
        page?: number,
    }
) => {

    const headerList = headers()
    const url = new URL(headerList.get('x-url')!)
    const params = new URLSearchParams(url.search)


    if (show) {
        params.set("show", show.toString())
    }

    if (search) {
        params.set("search", search.toString())
    }

    if (page) {
        params.set("page", page.toString())
    }

    return params.toString()
}