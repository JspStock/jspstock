import { withAuth } from 'next-auth/middleware'

export default withAuth(
    {
    pages: {
        signIn: "/auth/signin",
        signOut: "/auth/signout"
    },
})

export const config = {
    matcher: [
        '/dashboard',
        '/produk/:path*',
        '/pembelian/:path*',
        '/penjualan/:path*',
        '/pengeluaran/:path*',
        '/pengembalian/:path*',
        '/pemaketan/:path*',
        '/akutansi/:path*',
        '/reports/:path*',
        '/pengguna/:path*',
        '/toko/:path*',
        '/pengaturan/:path*'
    ]
}