import { Object3D } from "three";

export default interface Addible
{  
    addToContext(context: Object3D): void;
}