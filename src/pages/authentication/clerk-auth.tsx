import { SignedOut, SignInButton, SignedIn, UserButton } from '@clerk/clerk-react'
import React from 'react'

const ClerkAuth = () => {
  return (
    <div>
       <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  )
}

export default ClerkAuth
