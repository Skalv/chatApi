module.exports = function(express, db) {
  msgRouter = express.Router();

  msgRouter.route("/message")
    // Return list of all messages
    .get(function(req, res) {
      db.msg.find({}).sort({ postAt: 1 }).exec(function(err, messages) {
        if (err) {
          res.status(500).send(err);
        } else {
          res.json(messages);
        }
      });
    })
    // Add new message
    .post(function(req, res) {
      newMsg = {
        message: req.body.message,
        username: req.body.username,
        postAt: new Date()
      }

      db.msg.insert(newMsg, function(err, message) {
        if (err) {
          res.status(500).send(err);
        } else {
          res.json(message);
        }
      })
    })

  msgRouter.route("/message/:id")
    // Return One user.
    .get(function(req, res) {
      db.msg.findOne({_id: req.params.id}, function(err, msg) {
        if (err) {
          res.status(500).send(err);
        } else {
          res.json(msg);
        }
      })
    })
    // Update an user
    .put(function(req, res) {
      db.msg.update({_id: req.params.id}, {$set: {message: req.body.newMessage}}, {},function(err, numReplaced) {
        if (err) {
          res.status(500).send(err);
        } else {
          // If OK send the message.
          db.msg.findOne({_id: req.params.id}, function(err, message) {
            if (err) {
              res.status(500).send(err);
            } else {
              res.json(message);
            }
          })
        }
      });
    })
    // Delete an message
    .delete(function(req, res) {
      db.msg.remove({ _id: req.params.id }, {}, function(err, numRemoved) {
        if (err) {
          res.status(500).send(err);
        } else {
          // Return new list of messages
          db.msg.find({}).sort({ postAt: 1 }).exec(function(err, messages) {
            if (err) {
              res.status(500).send(err);
            } else {
              res.json(messages);
            }
          });
        }
      });
    });

  return msgRouter;
}
