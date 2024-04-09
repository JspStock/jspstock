"use client"

import { ExpenditureCategory } from "@/app/components/pengeluaran/kategori/table"
import { create } from "zustand"

interface State{
    select: Array<ExpenditureCategory>
}

interface Action{
    add: (val: ExpenditureCategory) => void,
    remove: (val: string) => void,
    set: (val: Array<ExpenditureCategory>) => void,
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