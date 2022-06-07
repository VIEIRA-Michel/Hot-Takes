const Sauce = require('../models/Sauce');
const fs = require('fs');

exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
}

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    console.log('sauceObject', sauceObject);
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
        .then(() => res.status(201).json({ message: 'Sauce enregistré !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
}

exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id})
        .then(sauce => {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({ _id: req.params.id })
                .then(() => res.status(200).json({ message: 'Sauce supprimé !' }))
                .catch(error => res.status(400).json({ error }));
            })
        })
        .catch(error => res.status(500).json({ error }));
};

exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ?
        { 
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Sauce modifié !' }))
        .catch(error => res.status(400).json({ error }));
};

// exports.likeSauce = (req, res, next) => {
//     Sauce.updateOne({ _id: req.params.id }, { likes: req.body.like })
//         .then(() => res.status(200).json({ message: 'Like !' }))
//         .catch(error => res.status(400).json({ error }));
// }

exports.likeSauce = (req, res, next) => {
    console.log(req.body)
    if(req.body.like == 0) {
        Sauce.updateOne({ _id: req.params.id }, { likes: 0, dislikes: 0 })
            .then(() => res.status(200).json({ message: 'Retrait de mention' }))
            .catch(error => res.status(400).json({ error }));
    } else if (req.body.like == 1) {
        Sauce.updateOne({ _id: req.params.id }, { likes: req.body.like, dislikes: 0 })
            .then(() => res.status(200).json({ message: 'Like !' }))
            .catch(error => res.status(400).json({ error }));
    } else if(req.body.like < 0) {
        Sauce.updateOne({ _id: req.params.id }, { dislikes: req.body.like, likes: 0 })
            .then(() => res.status(200).json({ message: 'Dislike !' }))
            .catch(error => res.status(400).json({ error }));
    }
}
