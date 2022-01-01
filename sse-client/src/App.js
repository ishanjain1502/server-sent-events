
import React, { useEffect, useState } from "react";
import "./App.css";

function App() {

  const [jokes, setJokes] = useState([]);
  const [listening, setListening] = useState(false);
  const [usrJoke, setUsrJoke] = useState("");
  const [auth, setAuth] = useState("");


  useEffect(() => {
    if (!listening) {
      const events = new EventSource("http://localhost:1337/events");

      events.onmessage = (event) => {
        const parsedData = JSON.parse(event.data);
        setJokes((jokes) => jokes.concat(parsedData));
      };

      setListening(true);
    }
  }, [listening, jokes]);

  function submitHandler(e) {
    e.preventDefault();
    let str = {
      "joke": usrJoke,
      "author": auth
    }

    fetch('http://localhost:1337/userjoke', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(str)
    }).then(() => {
      console.log('new joke added');
    }).catch((err) => {
      console.log(err);
    })
    console.log(str);


    // console.log(auth);

    // console.log(str);

  }

  return (
    <div className="App">
      <h1>Joke Monitor &nbsp;👓  &nbsp; </h1>
      <header className="App-header">

        {/* form------- */}
        <form className="form" onSubmit={submitHandler}>
          Joke&nbsp;
          <input type="text" placeholder="Joke" value={usrJoke}
            onChange={(event) => setUsrJoke(event.target.value)} />
          <br /><br />
          Author &nbsp;
          <input type="text" placeholder="Author" value={auth}
            onChange={(event) => setAuth(event.target.value)}
          />
          <br />
          <button className="sendButton" type="submit">Send</button>

        </form>

        <table className="stats-table">
          <thead>
            <tr>
              <th>Joke</th>
              <th>Author</th>
            </tr>
          </thead>
          <tbody>
            {jokes.map((joke, i) => (
              <tr key={i}>
                <td>{joke.joke}</td>
                <td>{joke.author}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </header>
    </div>
  );
}

export default App;
