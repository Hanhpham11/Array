"use strict"
var $ = function (id) {
    return document.getElementById(id);
}

function getInfor() {
    var title = $("title").value;
    var author = $("author").value;
    var year = $("year").value;
    var pages = $("nofpage").value;
    return {
        title,
        author,
        year,
        pages,
    };
};
var books = [];
function Book(_title, _author, _year, _pages) {
    this.title = _title;
    this.author = _author;
    this.year = _year;
    this.pages = _pages;
    var price ;
    this.calprice = function () {
        if (this.pages <=200) {
            return price = parseInt(this.pages * (4 / 100));
        }
        else {
            
            return price = parseInt(this.pages * (37 / 100));
        }
    };
}
function insertBook(tbody, book) {
    var newRow = tbody.insertRow();
    for (const key in book) {
        var element = book[key];
        if (key === "calprice") {
            element = book[key]();
        }
        var cell = newRow.insertCell();
        var textNode = document.createTextNode(element);
        cell.appendChild(textNode);
    }
    
}
function insertBook1(tbody1, book1) {
    var newRow = tbody1.insertRow();
    for (const key in book1) {
        var search = book1[key];
        if (key === "calprice") {
            search = book1[key]();
        }
        var cell = newRow.insertCell();
        var textNode = document.createTextNode(search);
        cell.appendChild(textNode);
    }
    
}
function countBook() {
    var count;
    count = books.filter(function (item) {
        return item.calprice() > 57 && item.year < 1980; 
    });
    return count.length;
}

  
window.onload = function () {
    $("book-form").onsubmit = function (e) {
        
        e.preventDefault();
        var { title, author, year, pages } = getInfor();
        if (title == ""|| author==""|| year==""||pages=="") {
            alert("this fill must be filled out");
            return false;
        }
        else if (isNaN(year) || isNaN(pages)) {
            alert("this fill must be a number");
            return false;
        }
        var book = new Book(title, author, year, pages);
        books.push(book);
        var tbody = $("book-table").getElementsByTagName("tbody")[0];
        books.sort(function (price1, price2) {
            return price2.calprice() - price1.calprice();
        });
        console.log(books);
        tbody.innerHTML = "";
        for (var i = 0; i < books.length; i++){
            insertBook(tbody, books[i]);
        }
        // books.map(item => {
        //     return insertBook(tbody, item);
        //     })
        $("result").textContent = "* Book > $57 && since before:1980 : " + countBook();
        this.reset();
       
    }; 
    // $("submit").onclick = validate;
    $("search-form").onsubmit = function (e) {
        e.preventDefault();
        var search = $("search").value;
        console.log(search);
        var searchbook = books.filter((item) => item.author === search);
        console.log(searchbook);
        var tbody1 = $("book-tablefilter").getElementsByTagName("tbody")[0];
        tbody1.innerHTML = "";
        for (var i = 0; i < searchbook.length; i++){
            insertBook1(tbody1, searchbook[i]);
            
        }
        
    };
    
}