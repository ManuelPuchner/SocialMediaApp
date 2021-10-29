import { useState } from "react";

import {
  FormInput,
  FormLabel,
  FormSubmit,
  FormHeader,
} from "components/Layout/FormComponents";

const Index = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function submit(e) {
    e.preventDefault();
    console.log(username, password);
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
        className="flex flex-col w-96 p-8 rounded-xl bg-white bg-opacity-40 backdrop-filter backdrop-blur-md"
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

        <FormSubmit type="submit" value="Login" />
      </form>
    </div>
  );
};

export default Index;
