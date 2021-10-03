import React, { Fragment, useEffect, useState } from 'react';

import Form from './Form';

const Ratings = (props) => {
  return (
    <Fragment>
      <Form place={props.place}/>
    </Fragment>
  )
}

export default Ratings;