// Importer le module http
const http = require('http');

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

// Initialiser le compteur de visites pour la page d'accueil
let songCount = 0;

// Créer le serveur HTTP
const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    // res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});

    let title;
    let body;
    switch (req.url) {
        case '/':
            ++songCount;
            title = "Accueil";
            body = "Je m'appelle Charlu, je m'appelle Lili, vous êtes chez O'clock.";
            break;
        case '/classement':
            // OPTION 1
            // let classement = '';
            // hitParade.forEach((song) => {
            //     classement += `${song.position} : ${song.artist} - ${song.title}\n`;
            // });
            // res.end(classement);

            // OPTION 2
            // let classement = [];
            // hitParade.forEach((song) => {
            //     classement.push(`${song.position} : ${song.artist} - ${song.title}`);
            // });
            // res.end(classement.join("\n"));

            // OPTION 3
            // La fonction map permet de transformer un tableau en un autre tableau en traitant chaque élément un par un.
            // Ici, pour chaque chanson, on retourne une chaîne de caractères contenant la position, l'artiste et le titre.
            // Ensuite, on utilise la méthode join pour concaténer les chaînes de caractères avec un retour à la ligne.
            //const classement = hitParade.map((song) => `${song.position} : ${song.artist} - ${song.title}`);
            //title = "Classement";
            //body = classement.join('<br>');
            //break;
            title = "Classement";
            const classement = hitParade
                .map((song) => `
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
                        ${classement.join('')}
                    </tbody>
                </table>
            `;
            break;
        case "/stats":
            title = "Statistiques";
            body = `La chanson a été vue ${songCount} fois`;
            break;
        default:
            res.statusCode = 404;
            title = "404 Not Found";
            body = `La page demandée "${req.url}" n'existe pas`;
            break;
    }

    res.end(`
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
    `);
});

server.listen(3000);