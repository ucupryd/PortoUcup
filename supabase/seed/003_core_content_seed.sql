-- ==================================================
-- SUPABASE CORE CONTENT SEED DATA DRAFT (003)
-- ==================================================
-- NOTE: Local draft seed file for profiles, experiences, education, and skills.
-- DO NOT execute remotely without approval.

-- ==================================================
-- 1. PROFILES SEED DATA
-- ==================================================

INSERT INTO public.profiles (
  id,
  full_name,
  short_name,
  title,
  subheadline,
  university,
  program,
  gpa,
  completed_credits,
  location,
  email,
  academic_email,
  phone,
  whatsapp_url,
  bio_intro,
  soft_skills,
  is_published
)
VALUES (
  '00000000-0000-0000-0000-000000000001'::uuid,
  'Muhammad Yusuf Riyadi',
  'M. Yusuf Riyadi',
  'Automation & IoT Engineering Student',
  'Engineering practical IoT sensor networks, industrial HMI solutions, embedded systems, and real-time monitoring platforms.',
  'Universitas Diponegoro',
  'Automation Engineering Technology',
  3.95,
  122,
  'Semarang, Indonesia',
  'yusufriyadi141004@gmail.com',
  'myusufriyadi@students.undip.ac.id',
  '0895422885344',
  'https://wa.me/62895422885344',
  'I am an Automation Engineering Technology student at Universitas Diponegoro with a 3.95 GPA and a strong interest in IoT, embedded systems, industrial HMI, and real-time monitoring platforms. My experience combines software and hardware development with practical exposure to mechanical maintenance and electromechanical systems.',
  ARRAY[
    'Analytical problem solving',
    'Cross-functional collaboration',
    'Adaptability',
    'Inclusive and diversity awareness',
    'Strong academic performance'
  ],
  true
)
ON CONFLICT (id) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  short_name = EXCLUDED.short_name,
  title = EXCLUDED.title,
  subheadline = EXCLUDED.subheadline,
  university = EXCLUDED.university,
  program = EXCLUDED.program,
  gpa = EXCLUDED.gpa,
  completed_credits = EXCLUDED.completed_credits,
  location = EXCLUDED.location,
  email = EXCLUDED.email,
  academic_email = EXCLUDED.academic_email,
  phone = EXCLUDED.phone,
  whatsapp_url = EXCLUDED.whatsapp_url,
  bio_intro = EXCLUDED.bio_intro,
  soft_skills = EXCLUDED.soft_skills,
  is_published = EXCLUDED.is_published,
  updated_at = now();

-- ==================================================
-- 2. EXPERIENCES SEED DATA
-- ==================================================

INSERT INTO public.experiences (
  id,
  experience_type,
  company_or_org,
  role,
  location,
  period,
  description,
  highlights,
  tags,
  display_order,
  is_published
)
VALUES
(
  '10000000-0000-0000-0000-000000000001'::uuid,
  'professional',
  'PT. Reinutech Perbeja',
  'IoT Engineer & Full-Stack Developer',
  'Semarang, Indonesia',
  '2025 – Present',
  'Engineering integrated IoT and telemetry solutions: Nextion HMI for climate control systems, Flutter mobile applications for monitoring and reporting, and web platforms for closed-house poultry farms.',
  ARRAY[
    'Developed a Nextion-based HMI for a climate control system.',
    'Developed a Flutter-based mobile application for monitoring and reporting.',
    'Engineered a web-based monitoring and control platform for closed-house poultry farms.',
    'Designed IoT sensor integration for real-time environmental data acquisition.'
  ],
  ARRAY['LoRa', 'IoT', 'HMI', 'Flutter', 'Web Dev'],
  1,
  true
),
(
  '10000000-0000-0000-0000-000000000002'::uuid,
  'professional',
  'PT. BUMA',
  'Mechanic',
  'Indonesia',
  '2023',
  'Performed maintenance, troubleshooting, and mechanical repairs on heavy excavator units to ensure equipment uptime and operational reliability.',
  ARRAY[
    'Performed maintenance, troubleshooting, and mechanical repairs on heavy excavator units.',
    'Worked with heavy equipment power trains, diesel engines, electrical systems, and pneumatics/hydraulics.',
    'Completed the Basic Mechanic Course.'
  ],
  ARRAY['Heavy Equipment', 'Mechanical Repairs', 'Electrical Systems'],
  2,
  true
),
(
  '10000000-0000-0000-0000-000000000003'::uuid,
  'professional',
  'Hotel MG Suite',
  'Engineering',
  'Semarang, Indonesia',
  '2022',
  'Conducted daily facility safety inspections, executed preventive and corrective maintenance across property facilities, and resolved electrical system issues.',
  ARRAY[
    'Conducted daily facility inspections.',
    'Performed preventive and corrective maintenance.',
    'Troubleshot electrical system issues.',
    'Supported reliable facility operation.'
  ],
  ARRAY['Facility Maintenance', 'Electrical Systems', 'HVAC'],
  3,
  true
),
(
  '10000000-0000-0000-0000-000000000004'::uuid,
  'organization',
  'UNDIP Robotics Development Center',
  'Electrical Staff',
  'Semarang, Indonesia',
  '2024 – 2026',
  'Contributed as electrical staff focusing on PCB design, routing, electrical component analysis, and power management for robotics systems.',
  ARRAY[
    'PCB design, routing, and assembly using EasyEDA.',
    'Electrical component analysis.',
    'Power management and distribution systems.'
  ],
  ARRAY['Robotics', 'PCB Design', 'Electrical Systems'],
  4,
  true
),
(
  '10000000-0000-0000-0000-000000000005'::uuid,
  'organization',
  'Paguyuban Karya Salemba Empat',
  'Media & Relation Staff',
  'Semarang, Indonesia',
  '2025 – 2026',
  'Planned social media campaigns and produced visual content and graphic design assets.',
  ARRAY[
    'Social media campaign planning.',
    'Visual content production.',
    'Graphic design and video asset development.'
  ],
  ARRAY['Media', 'Graphic Design', 'Public Relations'],
  5,
  true
),
(
  '10000000-0000-0000-0000-000000000006'::uuid,
  'organization',
  'Automation Engineering Technology Student Association',
  'Community Service Staff',
  'Semarang, Indonesia',
  '2024 – 2025',
  'Planned and delivered community service programs, fundraising initiatives, and event logistics.',
  ARRAY[
    'Planning and delivery of community service programs.',
    'Fundraising initiatives.',
    'Logistics and transportation coordination.'
  ],
  ARRAY['Community Service', 'Logistics', 'Event Coordination'],
  6,
  true
),
(
  '10000000-0000-0000-0000-000000000007'::uuid,
  'organization',
  'Vocational School General Election Commission',
  'Chairman',
  'Semarang, Indonesia',
  '2024',
  'Led election process planning, cross-functional team coordination, and student feedback consolidation.',
  ARRAY[
    'Cross-functional coordination.',
    'Election process planning and execution.',
    'Consolidation of student feedback.'
  ],
  ARRAY['Leadership', 'Election Planning', 'Coordination'],
  7,
  true
)
ON CONFLICT (id) DO UPDATE SET
  experience_type = EXCLUDED.experience_type,
  company_or_org = EXCLUDED.company_or_org,
  role = EXCLUDED.role,
  location = EXCLUDED.location,
  period = EXCLUDED.period,
  description = EXCLUDED.description,
  highlights = EXCLUDED.highlights,
  tags = EXCLUDED.tags,
  display_order = EXCLUDED.display_order,
  is_published = EXCLUDED.is_published,
  updated_at = now();

-- ==================================================
-- 3. EDUCATION SEED DATA
-- ==================================================

INSERT INTO public.education (
  id,
  institution,
  program,
  period,
  gpa,
  completed_credits,
  honors,
  display_order,
  is_published
)
VALUES
(
  '20000000-0000-0000-0000-000000000001'::uuid,
  'Universitas Diponegoro',
  'Automation Engineering Technology',
  '2023 – Expected 2027',
  3.95,
  122,
  'BIRU x KSE Scholarship Awardee',
  1,
  true
),
(
  '20000000-0000-0000-0000-000000000002'::uuid,
  'SMKN Jateng di Semarang',
  'Electrical Power Installation',
  '2020 – 2023',
  NULL,
  NULL,
  'Best Graduate',
  2,
  true
)
ON CONFLICT (id) DO UPDATE SET
  institution = EXCLUDED.institution,
  program = EXCLUDED.program,
  period = EXCLUDED.period,
  gpa = EXCLUDED.gpa,
  completed_credits = EXCLUDED.completed_credits,
  honors = EXCLUDED.honors,
  display_order = EXCLUDED.display_order,
  is_published = EXCLUDED.is_published;

-- ==================================================
-- 4. SKILLS SEED DATA
-- ==================================================

INSERT INTO public.skills (
  id,
  category,
  name,
  display_order,
  is_published
)
VALUES
(
  '30000000-0000-0000-0000-000000000001'::uuid,
  'PLC & Automation',
  'CX Programmer',
  1,
  true
),
(
  '30000000-0000-0000-0000-000000000002'::uuid,
  'PLC & Automation',
  'FluidSim',
  2,
  true
),
(
  '30000000-0000-0000-0000-000000000003'::uuid,
  'PLC & Automation',
  'EcoStruxure',
  3,
  true
),
(
  '30000000-0000-0000-0000-000000000004'::uuid,
  'HMI & Control',
  'LabVIEW',
  4,
  true
),
(
  '30000000-0000-0000-0000-000000000005'::uuid,
  'HMI & Control',
  'Nextion',
  5,
  true
),
(
  '30000000-0000-0000-0000-000000000006'::uuid,
  'HMI & Control',
  'CX Designer',
  6,
  true
),
(
  '30000000-0000-0000-0000-000000000007'::uuid,
  'Embedded & Microcontrollers',
  'Arduino',
  7,
  true
),
(
  '30000000-0000-0000-0000-000000000008'::uuid,
  'Embedded & Microcontrollers',
  'PlatformIO',
  8,
  true
),
(
  '30000000-0000-0000-0000-000000000009'::uuid,
  'PCB & Electronics',
  'EasyEDA',
  9,
  true
),
(
  '30000000-0000-0000-0000-000000000010'::uuid,
  'PCB & Electronics',
  'Proteus',
  10,
  true
),
(
  '30000000-0000-0000-0000-000000000011'::uuid,
  'PCB & Electronics',
  'Eagle',
  11,
  true
),
(
  '30000000-0000-0000-0000-000000000012'::uuid,
  'Web & Mobile',
  'React',
  12,
  true
),
(
  '30000000-0000-0000-0000-000000000013'::uuid,
  'Web & Mobile',
  'Flutter',
  13,
  true
),
(
  '30000000-0000-0000-0000-000000000014'::uuid,
  'Web & Mobile',
  'Full-stack development',
  14,
  true
),
(
  '30000000-0000-0000-0000-000000000015'::uuid,
  '3D & Mechanical',
  'SolidWorks',
  15,
  true
),
(
  '30000000-0000-0000-0000-000000000016'::uuid,
  '3D & Mechanical',
  'Fusion 360',
  16,
  true
),
(
  '30000000-0000-0000-0000-000000000017'::uuid,
  'Editing & Design',
  'CapCut',
  17,
  true
),
(
  '30000000-0000-0000-0000-000000000018'::uuid,
  'Editing & Design',
  'Affinity',
  18,
  true
),
(
  '30000000-0000-0000-0000-000000000019'::uuid,
  'Editing & Design',
  'Adobe Illustrator',
  19,
  true
)
ON CONFLICT (id) DO UPDATE SET
  category = EXCLUDED.category,
  name = EXCLUDED.name,
  display_order = EXCLUDED.display_order,
  is_published = EXCLUDED.is_published;
