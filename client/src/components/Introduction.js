import React from "react";

const Introduction = (
  <section component="Introduction">
    <div className="border">
      <p>
        <span className="brand-dark">Hush</span>
        <span className="brand-white">Hush</span> is a service to securly share
        files. You upload a file, set a secret key, tell us how long you need it
        available and how many times it can be downloaded. We then provide a
        link to download the file using the secret key as a password.
      </p>
      <p>
        Before we store your file, we encrypt it using your secret key. We do
        not save they key in a way we can use, so your file is safely encrypted
        untill the secret key is provided to download it. When downloading, as
        soon as we have the correct secret key, we send the file to you as we
        decrypt it.
      </p>
      <p>
        We saw a need to send sensitive documents and feel safe about it. Other
        solutions didn't have the same ease of use that we've come to expect, so
        we created our own solution. Our service is fast, simple, and easy to
        understand.
      </p>
      <p>Created By Andew Patterson and Peter Malolepszy</p>
    </div>
  </section>
);
export default Introduction;
