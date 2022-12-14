import dayjs, { Dayjs } from "dayjs"
import { FirebaseError } from "firebase/app"
import { NextRouter } from "next/router"
import store from "store/index"
import { setAlert, setModal } from "store/reducers/modal.slice"
import { Message, SortedMessage } from "types/discuss"
import { Timestamp } from "types/index"
import { DBQuiz } from "types/quiz"
import { LightQuiz } from "types/user"

/**
 * @param array
 * @returns Shuffled array
 */
export function randomize<T>(array: T[]) {
  return [...array].sort((a, b) => Math.random() - 0.5)
}

/**
 * @returns clamped value between min and max params
 */
export function clamp(min: number, value: number, max: number) {
  return Math.max(min, Math.min(value, max))
}

/**
 * @returns range as an array of numbers from start to end
 */
export function range(start: number, end: number) {
  let length = end - start + 1
  return Array.from({ length }, (_, idx) => idx + start)
}

export function sortMessages(
  messages: Message[] | undefined,
  order: "recent" | "old" | "relevant"
): SortedMessage[] {
  if (!messages) return [] as SortedMessage[]
  const msgArray = messages.map((msg, index) => ({
    ...msg,
    index,
  })) as SortedMessage[]
  if (order == "recent") {
    return [...msgArray].sort(
      (a, b) => b.published._seconds - a.published._seconds
    )
  }
  if (order == "old") {
    return [...msgArray].sort(
      (a, b) => a.published._seconds - b.published._seconds
    )
  }
  if (order == "relevant") {
    return [...msgArray].sort((a, b) =>
      b.score - a.score == 0
        ? b.published._seconds - a.published._seconds
        : b.score - a.score
    )
  }
  return msgArray
}

export function protect<T extends (...args: any) => void>(
  func: T,
  errMsg?: string
) {
  return ((...args: any) => {
    if (!store.getState().auth.user) {
      store.dispatch(
        setAlert({
          message: errMsg ?? "Vous devez être connecté pour faire ça",
          error: true,
        })
      )
      store.dispatch(setModal({ modal: "login" }))
      return
    }
    func(...args)
  }) as T
}

export function isFirebaseError(err: unknown): err is FirebaseError {
  function isObject(
    given: unknown
  ): given is Partial<Record<keyof FirebaseError, unknown>> {
    return typeof given === "object" && given !== null
  }

  return (
    isObject(err) &&
    typeof err.name === "string" &&
    typeof err.message === "string"
  )
}

export function formatDate(seconds: number) {
  const day = dayjs(seconds * 1000)
  if (day.format("DD/MM/YYYY") == dayjs().format("DD/MM/YYYY")) {
    return day.format("HH[h]mm")
  }
  if (day.format("YYYY") == dayjs().format("YYYY")) {
    return day.format("DD MMM")
  }
  return day.format("DD MMM YYYY")
}

export function toSlug(value: string) {
  return value.toLowerCase().replace(/\s+/g, "")
}

export function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60)
  return minutes > 0 ? `${minutes}m${seconds - minutes * 60}s` : `${seconds}s`
}

export function randomRange(min: number, max: number) {
  const random = Math.floor(Math.random() * (max - min) + min)
  return random
}

/**
 *
 * @param value The boolean to compare to b
 * @returns True if booleans are equal
 */
export function check(value: boolean, b: boolean) {
  return b ? value : !value
}

export function toLightQuiz(quiz: DBQuiz, quizId: string) {
  return {
    ...quiz,
    id: quizId,
    questions: {
      length: quiz.questions.length,
    },
  } as LightQuiz
}

export function timestamp(dayjs: Dayjs) {
  return {
    _seconds: dayjs.unix(),
    _nanoseconds: 0,
  } as Timestamp
}

export function getQuizId(router: NextRouter) {
  const quizId = router.query.id
  if (!quizId) {
    throw new Error("No 'id' param in router query")
  }
  return quizId as string
}
