import View from './View';
import icons from 'url:../../img/icons.svg'; // Parcel 2

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');

  _window = document.querySelector(".add-recipe-window");
  _overlay = document.querySelector(".overlay");
  _btnOpen = document.querySelector(".nav__btn--add-recipe");
  _btnClose = document.querySelector(".btn--close-modal");
  _message = "Recipe was sucessfully uploaded.";

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }
  _toggleWindow(){
    this._window.classList.toggle("hidden");
    this._overlay.classList.toggle("hidden");

  }
  _addHandlerShowWindow(){
    this._btnOpen.addEventListener("click",this._toggleWindow.bind(this));
  }
  _addHandlerHideWindow(){
    this._btnClose.addEventListener("click",this._toggleWindow.bind(this));

  }

  addHandlerUpload(handler){
    this._parentElement.addEventListener("submit",function(e){
      e.preventDefault();
      const data = [...new FormData(this)];
      const newData = Object.fromEntries(data);
      handler(newData);
    });
  }

  _generateMarkup(){}
}
export default new AddRecipeView();
