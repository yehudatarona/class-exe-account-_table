const express = require('express');
const path = require('path');
const account_repo = require('./account-repo');


const port = 8081

const app = express()



// to server static pages
app.use(express.static(path.join(__dirname, '/')))

// for POST json 
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))



// get all recordnin db
app.get('/account', async(req, res) => {
    const accounts = await account_repo.getAllAccounts();
    res.status(200).json({ accounts: accounts })
});

app.get('/account/:account_id', async(req, res) => {
   let id = req.params.account_id
    const accounts  = await account_repo.getSingleAccounts  (id)
    res.status(200).json({ accounts })
});


//delete an item for db
app.delete('/account/:account_id', async (req, res) => {
    try
    {
        let id = req.params.account_id
        const result = await account_repo.deleteSingleAccounts (id)
        res.status(201).json({
            res: 'deleted successed',
            url: `localhost:8080/account/${id}`,
            result
        })
    }
    catch(e) {
        res.status(400).send({
            status: 'fail',
            message: e.message
        })
    }
})


// /// update recrod
app.put('/account/:account_id', async (req, res) => {
    try
    {
        let id = req.params.account_id
        console.log(id);
        prod = req.body
        const result = await account_repo.updateRecord(id, prod);
        res.status(201).json({
            res: 'update successed',
            url: `localhost:8080/account/${id}`,
            result
        })
    }
    catch(e) {
        res.status(400).send({
            status: 'fail',
            message: e.message
        })
    }
})

//adding an items to db
app.post('/account', async (req, res) => {
    try
    {
        prod = req.body
        const result = await account_repo.addRecord(prod);
        console.log("result",result);
        res.status(201).json({
            res: 'item added success',
            url: `localhost:8080/account/${result[0]}`,
            result
        })
    }
    catch(e) {
        res.status(400).send({
            status: 'fail',
            message: e.message
        })
    }
})



app.listen(port, () => console.log(`Listening to port ${port}`));