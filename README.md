# server-sent-events
<h3>How to use:</h3>
Clone the repository<br/>
Than install dependencies for both client and server sides:<br/>
> cd server<br/>
> npm install
<br/><br/>
> cd ../
<br/><br/>
> cd sse-client<br/>
> npm install

<br/>
<br/>
Than run the react app by command:<br/> 
> npm start
<br/><br/>
While for Server Side:<br/>
First start the server using: <br/>
> node server.js
<br/>
<br/>
Than Start the server side events by:<br/>
> curl -H Accept:text/event-stream http://localhost:1337/events

# With this the setup of the app is complete try typing joke in the form provided, and the joke table will automatically get updated using the Server-Side-Events
