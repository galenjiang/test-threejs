
import { Clock, WebGLRenderer, Scene, PerspectiveCamera, Vector3, AxisHelper
  , GridHelper, BoxGeometry, Color, MeshBasicMaterial, Mesh, VertexColors,
} from 'three'

import Stats from 'stats.js'
import OrbitControls from '../script/lib/OrbitControls'

import '../css/reset.css'
import '../css/app.css'

const init = () => {
  let app: HTMLElement
  let renderer: any
  let scene: any
  let camera: any
  let stats: any
  let controls: any
  let delta = 0
  const clock = new Clock()
  const geometry = Object.create(null)

  const initThree = () => {
    app = document.getElementById('app') as HTMLElement

    initRenderer()
    initScene()
    initCamera()
    initStats()
    initControls()

  }

  const initRenderer = () => {
    renderer = new WebGLRenderer()
    renderer.setSize(app.offsetWidth, app.offsetHeight)
    app.appendChild(renderer.domElement)
  }

  const initScene = () => {
    scene = new Scene()
  }

  const initCamera = () => {
    camera = new PerspectiveCamera(90, app.offsetWidth / app.offsetHeight, 1, 5000)
    camera.position.x = 500
    camera.position.y = 500
    camera.position.z = 500
    camera.lookAt(new Vector3(0, 0, 0))
  }

  const initStats = () => {
    stats = new Stats()
    stats.showPanel(0)
    app.appendChild(stats.dom)
  }
  const initControls = () => {
    controls = new (OrbitControls)(camera, renderer.domElement)
    controls.addEventListener('change', render) // remove when using animation loop
    // enable animation loop when using damping or autorotation
    // controls.enableDamping = true;
    // controls.dampingFactor = 0.25;
    controls.enableZoom = true
  }

  const createHelper = () => {
    const axisHelper = new AxisHelper(200)
    scene.add(axisHelper)

    const size = 2000
    const divisions = 50

    const gridHelper = new GridHelper(size, divisions)
    scene.add(gridHelper)
  }

  const createCube = () => {
    const boxGeo = new BoxGeometry(200, 200, 200)
    for (let i = 0, len = boxGeo.faces.length; i < len; i += 2) {
      const color = Math.random() * 0xffffff
      boxGeo.faces[i].color = new Color(color)
      boxGeo.faces[i + 1].color = new Color(color)
    }
    const material = new MeshBasicMaterial({ vertexColors: VertexColors })
    const cube = new Mesh(boxGeo, material)
    cube.position.y = 100
    geometry.cube = cube
    scene.add(cube)
  }

  const cubeRotate = (() => {
    let totalDelta = 0
    return (delta: number) => {
      totalDelta += delta
      // geometry.cube.setRotationFromAxisAngle(new Vector3(1, 1, -1).normalize(), totalDelta * Math.PI / 4) // same as below
      geometry.cube.rotateOnAxis(new Vector3(1, 1, -1).normalize(), delta * Math.PI / 4)
      //  delta * Math.PI / 4

    }

  })()
  const render = () => {
    delta = clock.getDelta()

    // geometry.cube
    cubeRotate(delta)
    renderer.render(scene, camera)
  }


  const animate = () => {

    // controls.update(); // required if controls.enableDamping = true, or if controls.autoRotate = true
    stats.begin()

    render()

    stats.end()
    requestAnimationFrame(animate)
  }


  initThree()

  createHelper()

  createCube()

  animate()

}


export default init
