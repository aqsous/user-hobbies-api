import * as path from 'path';
import * as dotenv from 'dotenv';

if (process.env.NODE_ENV == null) {
  dotenv.config({
    path: path.join(__dirname, '../../.env'),
  });
} else if (process.env.NODE_ENV === 'test') {
  dotenv.config({
    path: path.join(__dirname, '../../.env.test'),
  });
}


export class IServerConfigurations {
  port?: number;
  constructor(port?: number){
    this.port = port
  }
}

export class IDataConfiguration {
  connectionString?: string;
  constructor(connectionString?: string) {
    this.connectionString = connectionString
  }
}

export function getDatabaseConfig(): IDataConfiguration {
  const dataConfiguration = new IDataConfiguration(process.env.MONGO_URI);
  return dataConfiguration;
}

export function getServerConfigs(): IServerConfigurations {
  const serverConfigurations = new IServerConfigurations(parseInt(process.env.PORT || '1337', 10));
  return serverConfigurations;
}
