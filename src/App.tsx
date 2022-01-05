import React from 'react';
//import './App.css';

function App() {
  return (
   <div>
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>

  <div id="pageloader">
    <img src="http://cdnjs.cloudflare.com/ajax/libs/semantic-ui/0.16.1/images/loader-large.gif" alt="processing..."/>
  </div>

  <form action="/weborder/savecontacts" className="offer__form" method="post" id="myform">
    <h2 className="offer__title" >test3</h2>
    <input type="text" placeholder="Имя" name="name" required/>
    <input type="email" placeholder="E-mail" name="email" required/>
    <label id="radiobox" className="label label_agree">
      <input type="radio" className="radio" name="agreeWithConditions" value="true"/>
      <span className="fake"></span>
      <p className="radio__text">
              Согласен c
              <a href="https://duoclassico.eu/conditions-ru" className="radio__link">
                Правилами продажи билетов
              </a>
      </p>
    </label>
        <p className="offer__text">
          Сообщение об ошибке
        </p>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>

        <div className="offer__button d-flex justify-content-around">
          <button type="submit" className="offer__btn offer__btn__further next-step-btn">
            <span>Далее</span>
          </button>
        </div>
        <div className="offer__info">
          <p className="offer__person">
            Организатор: Алексей Бляхин
          </p>
          <ul className="offer__list">
            <li className="offer__item">
              <a href="mailto:aleksei.bljahhin@gmail.com">
                <i className="fas fa-envelope"></i>
                aleksei.bljahhin@gmail.com
              </a>
            </li>
            <li className="offer__item">
              <a href="tel:+3725142537">
                <i className="fas fa-phone"></i>
                +372 5142537
              </a>
            </li>
          </ul>
          <a href="https://duoclassico.eu/" rel="nofollow noreferrer noopener" target="_blank"
             className="offer__link">
            duoclassico.eu
          </a>
        </div>
  </form>
  </div>
  );
}
export default App;
