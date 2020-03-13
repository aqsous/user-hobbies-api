import * as Hapi from 'hapi';
import UserController from '../controllers/user.controller';
import * as UserValidator from '../validations/user.validation';
import { IDatabase } from '../../../database';
import { IServerConfigurations } from '../../../configurations';

export default function (server: Hapi.Server, serverConfigs: IServerConfigurations, database: IDatabase) {
	const userController = new UserController(serverConfigs, database);
	server.bind(userController);

	// server.route({
	// 	method: 'DELETE',
	// 	path: '/users/{userId}',
	// 	options: {
	// 		handler: userController.deleteUser,
	// 		tags: ['api', 'users'],
	// 		validate: {
	// 			params: UserValidator.userIdModel,
	// 		},
	// 		description: 'Delete current user.',
	// 		plugins: {
	// 			'hapi-swagger': {
	// 				responses: {
	// 					'200': {
	// 						description: 'User deleted.',
	// 					},
	// 				},
	// 			},
	// 		},
	// 	},
	// });

	server.route({
		method: 'POST',
		path: '/users',
		options: {
			handler: userController.createUser,
			auth: false,
			tags: ['api', 'users'],
			description: 'Create a user.',
			validate: {
				payload: UserValidator.createUserModel,
			},
			plugins: {
				'hapi-swagger': {
					responses: {
						'201': {
							description: 'User created.',
						},
					},
				},
			},
		},
	});

	server.route({
		method: 'GET',
		path: '/users',
		options: {
			handler: userController.listUser,
			auth: false,
			tags: ['api', 'users'],
			description: 'List all users.',
			plugins: {
				'hapi-swagger': {
					responses: {
						'200': {
							description: 'Users listed.',
						},
					},
				},
			},
		},
	});

	// server.route({
	// 	method: 'GET',
	// 	path: '/users/{userId}',
	// 	options: {
	// 		handler: userController.getUser,
	// 		auth: false,
	// 		tags: ['api', 'user', 'hobbies'],
	// 		validate: {
	// 			params: UserValidator.userIdModel,
	// 		},
	// 		description: 'User with hobbies.',
	// 		plugins: {
	// 			'hapi-swagger': {
	// 				responses: {
	// 					'200': {
	// 						description: 'User object with hobbies.',
	// 					},
	// 				},
	// 			},
	// 		},
	// 	},
	// });
}
