import "reflect-metadata";
import Container from "typedi";
import { useContainer as routingUseContainer } from "routing-controllers";
import './services'; 
import './controllers'; 

// Register the Container
routingUseContainer(Container);

export default Container;
