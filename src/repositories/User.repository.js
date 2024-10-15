import UserDTO from "../dao/DTOs/user.dto.js"

export default class UserRepository {
    constructor(dao) {
        this.dao = dao
    }
    
    getUsers = async () => {
        try {
            let result = await this.dao.getUsers()
            return result
        } catch (error) {
            console.error("Error getting users in repository:", error)
            throw error
        }
    }
    
    saveUser = async (user) => {
        try {
            let userToInsert = new UserDTO(user)
            let result = await this.dao.createUser(userToInsert)
            return result
        } catch (error) {
            console.error("Error creating user in repository:", error)
            throw error
        }
    }
}
