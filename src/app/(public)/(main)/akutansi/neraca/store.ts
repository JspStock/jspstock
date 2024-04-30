"use client"

import { create } from "zustand"
// import { GetSavingAccounts } from "./action"

interface State{
    select: Array<any>
}

interface Action{
    add: (val: any) => void,
    remove: (val: any['id']) => void,
    set: (val: Array<any>) => void,
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