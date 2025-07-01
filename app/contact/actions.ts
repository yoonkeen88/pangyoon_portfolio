"use server"

import { createServerClient } from "@/lib/supabase"

export async function sendContactMessage(formData: FormData) {
  const supabase = createServerClient()

  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const subject = formData.get("subject") as string
  const message = formData.get("message") as string
  const userId = formData.get("userId") as string

  // 사용자 인증 확인
  if (!userId) {
    return {
      success: false,
      message: "로그인이 필요합니다.",
    }
  }

  // 사용자 정보 확인
  const { data: user, error: userError } = await supabase.from("users").select("*").eq("id", userId).single()

  if (userError || !user) {
    return {
      success: false,
      message: "사용자 정보를 찾을 수 없습니다.",
    }
  }

  try {
    // 연락처 메시지를 데이터베이스에 저장
    const { error: insertError } = await supabase.from("contact_messages").insert({
      sender_id: userId,
      sender_name: name,
      sender_email: email,
      subject: subject,
      message: message,
      status: "unread",
    })

    if (insertError) {
      console.error("Database insert error:", insertError)
      return {
        success: false,
        message: "메시지 저장 중 오류가 발생했습니다.",
      }
    }

    // 실제 환경에서는 여기서 이메일 서비스 (예: Resend, SendGrid 등)를 사용하여
    // 개발자의 이메일로 알림을 보낼 수 있습니다.

    // 예시: 개발자 이메일로 알림 전송 (실제 구현 시)
    // await sendEmailNotification({
    //   to: 'developer@example.com',
    //   subject: `새 연락 메시지: ${subject}`,
    //   html: `
    //     <h3>새로운 연락 메시지가 도착했습니다</h3>
    //     <p><strong>보낸 사람:</strong> ${name} (${email})</p>
    //     <p><strong>제목:</strong> ${subject}</p>
    //     <p><strong>내용:</strong></p>
    //     <p>${message}</p>
    //   `
    // })

    return {
      success: true,
      message: "메시지가 성공적으로 전송되었습니다. 빠른 시일 내에 답변드리겠습니다.",
    }
  } catch (error) {
    console.error("Contact message error:", error)
    return {
      success: false,
      message: "메시지 전송 중 오류가 발생했습니다.",
    }
  }
}
