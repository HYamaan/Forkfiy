import View from './View';
import icons from 'url:../../img/icons.svg'; // Parcel 2

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline ');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      //console.log(goToPage);
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const numpages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    const currentPage = this._data.page;
    //console.log(numpages, currentPage);

    //Page1, and there are other pages
    if (this._data.page == 1 && numpages > 1) {
      return this._getNextMarkup(currentPage);
    }
    // Page1, and there are NO other pages
    if (this._data.page == 1) {
      return '';
    }
    // Last Page
    if (this._data.page === numpages && numpages > 1) {
      return this._getPreviousMarkup(currentPage);
    }
    //Other Page
    if (this._data.page < numpages && numpages > 1) {
      return (
        this._getNextMarkup(currentPage) + this._getPreviousMarkup(currentPage)
      );
    }
  }

  _getPreviousMarkup(currentPage) {
    //console.log(currentPage);
    return `
          <button data-goto = "${
            currentPage - 1
          }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
          </button>
          `;
  }
  _getNextMarkup(currentPage) {
    return `
    <button data-goto = "${
      currentPage + 1
    }" class="btn--inline pagination__btn--next">
          <span>Page ${currentPage + 1}</span> 
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
    `;
  }
}
export default new PaginationView();
