var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = process.env.DATABASE_URL ||
  'postgres://localhost:5432/tacobase';
var db = pgp(connectionString);

// add query functions
function getAllUsers(req, res, next) {
  db.any('select * from users')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL users'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getSingleUser(req, res, next){
  var userID = parseInt(req.params.id);
    db.one('select * from users where id = $1', [userID])
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved one user'
        });
    })
    .catch(function (err) {
      return next(err);
    });
};

function createUser(req, res, next){
    db.none('insert into users(email)' + 'values(${email})', req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one user'
        });
    })
    .catch(function (err) {
      return next(err);
    });
};

function updateUser(req, res, next){
  var userID = parseInt(req.params.id);
    db.none('update users set username=$1, name=$2, email=$3, teacher=$4 where id=$5', [req.body.username, req.body.name, req.body.email, req.body.teacher, userID], req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated user'
        });
    })
    .catch(function (err) {
      return next(err);
    });
};



function createSubject(req, res, next){
    db.none('insert into subjects(name)' + 'values(${name})', req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one subject'
        });
    })
    .catch(function (err) {
      return next(err);
    });
};

function getAllSubjects(req, res, next) {
  db.any('select * from subjects')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL subjects'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function learningSubject(req, res, next){
    db.none('insert into learning(userID, subjectID)' + 'values(${userID}, ${subjectID})', req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Designed subject for the user profile with postgreSQL that resulted in the user knowing %50 more about that subject within 2 weeks'
        });
    })
    .catch(function (err) {
      return next(err);
    });
};

function teachingSubject(req, res, next){
    db.none('insert into teaching(userID, subjectID)' + 'values(${userID}, ${subjectID})', req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Designed subject for the user profile with postgreSQL that resulted in the teacher knowing %50 more about that subject within 2 weeks'
        });
    })
    .catch(function (err) {
      return next(err);
    });
};

function removeUser(req, res, next){
  var userID = parseInt(req.params.id);
    db.result('delete from users where id = $1', [userID])
    .then(function (result) {
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} row's`
        });
    })
    .catch(function (err) {
      return next(err);
    });
};

module.exports = {
  getAllUsers: getAllUsers,
  getSingleUser: getSingleUser,
  createUser: createUser,
  createSubject: createSubject,
  getAllSubjects: getAllSubjects,
  learningSubject: learningSubject,
  teachingSubject: teachingSubject,
  updateUser: updateUser,
  removeUser: removeUser
};
