"use client"

import { create } from 'zustand'

interface State{
    select: Array<string>
}

interface Action{
    add: (val: string) => void,
    remove: (val: string) => void,
    reset: () => void,
}

const useStore = create<State & Action>()(set => ({
    select: [],
    add: val => set(state => ({select: [...state.select, val]})),
    remove: val => set(state => ({select: [...state.select].filter(v=> v!==val)})),
    reset: () => set({select: []}),
}))

export default useStore