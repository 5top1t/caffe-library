db.createUser({
  user: "cscl",
  pwd: "mongo",
  roles: [
    {
      role: "readWrite",
      db: "cscl"
    }
  ]
});

db.books.createIndex({ isbn: 1, copies: 1});
db.reviews.createIndex({ _id: 1 }, { unique: true });