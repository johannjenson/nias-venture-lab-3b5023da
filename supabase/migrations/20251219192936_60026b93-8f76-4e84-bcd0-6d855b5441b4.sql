-- Create storage bucket for partnership application files
INSERT INTO storage.buckets (id, name, public)
VALUES ('partnership_files', 'partnership_files', true)
ON CONFLICT (id) DO NOTHING;

-- Allow anyone to upload files to partnership_files bucket
CREATE POLICY "Anyone can upload partnership files"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'partnership_files');

-- Allow anyone to view partnership files (public bucket)
CREATE POLICY "Anyone can view partnership files"
ON storage.objects FOR SELECT
USING (bucket_id = 'partnership_files');