import { supabase } from "./supabase"

export interface User {
  id: string
  email: string
  name: string
  avatar_url: string | null
  created_at: string
}

export async function signUp(email: string, password: string, name: string) {
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  })

  if (authError) {
    return { user: null, error: authError.message }
  }

  if (authData.user) {
    // Create user profile
    const { error: profileError } = await supabase.from("users").insert({
      id: authData.user.id,
      email: authData.user.email!,
      name: name,
    })

    if (profileError) {
      console.error("Error creating user profile:", profileError)
    }
  }

  return { user: authData.user, error: null }
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { user: null, error: error.message }
  }

  return { user: data.user, error: null }
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  return { error: error?.message || null }
}

export async function getCurrentUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  const { data: profile } = await supabase.from("users").select("*").eq("id", user.id).single()

  return profile as User
}

export async function updateUserProfile(userId: string, updates: Partial<User>) {
  const { data, error } = await supabase.from("users").update(updates).eq("id", userId).select().single()

  if (error) {
    return { user: null, error: error.message }
  }

  return { user: data, error: null }
}
