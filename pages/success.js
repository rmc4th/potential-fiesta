/*  /pages/success.js */

import React, { useContext } from "react";
import { useRouter } from "next/router";
import { Button, Card, CardBody, CardTitle, CardFooter, Badge } from "reactstrap";
import AppContext from "../components/context";
import Link from "next/link"
import { logout } from "../components/auth";

function Success(props) {
  let {cart} = useContext(AppContext);
  const router = useRouter();
  const appContext = useContext(AppContext);

  const renderItems = ()=>{
  let {items} = cart;

    if(items && items.length){
      var itemList = cart.items.map((item) => {
          if (item.quantity > 0) {
            return (
              <div
                className="items-one"
                style={{ marginBottom: 15 }}
                key={item.id}
              >
                <div>
                  <span id="item-quantity">&nbsp; {item.quantity}</span>
                  <span id="item-name">&nbsp; {item.name}</span>
                </div>
              </div>
            );
          }
        })
        return itemList;
      }
    else {
        return (<div></div>)
    }
  }

  /*
const logoutApp = ()=>{
  return (
    <div>
      <Button style={{ width: "60%" }} color="primary" onClick={() => {
				logout();
				appContext.setUser(null);
				}}>
            <a>Logout</a>
      </Button>
    </div>
  )}
*/

function goHome() {
    console.log("goHome> trying...");
    router.push("/");
  }


	return (
    <div>
      <h1> Success!</h1>
      <Card style={{ padding: "10px 5px" }} className="cart">
        <CardTitle style={{ margin: 10 }}>Your Order Is On The Way!:</CardTitle>
        <hr />
        <CardBody style={{ padding: 10 }}>
          <div style={{ marginBottom: 6 }}>
            <small>Qty:</small>
          </div>
          <div>
            {renderItems()}
          </div>
          {console.log(`Router Path: ${router.asPath}`)}
        </CardBody>
        <CardFooter>Thank You For Your Order!</CardFooter>
        <Button color="info" onClick={goHome}>Let's Eat!</Button>
      </Card>

      <style jsx>{`
        #item-price {
          font-size: 1.3em;
          color: rgba(97, 97, 97, 1);
        }
        #item-quantity {
          font-size: 0.95em;
          padding-bottom: 4px;
          color: rgba(158, 158, 158, 1);
        }
        #item-name {
          font-size: 1.3em;
          color: rgba(97, 97, 97, 1);
        }
      `}</style>
    </div>
  );
}
export default Success;
