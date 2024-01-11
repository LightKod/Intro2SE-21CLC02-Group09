const ServiceCourse = require('./course.service');
exports.createCourse = async (req, res, next) => {
    try {
        const userId = req.user.id
        const course = req.body
        const result = await ServiceCourse.createCourse(userId,course)
        
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(error);
    }
}
exports.addDeck = async (req, res, next) => {
    try {
        const courseId = req.body.courseId
        const userId = req.user.id
        const deckId = req.body.deckId
        const result = await ServiceCourse.addDeck(userId,deckId,courseId)
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(error);
    }
}
exports.addUser = async (req, res, next) => {
    try
    {
        const courseId = req.body.courseId
        const creatorId = req.user.id
        const userId = req.body.userId
        const result = await ServiceCourse.addUser(userId,courseId,creatorId)
        res.status(200).json(result);
    }
    catch(error)
    {
        res.status(400).json(error);
    }
}