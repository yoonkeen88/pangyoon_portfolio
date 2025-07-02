-- 프로필 정보 테이블
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL DEFAULT '안광윤',
  title VARCHAR(200) NOT NULL DEFAULT '풀스택 개발자',
  bio TEXT NOT NULL DEFAULT '창의적인 문제 해결과 혁신적인 기술로 더 나은 디지털 경험을 만들어갑니다.',
  avatar_url TEXT,
  email VARCHAR(255),
  phone VARCHAR(50),
  location VARCHAR(100) DEFAULT '서울, 대한민국',
  github_url TEXT,
  linkedin_url TEXT,
  twitter_url TEXT,
  resume_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 소개 섹션 테이블 (동적으로 관리 가능한 소개 내용)
CREATE TABLE IF NOT EXISTS about_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  content TEXT NOT NULL,
  section_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 기술 스택 테이블
CREATE TABLE IF NOT EXISTS skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  category VARCHAR(100) NOT NULL, -- 'frontend', 'backend', 'database', 'tools', etc.
  proficiency INTEGER CHECK (proficiency >= 1 AND proficiency <= 100) DEFAULT 50,
  years_of_experience DECIMAL(3,1) DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 프로젝트/경험 테이블
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  detailed_description TEXT,
  project_type VARCHAR(50) NOT NULL, -- 'work', 'personal', 'freelance', 'open-source'
  company VARCHAR(200),
  role VARCHAR(200),
  start_date DATE,
  end_date DATE,
  is_current BOOLEAN DEFAULT false,
  technologies TEXT[], -- 사용된 기술들
  project_url TEXT,
  github_url TEXT,
  image_url TEXT,
  achievements TEXT[], -- 주요 성과들
  challenges TEXT[], -- 해결한 문제들
  is_featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 교육/자격증 테이블
CREATE TABLE IF NOT EXISTS educations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  institution VARCHAR(200) NOT NULL,
  degree VARCHAR(200),
  field_of_study VARCHAR(200),
  start_date DATE,
  end_date DATE,
  is_current BOOLEAN DEFAULT false,
  description TEXT,
  grade VARCHAR(50),
  education_type VARCHAR(50) NOT NULL, -- 'degree', 'certification', 'course', 'bootcamp'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 관심 분야 테이블
CREATE TABLE IF NOT EXISTS interests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS (Row Level Security) 정책 설정
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE educations ENABLE ROW LEVEL SECURITY;
ALTER TABLE interests ENABLE ROW LEVEL SECURITY;

-- 프로필은 모든 사람이 읽을 수 있지만, 소유자만 수정 가능
CREATE POLICY "Profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 소개 섹션도 동일한 정책
CREATE POLICY "About sections are viewable by everyone" ON about_sections FOR SELECT USING (true);
CREATE POLICY "Users can manage own about sections" ON about_sections FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = about_sections.profile_id AND profiles.user_id = auth.uid())
);

-- 기술 스택도 동일한 정책
CREATE POLICY "Skills are viewable by everyone" ON skills FOR SELECT USING (true);
CREATE POLICY "Users can manage own skills" ON skills FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = skills.profile_id AND profiles.user_id = auth.uid())
);

-- 프로젝트도 동일한 정책
CREATE POLICY "Projects are viewable by everyone" ON projects FOR SELECT USING (true);
CREATE POLICY "Users can manage own projects" ON projects FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = projects.profile_id AND profiles.user_id = auth.uid())
);

-- 교육/자격증도 동일한 정책
CREATE POLICY "Educations are viewable by everyone" ON educations FOR SELECT USING (true);
CREATE POLICY "Users can manage own educations" ON educations FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = educations.profile_id AND profiles.user_id = auth.uid())
);

-- 관심 분야도 동일한 정책
CREATE POLICY "Interests are viewable by everyone" ON interests FOR SELECT USING (true);
CREATE POLICY "Users can manage own interests" ON interests FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = interests.profile_id AND profiles.user_id = auth.uid())
);

-- 업데이트 트리거 함수
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 업데이트 트리거 생성
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_about_sections_updated_at BEFORE UPDATE ON about_sections FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_skills_updated_at BEFORE UPDATE ON skills FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_educations_updated_at BEFORE UPDATE ON educations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
