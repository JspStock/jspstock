"use client"

import { create } from 'zustand'
import { GetProductPayload } from './action'

interface State{
    select: Array<GetProductPayload>
}

interface Action{
    add: (val: GetProductPayload) => void,
    set: (val: Array<GetProductPayload>) => void,
    remove: (val: string) => void,
    reset: () => void,
}

const useStore = create<State & Action>()(set => ({
    select: [],
    set: val => set({select: val}),
    add: val => set(state => ({select: [...state.select, val]})),
    remove: val => set(state => ({select: [...state.select].filter(v => v.id != val)})),
    reset: () => set({select: []}),
}))

export default useStore