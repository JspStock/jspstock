"use client"

import { AllProduct } from '@/app/components/product/listproduk/table'
import { create } from 'zustand'

interface State{
    select: Array<AllProduct>
}

interface Action{
    add: (val: AllProduct) => void,
    set: (val: Array<AllProduct>) => void,
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