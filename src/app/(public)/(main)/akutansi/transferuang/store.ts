"use client"

import { MoneyTransfer } from "@/app/components/akutansi/transfer/table"
import { create } from "zustand"

interface State{
    select: Array<MoneyTransfer>
}

interface Action{
    add: (val: MoneyTransfer) => void,
    remove: (val: MoneyTransfer['id']) => void,
    set: (val: Array<MoneyTransfer>) => void,
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