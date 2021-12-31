const app = require('express')();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/status', (req, res) => {
    res.json({ clients: clients.length });
})

const PORT = 3001;

let clients = [];
let facts = [];

app.listen(PORT, () => {
    console.log(`Listening on port number = ${PORT}`);
})

function eventHandler(req, res, next) {
    const headers = {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache'
    };

    res.writeHead(200, headers);
    const data = `joke: ${JSON.stringify(facts)}\n\n`;

    res.write(data);

    const clientId = Date.now();

    const newClient = {
        id: clientId,
        res
    };

    clients.push(newClient);

    req.on('close', () => {
        console.log(`${clientId} Connection closed`);
        clients = clients.filter(client => client.id !== clientId);
    });
}

app.get('/events', eventHandler);

function sendEventsToAll(newFact) {
    clients.forEach(client => client.res.write(`joke: ${JSON.stringify(newFact)}\n\n`));
}

async function addFact(req, res, next) {
    const newFact = req.body;
    facts.push(newFact);
    res.json(newFact);
    return sendEventsToAll(newFact);
}

app.post('/fact', addFact);