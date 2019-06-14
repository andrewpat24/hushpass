import React from "react";

const Introduction = (
  <section component="Introduction">
    <div className="border">
      <p>
        <span className="bold">HushHush</span> is a service for sharing files
        securely. Upload your file, set a secret key, tell us how long you need
        it available, and how many times it may be downloaded. We then provide a
        link to download the file using the secret key as a password.
      </p>
      <p>
        Before we store your file, we encrypt it using your secret key. We do
        not save your key in a way we can use, so your file is safely encrypted
        until the secret key is provided to download. As soon as we have the
        secret key, we decrypt your file and send it to you. Once the file has
        either reached its maximum number of downloads or reached its expiration
        date, we delete the file's data from our database so it may never be
        accessed again.
      </p>
      <p>
        We saw a need to send sensitive documents and feel safe about it. Other
        solutions didn't have the same ease of use that we've come to expect, so
        we created our own solution. Our service is fast, simple, and easy to
        understand.
      </p>
      <p className="bottom-text">
        Created By{" "}
        <a href="https://www.linkedin.com/in/andrew-patterson-65a158110/">
          Andrew Patterson
        </a>{" "}
        and{" "}
        <a href="https://www.linkedin.com/in/pmalolep/"> Peter Malolepszy </a>
      </p>
      <p className="bottom-text">
        Source on <a href="https://github.com/hushhushpass/hushpass">GitHub</a>
      </p>
    </div>
  </section>
);
export default Introduction;
