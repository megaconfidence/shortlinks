import { Router } from 'itty-router';
import { getDocs, isValid, getHash, saveLink, getLink } from './utils';

const router = Router();

router.get('/', (_, ...args) => {
	const [__, origin] = args;
	return new Response(getDocs(origin));
});

router.get('/l/:link+', async ({ params }, ...args) => {
	const link = params.link;
	const [env, origin] = args;

	if (isValid(link)) {
		const hash = getHash(link);
		const shortLink = await saveLink(link, hash, origin, env);
		return new Response(shortLink);
	}
});

router.get('/:id', async ({ params }, ...args) => {
	const [env] = args;
	const id = params.id;

	if (Number(id)) {
		const link = await getLink(id, env);
		if (link) return Response.redirect(link, 301);
	}
});

//error handling catch-all
router.all('*', () => {
	return new Response('bad link or invalid url', { status: 404 });
});

export default router;
