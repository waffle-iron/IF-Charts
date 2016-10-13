
PDFJS.workerSrc = 'pdfjs/pdf.worker.js';


function pdf_viewer() {
	this.canvas = null;
	this.ctx    = null;
	this.src    = null;
	this.page   = null;
	this.pdfDoc = null;
	this.width  = null;

	this.init = function(id, width) {
		this.canvas = document.getElementById(id);
		this.ctx = this.canvas.getContext('2d');

		this.width = width;
	};

	this.load = function(url) {
		var _this = this;

		var getDocumentCallback = function(pdfDocument) {
			_this.src = url;
			_this.page = 1;
			_this.pdfDoc = pdfDocument;

			_this.pdfDoc.getPage(_this.page).then(gotPdfPage);
		};

		var gotPdfPage = function(pdfPage) {
			var viewport = pdfPage.getViewport(1.0);
			var w = parseInt(viewport.width);
			var h = parseInt(viewport.height);

			_this.canvas.width  = _this.width;
			_this.canvas.height = _this.width * (h/w);

			_this.draw();
		};

		PDFJS.getDocument({url: url}).then(getDocumentCallback);
	};

	this.draw = function() {
		var _this = this;

		var gotPdfPage = function(pdfPage) {
			// set the scale to match the canvas
			var viewport = pdfPage.getViewport(_this.canvas.width / pdfPage.getViewport(1.0).width);

			// Render PDF page into canvas context
			var renderContext = {canvasContext: _this.ctx, viewport: viewport};

			pdfPage.render(renderContext).then(renderPdfPage);
		};

		var renderPdfPage = function() {
			console.log("finished render");
		};

		this.pdfDoc.getPage(this.page).then(gotPdfPage);
	};

	this.prevPage = function() {
		if(this.page <= 1) return;

		this.page--;
		this.draw();
	};

	this.nextPage = function() {
		if(this.page >= this.pdfDoc.numPages) return;

		this.page++;
		this.draw();
	};
}
