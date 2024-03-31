export const currencyFormat = (val: number) => new Intl.NumberFormat(
    "id-ID",
    {
        style: 'currency',
        currency: 'IDR'
    }
).format(val)