const LocalStrategy = require('passport-local').Strategy

module.exports = (passport, db) => {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, (email, password, cb) => {
    db.query('SELECT cf, mail, password FROM volontari WHERE mail=$1', [email], (err, result) => {
      if (err) {
        console.log('Error when selecting user on login', err)
        return cb(err);
      }

      if (result.rows.length > 0) {
        const first = result.rows[0]
        if(first.password == password){
          cb(null, {    /*appears in user in authenticate*/
            cf: first.cf
          });
        }else{
          cb(null, false);
        }
      } else {
        cb(null, false)
      }
    });
  }));

  passport.serializeUser((user, done) => {
    done(null, user.cf); /*put unique id in cookie*/
  })

  passport.deserializeUser((id, cb) => {
    db.query('SELECT cf, mail FROM volontari WHERE cf = $1', [id], (err, results) => {
      if (err) {
        console.log('Error when selecting user on session deserialize', err);
        return cb(err);
      }
      cb(null, results.rows[0]);
    })
  })
}
