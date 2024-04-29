"use client"

import { create } from "zustand"
import { GetDataPlayload } from "./action"

interface State{
    select: Array<GetDataPlayload>
}

interface Action{
    add: (val: GetDataPlayload) => void,
    remove: (val: string) => void,
    set: (val: Array<GetDataPlayload>) => void,
    reset: () => void
}

const useStore = create<State & Action>()(set => ({
    select: [],
    add: val => set(state => ({select: [...state.select, val]})),
    remove: val => set(state => ({select: [...state.select].filter(e => e.id != val)})),
    set: val => set({select: val}),
    reset: () => set(state => ({select: []}))
}))

export default useStore