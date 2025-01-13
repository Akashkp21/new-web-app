import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useAuthenticator } from '@aws-amplify/ui-react';

const client = generateClient<Schema>();

function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);
  const { user ,signOut } = useAuthenticator();

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  function createTodo() {
    client.models.Todo.create({ content: window.prompt("Todo content") });
  }

  return (
    <main>
      <h1>{user?.signInDetails?.loginId}'s Account</h1>
      <div>
        <h1>Happy Coding, Guys!</h1>
        <p class="glow">Code, create, and conquer!</p>
        <button class="button" onclick="alert('Thank You for your valuable Time 🙏!')">Click Here for surprise!🤩 </button>
    </div>
     <br></br>
      <button onClick={signOut}>Sign out</button>
    </main>
  );
}

export default App;
