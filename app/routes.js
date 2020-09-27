module.exports = function(app, passport, db, ObjectId) {

// normal routes ===============================================================

    // show the home page (will also have our login links)
    app.get('/', function(req, res) {
        db.collection('messages').find().toArray((err, result) => {
          if (err) return console.log(err)
          res.render('index.ejs', {
            user : req.user,
            messages: result
          })
        })
    });

    // PROFILE SECTION =========================
    app.get('/profile', isLoggedIn, function(req, res) {
      db.collection('comments').find().toArray((err, comment) => {
        var mysort = { score: -1 };
        db.collection('messages').find().sort(mysort).toArray((err, result) => {
          let mapCom = comment.map( x =>{
            return{id: x.id.toString(), comment: x.comment}
          })
          let mapMsg = result.map( x =>{

            return{
              _id: x._id.toString(),
               name: x.name,
               title: x.title,
               msg: x.msg,
               score: x.score
               // thumbDown: x.thumbDown
             }
          })
          // console.log(mapCom)
          // console.log(mapMsg)
          // console.log(result[0]._id.toString()===comment[0].id.toString())
          if (err) return console.log(err)
          res.render('profile.ejs', {
            user : req.user,
            messages: mapMsg,
            comments: mapCom
          })
        })
      })
    });

    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

// message board routes ===============================================================

    app.post('/messages', (req, res) => {
      db.collection('messages').save({name: req.body.name, title: req.body.title, msg: req.body.msg, score: 0}, (err, result) => {
        if (err) return console.log(err)
        console.log('saved to database')
        res.redirect('/profile')
      })
    })

    app.put('/bookmark', (req, res) => {
  db.collection('messages')
  .findOneAndUpdate({name:req.body.name, title: req.body.title}, {
    $set: {
      bookmark: true
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.put('/messages', (req, res) => {
   db.collection('messages')
   .findOneAndUpdate({name: req.body.name, msg: req.body.msg}, {
     $set: {
       score:req.body.score + 1
     }
   }, {
     sort: {_id: -1},
     upsert: true
   }, (err, result) => {
     if (err) return res.send(err)
     res.send(result)
   })
 })

 app.put('/plusTwo', (req, res) => {
   db.collection('messages')
   .findOneAndUpdate({name: req.body.name, msg: req.body.msg}, {
     $set: {
       score:req.body.score + 2
     }
   }, {
     sort: {_id: -1},
     upsert: true
   }, (err, result) => {
     if (err) return res.send(err)
     res.send(result)
   })
 })

 app.put('/plusThree', (req, res) => {
   db.collection('messages')
   .findOneAndUpdate({name: req.body.name, msg: req.body.msg}, {
     $set: {
       score:req.body.score + 3
     }
   }, {
     sort: {_id: -1},
     upsert: true
   }, (err, result) => {
     if (err) return res.send(err)
     res.send(result)
   })
 })

 app.put('/plusFour', (req, res) => {
   db.collection('messages')
   .findOneAndUpdate({name: req.body.name, msg: req.body.msg}, {
     $set: {
       score:req.body.score + 4
     }
   }, {
     sort: {_id: -1},
     upsert: true
   }, (err, result) => {
     if (err) return res.send(err)
     res.send(result)
   })
 })

 app.put('/plusFive', (req, res) => {
   db.collection('messages')
   .findOneAndUpdate({name: req.body.name, msg: req.body.msg}, {
     $set: {
       score:req.body.score + 5
     }
   }, {
     sort: {_id: -1},
     upsert: true
   }, (err, result) => {
     if (err) return res.send(err)
     res.send(result)
   })
 })

    // app.put('/thumbDown', (req, res) => {
    //   db.collection('messages')
    //   .findOneAndUpdate({name: req.body.name, msg: req.body.msg}, {
    //     $set: {
    //       thumbUp:req.body.thumbUp - 1
    //     }
    //   }, {
    //     sort: {_id: -1},
    //     upsert: true
    //   }, (err, result) => {
    //     if (err) return res.send(err)
    //     res.send(result)
    //   })
    // })


    app.delete('/messages', (req, res) => {
      db.collection('messages').findOneAndDelete({name: req.body.name, msg: req.body.msg}, (err, result) => {
        if (err) return res.send(500, err)
        res.send('Message deleted!')
      })
    })

    app.post('/comments', (req, res) => {
      console.log(req.body)
      let id = ObjectId(req.body.id)
      db.collection('comments').save({comment: req.body.comment, id: id}, (err, result) => {
        if (err) return console.log(err)
        console.log('saved to database')
        res.redirect('/profile')
      })
    })


// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

    // locally --------------------------------
        // LOGIN ===============================
        // show the login form
        app.get('/login', function(req, res) {
            res.render('login.ejs', { message: req.flash('loginMessage') });
        });

        // process the login form
        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

        // SIGNUP =================================
        // show the signup form
        app.get('/signup', function(req, res) {
            res.render('signup.ejs', { message: req.flash('signupMessage') });
        });

        // process the signup form
        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

    // local -----------------------------------
    app.get('/unlink/local', isLoggedIn, function(req, res) {
        var user            = req.user;
        user.local.email    = undefined;
        user.local.password = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
