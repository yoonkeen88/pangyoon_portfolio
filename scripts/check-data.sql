-- 생성된 데이터 확인
SELECT 'Users' as table_name, count(*) as count FROM users
UNION ALL
SELECT 'Profiles', count(*) FROM profiles
UNION ALL
SELECT 'About Sections', count(*) FROM about_sections
UNION ALL
SELECT 'Skills', count(*) FROM skills
UNION ALL
SELECT 'Projects', count(*) FROM projects
UNION ALL
SELECT 'Educations', count(*) FROM educations
UNION ALL
SELECT 'Interests', count(*) FROM interests
UNION ALL
SELECT 'Blog Posts', count(*) FROM blog_posts
UNION ALL
SELECT 'Blog Tags', count(*) FROM blog_tags;

-- 프로필 정보 확인
SELECT name, title, bio FROM profiles LIMIT 1;

-- 프로젝트 확인
SELECT title, project_type, is_featured FROM projects ORDER BY display_order;
