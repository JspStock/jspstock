import { create } from "zustand";
import { GetAllDataCustomerUserPayload } from "./action";

interface State{
    select: Array<GetAllDataCustomerUserPayload>
}

interface Action{
    add: (val: GetAllDataCustomerUserPayload) => void,
    remove: (val: string) => void,
    set: (val: Array<GetAllDataCustomerUserPayload>) => void,
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