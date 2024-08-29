// OPTION 1

// let songCount = 0;

// function incrementSongCount() {
//     ++songCount;
// }

// function getSongCount() {
//     return songCount;
// }

// module.exports = { incrementSongCount, getSongCount };

// OPTION 2
// Probalement la plus utilisé avec Node.js

// let songCount = 0;

// module.exports = {
//     incrementSongCount() {
//         ++songCount;
//     },

//     getSongCount() {
//         return songCount;
//     },
// };

// OPTION 3
// Probalement la plus puissante, mais encore peu utilisé car plus récente.

// Une classe, CE N'EST PAS UN OBJET, mais UNE USINE À OBJET, UN MOULE
class Statistiques {
    // Le "#", c'est un caractère pour rendre la propriété invisible/innaccessible en dehors de cette usine.
    #songCount = 0;

    incrementSongCount() {
        ++this.#songCount;
    }

    getSongCount() {
        return this.#songCount;
    }
}

// Nous, on veut exporter un objet de statistique, le moule on s'en fous.
// Du coup, on demande à l'usine de nous fabriquer un objet, puis on l'exporte : new Statistiques()
module.exports = new Statistiques();