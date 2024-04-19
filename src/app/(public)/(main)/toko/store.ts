"use client"

import { create } from "zustand"
import { GetStorePayload } from "./action"

interface State{
    select: Array<GetStorePayload>
}

interface Action{
    add: (val: GetStorePayload) => void,
    remove: (val: string) => void,
    set: (val: Array<GetStorePayload>) => void,
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