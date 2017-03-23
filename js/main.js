
// Examples on various routes via node backend (queries) to mysql

$.ajax({
    type: 'POST',
    url: '/queries/read-lorem',
    data: JSON.stringify([1]),
    contentType: "application/json"
}).done(function(data){
  console.log('reading the lorems row with id 1', data);
});


$.ajax({
  type: 'POST',
  url:'/queries/read-lorem-ipsums',
  contentType: "application/json",
  data: JSON.stringify([2]),
  contentType: "application/json"
}).done(function(data){
  console.log('reading the lorem-ipsums full joins with lorem id 2', data);
});

$.ajax({
    type: 'POST',
    url: '/queries/write-ipsum',
    data: JSON.stringify({"blabla": "hejhuj", "lorem": 20}),
    contentType: "application/json"
}).done(function(result){
  console.log('writing an ipsums row', result);
});

$.ajax({
    type: 'GET',
    url: '/queries/read-lorems'
}).done(function(data){
  console.log('reading all the the lorems rows', data);
});

$.ajax({
    type: 'GET',
    url: '/queries/read-ipsums'
}).done(function(data){
  console.log('reading all the the ipsums rows', data);
});

$.ajax({
    type: 'GET',
    url: '/queries/read-lorems-ipsums'
}).done(function(data){
  console.log('reading all the the lorems-ipsums left joins', data);
});

