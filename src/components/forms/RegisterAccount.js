import React, { useState, useMemo } from "react";
import { useHistory, Redirect, Link } from "react-router-dom";
import { Form, Modal, Button } from "react-bootstrap";
import useResponsiveFontSize from "../UseResponsiveFontSize";

import Field from "../Field";

const axios = require("axios");

//credit card element specific styling
const useOptions = () => {
  const fontSize = useResponsiveFontSize();
  const options = useMemo(
    () => ({
      style: {
        base: {
          fontSize,
          color: "#424770",
          letterSpacing: "0.025em",
          fontFamily: "Source Code Pro, monospace",
          "::placeholder": {
            color: "#aab7c4"
          }
        },
        invalid: {
          color: "#9e2146"
        }
      }
    }),
    [fontSize]
  );

  return options;
};


//submit button sub component
const SubmitButton = ({ processing, error, children, disabled }) => (
    <button
      className={`SubmitButton ${error ? "SubmitButton--error" : ""}`}
      type="submit"
      disabled={processing || disabled}
    >
        {processing ? "Processing..." : children}
    </button>
);

const EmailValidator = (email) =>{
  var emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (emailRegex.test(email)) return true;
  else return false;
  }

const DEFAULT_ADDRESS = {
  city: 'Singapore',
  country: 'SG',
  line1: '',
  line2: '',
  postal_code: '',
  state: '',
}

/**
 * public facing profile
 */
const DEFAULT_BUSINESS_PROFILE = {
  mcc: '5734',
  name: '',
  product_description: '',
  support_address: DEFAULT_ADDRESS,
  support_email: '',
  support_phone: '',
  support_url: '',
  url: '',
};

const DEFAULT_COMPANY = {
  address: DEFAULT_ADDRESS,
  name: '',
  phone: '', // used for verification
  registration_number: '',
  vat_id: ''
}

const DEFAULT_ACCOUNT_FIELD = {
  email: '',
  company: DEFAULT_COMPANY,
  business_profile: DEFAULT_BUSINESS_PROFILE,
  password: ''
};

class BusinessProfile extends React.Component {
  constructor() {
    super();

    this.state = { checked: false };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    this.setState({
      checked: !this.state.checked
    })
  }

  get_fields () {
    <fieldset className="FormGroup"> Business Profiles 
      <Field
        label="mcc"
        id="mcc"
        type="number"
        placeholder="5734"
        // required
        autoComplete="mcc"
        value={this.props.state.business_profile.mcc}
        onChange={(event) => {
          this.props.setState({...this.props.state, 
              business_profile: {mcc: event.target.value}});
        }}
      />

      <Field
        label="Name"
        id="business_name"
        type="text"
        placeholder="Business name"
        // required
        autoComplete=""
        value={this.props.state.business_profile.name}
        onChange={(event) => {
          this.props.setState({...this.props.state, 
              business_profile: {name: event.target.value}});
        }}
      />

      <Field
        label="Product Description"
        id="support_phone"
        type="text"
        placeholder="Describe the products your business provides"
        // required
        autoComplete=""
        value={this.props.state.business_profile.product_description}
        onChange={(event) => {
          this.props.setState({...this.props.state, 
              business_profile: {product_description: event.target.value}});
        }}
      />

      <Field
        label="Support Email"
        id="support_email"
        type="email"
        placeholder="Contact email - client facing"
        // required
        autoComplete="email"
        value={this.props.state.business_profile.support_email}
        onChange={(event) => {
          this.props.setState({...this.props.state, 
              business_profile: {support_email: event.target.value}});
        }}
      />

      <Field
        label="Support Phone"
        id="support_phone"
        type="phoneNumber"
        placeholder="Contact phone - client facing"
        // required
        autoComplete="phoneNumber"
        value={this.props.state.business_profile.support_phone}
        onChange={(event) => {
          this.props.setState({...this.props.state, 
              business_profile: {support_phone: event.target.value}});
        }}
      />
      
      <Field
        label="Support URL"
        id="support_url"
        type="url"
        placeholder="Contact URL - client facing"
        // required
        autoComplete="url"
        value={this.props.state.business_profile.support_url}
        onChange={(event) => {
          this.props.setState({...this.props.state, 
              business_profile: {support_url: event.target.value}});
        }}
      />

      <Field
        label="URL"
        id="url"
        type="url"
        placeholder="Homepage - client facing"
        // required
        autoComplete="url"
        value={this.props.state.business_profile.url}
        onChange={(event) => {
          this.props.setState({...this.props.state, 
              business_profile: {url: event.target.value}});
        }}
      />
      <br/>Business Address
      <Field
        label="Business City"
        id="business_city"
        type="city"
        placeholder="City"
        // required
        autoComplete="city"
        value={this.props.state.business_profile.support_address.city}
        onChange={(event) => {
          this.props.setState({...this.props.state, 
              business_profile: {support_address: {city: event.target.value}}});
        }}
      />
      <Field
        label="Business Country"
        id="business_country"
        type="country"
        placeholder="Singapore"
        // required
        autoComplete="country"
        value={this.props.state.business_profile.support_address.country}
        onChange={(event) => {
          this.props.setState({...this.props.state, 
              business_profile: {support_address: {country: event.target.value}}});
        }}
      />
      <Field
        label="Business Address"
        id="business-line1"
        type="business-line1"
        placeholder="Business Address Line 1"
        // required
        autoComplete="business-line1"
        value={this.props.state.business_profile.support_address.line1}
        onChange={(event) => {
          this.props.setState({...this.props.state, 
              business_profile: {support_address: {line1: event.target.value}}});
        }}
      />
      <Field
        label=""
        id="business-line2"
        type="business-line2"
        placeholder="Business Address Line 2"
        // required
        autoComplete="business-line2"
        value={this.props.state.business_profile.support_address.line2}
        onChange={(event) => {
          this.props.setState({...this.props.state, 
              business_profile: {support_address: {line2: event.target.value}}});
        }}
      />
      <Field
        label="Business Postal Code"
        id="business_postal_code"
        type="postal-code"
        placeholder="Business postal code"
        // required
        autoComplete="postal-code"
        value={this.props.state.business_profile.support_address.postal_code}
        onChange={(event) => {
          this.props.setState({...this.props.state, 
              business_profile: {support_address: {postal_code: event.target.value}}});
        }}
      />
      <Field
        label="Business State"
        id="business_state"
        type="state"
        placeholder="State"
        // required
        autoComplete="state"
        value={this.props.state.business_profile.support_address.state}
        onChange={(event) => {
          this.props.setState({...this.props.state, 
              business_profile: {support_address: {state: event.target.value}}});
        }}
      />

    </fieldset>
  }

  render() {
    const fields = this.get_fields();
    const content = this.state.checked ?
      <fieldset className="FormGroup"> Business Profiles 
        <Field
          label="mcc"
          id="mcc"
          type="number"
          placeholder="5734"
          // required
          autoComplete="mcc"
          value={this.props.state.business_profile.mcc}
          onChange={(event) => {
            this.props.setState({...this.props.state, 
                business_profile: {mcc: event.target.value}});
          }}
        />

        <Field
          label="Name"
          id="business_name"
          type="text"
          placeholder="Business name"
          // required
          autoComplete=""
          value={this.props.state.business_profile.name}
          onChange={(event) => {
            this.props.setState({...this.props.state, 
                business_profile: {name: event.target.value}});
          }}
        />

        <Field
          label="Product Description"
          id="support_phone"
          type="text"
          placeholder="Describe the products your business provides"
          // required
          autoComplete=""
          value={this.props.state.business_profile.product_description}
          onChange={(event) => {
            this.props.setState({...this.props.state, 
                business_profile: {product_description: event.target.value}});
          }}
        />

        <Field
          label="Support Email"
          id="support_email"
          type="email"
          placeholder="Contact email - client facing"
          // required
          autoComplete="email"
          value={this.props.state.business_profile.support_email}
          onChange={(event) => {
            this.props.setState({...this.props.state, 
                business_profile: {support_email: event.target.value}});
          }}
        />

        <Field
          label="Support Phone"
          id="support_phone"
          type="phoneNumber"
          placeholder="Contact phone - client facing"
          // required
          autoComplete="phoneNumber"
          value={this.props.state.business_profile.support_phone}
          onChange={(event) => {
            this.props.setState({...this.props.state, 
                business_profile: {support_phone: event.target.value}});
          }}
        />
        
        <Field
          label="Support URL"
          id="support_url"
          type="url"
          placeholder="Contact URL - client facing"
          // required
          autoComplete="url"
          value={this.props.state.business_profile.support_url}
          onChange={(event) => {
            this.props.setState({...this.props.state, 
                business_profile: {support_url: event.target.value}});
          }}
        />

        <Field
          label="URL"
          id="url"
          type="url"
          placeholder="Homepage - client facing"
          // required
          autoComplete="url"
          value={this.props.state.business_profile.url}
          onChange={(event) => {
            this.props.setState({...this.props.state, 
                business_profile: {url: event.target.value}});
          }}
        />
        <br/>Business Address
        <Field
          label="Business City"
          id="business_city"
          type="city"
          placeholder="City"
          // required
          autoComplete="city"
          value={this.props.state.business_profile.support_address.city}
          onChange={(event) => {
            this.props.setState({...this.props.state, 
                business_profile: {support_address: {city: event.target.value}}});
          }}
        />
        <Field
          label="Business Country"
          id="business_country"
          type="country"
          placeholder="Singapore"
          // required
          autoComplete="country"
          value={this.props.state.business_profile.support_address.country}
          onChange={(event) => {
            this.props.setState({...this.props.state, 
                business_profile: {support_address: {country: event.target.value}}});
          }}
        />
        <Field
          label="Business Address"
          id="business-line1"
          type="business-line1"
          placeholder="Business Address Line 1"
          // required
          autoComplete="business-line1"
          value={this.props.state.business_profile.support_address.line1}
          onChange={(event) => {
            this.props.setState({...this.props.state, 
                business_profile: {support_address: {line1: event.target.value}}});
          }}
        />
        <Field
          label=""
          id="business-line2"
          type="business-line2"
          placeholder="Business Address Line 2"
          // required
          autoComplete="business-line2"
          value={this.props.state.business_profile.support_address.line2}
          onChange={(event) => {
            this.props.setState({...this.props.state, 
                business_profile: {support_address: {line2: event.target.value}}});
          }}
        />
        <Field
          label="Business Postal Code"
          id="business_postal_code"
          type="postal-code"
          placeholder="Business postal code"
          // required
          autoComplete="postal-code"
          value={this.props.state.business_profile.support_address.postal_code}
          onChange={(event) => {
            this.props.setState({...this.props.state, 
                business_profile: {support_address: {postal_code: event.target.value}}});
          }}
        />
        <Field
          label="Business State"
          id="business_state"
          type="state"
          placeholder="State"
          // required
          autoComplete="state"
          value={this.props.state.business_profile.support_address.state}
          onChange={(event) => {
            this.props.setState({...this.props.state, 
                business_profile: {support_address: {state: event.target.value}}});
          }}
        />

      </fieldset> :
      null;

    return (
      <div>
        <div>
          <label>Business Profile</label>
          <input
            type="checkbox"
            checked={ this.state.checked }
            onChange={ this.handleChange }
          />
        </div>
        { content }
      </div>
    );
  }

}


//component declaration
export default function RegisterAccount(props) {

  let history = useHistory();

  const options = useOptions();

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false)
  const [processing, setProcessing] = useState(false);
  const [accountDetails, setAccountDetails] = useState(DEFAULT_ACCOUNT_FIELD);

  //resets state on completion
  const reset = () => {
      setError(null);
      setProcessing(false);
      setSuccess(false);
      setAccountDetails(DEFAULT_ACCOUNT_FIELD);
  };

  /*
This code runs when a card transaction is submitted
There are three main components to this function:
  
  1. create a new stripe payment method using the form data
  
  2. get a payment intent from the server using the speficied price
  3. confirm the payment intent using the new payment method
  4. send a confiemation to the server if the payment succeeded
*/
  const handleSubmit = async (event) => {
    //prevent default form values
    event.preventDefault();

    // checks
    if (!EmailValidator(accountDetails.email)) return;

    axios.post(process.env.REACT_APP_BACKEND_URL + '/register', 
      {...accountDetails}
      ).then((res) => {
        
      });
  }

  //render
  return (
      // the credit card form
      <Form className="Form" onSubmit={handleSubmit} autoComplete="on">

          {/* Error modal */}
          <Modal show={error!=null}>
            <Modal.Header>
              <Modal.Title>Error</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <p>{error}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={(event)=>{setError(null)}}>Close</Button>    
            </Modal.Footer>
          </Modal>


          {/* success banner, only shows after confirmation */}
          <Modal show={success}>
            <Modal.Header>
              <Modal.Title>Payment Succeeded</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Your card payment has been confirmed
            </Modal.Body>
            <Modal.Footer>
              <Button variant="success" onClick={ () =>{history.push("/")}}>Close</Button>
                
            </Modal.Footer>
          </Modal>
          {/* Credit Card Payment Form */}
          <fieldset className="FormGroup">
            {/* name field */}
            <Field
                label="Company Name"
                id="company_name"
                type="text"
                placeholder="Proccoli"
                required
                autoComplete="name"
                value={accountDetails.name}
                onChange={(event) => {
                    setAccountDetails({...accountDetails, name: event.target.value});
                }}
            />
            {/* email field */}
            <Field
                label="Email"
                id="email"
                type="email"
                placeholder="proccoli@gmail.com"
                required
                autoComplete="email"
                value={accountDetails.email}
                onChange={(event) => {
                    setAccountDetails({...accountDetails, email: event.target.value});
                }}
            />
            {/* password field */}
            <Field
                label="Password"
                id="password"
                type="password"
                required
                value={accountDetails.password}
                onChange={(event) => {
                    setAccountDetails({...accountDetails, password: event.target.value
                    });
                }}
            />
            {/* password 2 field */}
            <Field
                label="Confirm Password"
                id="password2"
                type="password"
                required
                value={accountDetails.password2}
                onChange={(event) => {
                    setAccountDetails({...accountDetails, password2: event.target.value
                    });
                }}
            />
          </fieldset>
          <BusinessProfile state={accountDetails} setState={setAccountDetails}/>
          {/* submit */}
          <SubmitButton
              processing={processing}
              error={error}
          >
              Register
          </SubmitButton>
      </Form>
  );
  
}