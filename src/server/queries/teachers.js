var db = require('./connection');

var helpers = require('./queryHelpers');
var respondWithData = helpers.respondWithData;
var catchError = helpers.catchError;
var postData = helpers.postData;



function getTeachersInfo(req, res, next){
  var teacherID = parseInt(req.params.id);
  db.any('select * from teachers JOIN users on users.teacherID = teachers.ID WHERE users.teacherID = $1 ', [teacherID])
    .then(respondWithData(res, "Retrieved all teacher info for user given user"))
    .catch(catchError(next));
}

function getAllTeachers(req, res, next){
  db.any(`select array_agg(subjects.name) as subjects, users.*, teachers.* from teachers JOIN users on users.teacherID = teachers.ID join teaching on users.id = teaching.userID 
  join subjects on teaching.subjectID = subjects.id WHERE users.teacher = true group by users.id, teachers.id`)
    .then(respondWithData(res, "Retrieved all teacher info for user given user"))
    .catch(catchError(next));
}

function updateRate(req, res, next) {
  db.any('UPDATE teachers SET rate = ${rate} WHERE id IN (select teacherid from users where authid = ${authid})', req.body)
    .then(respondWithData(res, "Update Hourly Rate"))
    .catch(catchError(next));
}

module.exports = {
  getTeachersInfo: getTeachersInfo,
  getAllTeachers: getAllTeachers,
  updateRate: updateRate
}