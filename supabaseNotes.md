## How to create a user table that updates when someone creates an account
https://nikofischer.com/supabase-how-to-query-users-table

```sql
-- USERS
create table public.users (
  id uuid not null primary key, -- UUID from auth.users
  email text,
  first_name text, -- obviously adapt this to needs
  last_name text,
  full_name text,
  last_updated timestamp DEFAULT current_timestamp
);
comment on table public.users is 'Profile data for each user.';
comment on column public.users.id is 'References the internal Supabase Auth user.';
```

```sql
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


CREATE OR REPLACE FUNCTION update_last_updated_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.last_updated = current_timestamp;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER tr_update_last_updated
BEFORE UPDATE ON public.users
FOR EACH ROW
EXECUTE FUNCTION update_last_updated_column();

```

## Add appropriate Row-Level Security policy

1. Enable RLS on the users table: Before defining policies, ensure that Row Level Security is enabled on your users table.
```sql
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
```

2. Create the Policy: Define a policy that allows a logged-in user to select and update their own data.
```sql
CREATE POLICY select_own_data ON public.users
FOR SELECT
TO authenticated
USING (id = auth.uid());

CREATE POLICY update_own_data ON public.users
FOR UPDATE
TO authenticated
USING (id = auth.uid());

```

3. Activate the Policy: Activate the policy you've created.
```sql
ALTER TABLE public.users FORCE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE POLICY select_own_data;
ALTER TABLE public.users ENABLE POLICY update_own_data;
-- or
ALTER TABLE public.users ALTER POLICY update_own_data USING (id = auth.uid());
```

1. Assign Permissions: Grant the SELECT permission to the authenticated role on the users table.

```sql
GRANT SELECT ON public.users TO authenticated;
GRANT UPDATE ON public.users TO authenticated;
```