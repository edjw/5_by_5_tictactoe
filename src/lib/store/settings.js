import { writable } from 'svelte/store';
import { persist, createLocalStorage } from "@macfja/svelte-persistent-store"

export const showGridLettersNumbers = persist(writable(false), createLocalStorage(), "showGridLettersNumbers")

export const allowUndo = persist(writable(false), createLocalStorage(), "allowUndo")
