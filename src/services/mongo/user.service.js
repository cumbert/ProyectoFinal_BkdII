import User from "../mongo/models/user.model.js"
import {  createHash, isValidPassword, generateToken  } from '../../../utils.js'
import UserDTO from '../dtos/user.dto.js'


export default class UserService {

  registerUserService = async (first_name, last_name, email, age, password) => {
    
    // if (!first_name || !last_name || !email || !age || !password) {
    //     throw new Error('Todos los campos son obligatorios')
    // }

    let existingUser = await User.findOne({ email })
    if (existingUser) {
        throw new Error("El usuario ya existe")
    }

    const hashedPassword = createHash(password);
    const newUser = new User({ first_name, last_name, email, age, password: hashedPassword })
    await newUser.save();

    return "Usuario registrado con éxito"
}

  loginUserService = async (email, password) => {
    let user = await User.findOne({ email })
    if (!user) {
        throw new Error("Usuario no encontrado")
    }

    const passwordIsValid = isValidPassword(user, password);
    if (!passwordIsValid) {
        throw new Error("Contraseña incorrecta")
    }

    const token = generateToken(user);
    return { token, message: "Inicio de sesión exitoso" }
}

}


// export default class UserService {


//     getUsers = async () => {
//         try {
//             let users = await User.find()
//             return users.map(user => new UserDTO(user))

//         }catch(error){
//             console.error("Error fetching users:", error)
//             return null
//         }
//     }

//     getUserById = async (id) => {

//         try {
//             let user = await User.findById(id)
//             if (user) {
//                 return new UserDTO(user)
//             }

//         }catch(error){
//             console.error("Error fetching user by ID:", error)
//             return null
//         }
//     }

//     saveUser = async (user) => {

//         const { first_name, last_name, email, age, password } = user

//         try {

//             if (!first_name || !last_name || !email || !age || !password) {
//                 return res.status(400).send('Todos los campos son obligatorios')
//             }

//             let existingUser = await User.findOne({ email })
//             if (existingUser) {
//                 return res.status(400).send({ message: "El usuario ya existe" })
//             }
          
                        
//             const hashedPassword = createHash(password);                        
//             let result = await User.create({first_name, last_name, email, age,  password: hashedPassword })
//             return result

//         }catch(error){
//             console.error("Error saving user:", error)
//             return null
//         }
//     }

//     updateUser = async (id,user) => {

//         try {
//             let result = await User.updateOne({_id: id},{ $set: user})
//             return result

//         }catch(error){
//             console.error("Error updating user:", error)
//             return null
//         }
//     }
    
// }
