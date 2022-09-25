const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModel')
const User = require('../models/userModel')


// description: Get all goals
// route: GET /api/goals
// access: private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({user: req.user})  

  res.status(200).json(goals)
})

// description: SET goal
// route: POST/api/goal
// access: private
const setGoal = asyncHandler(async (req, res) => {
  if(!req.body.text){
    res.status(400)
    throw new Error('Please add a text feild')
  }
  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id
  })

  res.status(200).json(goal)
})

// description: UPDATE goal
// route: PUT /api/goals/:id
// access: private
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if(!goal){
    res.status(400);
    throw new Error();
  }
  //check wheter user exists or not
  if(!req.user){
    res.status(401)
    throw new Error('User not found')
  }

  //check wheter the logged in user and user of the goals are same or not
  if(goal.user.toString() !== req.user.id){
    res.status(401)
    throw new Error('User not authorized')
  }
  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  })
  res.status(200).json(updatedGoal)
})

// decsription: DELETE goal
// route: DELETE /api/goals/:id
// access: private
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if(!goal){
    res.status(400);
    throw new Error();
  }
  //check wheter user exists or not
  if(!req.user){
    res.status(401)
    throw new Error('User not found')
  }

  //check whether the logged in user and user of the goals are same or not
  if(goal.user.toString() !== req.user.id){
    res.status(401)
    throw new Error('User not authorized')
  }
  await Goal.deleteOne({id: req.params.id})
  res.status(200).json({id: req.params.id})
})


module.exports = {
  getGoals, updateGoal, deleteGoal, setGoal
}