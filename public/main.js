document.addEventListener("DOMContentLoaded", function() {
    document.querySelector('.file-input form').addEventListener('submit', function(e) {
        e.preventDefault();
    }, false);
    document.querySelector('#input-pdf').addEventListener('focus', function(e) {
        e.target.select();
    });
    document.querySelector('#btn-load').addEventListener('click', function(e) {
        displayPDF(getPDFUrl());
    }, false);

    setupPDFjs();
});

function getPDFUrl() {
    return document.querySelector('#input-pdf').value;
};

function setupPDFjs() {
    PDFJS.workerSrc = 'node_modules/pdfjs-dist/build/pdf.worker.js';
}

function displayPDF(url) {
    console.log('display pdf');
    var container = document.querySelector('#pdf-viewer');
    var pdfLinkService = new PDFJS.PDFLinkService();
    
    var pdfViewer = new PDFJS.PDFViewer({
      container: container,
      linkService: pdfLinkService,
    });
    pdfLinkService.setViewer(pdfViewer);
    
    // (Optionally) enable find controller.
    var pdfFindController = new PDFJS.PDFFindController({
      pdfViewer: pdfViewer
    });
    pdfViewer.setFindController(pdfFindController);
    
    container.addEventListener('pagesinit', function () {
      // We can use pdfViewer now, e.g. let's change default scale.
      pdfViewer.currentScaleValue = 1;
    });
    
    // Loading document.
    PDFJS.getDocument(url).then(function (pdfDocument) {
      // Document loaded, specifying document for the viewer and
      // the (optional) linkService.
      pdfViewer.setDocument(pdfDocument);
    
      pdfLinkService.setDocument(pdfDocument, null);
    });
}

function renderPage(pageNumber, page, viewer) {
    console.log(page.getAnnotations());
    console.log(page);
    
    var scale = 1;
    var viewport = page.getViewport(scale);

    
    // Creating the page view with default parameters.
    var pdfPageView = new PDFJS.PDFPageView({
        container: viewer,
        id: pageNumber,
        scale: scale,
        defaultViewport: page.getViewport(scale),
        // We can enable text/annotations layers, if needed
        textLayerFactory: new PDFJS.DefaultTextLayerFactory(),
        annotationLayerFactory: new PDFJS.DefaultAnnotationLayerFactory()
    });
    // Associates the actual page with the view, and drawing it
    pdfPageView.setPdfPage(page);
    return pdfPageView.draw();
}
