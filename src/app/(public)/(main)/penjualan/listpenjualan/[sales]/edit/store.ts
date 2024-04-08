"use client"

import { Sales } from "@/app/components/penjualan/listpenjualan/table"
import { create } from "zustand"

interface State{
    select: Array<Sales>
}

interface Action{
    add: (val: Sales) => void,
    remove: (val: string) => void,
    set: (val: Array<Sales>) => void,
    reset: () => void
}

const useStore = create<State & Action>()(set => ({
    select: [],
    add: val => set(state => ({select: [...state.select, val]})),
    remove: val => set(state => ({select: [...state.select].filter(e => e.id != val)})),
    set: val => set({select: val}),
    reset: () => set(state => ({select: []}))
}))

export default useStore