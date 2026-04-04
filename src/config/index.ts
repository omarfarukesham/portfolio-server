import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
  database_url: process.env.DATABASE_URL,
  port: process.env.PORT,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  ssl: {
    store_id: process.env.SSLCOMMERZ_STORE_ID,
    store_passwd: process.env.SSLCOMMERZ_STORE_PASSWORD,
    is_live: process.env.SSLCOMMERZ_IS_LIVE === 'true',
  },
  frontend_url: process.env.FRONTEND_URL || 'https://learnsafety.pro',
  backend_url: process.env.BACKEND_URL || 'http://localhost:5000',
}
