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
});

function getPDFUrl() {
    return document.querySelector('#input-pdf').value;
};

function setupPDFjs() {
    PDFJS.workerSrc = 'node_modules/pdfjs-dist/build/pdf.worker.js';
}

function displayPDF(url) {
    console.log('display pdf');
    var viewer = document.querySelector('#pdf-viewer');
    while (viewer.firstChild) {
      viewer.removeChild(viewer.firstChild);
    }
    
    PDFJS.getDocument(url).then(function(pdf) {
        for(let i = 1; i <= pdf.numPages; i++) {
            pdf.getPage(i).then(page => renderPage(i, page, viewer));
        }
    });
}

function renderPage(pageNumber, page, viewer) {
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
