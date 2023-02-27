const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;

// Create and Save a new User
exports.create = async (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a User
    const User = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    };

    try {
        const data = await User.create(User);
        res.send({
            status_code: 200,
            message: "Success",
            data: data
        });
    } catch (e) {
        res.status(500).send({
            status_code: 500,
            message: e.message || "Error",
            errors: []
        });
    }
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
        res.send({
            status_code: 200,
            message: "Success",
            data: 2
        });
    // try {
    //     const data = await User.findAll();
    //     res.send({
    //         status_code: 200,
    //         message: "Success",
    //         data: data
    //     });
    // } catch (e) {
    //     res.status(500).send({
    //         status_code: 500,
    //         message: e.message || "Error",
    //         errors: []
    //     });
    // }
};

// Find a single User with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    User.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find User with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving User with id=" + id
            });
        });
};

// Update a User by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    User.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating User with id=" + id
            });
        });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    User.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete User with id=${id}. Maybe User was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
    User.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Users were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Users."
            });
        });
};

// find all published User
exports.findAllPublished = (req, res) => {
    User.findAll({ where: { published: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Users."
            });
        });
};