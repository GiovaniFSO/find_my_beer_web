import React, { useEffect, useState } from 'react';
import StoreService from '../../services/store'
import styled from 'styled-components';
import ReactStars from 'react-rating-stars-component';

const RightBar = styled.div`
  width: 250px;
  position: absolute;
  color: white;
  right: 0;
  top: 0;
`

const Head = styled.div`
  background-color: rgba(10,10,10,0.9)
  border-radius: 6px;
  paddind: 2px;
  text-align: center;
  margin: 10px;
`

const Body = styled.div`
  background-color: rgba(10,10,10,0.9);
  border-radius: 6px;
  padding: 20px;
  height: 450px;
  overflow-y: auto;
  margin: 10px;
`

const Footer = styled.div`
  background-color: rgba(10,10,10,0.9);
  border-radius: 6px;
  padding: 10px 20px 20px 20px;
  font-size: 13px;
  margin: 10px;
`

const PubItem = styled.div`
  cursor: pointer;
`

const Title = styled.h1`
  font-size: 18px;
  color: rgba(220,110,50,0.7);
`

const Paragraph = styled.p`
  font-size: 13px;
  line-height: 14px;
`

const NearbyPubs = (props) => {
  const [stores, setStores] = useState([])

  useEffect(() => {
    loadNearbyPubs()
  }, [props.latitude])

  async function loadNearbyPubs(){
    const response = await StoreService.index(props.latitude, props.longitude);
    setStores(response.data);
  }

  return (
    <RightBar>
      <Head>
        <h3>Find My Beer</h3>
      </Head>
      <Body>
        <strong>Top highest rated Pubs</strong>
        <hr/>
        {
          stores.map( pub =>{
            return (
              <PubItem key={pub.name}>
                <Title>{ pub.name }</Title>

                <Paragraph>{ pub.address }</Paragraph>

                { pub.ratings_count || 0 } Opinions
                  <ReactStars edit={ false } value={ pub.ratings_average || 0 }/>
                <hr/>
              </PubItem>
            )
          })
        }
      </Body>
      <Footer>
        <h2>Giovani Fernandes</h2>
        <Paragraph>
          Project made with React.js.
        </Paragraph>
      </Footer>
    </RightBar>
  )
}

export default NearbyPubs;