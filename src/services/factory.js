import mongoose from "mongoose"
import config from '../config/config.js'

console.log(config.persistence)

export let Users
export async function initializeUsers() {
    switch (config.persistence) {
        case "PRODUCCION":
            await mongoose.connect(config.mongoURL);
            const { default: UsersMongo } = await import('./mongo/user.service.js')
            Users = UsersMongo           
            break
        case "MEMORY":
            const { default: UsersMemory } = await import("./memory/users.memory.js")
            Users = UsersMemory
            break
        default:
            throw new Error("No valid persistence option specified")
    }
}

await initializeUsers()