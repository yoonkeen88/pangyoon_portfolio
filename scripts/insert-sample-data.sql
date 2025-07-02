-- ============================================
-- 샘플 데이터 삽입
-- ============================================

-- 1. 샘플 프로필 (실제로는 auth.users의 실제 UUID 사용해야 함)
INSERT INTO profiles (
  id,
  user_id,
  name,
  title,
  bio,
  email,
  phone,
  location,
  github_url,
  linkedin_url
) VALUES (
  'profile-001',
  'user-001', -- 실제 환경에서는 실제 user_id 사용
  '안광윤',
  '풀스택 개발자',
  '창의적인 문제 해결과 혁신적인 기술로 더 나은 디지털 경험을 만들어갑니다. 3년차 개발자로서 사용자 중심의 웹 애플리케이션 개발에 열정을 가지고 있습니다.',
  'kwangyoon.an@example.com',
  '010-1234-5678',
  '서울, 대한민국',
  'https://github.com/kwangyoon-an',
  'https://linkedin.com/in/kwangyoon-an'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  title = EXCLUDED.title,
  bio = EXCLUDED.bio;

-- 2. 소개 섹션
INSERT INTO about_sections (profile_id, title, content, section_order) VALUES
('profile-001', '개발자로서의 여정', '안녕하세요! 저는 3년차 풀스택 개발자 안광윤입니다. 사용자 중심의 웹 애플리케이션을 개발하는 것에 열정을 가지고 있습니다.', 1),
('profile-001', '기술적 관심사', '최근에는 데이터 분석과 머신러닝에도 관심을 가지고 있어, Python을 활용한 데이터 시각화와 예측 모델 구축 프로젝트를 진행하고 있습니다.', 2),
('profile-001', '개발 철학', '개발자로서 단순히 코드를 작성하는 것을 넘어서, 사용자의 문제를 해결하고 비즈니스 가치를 창출하는 솔루션을 만드는 것이 목표입니다.', 3)
ON CONFLICT DO NOTHING;

-- 3. 기술 스택
INSERT INTO skills (profile_id, name, category, proficiency, years_of_experience, is_featured) VALUES
('profile-001', 'JavaScript', 'frontend', 90, 3.0, true),
('profile-001', 'TypeScript', 'frontend', 85, 2.5, true),
('profile-001', 'React', 'frontend', 88, 2.5, true),
('profile-001', 'Next.js', 'frontend', 82, 2.0, true),
('profile-001', 'Node.js', 'backend', 80, 2.0, true),
('profile-001', 'Python', 'backend', 85, 2.5, true),
('profile-001', 'PostgreSQL', 'database', 75, 2.0, false),
('profile-001', 'Git', 'tools', 85, 3.0, false),
('profile-001', 'Docker', 'tools', 70, 1.0, false),
('profile-001', 'AWS', 'cloud', 65, 1.0, false)
ON CONFLICT DO NOTHING;

-- 4. 프로젝트
INSERT INTO projects (
  profile_id, title, description, detailed_description, project_type, company, role,
  start_date, end_date, is_current, technologies, project_url, github_url,
  achievements, challenges, is_featured, display_order
) VALUES
(
  'profile-001',
  '전자상거래 플랫폼 개발',
  'Next.js와 Supabase를 활용한 풀스택 전자상거래 웹사이트 개발',
  '중소기업을 위한 맞춤형 전자상거래 플랫폼을 개발했습니다. 사용자 친화적인 UI/UX와 관리자 대시보드를 구현하여 매출 증대에 기여했습니다.',
  'work',
  '테크 스타트업',
  '프론트엔드 개발자',
  '2023-03-01',
  '2023-12-31',
  false,
  ARRAY['Next.js', 'TypeScript', 'Supabase', 'Tailwind CSS', 'Stripe'],
  'https://example-ecommerce.com',
  'https://github.com/kwangyoon-an/ecommerce-platform',
  ARRAY['월 매출 300% 증가', '페이지 로딩 속도 40% 개선', '사용자 만족도 95% 달성'],
  ARRAY['대용량 트래픽 처리', '결제 시스템 보안 강화', '반응형 디자인 최적화'],
  true,
  1
),
(
  'profile-001',
  '개인 포트폴리오 웹사이트',
  'React와 Next.js로 구축한 반응형 포트폴리오 사이트',
  '개인 브랜딩을 위한 포트폴리오 웹사이트를 개발했습니다. 블로그 기능과 프로젝트 관리 시스템을 포함하여 개인 작업물을 효과적으로 전시할 수 있습니다.',
  'personal',
  null,
  '개인 프로젝트',
  '2024-01-01',
  null,
  true,
  ARRAY['Next.js', 'TypeScript', 'Supabase', 'Tailwind CSS'],
  'https://kwangyoon-an.dev',
  'https://github.com/kwangyoon-an/portfolio',
  ARRAY['SEO 최적화로 검색 노출 증대', '모바일 최적화 완료', '블로그 조회수 월 1000+ 달성'],
  ARRAY['SEO 최적화', '성능 최적화', '접근성 개선'],
  true,
  2
)
ON CONFLICT DO NOTHING;

-- 5. 교육/자격증
INSERT INTO educations (
  profile_id, institution, degree, field_of_study, start_date, end_date,
  is_current, description, education_type
) VALUES
('profile-001', '서울대학교', '컴퓨터공학과 학사', '컴퓨터공학', '2018-03-01', '2022-02-28', false, '컴퓨터 과학의 기초부터 고급 알고리즘까지 체계적으로 학습', 'degree'),
('profile-001', '한국산업인력공단', '정보처리기사', '정보처리', '2022-05-01', '2022-05-01', false, '정보시스템 개발 및 관리에 대한 전문 지식 인증', 'certification'),
('profile-001', 'AWS', 'Solutions Architect Associate', 'Cloud Computing', '2023-08-01', '2023-08-01', false, '클라우드 아키텍처 설계 및 구현 능력 인증', 'certification')
ON CONFLICT DO NOTHING;

-- 6. 관심 분야
INSERT INTO interests (profile_id, name, description) VALUES
('profile-001', '웹 개발', '최신 웹 기술과 프레임워크를 활용한 사용자 중심의 웹 애플리케이션 개발'),
('profile-001', '데이터 분석', 'Python과 SQL을 활용한 데이터 분석 및 인사이트 도출'),
('profile-001', 'UI/UX 디자인', '사용자 경험을 고려한 직관적이고 아름다운 인터페이스 설계'),
('profile-001', '오픈소스', '오픈소스 프로젝트 기여 및 커뮤니티 활동'),
('profile-001', '머신러닝', '데이터를 활용한 예측 모델 구축 및 AI 서비스 개발')
ON CONFLICT DO NOTHING;
