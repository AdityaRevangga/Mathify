const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const db = require('./database');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        const fullName = profile.displayName;
        const username = email.split('@')[0];

        // Cek apakah user sudah ada
        const existing = await db.query('SELECT * FROM users WHERE email = $1', [email]);

        if (existing.rows.length > 0) {
          return done(null, existing.rows[0]);
        }

        // Buat user baru
        const result = await db.query(
          `INSERT INTO users (username, email, password, full_name, role)
           VALUES ($1, $2, $3, $4, 'student') RETURNING *`,
          [username, email, 'GOOGLE_AUTH', fullName]
        );

        return done(null, result.rows[0]);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

module.exports = passport;