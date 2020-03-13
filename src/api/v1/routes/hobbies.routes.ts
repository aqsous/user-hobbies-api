import * as Hapi from 'hapi';
import HobbyController from '../controllers/hobby.controller';
import * as HobbyValidator from '../validations/hobby.validation';
import { IDatabase } from '../../../database';
import { IServerConfigurations } from '../../../configurations';

export default function (server: Hapi.Server, serverConfigs: IServerConfigurations, database: IDatabase) {
	const hobbyController = new HobbyController(serverConfigs, database);
	server.bind(hobbyController);

	server.route({
		method: 'DELETE',
		path: '/hobbies/{hobbyId}',
		options: {
			handler: hobbyController.deleteUser,
			tags: ['api', 'hobbies'],
			description: 'Delete current hobby.',
			validate: {
				params: HobbyValidator.hobbyIdModel
			},
			plugins: {
				'hapi-swagger': {
					responses: {
						'200': {
							description: 'Hobby deleted.',
						},
					},
				},
			},
		},
	});

	server.route({
		method: 'POST',
		path: '/hobbies',
		options: {
			handler: hobbyController.createHobby,
			auth: false,
			tags: ['api', 'hobbies'],
			description: 'Create a hobby.',
			validate: {
				payload: HobbyValidator.createHobbyModel,
			},
			plugins: {
				'hapi-swagger': {
					responses: {
						'201': {
							description: 'Hobby created.',
						},
					},
				},
			},
		},
	});

	server.route({
		method: 'GET',
		path: '/hobbies',
		options: {
			handler: hobbyController.listUserHobbies,
			auth: false,
			tags: ['api', 'user', 'hobbies'],
			description: 'List user hobbies.',
			validate: {
				query: HobbyValidator.listUserHobby
			},
			plugins: {
				'hapi-swagger': {
					responses: {
						'200': {
							description: 'Hobbies listed.',
						},
					},
				},
			},
		},
	});
}
