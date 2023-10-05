const express = require('express')
const mongoose = require('mongoose')
const Maps = require('./models/markers')

const app = express()

app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(express.json())
app.post('/newlocation', async (req, res) => {
    const { name, position } = req.body
    const address = {
        name,
        position
    }
    try {
      await Maps.create(address)
      res.status(201).json({ message: 'Markers inserido com sucesso!' })
    } catch (error) {
      res.status(500).json({ erro: error })
    }
});

  app.get('/location', async (req, res) => {
    try {
      const address = await Maps.find()
      res.status(200).json({markers: address})
    } catch (error) {
      res.status(500).json({ erro: error })
    }
});

  app.get('/location/:id', async (req, res) => {
    const id = req.params.id
    try {
      const address = await Maps.findOne({ _id: id })
      if (!address) {
        res.status(422).json({ message: 'Localização não encontrada!' })
        return
      }
      res.status(200).json({markers: address})
    } catch (error) {
      res.status(500).json({ erro: error })
    }
});

  app.patch('/updatelocation/:id', async (req, res) => {
    const id = req.params.id
    const { name, position } = req.body
    const address = {
        name,
        position
    }
    try {
      const updatedLocation = await Person.updateOne({ _id: id }, address)
      if (updatedLocation.matchedCount === 0) {
        res.status(422).json({ message: 'Localização não encontrada!' })
        return
      }
      res.status(200).json(address)
    } catch (error) {
      res.status(500).json({ erro: error })
    }
});

  app.delete('/deletelocation/:id', async (req, res) => {
    const id = req.params.id
    const address = await Maps.findOne({ _id: id })
    if (!address) {
      res.status(422).json({ message: 'Localização não encontrada!' })
      return
    }
    try {
      await Maps.deleteOne({ _id: id })
      res.status(200).json({ message: 'Localização removida com sucesso!' })
    } catch (error) {
      res.status(500).json({ erro: error })
    }
}); 

app.get("/", (req, res) => { 
    res.json({ message: "Oi Express!" });
  });
    mongoose.connect(
      'mongodb+srv://talisonmoura13:Ta532900@cluster0.hotfiej.mongodb.net/Maps?retryWrites=true&w=majority',
    )
    .then(() => {
      console.log('Conectou ao banco!')
      app.listen(3000)
}).catch((err) => console.log(err));