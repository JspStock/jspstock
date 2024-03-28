"use client"

import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export interface State {
    store: string | null
}

export interface Actions {
    setStore: (val: string) => void
}

const store = create<State & Actions>()(
    devtools(
        persist(
            set => ({
                store: null,
                setStore: val => set({ store: val })
            }),
            {name: 'AuthStore'}
        ),
    ),
)

export default store