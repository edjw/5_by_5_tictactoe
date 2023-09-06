// As we are employing Proof Key for Code Exchange (PKCE) in our authentication flow, it is necessary to create a server endpoint responsible for exchanging the code for a session.

// In the following code snippet, we perform the following steps:

// Retrieve the code sent back from the Supabase Auth server using the code query parameter.

// Exchange this code for a session, which we store in our chosen storage mechanism (in this case, cookies).

// Finally, we redirect the user to the account page.

import { redirect } from "@sveltejs/kit";

export const GET = async ({ url, locals: { supabase } }) => {
	const code = url.searchParams.get("code");

	if (code) {
		await supabase.auth.exchangeCodeForSession(code);
	}

	throw redirect(303, "/account");
};
