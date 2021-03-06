import {gql,useQuery} from '@apollo/client';
import Dishes from "./dishes"
import {useContext, useState} from 'react';


import AppContext from "./context"
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Container,
  Row,
  Col} from "reactstrap";

function RestaurantList(props){
  const[restaurantID, setRestaurantID] = useState("000000000000000000000000")
  const {cart } = useContext(AppContext);
  const [state, setState] = useState(cart)
/*  const GET_RESTAURANTS = gql`
    query {
      restaurants {
        id
        name
        description
        image 
      }
    }
  `;
  */
  const GET_RESTAURANTS = gql`
    query {
      restaurants {
        id
        name
        description
        image {
          url
        }
      }
    }
  `;
  const { loading, error, data } = useQuery(GET_RESTAURANTS)
  if (loading) return <p>Loading...</p>;
  if (error) {console.log (`restList.js> useQuery> error: ${error}`); return <p>ERROR</p>;}
  if (!data) return <p>Not found</p>;
  console.log(`Query Data: ${data.restaurants}`)
  console.log(`Query Data: ${data.restaurants[0].id}`)
  console.log(`Query Data: ${data.restaurants[0].name}`)
  console.log(`Query Data: ${data.restaurants[0].image}`)


let searchQuery = data.restaurants.filter((res) =>{
    return res.name.toLowerCase().includes(props.search)
  })

let restId = searchQuery[0].id
let testUrl = searchQuery[0].image.url;
console.log("rList.js> ", testUrl);
 
// definet renderer for Dishes
  const renderDishes = (restaurantID) => {
    return (<Dishes restId={restaurantID}> </Dishes>)
  };
if(searchQuery.length > 0){
  const restList = searchQuery.map((res) => (
    <Col xs="6" sm="4" key={res.id}>
      <Card style={{ margin: "0 0.5rem 20px 0.5rem" }}>
        <CardImg
          top={true}
          style={{ height: 200 }}
          src={
            process.env.NEXT_PUBLIC_API_URL + res.image
          }
        />
        <CardBody>
          <CardText>{res.image.url}<br/>{res.description}</CardText>
        </CardBody>
        <div className="card-footer">
        
        <Button color="info" onClick={()=> setRestaurantID(res.id)}>{res.name}</Button>
         
        </div>
      </Card>
    </Col>
  ))

  return(

    <Container>
    <Row xs='3'>
      {restList}
    </Row>
  
    <Row xs='3'>
    {renderDishes(restaurantID)}
    </Row>
 
    </Container>
 
  )
} else {
  return <h1> No Restaurants Found</h1>
}
}
   export default RestaurantList