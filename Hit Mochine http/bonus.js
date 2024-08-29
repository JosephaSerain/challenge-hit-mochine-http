// Importer le module http
const http = require('http');

// On peut récupérer uniquement des parties d'un module si on veut (pour éviter de charger plein de trucs qu'on n'utilisera pas)
// Avantage : on ne charge que le strict nécessaire => gain de performance.
// Inconvénient : si on veut utiliser une autre partie du module, on est bon pour changer celle ligne en plus du reste.
const {type, freemem, totalmem} = require('os');

const statistiques = require("./my_modules/statistiques");

console.log(type());
console.log(freemem());
console.log(totalmem());

console.log(statistiques);
// console.log(statistiques.songCount);
// statistiques.songCount = 42;
// console.log(statistiques);
// console.log(statistiques.songCount);
// console.log(statistiques.getSongCount());
// statistiques.incrementSongCount();
// console.log(statistiques.getSongCount());
// statistiques.incrementSongCount();
// statistiques.incrementSongCount();
// statistiques.incrementSongCount();
// console.log(statistiques.getSongCount());

// Hit parade, classé du premier au dernier.
const hitParade = [
    {
        position: 1,
        artist: `Jain`,
        title: `Come`
    },
    {
        position: 2,
        artist: `Matt Simons`,
        title: `Catch & Realease`
    },
    {
        position: 3,
        artist: `Twety One Pilots`,
        title: `Stressed Out`,
    },
    {
        position: 4,
        artist: `Justin Bieber`,
        title: `Love Yourself`,
    },
    {
        position: 5,
        artist: `Kids United`,
        title: `On écrit sur les murs`,
    },
    {
        position: 6,
        artist: `Rihanna`,
        title: `Work`,
    },
    {
        position: 7,
        artist: `Julian Perretta`,
        title: `Miracle`,
    },
    {
        position: 8,
        artist: `Yall`,
        title: `Hundred Miles`,
    },
    {
        position: 9,
        artist: `Kendji Girac`,
        title: `No Me Mirès Màs`,
    },
    {
        position: 10,
        artist: `Feder`,
        title: `Blind (feat. Emmi)`,
    },
];

let title;
let body;

// Créer le serveur HTTP
const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    // res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});

    switch (req.url) {
        case '/':
            homepage();
            break;
        case '/classement':
            classement();
            break;
        case "/stats":
            stats();
            break;
        default:
            error404(req, res);
            break;
    }

    res.end(buildHtml());
});

server.listen(3000);

function homepage() {
    statistiques.incrementSongCount();

    title = 'Accueil';
    body = "Je m'appelle Charlu, je m'appelle Lili, vous êtes chez O'clock.";
}

function classement() {
    title = 'Classement';

    const classement = hitParade.map((song) => `
        <tr>
            <td>${song.position}</td>
            <td>${song.artist}</td>
            <td>${song.title}</td>
        </tr>
    `);

    body = `
        <table>
            <thead>
                <tr>
                    <th>Position</th>
                    <th>Artiste</th>
                    <th>Titre</th>
                </tr>
            </thead>
            <tbody>
                ${classement.join('\n')}
            </tbody>
        </table>
    `;
}

function stats() {
    title = 'Statistiques';
    body = `La chaîne a été vue ${statistiques.getsongCount} fois`;
}

function error404(request, response) {
    response.statusCode = 404;
    title = "404 Not Found";
    body = `La page demandée "${request.url}" n'existe pas`;
}

function buildHtml() {
    return `
        <!DOCTYPE html>
        <html>
            <head>
                <title>${title} - Hit Parade</title>
                <style>
                    table {
                        width: 50%;
                        border-collapse: collapse;
                    }
                    th, td {
                        border: 1px solid black;
                        padding: .25em .5em;
                    }
                    th {
                        background-color: gray;
                        color: white;
                    }
                    tr:nth-child(even) {
                        background-color: lightgray;
                    }
                </style>
            </head>
            <body>
                <h1>${title}</h1>
                ${body}
            </body>
        </html>
    `;
}