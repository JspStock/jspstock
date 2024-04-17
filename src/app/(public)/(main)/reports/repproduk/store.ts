"use client"

import { create } from "zustand"
import { GetProductPayload } from "./action"

interface State{
    select: Array<GetProductPayload>
}

interface Action{
    add: (val: GetProductPayload) => void,
    remove: (val: string) => void,
    set: (val: Array<GetProductPayload>) => void,
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