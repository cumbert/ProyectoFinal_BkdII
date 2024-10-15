import passport from "passport";
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt'


const cookieExtractor = (req) =>{
    let token = null
    console.log(req.headers)
    if (req && req.cookies) {
        token = req.cookies.token
    }

    return token
}

const initializePassport = () => {

    passport.use('jwt', new JWTStrategy({
        jwtFromRequest:ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey:'coderSecret'
    }, async(jwt_payload,done) => {
        try {
            return done(null,jwt_payload)
        }catch(error) {
            return done(error)
        }
    }))


    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        let user = await userService.findById(id)
        done(null, user)
    })


}  


export default initializePassport