import dotenv from 'dotenv';

dotenv.config();

export default {
     port:process.env.PORT,
     mongoURL:process.env.MONGO_URL,
     persistence: process.env.PERSISTENCE,
     sessionSecret: process.env.SESSION_SECRET
}