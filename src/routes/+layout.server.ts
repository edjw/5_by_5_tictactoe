// handle the session on the server-side. This is called on every request to the server and is used to hydrate the session on the client-side

export const load = async ({ locals: { getSession } }) => {
	return {
		session: await getSession()
	};
};
