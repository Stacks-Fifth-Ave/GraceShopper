import React from 'react';

const CheckoutForm = props => {
  const {name, displayName, error} = props;

  return (
    <div>
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <label>
            <small>First Name</small>
          </label>
          <input name="firstName" type="text" />
        </div>
        <div>
          <label>
            <small>Last Name</small>
          </label>
          <input name="lastName" type="text" />
        </div>
        <div>
          <label htmlFor="address">
            <small>Address</small>
          </label>
          <input name="address" type="text" />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
  );
};

const handleSubmit = e => {
  e.preventDefault();
  console.log('checked out');
};

export default CheckoutForm;
