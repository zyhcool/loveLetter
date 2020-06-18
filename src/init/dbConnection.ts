import { createConnection } from "typeorm";
import { config } from "../config";

export async function dbConnect() {
    return await createConnection({
        type: "mysql",
        url: config.databaseUrl,
        synchronize: true,
        logging: false,
        entities: config.dbEntitiesPath,
        extra: {
            ssl: config.dbsslconn, // if not development, will use SSL
        },
    }).catch((error: string) => console.log("TypeORM connection error: ", error));
}
