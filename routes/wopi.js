var express = require('express');
var bodyParser = require('body-parser');
var JSZip = require('jszip');
var fs = require('fs');
var path = require('path');

// var app = express();


// app.use(bodyParser.json({limit: '50mb', extended : true}));
// app.use(bodyParser.urlencoded({limit: '50mb', extended : true}));
// app.use(express.json())

// app.use(express.raw({type:'application/octet-stream', limit: '100mb'}));

var router = express.Router();


// app.use(bodyParser.json())
/* *
 *  wopi CheckFileInfo endpoint
 *
 *  Returns info about the file with the given docxument id.
 *  The response has to be in JSON format and at a minimum it needs to include
 *  the file name and the file size.
 *  The CheckFileInfo wopi endpoint is triggered by a GET request at
 *  https://HOSTNAME/wopi/files/<docxument_id>
 */
router.get('/files/:fileId', function(req, res) {
	console.log('file id: ' + req.params.fileId);
	// test.txt is just a fake text file
	// the Size property is the length of the string
	// returned by the wopi GetFile endpoint
	//var baseFileName = req.params.fileId === '1' ? 'abc.docx' : req.params.fileId === '2' ? 'abc.pptx' : 'abc.xlsx';
	//var baseFileName = req.params.fileId === '1' ? 'abc1.docx' : req.params.fileId === '2' ? 'abc1.pptx' : req.params.fileId === '3'  ? 'abc1.xlsx' : 'abc1.pdf';
	
	var baseFileName = req.params.fileId === '1' ? 'abc.docx' : req.params.fileId === '2' ? 'abc.pptx' : req.params.fileId === '3'  ? 'abc.xlsx' : 'abc.pdf';
	var extension = req.params.fileId === '1' ? 'docx' : req.params.fileId === '2' ? 'pptx' :  req.params.fileId === '3' ? 'xlsx' : 'pdf';
	res.json({
		BaseFileName: baseFileName,
		Size: 11,
		UserId: 1,
		UserCanWrite: true,
		Extension: extension
	});
});

/* *
 *  wopi GetFile endpoint
 *
 *  Given a request access token and a docxument id, sends back the contents of the file.
 *  The GetFile wopi endpoint is triggered by a request with a GET verb at
 *  https://HOSTNAME/wopi/files/<docxument_id>/contents
 */
router.get('/files/:fileId/contents', function(req, res) {
	// we just return the content of a fake text file
	// in a real case you should use the file id
	// for retrieving the file from the storage and
	// send back the file content as response
	console.log(req);
	console.log("started");
	console.log(`req.params.fileId ${req.params.fileId}`);
	var baseFileName = req.params.fileId === '1' ? 'abc.docx' : req.params.fileId === '2' ? 'abc.pptx' : req.params.fileId === '3'  ? 'abc.xlsx' : 'abc.pdf';
	
	// var baseFileName = req.params.fileId === '1' ? 'abc.docx' : req.params.fileId === '2' ? 'abc.pptx' : 'abc.xlsx';
	console.log(`Basefilename ${baseFileName}`);
	const file = path.resolve('C:/Users',baseFileName);
	fs.readFile(file,(err, data)=>{
		if(err)
		{
			console.log("entered error : ", err);
			res.status(500).send(err);
		}
		else {
			console.log("enterd");
			res.send(data);
		}
	});

});

/* *
 *  wopi PutFile endpoint
 *
 *  Given a request access token and a docxument id, replaces the files with the POST request body.
 *  The PutFile wopi endpoint is triggered by a request with a POST verb at
 *  https://HOSTNAME/wopi/files/<docxument_id>/contents
 */
router.post('/files/:fileId/contents', function(req, res) {
	// we log to the console so that is possible
	// to check that saving has triggered this wopi endpoint
	console.log('wopi PutFile endpoint');

	var baseFileName = req.params.fileId === '1' ? 'abc1.docx' : req.params.fileId === '2' ? 'abc1.pptx' : req.params.fileId === '3'  ? 'abc1.xlsx' : 'abc1.pdf';
	const file = path.resolve('C:/Users',baseFileName);
	
	var resultantBuffer = Buffer.from(req.body);

		
			//const buffer = Buffer.concat(arr);
			JSZip.loadAsync(resultantBuffer).then(zip => {
				zip.forEach((relativePath, zipEntry) => {
					if(!zipEntry.dir){
						zip.file(relativePath).async('nodebuffer').then(content => {
							const outputPath = file;
							fs.mkdirSync(path.dirname(outputPath),{recursive : true});
							fs.writeFileSync(outputPath,content);
						});
					}
				});
				res.sendStatus(200);
			}).catch(err => {
				console.error(err);
				res.sendStatus(500);
			});
		
	
	// if (req.body) {
	// 	var baseFileName = req.params.fileId === '1' ? 'abc.docx' : req.params.fileId === '2' ? 'abc.pptx' : 'abc.xlsx';
	// 	console.log(`Basefilename ${baseFileName}`);
	// 	console.log('request ', req);
	// 	const file = path.resolve('C:/Users',baseFileName);
	// 	const fileContent = req.body.toString();	
	// 	const data = Buffer.from(req.body.toString());
	// 	const originalContentString = data.toString();
	// 	console.log(data);	

	// 	JSZip.loadAsync(req.body)

	// 	fs.writeFile(file, fileContent, function(err){
	// 		if(err){
	// 			console.log("Error writing file", err);
	// 			res.sendStatus(500);
	// 		} else {
	// 			console.log("File written successfully");
	// 			console.dir(req.body);
	// 			console.log(req.body.toString());
	// 			res.sendStatus(200);

	// 		}
	// 	});


	// } else {
	// 	console.log('Not possible to get the file content.');
	// 	res.sendStatus(404);
	// }
});

module.exports = router;
