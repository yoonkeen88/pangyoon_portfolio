-- ============================================
-- 기존 정책 삭제 후 다시 생성
-- ============================================

-- 기존 정책들 삭제
DROP POLICY IF EXISTS "Public read access" ON profiles;
DROP POLICY IF EXISTS "Public read access" ON about_sections;
DROP POLICY IF EXISTS "Public read access" ON skills;
DROP POLICY IF EXISTS "Public read access" ON projects;
DROP POLICY IF EXISTS "Public read access" ON educations;
DROP POLICY IF EXISTS "Public read access" ON interests;
DROP POLICY IF EXISTS "Public read access" ON blog_posts;
DROP POLICY IF EXISTS "Public read access" ON blog_tags;
DROP POLICY IF EXISTS "Public read access" ON blog_post_tags;
DROP POLICY IF EXISTS "Public read access" ON blog_comments;
DROP POLICY IF EXISTS "Public read access" ON social_links;

DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;

-- 새로운 정책 생성
CREATE POLICY "profiles_public_read" ON profiles FOR SELECT USING (true);
CREATE POLICY "about_sections_public_read" ON about_sections FOR SELECT USING (true);
CREATE POLICY "skills_public_read" ON skills FOR SELECT USING (true);
CREATE POLICY "projects_public_read" ON projects FOR SELECT USING (true);
CREATE POLICY "educations_public_read" ON educations FOR SELECT USING (true);
CREATE POLICY "interests_public_read" ON interests FOR SELECT USING (true);
CREATE POLICY "blog_posts_public_read" ON blog_posts FOR SELECT USING (true);
CREATE POLICY "blog_tags_public_read" ON blog_tags FOR SELECT USING (true);
CREATE POLICY "blog_post_tags_public_read" ON blog_post_tags FOR SELECT USING (true);
CREATE POLICY "blog_comments_public_read" ON blog_comments FOR SELECT USING (true);
CREATE POLICY "social_links_public_read" ON social_links FOR SELECT USING (true);

-- 소유자 권한 정책
CREATE POLICY "profiles_owner_update" ON profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "profiles_owner_insert" ON profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 관련 테이블들도 소유자 권한 추가
CREATE POLICY "about_sections_owner_all" ON about_sections FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = about_sections.profile_id AND profiles.user_id = auth.uid())
);

CREATE POLICY "skills_owner_all" ON skills FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = skills.profile_id AND profiles.user_id = auth.uid())
);

CREATE POLICY "projects_owner_all" ON projects FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = projects.profile_id AND profiles.user_id = auth.uid())
);

CREATE POLICY "educations_owner_all" ON educations FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = educations.profile_id AND profiles.user_id = auth.uid())
);

CREATE POLICY "interests_owner_all" ON interests FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = interests.profile_id AND profiles.user_id = auth.uid())
);

-- 댓글은 로그인한 사용자만 작성 가능
CREATE POLICY "blog_comments_authenticated_insert" ON blog_comments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "blog_comments_owner_update" ON blog_comments FOR UPDATE USING (auth.uid() = user_id);

-- 연락처 메시지는 로그인한 사용자만 작성 가능
CREATE POLICY "contact_messages_authenticated_insert" ON contact_messages FOR INSERT WITH CHECK (auth.uid() = sender_id);
