const app = require('express')();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


const PORT = 1337;

let clients = [];
let myarr = [];

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
    const data = `data: ${JSON.stringify(myarr)}\n\n`;

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

function sendEventsToAll(newJoke) {
    clients.forEach(client => client.res.write(`data: ${JSON.stringify(newJoke)}\n\n`));
}

async function addJoke(req, res, next) {
    const newJoke = await req.body;

    myarr = [...myarr, newJoke];
    res.json(newJoke);
    return sendEventsToAll(newJoke);
}

app.get('/status', (req, res) => {
    res.send(myarr);
})

app.post('/joke', addJoke);
app.post('/userjoke', (req, res) => {
    const userJoke = req.body;
    myarr.push(req.body);
    return sendEventsToAll(userJoke);
})

///////********** */
