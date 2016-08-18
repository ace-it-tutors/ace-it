var _ = require('lodash');
var db = require('./connection');

var helpers = require('./queryHelpers');
var respondWithData = helpers.respondWithData;
var catchError = helpers.catchError;

function requestInstantSession(req, res, next) {
  var studentID = req.body.studentID;
  var teacherID = req.body.teacherID;
  var subjectID = req.body.subjectID;
  db.one(`INSERT INTO instantSessionRequests
      (studentAuthID, teacherAuthID, subjectID)
      VALUES ($1, $2, $3) RETURNING *`, [studentID, teacherID, subjectID] )
    .tap(function() {
      req.connectionManager.syncTeacherSessionRequests(teacherID);
    })
    .then(respondWithData(res, 'Added live session request'))
    .catch(catchError(next));
}

function getStudentRequests(req, res, next) {
  var authID = req.params.authID;
  db.any(`SELECT * FROM instantSessionRequests AS i
      INNER JOIN subjects AS s ON i.subjectID = s.id
      WHERE i.studentAuthId=$1`, [authID])
    .then(respondWithData(res, 'Found student\'s instant session requests'))
    .catch(catchError(next));
}

function getTeacherRequests(req, res, next) {
  var authID = req.params.authID;

  db.any(`SELECT
      studentauthid, teacherauthid, i.id as sessionid,
      u.name as studentname, s.id as subjectid,
      s.name as subjectname
      FROM instantSessionRequests AS i
      INNER JOIN subjects AS s ON i.subjectID = s.id
      INNER JOIN users AS u ON u.authid = i.studentauthid
      WHERE i.teacherAuthId=$1`, [authID])
    .then(respondWithData(res, 'Found teacher\'s instant session requests'))
    .catch(catchError(next));
}

// cancel one request identified by `req.body`
function cancelStudentRequest(req, res, next) {
  var studentID = req.params.studentID;
  var teacherID = req.params.teacherID;

  db.any(`DELETE FROM instantSessionRequests AS i
      WHERE i.studentAuthID=$1 AND i.teacherAuthID=$2
      RETURNING *`, [studentID, teacherID])
    .then(respondWithData(res, 'Cancelled instant session request'))
    .then(function() {
      req.connectionManager.syncTeacherSessionRequests(teacherID);
    })
    .catch(catchError(next));
}

// cancel all requests for a student identified by `req.params.authID`
function cancelStudentRequests(req, res, next) {
  var studentID = req.params.authID;

  db.any(`DELETE FROM instantSessionRequests AS i
      WHERE i.studentAuthID=$1 RETURNING *`, [studentID])
    .tap(function(data) {
      if (!data.length) return;

      var studentID = data[0].studentauthid;
      req.connectionManager.syncStudentSessionRequests(studentID);

      var teacherIDs = _.uniq(_.map(data, 'teacherauthid'));
      teacherIDs.forEach(function(teacherID) {
        req.connectionManager.syncTeacherSessionRequests(teacherID);
      });
    })
    .then(respondWithData(res, 'Cancelled student\'s session requests'))
    .catch(catchError(next));
}

module.exports = {
  requestInstantSession: requestInstantSession,
  getStudentRequests: getStudentRequests,
  getTeacherRequests: getTeacherRequests,
  cancelStudentRequest: cancelStudentRequest,
  cancelStudentRequests: cancelStudentRequests
};
