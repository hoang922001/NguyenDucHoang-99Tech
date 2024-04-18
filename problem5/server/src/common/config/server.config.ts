
export class ServerConfig {
  getPort() {
    return process.env.PORT;
  }
}