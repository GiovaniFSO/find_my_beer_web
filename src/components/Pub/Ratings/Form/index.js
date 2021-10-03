import React, { useDebugValue, useState } from 'react';
import ReactStars from 'react-rating-stars-component';
import styled from 'styled-components';

const NewRating = styled.div`
  padding-bottom: 50px;
`

const Input = styled.input`
  margin-bottom: 10px;
  height: 20px;
  width: 90%;
  border-width: 0;
`

const TextArea = styled.textarea`
  margim-bottom: 10px;
  height: 40px;
  width: 90%;
  border-with: 0;
`

const Button = styled.button`
  color: white;
  background-color: #a5572f;
  width: 90px;
  height: 30px;
  margin0top: 10px;
  border-color: #a5572f;
  font-weight: 800;
`

const Form = (props) => {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [value, setValue] = useState(1)

  return (
    <NewRating>
      <h4>Please let us know your opinion</h4>
      <form>
        <Input name="name"
          type="text"
          placeholder="Your name"
          onChange={(e) => setName(e.target.value)}
          value={name} />

        <TextArea name="message"
          className="textarea"
          placeholder="Your opinion"
          onChange={(e) => setMessage(e.target.value)}
          value={message}>
        </TextArea>

        <div>
          <ReactStars
            count={5} size={24} activeColor="#ffd700"
            value={value}
            onChange={(e) => setValue(e) }/>
          <Button type="submit" className="button is-danger">Send</Button>
        </div>
      </form>

    </NewRating>
  )
}

export default Form;