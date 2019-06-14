import React from "react";
import { Link } from "react-router-dom";

const ConfirmationModal = props => {
  return (
    <section component="Confirmation">
      <div class="modal">
        <input id="modal_1" type="checkbox" />
        <label for="modal_1" class="overlay" />
        <article>
          <header>
            <h3>Great offer</h3>
            <label for="modal_1" class="close">
              &times;
            </label>
          </header>
          <section class="content">
            We have a special offer for you. I am sure you will love it! However
            this does look spammy...
          </section>
          <footer>
            <a class="button" href="#">
              See offer
            </a>
            <label for="modal_1" class="button dangerous">
              Cancel
            </label>
          </footer>
        </article>
      </div>
    </section>
  );
};

export default ConfirmationModal;
