import { Client } from "pg";
import { createTunnel, SshOptions, ServerOptions, ForwardOptions } from "tunnel-ssh";
import config from 'config';
import { Client as SSHClient } from 'ssh2';

class PostgreTunnelConnector {
    private isTunnelEstablished: boolean = false;
    private sshConfig: SshOptions;
    private tunnelOptions: any;
    private serverOptions: ServerOptions;
    private forwardOptions: ForwardOptions;
    private sshClient: SSHClient | null = null;

    constructor() {
        this.sshConfig = {
            host: config.get("sshConfig.host"),
            port: config.get("sshConfig.port"),
            username: config.get("sshConfig.username"),
            password: config.get("sshConfig.password"),
            privateKey: require("fs").readFileSync(config.get("sshConfig.privateKey")),
        };
        this.tunnelOptions = {
            autoClose: config.get("tunnelOptions.autoClose") as boolean,
        };
        this.serverOptions = {
            host: config.get("serverOptions.host"),
            port: config.get("serverOptions.port"),
        };
        this.forwardOptions = {
            srcPort: config.get("forwardOptions.srcPort"),
            dstAddr: config.get("forwardOptions.dstAddr"),
            dstPort: config.get("forwardOptions.dstPort"),
        };
    }

    private async setupTunnel() {
        if (this.sshClient) return;
        try {
            const [server, sshClient] = await createTunnel(this.tunnelOptions, this.serverOptions, this.sshConfig, this.forwardOptions);
            this.sshClient = sshClient;
            this.isTunnelEstablished = true;
            this.showLog("SSH tunnel is established");
        } catch (error) {
            console.error("Error setting up the SSH tunnel:", error);
        }
    }

    private executeQuery(client: Client, query: string): Promise<any[]> {
        return new Promise((resolve, reject) => {
            client.query(query, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result.rows);
                }
            });
        });
    }

    // Show logs if visibility is enabled
    private showLog(string: string) {
        if (config.get("visible.show") === true) {
            console.log(string);
        }
    }

    // Method to execute a query in the database.
    public async runQuery(query: string) {
        await this.setupTunnel();
        const pgClient = new Client({
            user: config.get("pgClient.user"),
            host: config.get("pgClient.host"),
            database: config.get("pgClient.database"),
            password: config.get("pgClient.password"),
            port: config.get("pgClient.port"),
        });

        pgClient.connect((err) => {
            if (err) {
                console.error("Error connecting to PostgreSQL:", err);
                return;
            }

            this.showLog("Connected to PostgreSQL through SSH tunnel");

            this.executeQuery(pgClient, query)
                .then((queryResult) => {
                    console.log("Query Result:", queryResult);

                    pgClient.end();
                    this.showLog("Database connection is closed");
                    this.sshClient?.end(); // Close the SSH tunnel after executing the query
                    this.showLog("SSH tunnel is closed");
                })
                .catch((error) => {
                    console.error("Error executing query:", error);
                    pgClient.end();
                    this.sshClient?.end(); // Close the SSH tunnel after executing the query
                    this.showLog("SSH tunnel is closed");
                });
        });
    }

}
