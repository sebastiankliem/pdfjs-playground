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
            pdf.getPage(i).then(page => renderPage(page));
        }
    });
}

function renderPage(page) {
    var scale = 1.5;
    var viewport = page.getViewport(scale);

    var canvas = document.createElement('canvas');
    document.querySelector('#pdf-viewer').appendChild(canvas);
    var context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    var renderContext = {
        canvasContext: context,
        viewport: viewport
    };
    page.render(renderContext);
}
