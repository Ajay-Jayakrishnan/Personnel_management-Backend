const db = require('../Database/db')
const jwt = require('jsonwebtoken')
//Function to register new User

function register(regData) {

    console.log(regData);

    console.log(regData.name);
    return db.User.findOne({ userName: regData.name }).then((result) => {
        if (result) {

            return {
                statusCode: 400,
                message: "username already exist",

            }
        } else {
            newUser = new db.User({
                userName: regData.name,
                passWord: regData.password,
                employees: []
            })
        }
        newUser.save()
        return {
            message: "new User added",
            statusCode: 200
        }

    })

}

//Login Function

const login = (logData) => {

    return db.User.findOne({ userName: logData.name, passWord: logData.password }).then(result => {

        if (result) {
            name1 = logData.name
            id = result._id
            const token = jwt.sign({name1},'token')
            return {

                statusCode: 200,
                message: "user exist",
                name1,
                id,
                token
            }

        } else {
            return {
                statusCode: 400,
                message: "incorrect username or password"
            }
        }

    })

}
//function to add employee into the array

const addemployee = (addData, uid) => {

    return db.User.findOne({ userName: uid }).then(result => {

        if (result) {
            var x = Date.now()
            addData['empID'] = x
            result.employees.push(addData)
            result.save()
            return {
                message: "new employee added ",
                statusCode: 200
            }
        }

    })

}
// function to display data

const empdata = (uid) => {
    return db.User.findOne({ userName: uid }).then(result => {

        if (result) {
            employees = result.employees
            return {
                message: "data collected",
                statusCode: 200,
                employees
            }
        }
    })
}
const deleteemp = (deldata) => {
    return db.User.updateOne({ userName: deldata.employer }, { $pull: { employees: { empID: deldata.employee } } }).then(result => {
        if (result) {
            return ({

                message: "employee removed",
                statusCode: 200,
            })
        }
        else {
            return ({
                message: "employee not found",
                statusCode: 400
            })
        }
    })


}
const updateData = (updata) => {
    return db.User.findOne({ userName: updata.employer }, { employees: { $elemMatch: { empID: updata.employee } } }).then((result) => {
        if (result) {

            x = result.employees[0]
            console.log(x);
            return {
                x,
                message: "match found",
                statusCode: 200
            }
        }
        else {
            return {
                statusCode: 400,
                message: "no matches"
            }
        }
    })

}



module.exports = {
    register, login, addemployee, empdata, deleteemp, updateData
}