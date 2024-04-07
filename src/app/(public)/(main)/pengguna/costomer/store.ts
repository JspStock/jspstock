import { Customer } from "@/app/components/pengguna/costomer/table";
import { create } from "zustand";

interface State{
    select: Array<Customer>
}

interface Action{
    add: (val: Customer) => void,
    remove: (val: string) => void,
    set: (val: Array<Customer>) => void,
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