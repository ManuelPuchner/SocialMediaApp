import { useState } from "react";
import { useRouter } from "next/router";
import {
  FormInput,
  FormLabel,
  FormSubmit,
  FormHeader,
} from "components/FormComponents";

const Index = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState({});

  async function submit(e) {
    e.preventDefault();

    const promise = await fetch(`${router.basePath}/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
    });

    const result = await promise.json();

    console.log(result);
    if (result.status == "ok") {
      // Make sure we're in the browser
      if (typeof window !== "undefined") {
        router.push("/login");
      }
    } else {
      setStatus(result);
    }

    clearForm();
  }
  function clearForm() {
    setUsername("");
    setPassword("");
  }
  return (
    <div className="h-full flex justify-center items-center">
      <form
        onSubmit={submit}
        className="
          flex
          flex-col
          w-96
          p-8 
          rounded-xl 
          bg-white 
          bg-opacity-40 
          backdrop-filter 
          backdrop-blur-md
        "
      >
        <FormHeader>Sign Up</FormHeader>
        <FormLabel>Username</FormLabel>
        <FormInput
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <FormLabel>Password</FormLabel>
        <FormInput
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <FormSubmit type="submit" value="Sign Up" />

        {status.error && (
          <div
            className="
              py-1
              px-2
              mt-5
              rounded-sm 
              ring-red-600
              ring-2
            "
          >
            {status.error}
          </div>
        )}
      </form>
    </div>
  );
};

export default Index;
