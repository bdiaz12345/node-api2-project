// implement your posts router here
const Posts = require('./posts-model')
const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
    Posts.find(req.query)
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({message: 'error retrieving posts'})
        })
})

router.get('/:id', (req, res) => {
    Posts.findById(req.params.id)
        .then(post => {
            if (post) {
                res.status(200).json(post)
            } else {
                res.status(404).json({message: 'not found'})
            }
        })
        .catch(error => {
            res.status(500).json({message: `${error}`})
        })
})

router.post('/', (req, res) => {
    Posts.insert(req.body)
        .then(post => {
            res.status(201).json(post)
        })
        .catch(error => {
            res.status(500).json({message: 'error'})
        })
})

router.put('/:id', (req, res)  => {
    const changes = req.body
    Posts.update(req.params.id, changes)
        .then(post => {
            if (post) {
                res.status(200).json(post)
            } else {
                res.status(404).json({message: 'not found'})
            }
        })
        .catch(error => {
            res.status(500).json({message: `${error}`})
        })
})

router.delete('/:id', (req, res) => {
    Posts.remove(req.params.id)
        .then(count => {
            if (count > 0) {
                res.status(200).json({message: 'deleted'})
            } else {
                res.status(404).json({message: 'not found'})
            }
        })
        .catch(error => {
            res.status(500).json({message: `${error}`})
        })
})

router.get('/:id/comments', (req, res) => {
    Posts.findCommentById(req.params.id)
        .then(comments => {
            if (comments.length > 0) {
                res.status(200).json(comments)
            } else {
                res.status(404).json({message: '404 not found'})
            }
        })
        .catch(error => {
            res.status(500).json({message: 'error'})
        })
})

module.exports = router