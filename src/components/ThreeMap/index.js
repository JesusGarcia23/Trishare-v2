import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import Orbitcontrols from "three-orbitcontrols";
import {
    ImageContainer
} from './styles'

export default function ThreeMap(props) {

     const { url, containerHeight, containerWidth } = props;

    const testUrl = "https://res.cloudinary.com/thejacex/image/upload/v1572295777/thing-gallery/tokyo.jpg.jpg";

    const mount = useRef(null)
    const controls = useRef(null)


    useEffect(() => {

        let width = mount.current.clientWidth
        let height = mount.current.clientHeight
        let frameId
    
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.z = 4;

        const renderer = new THREE.WebGLRenderer();
        const geometry = new THREE.SphereGeometry(500, 60, 40);
        geometry.scale( - 1, 1, 1 );

        // Texture
        let texture = new THREE.TextureLoader().load(testUrl);
        let material = new THREE.MeshBasicMaterial({ map: texture });
        let mesh = new THREE.Mesh( geometry, material );
        scene.add( mesh );
    
        renderer.setSize(width, height);

        //TO CONTROL THE IMAGE MOVEMENT
        let orbitControls = new /*THREE.OrbitControls*/ Orbitcontrols(camera, mount.current);
        orbitControls.autoRotate = false;
        orbitControls.enableZoom = false;
    
        const renderScene = () => {
          renderer.render(scene, camera)
        }
    
        const handleResize = () => {
          width = mount.current.clientWidth
          height = mount.current.clientHeight
          renderer.setSize(width, height)
          camera.aspect = width / height
          camera.updateProjectionMatrix()
          renderScene()
        }
        
        const animate = () => {
          renderScene()
          frameId = window.requestAnimationFrame(animate)
        }
    
        const start = () => {
          if (!frameId) {
            frameId = requestAnimationFrame(animate)
          }
        }
    
        mount.current.appendChild(renderer.domElement)
        window.addEventListener('resize', handleResize)
        start()
    
        controls.current = { start }
        
        return () => {
          window.removeEventListener('resize', handleResize)
          mount.current.removeChild(renderer.domElement)
          geometry.dispose()
        }
      }, [])

    return (
        <ImageContainer id="WebGL-output" width={containerWidth} height={containerHeight} ref={mount}></ImageContainer>
    )
}