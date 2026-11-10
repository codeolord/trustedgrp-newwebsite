CREATE TABLE IF NOT EXISTS public.site_form_submissions (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  form_type text NOT NULL CHECK (form_type IN ('contact', 'affiliate', 'newsletter')),
  name varchar(120),
  email varchar(254) NOT NULL,
  form_data jsonb NOT NULL DEFAULT '{}'::jsonb,
  consent boolean NOT NULL,
  consented_at timestamptz NOT NULL DEFAULT now(),
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'reviewed', 'archived')),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS site_form_submissions_status_created_idx
  ON public.site_form_submissions (status, created_at DESC);

CREATE INDEX IF NOT EXISTS site_form_submissions_type_created_idx
  ON public.site_form_submissions (form_type, created_at DESC);

CREATE UNIQUE INDEX IF NOT EXISTS site_form_newsletter_email_unique
  ON public.site_form_submissions (lower(email))
  WHERE form_type = 'newsletter';

CREATE TABLE IF NOT EXISTS public.site_form_rate_limits (
  ip_hash char(64) NOT NULL,
  window_start timestamptz NOT NULL,
  request_count integer NOT NULL DEFAULT 0,
  PRIMARY KEY (ip_hash, window_start)
);