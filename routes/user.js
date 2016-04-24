module.exports = function(express, db) {
  userRouter = express.Router();

  userRouter.route("/user")
    // Return list of all user
    .get(function(req, res) {
      db.user.find({}, function(err, users) {
        if (err) {
          res.status(500).send(err);
        } else {
          res.json(users);
        }
      });
    })
    // Add new user
    .post(function(req, res) {
      newUser = {
        username: req.body.username,
        createdAt: new Date()
      }

      db.user.insert(newUser, function(err, user) {
        if (err) {
          res.status(500).send(err);
        } else {
          res.json(user);
        }
      })
    })

  userRouter.route("/user/:id")
    // Return One user.
    .get(function(req, res) {
      db.user.findOne({_id: req.params.id}, function(err, user) {
        if (err) {
          res.status(500).send(err);
        } else {
          res.json(user);
        }
      })
    })
    // Update an user
    .put(function(req, res) {
      db.user.update({_id: req.params.id}, {$set: {username: req.body.newUsername}}, {},function(err, numReplaced) {
        if (err) {
          res.status(500).send(err);
        } else {
          // If OK send the user.
          db.user.findOne({_id: req.params.id}, function(err, user) {
            if (err) {
              res.status(500).send(err);
            } else {
              res.json(user);
            }
          })
        }
      });
    })
    // Delete an user
    .delete(function(req, res) {
      db.user.remove({ _id: req.params.id }, {}, function(err, numRemoved) {
        if (err) {
          res.status(500).send(err);
        } else {
          // Return new list of user
          db.user.find({}, function(err, users) {
            if (err) {
              res.status(500).send(err);
            } else {
              res.json(users);
            }
          });
        }
      });
    });
    
  return userRouter;
}
