const ServiceDeck = require('./deck.service');
exports.test = async (req, res, next) => {
    try {
        console.log(req.session)
        const result = await ServiceDeck.test();
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(error);
    }
}
exports.getAllDeck = async (req, res, next) => {
    try {
        const result = await ServiceDeck.getAllDeck();
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(error);
    }
}
exports.getAllUserDeck = async (req, res, next) => {
    try {
        if(!req.user)
        {
            res.status(400).send('user not found');
        }
        const result = await ServiceDeck.getAllUserDeck(req.user);
        res.status(200).json(result);
    } catch (error) {
        console.log(error)
        res.status(400).json(error);
    }
}
exports.getDeckBySearch = async (req, res, next) => {
    try {
        const keyword = req.query.keyWord;
        const result = await ServiceDeck.getDeckBySearch(keyword);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(error);
    }
}
exports.addDeck = async (req, res, next) => {
    try {
        const userId = req.user.id
        const deckId = req.body.deckId
        const result = await ServiceDeck.addDeck(userId,deckId);
        if(result == null)
        {
            res.status(400).send('user not found');
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(error);
    }
}
exports.createDeck = async (req, res, next) => {
    try {
        const userId = req.user.id
        const Deck = req.body
        const result = await ServiceDeck.createDeck(userId,Deck);
        if(result == null)
        {
            res.status(400).send('user not found');
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(error);
    }
}
exports.cardsDeckUpdate = async (req, res, next) => {
    try {
        const userId = req.user.id
        const deckUpdate = req.body
        console.log(deckUpdate)
        const result = await ServiceDeck.cardsDeckUpdate(userId,deckUpdate);
        if(result == null)
        {
           return res.status(400).send('user not found or deck not found update deck fail');
        }
        return res.status(200).json(result);
    } catch (error) {
        res.status(400).json(error);
    }
}
exports.deleteDeck = async (req, res, next) => {
    try {
        const userId = req.user.id
        const deckId = req.body.deckId
        const result = await ServiceDeck.deleteDeck(userId,deckId);
        
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(error);
    }
}