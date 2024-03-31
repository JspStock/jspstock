"use client"

import { Category } from '@/app/components/product/kategori/table'
import { create } from 'zustand'

interface State{
    select: Array<Category>
}

interface Action{
    add: (val: Category) => void,
    set: (val: Array<Category>) => void,
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