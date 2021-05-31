import { makeAutoObservable, runInAction} from "mobx";
import agent from "../api/agent";
import  Car  from "../models/carmodel";
import{v4 as uuid} from "uuid";

export default class CarStore{
    cars: Car[]= [];
    selectedCar:Car | undefined= undefined;
    editMode= false;
    loading=false;
    loadingInitial= false;
    
    constructor() {
        makeAutoObservable(this)
           
        
    }
    
   
    loadCars= async ()=>{
        this.setLoadingInitial(true);
        try{
            const cars= await agent.Cars.list();
            cars.forEach((car: Car) =>{
                    car.name = car.name.split('T')[0];
                    this.cars.push(car);
            }) 
              this.setLoadingInitial ( false);
            

        }catch(error){
            console.log(error);
            this.setLoadingInitial(false);
            }
        }
    
    setLoadingInitial=(state: boolean) =>{
        this.loadingInitial=state;
    }
    selectCar=(id:string)=>{
        this.selectedCar=this.cars.find(a=> a.id === id);
    }
    cancelSelectedCar = () =>{
        this.selectedCar=undefined;
    }
    openForm= (id?: string) =>{
        id ?  this.selectCar(id) : this.cancelSelectedCar();
        this.editMode=true;
    }
    closeForm=()=>{
        this.editMode=false;
    }
    createCar= async (car: Car) =>{
        this.loading=true;
        car.id=uuid();
        try{
            await agent.Cars.create(car);
            runInAction(()=>{
                this.cars.push(car);
                this.selectedCar=car;
                this.editMode=false;
                this.loading = false;

            })
        }catch(error){
            console.log(error);
            runInAction(()=>{
                this.loading=false;
            })
        }
    }
    updateCar= async(car: Car)=>{
            this.loading=true;
            try{
                await agent.Cars.update(car);
                runInAction(()=>{
                    this.cars= [...this.cars.filter(a => a.id !== car.id), car];
                    this.selectedCar=car;
                    this.editMode=false;
                    this.loading=false;
                })
            } catch(error) {
                console.log(error);
                runInAction(()=>{
                    this.loading=false;
                })
            }
            
        }
        deleteCar =async (id:string)=>{
            this.loading=true;
            try{
                await agent.Cars.delete(id);
                runInAction(()=>{
                    this.cars= [...this.cars.filter(a => a.id !== id)];
                   if(this.selectedCar?.id === id)this.cancelSelectedCar();
                    this.loading=false;
                })
            }catch(error){
                console.log(error);
                runInAction(()=>{
                    this.loading=false;
                })
            }
         }
}
     
 

