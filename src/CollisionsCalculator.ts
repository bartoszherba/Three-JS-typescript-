import { Mesh, Object3D } from "three";

export default class CollisionsCalculator {
    detectCollisionCubes(object1, object2) {
        object1.geometry.computeBoundingBox();
        object2.geometry.computeBoundingBox();
        object1.updateMatrixWorld();
        object2.updateMatrixWorld();

        var box1 = object1.geometry.boundingBox.clone();
        box1.applyMatrix4(object1.matrixWorld);

        var box2 = object2.geometry.boundingBox.clone();
        box2.applyMatrix4(object2.matrixWorld);

        return box1.intersectsBox(box2);
    }

    detectCollisionSpheres(object1, object2) {
        object1.geometry.computeBoundingSphere();
        object2.geometry.computeBoundingSphere();
        object1.updateMatrixWorld();
        object2.updateMatrixWorld();

        var sphere1 = object1.geometry.boundingSphere.clone();
        sphere1.applyMatrix4(object1.matrixWorld);

        var sphere2 = object2.geometry.boundingSphere.clone();
        sphere2.applyMatrix4(object2.matrixWorld);

        return sphere1.intersectsSphere(sphere2);
    }
}