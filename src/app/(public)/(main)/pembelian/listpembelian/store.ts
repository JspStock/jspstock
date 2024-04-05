"use client"

import { create } from "zustand"

export interface Select{
    id: string,
    date: string,
    supplier: string,
    purchaseStatus: string,
    total: number
}

interface State{
    select: Array<Select>
}

interface Action{
    add: (val: Select) => void,
    remove: (id: string) => void,
    set: (val: Array<Select>) => void,
    reset: () => void
}

const useStore = create<State & Action>()(set => ({
    select: [],
    add: val => set(state => ({select: [...state.select, val]})),
    remove: id => set(state => ({select: [...state.select].filter(e => e.id != id)})),
    set: val => set({select: val}),
    reset: () => set({select: []})
}))

export default useStore