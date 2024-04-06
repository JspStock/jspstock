"use client"

import { CustomerGroup } from "@/app/components/pengguna/grupcostomer/table"
import { create } from "zustand"

interface State{
    select: Array<CustomerGroup>
}

interface Action{
    add: (val: CustomerGroup) => void,
    remove: (id: string) => void,
    set: (val: Array<CustomerGroup>) => void,
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