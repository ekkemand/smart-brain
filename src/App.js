import React, {Component} from 'react';
import './App.css';
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Particles from "react-particles-js";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";
import Axios from "axios";

class App extends Component {
    constructor() {
        super();
        this.state = {
            input: "",
            imageUrl: "",
            box: {},
            route: 'signin',
            isSignedIn: false,
            user: {
                id: "",
                name: "",
                email: "",
                entries: 0,
                joined: ""
            }
        }
        this.axios = Axios.create({
            baseURL: "http://localhost:3001/",
            headers: {
                common: {
                    'Content-Type': 'application/json'
                }
            }
        });
    }

    loadUser = (data) => {
        this.setState({user: {
                id: data.id,
                name: data.name,
                email: data.email,
                entries: data.entries,
                joined: data.joined
        }})
    }

    calculateFaceLocation = (data) => {
        const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.getElementById("inputimage");
        const width = Number(image.width);
        const height = Number(image.height);
        return {
            leftCol: clarifaiFace.left_col * width,
            topRow: clarifaiFace.top_row * height,
            rightCol: width - (clarifaiFace.right_col * width),
            bottomRow: height - (clarifaiFace.bottom_row * height)
        };
    }

    displayFaceBox = (box) => {
        this.setState({box: box});
    }

    onInputChange = (event) => {
        this.setState({input: event.target.value});
    }

    onButtonSubmit = () => {
        this.setState({imageUrl: this.state.input})
        const url = "imageurl";
        this.axios.post(url, {
            input: this.state.input
        })
            .then(response => {
                const url = "image";
                const data = { id: this.state.user.id };
                this.axios.put(url, data)
                    .then(axiosResponse => {
                        const count = axiosResponse.data;
                        this.setState(Object.assign(this.state.user, { entries: count }))
                    })
                this.displayFaceBox(this.calculateFaceLocation(response.data))
            })
            .catch(err => console.log(err));
    }

    onRouteChange = (route) => {
        if (route === "signout") {
            this.setState({isSignedIn: false})
            // eslint-disable-next-line no-restricted-globals
            location.reload();
        } else if (route === "home") {
            this.setState({isSignedIn: true})
        }
        this.setState({route: route})
    }

    render() {
        const { isSignedIn, imageUrl, box } = this.state;
        return (
            <div className="App">
                <Particles
                    className="particles"
                    params={particlesOptions}
                />

                <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
                {this.state.route === 'home'
                    ?
                    <>
                        <Logo/>
                        <Rank name={this.state.user.name} entries={this.state.user.entries}/>
                        <ImageLinkForm
                            onInputChange={this.onInputChange}
                            onButtonSubmit={this.onButtonSubmit}
                        />
                        <FaceRecognition box={box} imageUrl={imageUrl}/>
                    </>
                    :
                    (
                        this.state.route === "signin" ?
                            <SignIn
                                loadUser={this.loadUser}
                                onRouteChange={this.onRouteChange}
                                axios={this.axios}
                            />
                            :
                            <Register
                                loadUser={this.loadUser}
                                onRouteChange={this.onRouteChange}
                                axios={this.axios}
                            />
                    )
                }
            </div>
        );
    }
}

export default App;

const particlesOptions = {
    particles: {
        number: {
            value: 110,
            density: {
                enable: true,
                value_area: 800
            }
        }
    }
}
