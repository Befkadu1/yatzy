module.exports = class SqlRouter {

  constructor(expressServer){
    this.mysql = require('mysql');
    this.path = require('path');
    this.fs = require('fs');
    this.server = expressServer;
    this.dbCreds = require('./db-credentials.json');
    this.db = this.mysql.createConnection(this.dbCreds);

    // get the queries to register
    this.queries = require('./routes-to-queries.json');

    // reqister the queries to routes
    for(let qname in this.queries){
      (()=>{
        var query = this.queries[qname];
        console.log('query to add to server', qname);
        this.server.all(
          '/queries/' + qname.toLowerCase(),
          (req,res)=>{
            this.db.query(query,req.body,(err,result)=>{
              if(err){
                res.json({error:err});
              }
              else {
                res.json(result);
              }
            });
          }
        );
      })();
    }
  }

}
