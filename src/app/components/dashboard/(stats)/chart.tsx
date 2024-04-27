"use client"
import { GetDataPayload } from '@/app/(public)/(main)/dashboard/action';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, LinearScale, BarElement, Title, CategoryScale } from 'chart.js';
import moment from 'moment';
import { Doughnut, Bar } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend, LinearScale, BarElement, Title, CategoryScale)
moment().locale('id')
const Chart = ({ data }: {
    data: GetDataPayload
}) => {
    return <div className="grid grid-cols-2">
        <article className='col-span'>
            <Doughnut
                data={
                    {
                        labels: ['Pembelian', 'Pendapatan', 'Pengeluaran'],
                        datasets: [
                            {
                                data: [
                                    data.sales.length > 0 ? data.sales.filter(e => moment(e.createdAt).format('MM')).map(e => e.saleOrder.map(a => a.qty * a.product.price).reduce((val, prev) => val + prev)).reduce((val, prev) => val + prev) : 0, 
                                    data.expenditures.length > 0 ? data.expenditures.filter(e => moment(e.createdAt).format('MM')).map(e => e.total).reduce((val, prev) => val + prev) : 0],
                                backgroundColor: [
                                    '#0c4a6e',
                                    '#4c1d95'
                                ],
                            }
                        ]
                    }
                } />
        </article>


        {/* <article>
            <Bar
                data={{
                    labels: moment.months(),
                    datasets: data.purchase.sort((a, b) => parseInt(moment(a.createdAt).format('MM')) == parseInt(moment(b.createdAt).format('MM'))).map(e => ({
                        label: 'Jumlah yah Dijual',
                        data: e.purchaseOrder.map(a => a.qty * a.product.cost)
                    }))
                }} />
        </article> */}
    </div>
}

export default Chart