import router from './router';

export default {
	async fetch(request, env, ctx) {
		const url = new URL(request.url);
		return router.handle(request, env, url, ctx);
	},
};
