"use client"

import { SaleReturns } from "@/app/components/pengembalian/penjualan/table"
import { create } from "zustand"

interface State{
    select: Array<SaleReturns>
}

interface Action{
    add: (val: SaleReturns) => void,
    remove: (val: string) => void,
    set: (val: Array<SaleReturns>) => void,
    reset: () => void
}

const useStore = create<State & Action>()(set => ({
    select: [],
    add: val => set(state => ({select: [...state.select, val]})),
    remove: val => set(state => ({select: [...state.select].filter(e => e.id != val)})),
    set: val => set({select: val}),
    reset: () => set({select: []})
}))

export default useStore