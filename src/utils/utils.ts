export const currencyFormat = (val: number) => new Intl.NumberFormat(
    "id-ID",
    {
        style: 'currency',
        currency: 'IDR'
    }
).format(val)

export const lte = (searchParams: {date?: string}) => {
    if (searchParams.date) {
        const to = searchParams.date.split("to")[1]

        const date = new Date(to)
        date.setDate(date.getDate() + 1)
        return date
    }

    return undefined
}

export const gte = (searchParams: {date?: string}) => {
    if (searchParams.date) {
        const from = searchParams.date.split("to")[0]
        const to = searchParams.date.split("to")[1]

        if (from != to) {
            const date = new Date(from)
            date.setDate(date.getDate() - 1)
            return date
        } else {
            return undefined
        }
    }

    return undefined
}