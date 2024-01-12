
const Deck = require("../../../models/Deck");
exports.GetAllDecks = async () => {
    const decks = await Deck.find();
    return decks;
}