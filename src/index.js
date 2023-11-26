import router from './router';

export default {
	async fetch(request, env, ctx) {
		const { origin } = new URL(request.url);
		return router.handle(request, env, origin, ctx);
	},
};
