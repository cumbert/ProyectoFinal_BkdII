import User from '../services/mongo/user.service.js'

const usersService = new User()

export const getUsers = async (req, res) => {
    try {
        let result = await usersService.getUsers();
        if (!result) {
            return res.status(404).send({ status: "error", message: "Users not found" });
        }
        res.status(200).send({ status: "success", result });
    } catch (error) {
        res.status(500).send({ status: "error", message: "Error fetching users", error });
    }
}

export const getUserById = async (req, res) => {
    const { uid } = req.params;
    try {
        let user = await usersService.getUserById(uid);
        if (!user) {
            return res.status(404).send({ status: "error", message: "User not found" });
        }
        res.status(200).send({ status: "success", result: user });
    } catch (error) {
        res.status(500).send({ status: "error", message: "Error fetching user", error });
    }
}



export const registerUser = async (req, res) => {
    let { first_name, last_name, email, age, password } = req.body;    
    try {
        if ( !first_name || !last_name ||!email || !age || !password) {            
            return res.status(400).send({ status: "error", message: "Invalid user data" });
        }               

        let result = await usersService.registerUserService(first_name, last_name, email, age, password);
        res.status(201).send({ status: "success", result });

    } catch (error) {
        res.status(500).send({ status: "error", message: "Error saving user", error });
    }
}

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const { token, message } = await usersService.loginUserService(email, password);
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600000
        });
        res.send({ message, token });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}


export const getCurrentUser = (req, res) => {
    res.send(req.user);
};



export const updateUser = async (req, res) => {
    const { uid } = req.params;
    const user = req.body; 
    try {
        if (!user || !uid) {
            return res.status(400).send({ status: "error", message: "Invalid data" });
        }
        let result = await usersService.updateUser(uid, user);
        if (!result) {
            return res.status(404).send({ status: "error", message: "User not found" });
        }
        res.status(200).send({ status: "success", result });
    } catch (error) {
        res.status(500).send({ status: "error", message: "Error updating user", error });
    }
}

//cristianw.pruebas@gmail.com