ALTER TABLE public.bookings ALTER COLUMN user_id DROP NOT NULL;
GRANT INSERT ON public.bookings TO anon;
DROP POLICY IF EXISTS "Anyone can submit a quote request" ON public.bookings;
CREATE POLICY "Anyone can submit a quote request" ON public.bookings FOR INSERT TO anon, authenticated WITH CHECK (true);