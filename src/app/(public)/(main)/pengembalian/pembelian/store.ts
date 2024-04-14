"use client"

import { PurchaseReturn } from "@/app/components/pengembalian/pembelian/table"
import { create } from "zustand"

interface State{
    select: Array<PurchaseReturn>
}

interface Action{
    add: (val: PurchaseReturn) => void,
    remove: (val: string) => void,
    set: (val: Array<PurchaseReturn>) => void,
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