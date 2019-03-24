
/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/***
   Add your global variables that store the DOM elements you will
   need to reference and/or manipulate.
   But be mindful of which variables should be global and which
   should be locally scoped to one of the two main functions you're
   going to create. A good general rule of thumb is if the variable
   will only be used inside of a function, then it can be locally
   scoped to that function.
***/
//these variables grab the details of the students in the listing
const pageDiv = document.querySelector('.page');
const studentList = document.querySelectorAll('.student-item');
const pageHeader = document.querySelector('.page-header');


/***
   Create the `showPage` function to hide all of the items in the
   list except for the ten you want to show.
   Pro Tips:
     - Keep in mind that with a list of 54 students, the last page
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when
       you initially define the function, and it acts as a variable
       or a placeholder to represent the actual function `argument`
       that will be passed into the parens later when you call or
       "invoke" the function
***/
const showPage = (list, page) => {
  const first = (page * 10) - 10;
  const last = (page * 10) - 1;
  for(let i = 0; i < list.length; i++){
    if ( i >= first && i <= last ){
      list[i].style.display = 'block';
      } else {
        list[i].style.display = 'none';
    }

  }
};


/***
   Create the `appendPageLinks function` to generate, append, and add
   functionality to the pagination buttons.
***/

    const appendPageLinks = (list) => {
      const removePagination = () => {
        const removePagi = document.querySelector('.pagination');
          if(removePagi){
            removePagi.parentNode.removeChild(removePagi);
          }
      }
      removePagination();

    const numberOfPages = Math.ceil (list.length / 10);

    const paginationDiv = document.createElement('div');
      paginationDiv.className = 'pagination';
      pageDiv.appendChild(paginationDiv);

    const paginationUl = document.createElement('ul');
      paginationDiv.appendChild(paginationUl);

    for(let i = 0; i < numberOfPages; i++){
    const pageLi = document.createElement('li');
    const pageLink = document.createElement('a');
      if(i === 0){
        pageLink.className = 'active';
      }
      pageLink.href = '#';
      pageLink.textContent = i + 1;
      pageLi.appendChild(pageLink);
      paginationUl.appendChild(pageLi);

    pageLink.addEventListener('click', (e) => {
      e.preventDefault();
      showPage(studentList, i + 1);
      const target = e.target;
      const links = document.getElementsByTagName('a');
      if(target.tagName === 'A'){
      for(let i = 0; i < links.length; i++){
        links[i].classList.remove('active');
      }
        target.className = 'active';
      }
    });

}

};

const removeLinks = () => {
  const removInk = document.querySelector('.pagination');
    if(removInk){
      removInk.parentNode.removeChild(removInk);
    }
};

const errorMessage = () => {
  const error = document.createElement('h2');
    error.className = 'error';
    error.textContent = `Name not found. Please enter a valid name and try again`;
    pageDiv.appendChild(error);
};


const filter = (input) => {
  const list = document.querySelectorAll('h3');
    const searchedList = [];
    const removeErrorMessage = () => {
      const getError = document.querySelector('.error');
        if(getError){
          pageDiv.removeChild(getError);
        }
    };
      removeErrorMessage();

      for(let i = 0; i < list.length; i++){
        const search = input.value.toLowerCase();
        const listGParent = list[i].parentNode.parentNode;
        const listText = list[i].textContent;
        listGParent.style.display = 'none';

    if(listText.includes(search)){
      searchedList.push(listGParent);

      }
    }

    if (searchedList.length <= 0){
    errorMessage();
    removeLinks();
  }
  appendPageLinks(searchedList);
  showPage(searchedList, 1);


};


const search = () => {
  const searchDiv = document.createElement('div');
  const searchInput = document.createElement('input');
  const searchButton = document.createElement('button');

    searchButton.textContent = 'Search';
    searchInput.type = 'text';
    searchInput.placeholder = 'Search for students';
    searchDiv.className = 'student-search';

    searchDiv.appendChild(searchInput);
    searchDiv.appendChild(searchButton);
    pageHeader.appendChild(searchDiv);
  searchButton.addEventListener('click', (e) => {
    filter(searchInput);
  });
  searchInput.addEventListener('keyup', (e) => {
    filter(searchInput);
  });
};




search();
showPage(studentList, 1);
appendPageLinks(studentList);


// Remember to delete the comments that came with this file, and replace them with your own code comments.
