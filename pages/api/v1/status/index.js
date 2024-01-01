import database from "infra/database.js";

async function status(request, response) {
  
    const updatedAt = new Date().toISOString();
    const databaseVersion = await database.query("SHOW server_version;");
    const databaseMaxConnections = await database.query("SHOW max_connections;");

    const databaseName = process.env.POSTGRES_DB;
    const databaseCurrentConnections = await database.query({
      text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
      values: [databaseName],
    });
    const databaseConnectionsValue = databaseCurrentConnections.rows.length
    console.log(databaseCurrentConnections.rows[0].count)
  
    response.status(200).json({
      updated_at: updatedAt,
      database: {
        version: databaseVersion.rows[0].server_version,
        max_connections: parseInt(databaseMaxConnections.rows[0].max_connections),
        opened_connections: databaseConnectionsValue,
      }
    });
}

export default status;