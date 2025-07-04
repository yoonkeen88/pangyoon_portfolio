import { supabase } from "./supabase"

export interface User {
  id: string
  email: string
  name: string
  avatar_url: string | null
  is_admin: boolean
  created_at: string
}

// 사용자 회원가입 (일반 사용자용 - is_admin은 false로 고정)
export async function signUp(email: string, password: string, name: string): Promise<{ user: User | null; error: string | null }> {
  try {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    })

    if (authError) {
      console.error("Supabase signUp error:", authError)
      return { user: null, error: authError.message }
    }

    if (authData.user) {
      // users 테이블에 사용자 정보 추가 (is_admin: false로 고정)
      const { data: newUser, error: insertError } = await supabase
        .from("users")
        .insert({
          id: authData.user.id,
          email: authData.user.email!,
          name: name,
          avatar_url: authData.user.user_metadata.avatar_url || null,
          is_admin: false, // 회원가입 시 기본값은 일반 사용자
        })
        .select()
        .single()

      if (insertError) {
        console.error("Error inserting new user into 'users' table:", insertError)
        // users 테이블 삽입 실패 시에도 Supabase auth에는 계정 생성되었으므로,
        // 사용자에게 이메일 인증을 요청하고 로그인 페이지로 리다이렉트하도록 처리
        return { user: null, error: "회원가입은 완료되었으나, 사용자 정보 저장에 실패했습니다. 다시 로그인해주세요." }
      }

      return { user: newUser as User, error: null }
    }

    return { user: null, error: "알 수 없는 회원가입 오류가 발생했습니다." }
  } catch (err) {
    console.error("Unexpected error during signUp:", err)
    return { user: null, error: "예상치 못한 오류가 발생했습니다." }
  }
}

// 사용자 로그인
export async function signIn(email: string, password: string): Promise<{ user: User | null; error: string | null }> {
  try {
    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError) {
      console.error("Supabase signIn error:", authError)
      return { user: null, error: authError.message }
    }

    if (data.user) {
      // 사용자 프로필 정보 가져오기 (is_admin 포함)
      const { data: profileData, error: profileError } = await supabase
        .from("users")
        .select("id, email, name, avatar_url, is_admin, created_at")
        .eq("id", data.user.id)
        .single()

      if (profileError) {
        console.error("Error fetching user profile:", profileError)
        // 프로필 정보 가져오기 실패 시에도 로그인 자체는 성공했으므로, 기본 사용자 정보 반환
        return {
          user: {
            id: data.user.id,
            email: data.user.email || "",
            name: data.user.user_metadata.name || data.user.email || "User",
            avatar_url: data.user.user_metadata.avatar_url || null,
            is_admin: false, // 프로필 정보 없으면 일단 false
            created_at: new Date().toISOString(), // 임시 값
          },
          error: null,
        }
      }

      return { user: profileData as User, error: null }
    }

    return { user: null, error: "알 수 없는 로그인 오류가 발생했습니다." }
  } catch (err) {
    console.error("Unexpected error during signIn:", err)
    return { user: null, error: "예상치 못한 오류가 발생했습니다." }
  }
}

// 현재 로그인된 사용자 정보 가져오기
export async function getCurrentUser(): Promise<User | null> {
  try {
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession()

    if (sessionError) {
      console.error("Error getting session:", sessionError)
      return null
    }

    if (!sessionData.session) {
      return null
    }

    // Supabase auth user ID로 users 테이블에서 프로필 정보 가져오기
    const { data: profileData, error: profileError } = await supabase
      .from("users")
      .select("id, email, name, avatar_url, is_admin, created_at")
      .eq("id", sessionData.session.user.id)
      .single()

    if (profileError) {
      console.error("Error fetching user profile in getCurrentUser:", profileError)
      return null
    }

    return profileData as User
  } catch (err) {
    console.error("Unexpected error in getCurrentUser:", err)
    return null
  }
}

// 사용자 로그아웃
export async function signOut(): Promise<{ error: string | null }> {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error("Supabase signOut error:", error)
      return { error: error.message }
    }
    return { error: null }
  } catch (err) {
    console.error("Unexpected error during signOut:", err)
    return { error: "예상치 못한 오류가 발생했습니다." }
  }
}

// 비밀번호 재설정 이메일 전송
export async function sendPasswordResetEmail(email: string): Promise<{ error: string | null }> {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/update-password`, // 실제 환경에 맞게 조정 필요
    })
    if (error) {
      console.error("Supabase resetPasswordForEmail error:", error)
      return { error: error.message }
    }
    return { error: null }
  } catch (err) {
    console.error("Unexpected error during sendPasswordResetEmail:", err)
    return { error: "예상치 못한 오류가 발생했습니다." }
  }
}

// 새 비밀번호 업데이트
export async function updatePassword(newPassword: string): Promise<{ error: string | null }> {
  try {
    const { error } = await supabase.auth.updateUser({ password: newPassword })
    if (error) {
      console.error("Supabase updateUser password error:", error)
      return { error: error.message }
    }
    return { error: null }
  } catch (err) {
    console.error("Unexpected error during updatePassword:", err)
    return { error: "예상치 못한 오류가 발생했습니다." }
  }
}

// 사용자 정보 업데이트 (이름, 아바타 등)
export async function updateUserProfile(userId: string, updates: Partial<User>): Promise<{ user: User | null; error: string | null }> {
  try {
    // Supabase Auth 사용자 메타데이터 업데이트
    const { data: authData, error: authError } = await supabase.auth.updateUser({
      data: {
        name: updates.name,
        avatar_url: updates.avatar_url,
      },
    })

    if (authError) {
      console.error("Supabase updateUser auth error:", authError)
      return { user: null, error: authError.message }
    }

    if (authData.user) {
      // users 테이블 업데이트
      const { data: updatedUser, error: updateError } = await supabase
        .from("users")
        .update({
          name: updates.name,
          avatar_url: updates.avatar_url,
        })
        .eq("id", authData.user.id)
        .select("id, email, name, avatar_url, is_admin, created_at") // is_admin 포함하여 선택
        .single()

      if (updateError) {
        console.error("Error updating user in 'users' table:", updateError)
        return { user: null, error: "사용자 정보 업데이트에 실패했습니다." }
      }

      return { user: updatedUser as User, error: null }
    }

    return { user: null, error: "알 수 없는 사용자 정보 업데이트 오류가 발생했습니다." }
  } catch (err) {
    console.error("Unexpected error during updateUserProfile:", err)
    return { user: null, error: "예상치 못한 오류가 발생했습니다." }
  }
}