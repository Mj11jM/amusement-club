module.exports = {
    getPages
}

const utils = require('./localutils.js');

function getPages(cards) {
    let count = 0;
    let pages = [];
    nameCardList(cards).map(c => {
        if(count % 15 == 0)
            pages.push("");

        pages[Math.floor(count/15)] += (c + "\n");
        count++;
    });
    return pages;
}

function nameCardList(arr) {
    let res = [];
    //let passedCards = [];
    let date = new Date();
    date.setDate(date.getDate() - 1);

    arr.map(card => {
        let name = nameCard(card, date);
        /*let hours = 20 - utils.getHoursDifference(card.frozen);
        if(hours && hours > 0) {
            name += " ❄ ";
            if(hours == 1) {
                let mins = 60 - (utils.getMinutesDifference(card.frozen) % 60);
                name += mins + "m";
            }
            else {
                name += hours + "h";
            }
        }*/

        //passedCards.push(card);
        res.push(name);
    });

    //res.sort((a, b) => sortByName(a, b));

    return res;
}

function nameCard(card, newC) {
    try {
        let res = utils.getFullCard(card);
        if(card.obtained && card.obtained > newC)
            res = "[new] " + res;
        if(card.amount > 1) 
            res += " (x" + card.amount + ")";
        return res;
    } catch (e) {logger.error(e);}
    return null;
}

function sortByName(a, b) {
    let match1 = a.match(/★/g);
    let match2 = b.match(/★/g);

    if(!match1) return 1;
    if(!match2) return -1;
    if(match1 < match2) return 1;
    if(match1 > match2) return -1;
    return 0;
}
