"use client"

import Swal from "sweetalert2"
import { validatePassword } from "./action"

export const passwordInputAlert = async (): Promise<boolean> => {
    const { value } = await Swal.fire({
        title: 'Masukan kata sandi!',
        input: 'password',
        showCancelButton: true,
        inputAttributes: {
            autocomplete: 'off'
        },
        async inputValidator(value) {
            if(!value){
                return "Kata sandi tidak boleh kosong!"
            }
        },
    })

    if(value){
        const validatePass = await validatePassword(value)
        if(validatePass){
            return true
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Kata sandi salah!',
                text: 'Kata sandi yang anda masukan salah!',
                preConfirm: () => passwordInputAlert()
            })
    
            return false
        }
    }else{
        return false
    }
}

export const errorAlert = (preConfirm?: () => void) => Swal.fire({
    icon: 'error',
    title: 'Terjadi kesalahan!',
    text: 'Kesalahan pada server, silahkan coba kembali beberapa saat',
    preConfirm: preConfirm
})