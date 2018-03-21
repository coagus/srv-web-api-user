const mysql = require('mysql');

connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'cielito',
  database: 'UserDB'
});

let userModel = {};

userModel.getUsers = (callback) => {
  if (connection) {
    connection.query('SELECT * FROM User ORDER BY Id',
      (err, rows) => {
        if (err) {
          throw err;
        } else {
          callback(null,rows);
        }
      }
    );
  }
};

userModel.insertUser = (userData, callback) => {
  if (connection) {
    connection.query(
      'INSERT INTO User SET ?', userData,
      (err, result) => {
        if (err) {
          throw err;
        } else {
          callback(null, {
            'insertId': result.insertId
          });
        }
      }
    );
  }
};

userModel.updateUser = (userData, callback) => {
  if (connection) {
    const qry = `
      UPDATE User SET
      UserName = ${connection.escape(userData.UserName)},
      EMail = ${connection.escape(userData.EMail)},
      Password = ${connection.escape(userData.Password)}
      WHERE Id = ${connection.escape(userData.Id)}
    `;

    connection.query(qry, (err, result) => {
      if (err) {
        throw err;
      } else {
        callback(null, {
          "msg": "success"
        });
      }
    });
  }
};

userModel.deleteUser = (id, callback) => {
  let qry = ` SELECT * FROM User WHERE Id = ${connection.escape(id)}`;

  connection.query(qry, (err, row) => {
    if (row) {
      let qry = `DELETE FROM User WHERE Id = ${id}`;

      connection.query(qry, (err, result) => {
        if (err) {
          throw err;
        } else {
          callback(null, {
            msg: "deleted"
          });
        }
      });
    } else {
      callback(null, {
        "msg": "not exists"
      });
    }
  });
};

module.exports = userModel;
