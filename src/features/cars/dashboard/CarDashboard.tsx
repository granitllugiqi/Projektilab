
import { observer } from "mobx-react-lite";
import React from "react";
import { Grid } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import CarDetails from "../details/CarDetails";
import CarForm from "../form/CarForm";
import CarList from "./CarList";


export default observer(function CarDashboard() {
       const{carStore}=useStore();
       const{selectedCar,editMode}=carStore;

    return (
        <Grid>
            <Grid.Column width='10'>
           <CarList   />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedCar && !editMode &&
                <CarDetails  />}
                {editMode &&
                <CarForm  />}
            </Grid.Column>
        </Grid>
    )
})