import { fail, redirect } from "@sveltejs/kit";

export const load = async ({ locals: { supabase, getSession } }) => {
	const session = await getSession();

	if (!session) {
		throw redirect(303, "/");
	}

	try {
		const { data: profile, error } = await supabase
			.from("users")
			.select(`email, full_name`)
			.eq("id", session.user.id)
			.single();

		if (error) {
			console.error("Error fetching user profile:", error);
		} else {
			return { session, profile };
		}
	} catch (error) {
		console.error("An unexpected error occurred:", error);
	}
};

export const actions = {
	update: async ({ request, locals: { supabase, getSession } }) => {
		const formData = await request.formData();
		const fullName = formData.get("fullName") as string;
		const email = formData.get("email") as string;

		const session = await getSession();

		const { error } = await supabase
			.from("users")
			.update({
				full_name: fullName,
				email,
				last_updated: new Date()
			})
			.eq("id", session?.user.id);

		// const { error } = await supabase.from("users").upsert({
		// 	id: session?.user.id,
		// 	full_name: fullName,
		// 	email,
		// 	last_updated: new Date()
		// });

		if (error) {
			console.error("Error updating user profile:", error);
			return fail(500, {
				message: error.message,
				fullName,
				email,
				status: "error"
			});
		}

		return {
			fullName,
			email,
			status: "done"
		};
	},
	signout: async ({ locals: { supabase, getSession } }) => {
		const session = await getSession();
		if (session) {
			await supabase.auth.signOut();
			throw redirect(303, "/");
		}
	}
};
