const Course = require('../../../models/Course');
const {v4: uuidv4} = require('uuid');
exports.createCourse = async (userId,course) => {
    try
    {
        const newCourse = new Course()
        newCourse.courseId = uuidv4()
        newCourse.title = course.title
        newCourse.description = course.description
        newCourse.creatorId = userId
        await newCourse.save()
        return newCourse
    }
    catch(error)
    {
        throw new Error(error)
    }
}
exports.addDeck = async (userId,deckId,courseId) => {
    try
    {
        const course = await Course.findOne({ 'courseId': courseId });
        if(course == null)
        {
            throw new Error('course not found')
        }
        if(course.creatorId != userId)
        {
            throw new Error('user does not have permission')
        }
        course.decks.push(deckId)
        await course.save()
        return course
    }
    catch(error)
    {
        throw new Error(error)
    }
}
exports.addUser = async (userId,courseId,creatorId) => {
    try
    {
        const course = await Course.findOne({ 'courseId': courseId });
        if(course == null)
        {
            throw new Error('course not found')
        }
        if(course.creatorId != creatorId)
        {
            throw new Error('user does not have permission')
        }
        course.studentId.push(userId)
        await course.save()
        return course
    }
    catch(error)
    {
        throw new Error(error)
    }
}