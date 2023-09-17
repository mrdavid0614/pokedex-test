import { USERS_LOCALDB_KEY } from "@/constants";
import { User } from "@/types";

export function getUsersFromLocalStorage(): User[] {
    const users = localStorage.getItem(USERS_LOCALDB_KEY)
    return users ? JSON.parse(users) : []
}

export function getUser(email: string) {
    const users = getUsersFromLocalStorage()
    const foundUser = users.find((user) => user.email === email)

    return foundUser ?? null
}

export function setUserToLocalStorage(newUser: User) {
    let users = getUsersFromLocalStorage()
    const userIndex = users.findIndex((user) => user.email === newUser.email)

    if (userIndex < 0)
        users = users.concat(newUser)
    else
        users[userIndex] = newUser

    localStorage.setItem(USERS_LOCALDB_KEY, JSON.stringify(users))
}