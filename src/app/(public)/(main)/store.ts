"use client"

import purchaseStore from "@/app/(public)/(main)/pembelian/listpembelian/store"
import customerStore from "@/app/(public)/(main)/pengguna/costomer/store"
import customerGroupStore from "@/app/(public)/(main)/pengguna/grupcostomer/store"
import supplierStore from "@/app/(public)/(main)/pengguna/supplier/store"
import categoryStore from "@/app/(public)/(main)/produk/kategori/store"
import productListStore from "@/app/(public)/(main)/produk/listproduk/store"
import saleStore from '@/app/(public)/(main)/penjualan/listpenjualan/store'
import expenditureCategoryStore from '@/app/(public)/(main)/pengeluaran/kategoripengeluaran/store'
import savingAccountStore from '@/app/(public)/(main)/akutansi/listrekening/store'
import ExpenditureStore from '@/app/(public)/(main)/pengeluaran/listpengeluaran/store'
import SaleReturnStore from '@/app/(public)/(main)/pengembalian/penjualan/store'
import PurchaseReturnStore from '@/app/(public)/(main)/pengembalian/pembelian/store'
import PackagingStore from '@/app/(public)/(main)/pemaketan/listpemaketan/store'
import MoneyTransferStore from '@/app/(public)/(main)/akutansi/transferuang/store'
import FinancialBalanceStore from '@/app/(public)/(main)/akutansi/neraca/store'
import SavingAccountStore from '@/app/(public)/(main)/akutansi/rekeningnasabah/store'
import { create } from "zustand"

interface Action{
    reset: () => void
}

const useStore = create<Action>()(_ => ({
    reset: () => {
        purchaseStore.getState().reset()
        customerStore.getState().reset()
        customerGroupStore.getState().reset()
        supplierStore.getState().reset()
        categoryStore.getState().reset()
        productListStore.getState().reset()
        saleStore.getState().reset()
        expenditureCategoryStore.getState().reset(),
        savingAccountStore.getState().reset(),
        ExpenditureStore.getState().reset(),
        SaleReturnStore.getState().reset(),
        PurchaseReturnStore.getState().reset()
        PackagingStore.getState().reset()
        MoneyTransferStore.getState().reset(),
        FinancialBalanceStore.getState().reset()
        SavingAccountStore.getState().reset()
    }
}))

export default useStore