import { useStore } from '../stores/store';
import React, { useEffect} from 'react';
import LoadingComponent from './LoadingComponent';
import NavBar from './NavBar';
import { Container } from 'semantic-ui-react';
import CarDashboard from '../../features/cars/dashboard/CarDashboard';
import { observer } from 'mobx-react-lite';

function App() {
    const{carStore}= useStore();

    useEffect(() => {
        carStore.loadCars();
     }, [carStore])
  
    if(carStore.loadingInitial) return <LoadingComponent content='Loading data'/>
  
 
    return(
     <>
    <NavBar />
      <Container style={{marginTop: '7em'}}>
     <CarDashboard />
   </Container> 
  </>
  );
  
}

 export default observer(App);

