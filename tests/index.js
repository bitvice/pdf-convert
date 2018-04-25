var assert		= require("assert");
var expect		= require("chai").expect;
var path	 	= require("path");
var fs			= require("fs");
var PdfConvert	= require("../");

describe("PdfConvert", function () {
	var pdfPath = "./tmp/test.pdf";
	var pdfConvert;

	beforeEach(function() {
		 pdfConvert = new PdfConvert(pdfPath)
	});

	it("should have correct basename", function () {
		expect(pdfConvert.pdfFileBaseName).equal("test");
	});

	it("should set custom basename", function() {
		pdfConvert.setPdfFileBaseName('custom-basename');
		expect(pdfConvert.pdfFileBaseName).equal("custom-basename");
	});

	it("should return correct page path", function () {
		expect(pdfConvert.getOutputImagePathForPage(1))
			.equal("tmp\\test-1.png");
		expect(pdfConvert.getOutputImagePathForPage(2))
			.equal("tmp\\test-2.png");
		expect(pdfConvert.getOutputImagePathForPage(1000))
			.equal("tmp\\test-1000.png");
	});

	// it("should return correct convert command", function () {
	//	 expect(pdfConvert.constructConvertCommandForPage(1))
	//		 .equal(`convert "./tmp/test.pdf[1]" "tmp\\test-1.png"`);
	// });

	// TODO: Do page updating test
	it("should convert PDF's page to a file with the default extension", function () {
		pdfConvert.convertPage(1).then(function (imagePath) {
			expect(imagePath).equal("/tmp/test-1.png");
			expect(fs.existsSync("/tmp/test-1.png")).to.be.true;
		});
		pdfConvert.convertPage(10).then(function (imagePath) {
			expect(imagePath).equal("/tmp/test-10.png");
			expect(fs.existsSync("/tmp/test-10.png")).to.be.true;
		});
	});

	it("should convert PDF's page to file with a specified extension", function () {
		pdfConvert.setConvertExtension("jpeg");
		pdfConvert.convertPage(1).then(function (imagePath) {
			expect(imagePath).equal("/tmp/test-1.jpeg");
			expect(fs.existsSync("/tmp/test-1.jpeg")).to.be.true;
		});
	});

	it("should return # of pages", function () {
		pdfConvert.numberOfPages().then(function (numberOfPages) {
			expect(numberOfPages).to.be.equal(2);
		});
	});

	it("should construct convert options correctly", function () {
		pdfConvert.setConvertOptions({
			"-density": 300,
			"-trim": null
		});
		expect(pdfConvert.constructConvertOptions()).equal("-density 300 -trim");
	});
});
