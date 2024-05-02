import { create } from "zustand";
import { GetMutationPayload } from "./action";

interface State{
    select: Array<GetMutationPayload>
}

interface Action{
    add: (val: GetMutationPayload) => void,
    remove: (val: string) => void,
    set: (val: Array<GetMutationPayload>) => void,
    reset: () => void
}

const useStore = create<State & Action>()(set => ({
    select: [],
    add: val => set(state => ({select: [...state.select, val]})),
    remove: val => set(state => ({select: [...state.select].filter(e => e.reference != val)})),
    set: val => set({select: val}),
    reset: () => set({select: []})
}))

export default useStore