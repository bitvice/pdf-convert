var assert 		= require("assert");
var expect		= require("chai").expect;
var path   		= require("path");
var PdfConvert 	= require('../index');

const PDF_OPTIONS = {
	convertOptions: {
		"-density": "300x300",
		"-quality": "70"
	}
};

// describe("PdfConvert call", function () {
	var pdfPath = path.resolve(__dirname, "tmp/test.pdf"),
		pdfConverter = new PdfConvert(pdfPath, PDF_OPTIONS),
		i = 0;

	pdfConverter.convertPage(i).then(currentPage => {
		console.log(currentPage);
	}, e => {
		console.log(e);
	});

// });
