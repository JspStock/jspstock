import { Mutation } from "@/app/components/akutansi/rekeningnasabah/table";
import { create } from "zustand";

interface State{
    select: Array<Mutation>
}

interface Action{
    add: (val: Mutation) => void,
    remove: (val: string) => void,
    set: (val: Array<Mutation>) => void,
    reset: () => void
}

const useStore = create<State & Action>()(set => ({
    select: [],
    add: val => set(state => ({select: [...state.select, val]})),
    remove: val => set(state => ({select: [...state.select].filter(e => e.ref != val)})),
    set: val => set({select: val}),
    reset: () => set({select: []})
}))

export default useStore