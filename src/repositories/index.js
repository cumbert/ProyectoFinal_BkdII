import { Users } from "../dao/factory.js"
import UserRepository from "./Users.repository.js"

let userService

async function getUserService() {
    if (!userService) {
        if (!Users) {
            throw new Error("Contacts not initialized")
        }
        userService = new UserRepository(new Users())
    }
    return userService
}

export { getUserService };