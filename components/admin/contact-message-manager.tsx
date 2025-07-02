"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Mail, Calendar, User, MessageSquare, Check } from "lucide-react"
import { getContactMessages, updateMessageStatus } from "@/lib/admin-service"

interface ContactMessage {
  id: number
  sender_name: string
  sender_email: string
  subject: string
  message: string
  status: "unread" | "read" | "replied"
  created_at: string
}

export function ContactMessageManager() {
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null)

  useEffect(() => {
    loadMessages()
  }, [])

  const loadMessages = async () => {
    try {
      const contactMessages = await getContactMessages()
      setMessages(contactMessages)
    } catch (error) {
      console.error("Error loading messages:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusUpdate = async (messageId: number, status: string) => {
    try {
      await updateMessageStatus(messageId, status)
      setMessages(messages.map((msg) => (msg.id === messageId ? { ...msg, status: status as any } : msg)))
    } catch (error) {
      console.error("Error updating message status:", error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "unread":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "read":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "replied":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "unread":
        return "읽지 않음"
      case "read":
        return "읽음"
      case "replied":
        return "답변 완료"
      default:
        return status
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">연락 메시지 관리</h2>
        <div className="flex space-x-2">
          <Badge variant="outline" className="bg-red-50 text-red-700">
            읽지 않음: {messages.filter((m) => m.status === "unread").length}
          </Badge>
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
            읽음: {messages.filter((m) => m.status === "read").length}
          </Badge>
          <Badge variant="outline" className="bg-green-50 text-green-700">
            답변 완료: {messages.filter((m) => m.status === "replied").length}
          </Badge>
        </div>
      </div>

      <div className="grid gap-4">
        {messages.map((message) => (
          <Card key={message.id} className={message.status === "unread" ? "border-red-200 dark:border-red-800" : ""}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{message.subject}</h3>
                    <Badge className={getStatusColor(message.status)}>{getStatusText(message.status)}</Badge>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                    <div className="flex items-center">
                      <User className="mr-1 h-4 w-4" />
                      {message.sender_name}
                    </div>
                    <div className="flex items-center">
                      <Mail className="mr-1 h-4 w-4" />
                      {message.sender_email}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-4 w-4" />
                      {new Date(message.created_at).toLocaleDateString("ko-KR")}
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 line-clamp-2">{message.message}</p>
                </div>
                <div className="flex space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedMessage(message)
                          if (message.status === "unread") {
                            handleStatusUpdate(message.id, "read")
                          }
                        }}
                      >
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>{message.subject}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium">보낸 사람:</span> {message.sender_name}
                          </div>
                          <div>
                            <span className="font-medium">이메일:</span> {message.sender_email}
                          </div>
                          <div>
                            <span className="font-medium">날짜:</span>{" "}
                            {new Date(message.created_at).toLocaleString("ko-KR")}
                          </div>
                          <div>
                            <span className="font-medium">상태:</span>
                            <Badge className={`ml-2 ${getStatusColor(message.status)}`}>
                              {getStatusText(message.status)}
                            </Badge>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">메시지 내용:</h4>
                          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                            <p className="whitespace-pre-wrap">{message.message}</p>
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <Button variant="outline" asChild>
                            <a href={`mailto:${message.sender_email}?subject=Re: ${message.subject}`}>
                              <Mail className="mr-2 h-4 w-4" />
                              답장하기
                            </a>
                          </Button>
                          <div className="space-x-2">
                            {message.status !== "replied" && (
                              <Button variant="outline" onClick={() => handleStatusUpdate(message.id, "replied")}>
                                <Check className="mr-2 h-4 w-4" />
                                답변 완료로 표시
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  {message.status === "unread" && (
                    <Button variant="ghost" size="sm" onClick={() => handleStatusUpdate(message.id, "read")}>
                      <Check className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {messages.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">메시지가 없습니다</h3>
            <p className="text-gray-600 dark:text-gray-400">아직 받은 연락 메시지가 없습니다.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
