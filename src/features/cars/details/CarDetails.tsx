import React from 'react';
import { Button, Card,  Image } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';




export default function CarDetails(){
  const {carStore}= useStore();
  const {selectedCar: car,openForm,cancelSelectedCar} = carStore;
  if(!car) return<LoadingComponent />;
    return(
    <Card fluid>
    <Image src={`/assets/${car.category}.jpg`} />
    <Card.Content>
      <Card.Header>{car.name}</Card.Header>
      <Card.Description>
       {car.description}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
     <Button.Group widths='2'>
         <Button onClick={()=> openForm(car.id)} basic color='blue' content='Edit'/>
         <Button  onClick={cancelSelectedCar} basic  color='grey' content='Cancel'/>
     </Button.Group>
    </Card.Content>
  </Card>
    )
}