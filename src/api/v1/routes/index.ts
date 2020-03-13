import * as Hapi from 'hapi';
import UserRoutes from './users.routes';
import HobbyRoutes from './hobbies.routes';
import { IDatabase } from '../../../database';
import { IServerConfigurations } from '../../../configurations';

export default function init(server: Hapi.Server, configs: IServerConfigurations, database: IDatabase) {
    UserRoutes(server, configs, database);
    HobbyRoutes(server, configs, database);
}
