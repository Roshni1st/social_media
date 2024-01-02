module.exports = {
  async up(db, client) {
  // migrating user roles
    const roles = [
      {
        name : 'admin'
      },
      {
        name : 'user'
      }
    ]

    await db.collection('roles').insertMany(roles)
  },

  async down(db, client) {
    // remove roles
    await db.collection('roles').deleteMany([{name : 'admin'},{name:'user'}])
  }
};
