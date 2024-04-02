import { Supplier } from "@/app/components/pengguna/supplier/table";
import { create } from "zustand";

interface State{
    select: Array<Supplier>,
}

interface Action{
    set: (val: Array<Supplier>) => void,
    add: (val: Supplier) => void,
    remove: (val: string) => void,
    reset: () => void
}

const useStore = create<State & Action>()(set => ({
    select: [],
    set: val => set({select: val}),
    add: val => set(state => ({select: [...state.select, val]})),
    remove: val => set(state => ({select: [...state.select].filter(e => e.id != val)})),
    reset: () => set({select: []})
}))

export default useStore