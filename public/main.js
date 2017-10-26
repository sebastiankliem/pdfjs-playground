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
    PDFJS.getDocument(url).then(function(pdf) {
        console.log(pdf);
    });
}
