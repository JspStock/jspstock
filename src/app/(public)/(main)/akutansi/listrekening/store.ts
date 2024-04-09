"use client"

import { SavingAccounts } from "@/app/components/akutansi/listrekening/table"
import { create } from "zustand"

interface State{
    select: Array<SavingAccounts>
}

interface Action{
    add: (val: SavingAccounts) => void,
    remove: (val: string) => void,
    set: (val: Array<SavingAccounts>) => void,
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