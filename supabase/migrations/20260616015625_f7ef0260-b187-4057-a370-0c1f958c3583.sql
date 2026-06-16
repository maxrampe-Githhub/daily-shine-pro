ALTER TABLE public.bookings ADD COLUMN IF NOT EXISTS vehicle_type text;
ALTER TABLE public.bookings ALTER COLUMN preferred_date DROP NOT NULL;
ALTER TABLE public.bookings ALTER COLUMN preferred_time DROP NOT NULL;
ALTER TABLE public.bookings ALTER COLUMN vehicle_make DROP NOT NULL;
ALTER TABLE public.bookings ALTER COLUMN vehicle_model DROP NOT NULL;
ALTER TABLE public.bookings ALTER COLUMN vehicle_year DROP NOT NULL;
ALTER TABLE public.bookings DROP CONSTRAINT IF EXISTS bookings_service_type_check;