-- ==================================================
-- SUPABASE ACHIEVEMENTS SEED DATA DRAFT (004)
-- ==================================================
-- NOTE: Local draft seed file for achievements and intellectual property records.
-- DO NOT execute remotely without approval.

INSERT INTO public.achievements (
  id,
  title,
  category,
  issuer,
  year,
  registration_number,
  description,
  display_order,
  is_published
)
VALUES
(
  '40000000-0000-0000-0000-000000000001'::uuid,
  'Registered Intellectual Property (Copyright) Co-Creator — “Produk Otomasi Kandang Ayam Broiler eBro Berbasis LoRa dan IoT untuk Kemudahan Pemeliharaan dan Penurunan Biaya Operasional”',
  'Copyright',
  'Ministry of Law and Human Rights Republic of Indonesia',
  '2026',
  'EC002026157949',
  'Copyright registration for LoRa and IoT-based broiler poultry farm climate control and monitoring product.',
  1,
  true
),
(
  '40000000-0000-0000-0000-000000000002'::uuid,
  'Registered Intellectual Property (Copyright) Co-Creator — “Program Automatic Time Scheduling Generator”',
  'Copyright',
  'Ministry of Law and Human Rights Republic of Indonesia',
  '2024',
  '000621177',
  'Copyright registration for Automatic Time Scheduling Generator software application.',
  2,
  true
),
(
  '40000000-0000-0000-0000-000000000003'::uuid,
  '1st Place Winner in Race',
  'Competition',
  'Kontes Kapal Indonesia',
  '2025',
  NULL,
  '1st Place Winner in Race category at Kontes Kapal Indonesia.',
  3,
  true
),
(
  '40000000-0000-0000-0000-000000000004'::uuid,
  '2nd Honorable Mention (Autonomous Surface Vessel Category)',
  'Competition',
  'Kontes Kapal Indonesia',
  '2025',
  NULL,
  '2nd Honorable Mention in Autonomous Surface Vessel category at Kontes Kapal Indonesia.',
  4,
  true
),
(
  '40000000-0000-0000-0000-000000000005'::uuid,
  'BIRU x KSE Scholarship Awardee',
  'Scholarship',
  'Karya Salemba Empat',
  '2025',
  NULL,
  'Recipient of the BIRU x Karya Salemba Empat scholarship program.',
  5,
  true
),
(
  '40000000-0000-0000-0000-000000000006'::uuid,
  'Best Graduate',
  'Academic',
  'SMKN Jateng di Semarang',
  '2023',
  NULL,
  'Best Graduate in Electrical Power Installation at SMKN Jateng di Semarang.',
  6,
  true
),
(
  '40000000-0000-0000-0000-000000000007'::uuid,
  'Competency Certification in Electrical Power Installation',
  'Certification',
  'Ministry of Energy and Mineral Resources',
  '2023',
  NULL,
  'Professional competency certification in Electrical Power Installation issued by the Ministry of Energy and Mineral Resources.',
  7,
  true
),
(
  '40000000-0000-0000-0000-000000000008'::uuid,
  'Basic Mechanic Course Certification',
  'Certification',
  'PT. BUMA',
  '2023',
  NULL,
  'Completed the Basic Mechanic Course certification program at PT. BUMA.',
  8,
  true
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  issuer = EXCLUDED.issuer,
  year = EXCLUDED.year,
  registration_number = EXCLUDED.registration_number,
  description = EXCLUDED.description,
  display_order = EXCLUDED.display_order,
  is_published = EXCLUDED.is_published;
