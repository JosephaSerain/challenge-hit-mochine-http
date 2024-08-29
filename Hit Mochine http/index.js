
// Ajouter ici le ou les require() pour importer les modules dont vous aurez besoin.
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


// Votre code va ici

let songCount = 0;

const server = http.createServer((req, res)=>{
    res.setHeader('Content-Type', 'text/html;charset=utf-8');

    switch(req.url){
        case "/":
            res.end("Je m'appelle Charlu, je m'appelle Lili, vous êtes chez O'clock.")
            ++songCount;
            break;
        case "/stats" :
            res.end(`La chanson a été vue ${songCount} fois`);
            break;
        case "/classement":
            let classement = '';
            for (let song of hitParade){
                classement += `-${song.position} - ${song.artist} - ${song.title} <br> `
            };
            res.end(classement);
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
            //res.end(classement.join('\n'));
            break;

        default :
            res.statusCode = 404;
            res.end("404, page non trouvée");
            break;

    }    
});

server.listen(3000);
