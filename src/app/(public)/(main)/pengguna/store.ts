"use client"

import { create } from "zustand"
import { GetUserPayload } from "./action"

interface State{
    select: Array<GetUserPayload>
}

interface Action{
    add: (val: GetUserPayload) => void,
    remove: (val: GetUserPayload) => void,
    set: (val: Array<GetUserPayload>) => void,
    reset: () => void
}

const useStore = create<State & Action>()(set => ({
    select: [],
    add: val => set(state => ({select: [...state.select, val]})),
    remove: val => set(state => ({select: [...state.select].filter(e => e.id != val.id)})),
    set: val => set({select: val}),
    reset: () => set({select: []})
}))

export default useStore