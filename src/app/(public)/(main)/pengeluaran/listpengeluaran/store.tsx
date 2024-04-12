"use client"

import { Expenditures } from "@/app/components/pengeluaran/listpengeluaran/table"
import { create } from "zustand"


interface State{
    select: Array<Expenditures>
}

interface Action{
    add: (val: Expenditures) => void,
    remove: (val: string) => void,
    set: (val: Array<Expenditures>) => void,
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