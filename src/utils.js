export function isValid(link) {
	try {
		new URL(link);
		return true;
	} catch (_) {
		return false;
	}
}

export function getHash(link) {
	let h,
		o,
		a = 0,
		c = 0,
		l = link;
	for (h = l.length - 1; h >= 0; h--) {
		o = l.charCodeAt(h);
		a = ((a << 6) & 268435455) + o + (o << 14);
		c = a & 266338304;
		a = c !== 0 ? a ^ (c >> 21) : a;
	}
	return String(a);
}

export async function saveLink(link, hash, origin, env) {
	let exist = await env.LINKS.get(hash);
	if (!exist) await env.LINKS.put(hash, link);
	return `${origin}/${hash}`;
}

export async function getLink(hash, env) {
	return await env.LINKS.get(hash);
}

export function getDocs(origin) {
	return `
  # link-shortner

  To create short links, make a get request with the long link after the 'l' path i.e
  ${origin}/l/https://example.com/
  `;
}
