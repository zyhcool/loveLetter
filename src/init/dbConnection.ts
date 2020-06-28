import { createConnection } from "typeorm";
import { config } from "../config";

export async function dbConnect() {
    return await createConnection({
        type: "mongodb",
        url: config.databaseUrl,
        // synchronize: true,
        // logging: false,
        entities: config.entities,
        // extra: {
        //     ssl: config.dbsslconn, // if not development, will use SSL
        // },
        "useNewUrlParser": true,
        "useUnifiedTopology": true
    }).catch((error: string) => console.log("TypeORM connection error: ", error));
}
