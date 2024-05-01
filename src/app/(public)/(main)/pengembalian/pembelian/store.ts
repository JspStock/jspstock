"use client"

import { create } from "zustand"
import { GetPurchaseReturnPayload } from "./action"

interface State{
    select: Array<GetPurchaseReturnPayload>
}

interface Action{
    add: (val: GetPurchaseReturnPayload) => void,
    remove: (val: string) => void,
    set: (val: Array<GetPurchaseReturnPayload>) => void,
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