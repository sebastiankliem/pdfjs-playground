document.addEventListener("DOMContentLoaded", function() {
    document.querySelector('#btn-load').addEventListener('click', function(e) {
        e.preventDefault();
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
    PDFJS.getDocument(url).then(function(pdf) {
        console.log(pdf);
    });
}
