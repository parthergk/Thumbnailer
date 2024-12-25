'use client'
import { useSession, signIn, signOut } from "next-auth/react"

export default function Component() {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
    <div className="mt-16 text-black">
      Not signed in <br />
      <button className=" border px-2" onClick={() => signIn()}>Sign in</button>
      </div>
    </>
  )
}