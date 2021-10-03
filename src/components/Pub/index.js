import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import PubsService from '../../services/pubs_service';

const LeftBar = styled.div `
  height: 100%;
  overflow-y: auto;
  width: 250px;
  position: absolute;
  color: white;
  background-color: rgba(10,10,10,0.9);
  padding: 20px;
`

const Title = styled.h1`
  font-size: 20px;
  color: rgba(220, 110, 50, 0.7);
`

const Paragraph = styled.p`
  font-size: 13px;
  line-height: 14px;
`
const Image = styled.img`
  height: 150px;
  width: 100%;
`

const Pub = (props) => {
  const [pub, setPub] = useState([]);
  const { REACT_APP_GOOGLE_API_KEY } = process.env;

  useEffect(() =>{
    getPubInformations()
  }, [props.place])

  async function getPubInformations(){
    try{
      const response = await PubsService.show(props.place.place_id)
      setPub(response.data.result)
    } catch (error) {
      setPub([])
    }
  }

  return(
    <LeftBar>
      {
        (pub.photos) ?
          <Image src={`
            https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${pub.photos[0].photo_reference}&sensor=false&key=${REACT_APP_GOOGLE_API_KEY}`}
            alt="Pub Photo"
          />
          :
          <Image src="/images/no-photo.jpg" alt="Pub no Photo"/>
      }
      <Title>{ pub.name }</Title>
      {
        (pub.opening_hours) ?
          <div>
            {(pub.opening_hours.open_now === true ) ? "Aberto" : "Fechado" }
            <hr/>
            {
              pub.opening_hours.weekday_text.map((schedule, index) => {
                return(<Paragraph key={index}>{schedule}</Paragraph>)
              })
            }
          </div>
          : <Paragraph>"There's no registration of open days and hours"</Paragraph>
      }
      <hr/>
      <Paragraph>{pub.formatted_address}</Paragraph>
    </LeftBar>
  )
}

export default Pub;