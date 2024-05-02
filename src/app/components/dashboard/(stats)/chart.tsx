"use client"
import { GetDataPayload } from '@/app/(public)/(main)/dashboard/action';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, LinearScale, BarElement, Title, CategoryScale } from 'chart.js';
import moment from 'moment';
import { useSearchParams } from 'next/navigation';
import { Doughnut, Bar } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend, LinearScale, BarElement, Title, CategoryScale)
moment().locale('id')
const Chart = ({ data }: {
    data: GetDataPayload
}) => {
    const searchParams = useSearchParams()

    return <div className="grid grid-cols-2">
        <article className='col-span'>
            <Doughnut
                data={
                    {
                        labels: ['Pembelian', 'Pendapatan', 'Pengeluaran'],
                        datasets: [
                            {
                                data: [
                                    data.purchase.map(e => e.total).reduce((val, prev) => val + prev, 0),
                                    data.sales.length > 0 ? data.sales.filter(e => moment(e.createdAt).format('MM')).map(e => e.saleOrder.map(a => a.qty * a.product.price).reduce((val, prev) => val + prev)).reduce((val, prev) => val + prev) : 0,
                                    data.expenditures.length > 0 ? data.expenditures.filter(e => moment(e.createdAt).format('MM')).map(e => e.total).reduce((val, prev) => val + prev) : 0],
                                backgroundColor: [
                                    "#1e3a8a",
                                    '#0c4a6e',
                                    '#4c1d95'
                                ],
                            }
                        ]
                    }
                } />
        </article>


        <article>
            <div role="alert" className="alert mb-5">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <span>Anda dapat memfilter data pada Diagram Batang berdasarkan tahun dengan menggunakan filter tahun yang berasal dari tahun dari.</span>
            </div>

            <Bar
                data={{
                    labels: moment.months(),
                    datasets: [
                        {
                            label: `Penjualan ${searchParams.get('date') ? moment(searchParams.get('date')?.split('to')[0]).year() : moment().year()}`,
                            data: Array.from({ length: 12 }).map((_, index) => data.sales.filter(e => e.createdAt.getMonth() == (index + 1)).map(e => e.saleOrder.map(a => a.qty * a.product.price).reduce((val, prev) => val + prev) - e.discount - e.shippingCost).reduce((val, prev) => val + prev, 0)),
                            backgroundColor: '#0c4a6e'
                        },
                        {
                            label: 'Pembelian',
                            data: Array.from({ length: 12 }).map((_, index) => data.purchase.filter(e => e.createdAt.getMonth() == (index + 1)).map(e => e.total).reduce((val, prev) => val + prev, 0)),
                            backgroundColor: "#1e3a8a"
                        }
                    ]
                }} />
        </article>
    </div>
}

export default Chart