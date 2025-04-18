import "bootstrap/dist/css/bootstrap.min.css";
import "../Css/Accordian.css";

const Accordion = () => {
  return (
    <div className="container-fluid mt-5 bg-light py-5">
      <section>
        <div className="text-center mb-4">
          <h2 className="fw-bold fs-3 faq-header" style={{ color: "#EA580C" }}>
            <span className="text-black fs-3">FAQ</span> - Frequently Asked
            Questions
          </h2>
          <p className="fs-6">Your answers are right here</p>
        </div>
        <div className="accordion" id="accordionExample">
          <div className="accordion-item mb-3 shadow">
            <h2 className="accordion-header" id="headingOne">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                What is Signpost PHONE BOOK?
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse show"
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                Signpost PHONE BOOK is an all-in-one contact directory and
                marketing tool that helps you find millions of mobile numbers
                for businesses, professionals, and individuals across India. It
                also allows you to market your products and services easily and
                efficiently.
              </div>
            </div>
          </div>
          <div className="accordion-item mb-3 shadow">
            <h2 className="accordion-header" id="headingTwo">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                How can I use Signpost PHONEBOOK?
              </button>
            </h2>
            <div
              id="collapseTwo"
              className="accordion-collapse collapse"
              aria-labelledby="headingTwo"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                You can use Signpost PHONE BOOK to:
                <ul className="list-disc ps-4">
                  <li>
                    Find contacts for businesses, professionals, and
                    individuals.
                  </li>
                  <li>
                    Send targeted promotional messages to prospects in your
                    area.
                  </li>
                  <li>
                    Store and access your personal contacts from any device.
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="accordion-item mb-3 shadow">
            <h2 className="accordion-header" id="headingThree">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseThree"
                aria-expanded="false"
                aria-controls="collapseThree"
              >
                Is Signpost PHONEBOOK Free to use?
              </button>
            </h2>
            <div
              id="collapseThree"
              className="accordion-collapse collapse"
              aria-labelledby="headingThree"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                Yes, Signpost PHONE BOOK is completely free to use! You can
                enjoy features like free messaging (via Call, SMS, Email, or
                WhatsApp), free listing of your mobile number, and more.
              </div>
            </div>
          </div>
          <div className="accordion-item mb-3 shadow">
            <h2 className="accordion-header" id="headingFour">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseFour"
                aria-expanded="false"
                aria-controls="collapseFour"
              >
                Who can Benefit from Signpost PHONEBOOK?
              </button>
            </h2>
            <div
              id="collapseFour"
              className="accordion-collapse collapse"
              aria-labelledby="headingFour"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <ul className="list-disc ps-4">
                  <li>
                    Businesses (B2B, B2C, D2C): For targeted marketing and
                    promotions.
                  </li>
                  <li>
                    Individuals: For finding contacts and storing personal phone
                    numbers.
                  </li>
                  <li>
                    Professionals: To reach new clients and grow their network.
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="accordion-item mb-3 shadow">
            <h2 className="accordion-header" id="headingFive">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseFive"
                aria-expanded="false"
                aria-controls="collapseFive"
              >
                What Marketing tools does Signpost PHONEBOOK Offer?
              </button>
            </h2>
            <div
              id="collapseFive"
              className="accordion-collapse collapse"
              aria-labelledby="headingFive"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                Signpost PHONE BOOK provides two premium marketing options:
                <ul className="list-disc ps-4">
                  <li>
                    Nearby Promotion: Target prospects within a specific area
                    using their location and user preferences.
                  </li>
                  <li>
                    Segmental Marketing: Send promotional messages to specific
                    business categories or industry segments.
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="accordion-item mb-3 shadow">
            <h2 className="accordion-header" id="headingSix">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseSix"
                aria-expanded="false"
                aria-controls="collapseSix"
              >
                Can I access my Contacts if I lose my Phone?
              </button>
            </h2>
            <div
              id="collapseSix"
              className="accordion-collapse collapse"
              aria-labelledby="headingSix"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                Yes! With Signpost PHONE BOOK, you can securely store your
                contacts and access them from any device, even if you lose your
                phone.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Accordion;
