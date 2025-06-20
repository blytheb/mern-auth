const User = require('../models/user')

const test = (req, res) => {
    res.json('test is working')
}

const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        //check if name was entered
        if (!name){
            return res.json({
                error: 'Name is required'
            })
        }
        //check if password is good
        if (!password || password.length < 6){
            return res.json({
                error: "Password is required and should be at least 6 char long "
            })
        }
        //check email
        const exist = await User.findOne({email});
        if (exist){
            return res.json({
                error: 'Email is taken already'
            })
        }
        const user = await User.create({
            name, email, password
        })
        return res.json(user)
    } catch(err) {
        console.log(err)
    }
}

module.exports = {
    test,
    registerUser,
}