'use client'

import withAuth from "@/components/hoc/withAuth"

const Home = () => {
  return (
    <main>
      <h1>Welcome Home</h1>
    </main>
  )
}

export default withAuth(Home)
