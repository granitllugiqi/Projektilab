import React from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';
import { useStore } from '../stores/store';




export default function NavBar() {
    const {carStore} = useStore();
    
    return( 
     <Menu inverted fixed='top'>
        <Container>

           <Menu.Item header>
             <img src="/assets/logo3.png" alt="logo" style={{marginRight: '10px'}}/> 
             RentACarOnline
            </Menu.Item>
            <Menu.Item>
                <Menu.Item name='CarsInventory' />
            </Menu.Item>
            <Menu.Item>
                <Button onClick={() => carStore.openForm()} positive content='Add New Car'/>
            </Menu.Item>
         </Container>
     </Menu>
        
    )
}