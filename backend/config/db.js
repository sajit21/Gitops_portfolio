import pkg from "pg";
import dotenv from "dotenv"
dotenv.config();

const {Pool}=pkg


const pool=new Pool(
    {
        user:process.env.PG_USER,
        host:process.env.PG_HOST,
        database:process.env.PG_DATABASE,
        password:process.env.PG_PASSWORD,
        port:process.env.PG_PORT,
         max: 20, //  number of clients 
         idleTimeoutMillis: 30000, // close idle clients after 30s
        connectionTimeoutMillis: 2000, // error if can’t connect in 2s here
    }
)

pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

(async()=>{
  const client= await pool.connect()
  console.log("database connected successfully")
  client.release()
})
();

export default pool;

export const query=(text,params)=>pool.query(text,params)