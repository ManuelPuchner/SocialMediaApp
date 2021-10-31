import { useState } from "react";
export default function Home() {
  const [users, setUsers] = useState()
  async function test() {
    const result = await fetch(`${window.location.origin}/api/hello`)
    const json = await result.json()
    setUsers(json)
  }
  return (
    <div>
      <button onClick={test}>test</button>
      <div>{JSON.stringify(users)}</div>
    </div>
  );
}
