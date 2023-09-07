export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
	public: {
		Tables: {
			users: {
				Row: {
					email: string | null;
					full_name: string | null;
					id: string;
					last_updated: string | null;
				};
				Insert: {
					email?: string | null;
					full_name?: string | null;
					id: string;
					last_updated?: string | null;
				};
				Update: {
					email?: string | null;
					full_name?: string | null;
					id?: string;
					last_updated?: string | null;
				};
				Relationships: [];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
}
