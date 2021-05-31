import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";


export default observer( function ActivityForm(){
    const {carStore} = useStore();
    const{selectedCar,closeForm,createCar,updateCar,loading}=carStore;

    const initialState = selectedCar ?? {
        id:'',
        name:'',
        category:'',
        description:'',
        price:'',
        
    }
    const [car, setCar] = useState(initialState);
    function handleSubmit(){
       car.id? updateCar(car): createCar(car);
    }
    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        const{name,value} = event.target;
        setCar({...car,[name]:value})
    }

    return(
        <Segment clearing>
            <Form onSubmit={handleSubmit}autoComplete='off'>
                <Form.Input placeholder='Name' value={car.name} name='name' onChange={handleInputChange}/>
                <Form.TextArea placeholder='Description' value={car.description} name='description' onChange={handleInputChange}/>
                <Form.Input placeholder='Category'value={car.category} name='category' onChange={handleInputChange}/>
                <Form.Input placeholder='Price'value={car.price} name='price' onChange={handleInputChange}/>
                <Button loading={loading} floated='right' positive type='submit' content='Save' />
                <Button onClick={closeForm} floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
})