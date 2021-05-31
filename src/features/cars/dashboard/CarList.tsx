import { observer } from "mobx-react-lite";
import React from "react";
import { SyntheticEvent, useState } from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";


export default observer (function CarList(){
    const{carStore}= useStore();
    const{deleteCar,cars,loading}=carStore;

   const[target,setTarget] = useState('');

   function handleActivityDelete(e:SyntheticEvent<HTMLButtonElement>, id: string){
       setTarget(e.currentTarget.name);
       deleteCar(id);
    }
    
    return(
      <Segment>
          <Item.Group divided>
            {cars.map(car =>(
                <Item key={car.id}>
                    <Item.Content>
                        <Item.Header as='a'>{car.name}</Item.Header>
                        <Item.Description>
                            <div>{car.description}</div>
                            <div>{car.price}</div>
                        </Item.Description>
                        <Item.Extra>
                            <Button onClick={() => carStore.selectCar(car.id)} floated='right' content='View' color='blue'/>
                            <Button 
                            name={car.id}
                            loading={loading && target === car.id}
                             onClick={(e) => handleActivityDelete(e,car.id)} 
                             floated='right' 
                             content='Delete' 
                             color='red'/>
                            <Label basic content={car.category}/>
                        </Item.Extra>
                    </Item.Content>
                </Item>
            ))}
          </Item.Group>
      </Segment>
    )
})