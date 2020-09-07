import React, {Component} from "react";
import "../SignIn/SignIn.css";

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            name: ''
        };
        this.axios = this.props.axios;
    }

    onEmailChange = (event) => {
        this.setState({email: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({password: event.target.value})
    }

    onNameChange = (event) => {
        this.setState({name: event.target.value})
    }

    onSubmitRegister = () => {
        const url = 'register';
        const data = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        }
        this.axios.post(url, data)
            .then(response => {
                const user = response.data;
                if (user.id) {
                    this.props.loadUser(user);
                    this.props.onRouteChange('home');
                }
            })
    }

    render() {
        return (
            <article className="br3 ba b--black-10 mv4 w-100 w50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Register</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                                <input
                                    className="pa2 b--black input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    onChange={this.onNameChange} type="text" name="name" id="name"/>
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input
                                    className="pa2 b--black input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    onChange={this.onEmailChange} type="email" name="email-address" id="email-address"/>
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input
                                    className="b b--black pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    onChange={this.onPasswordChange} type="password" name="password" id="password"/>
                            </div>
                        </fieldset>
                        <div className="">
                            <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                   type="submit" value="Register" onClick={this.onSubmitRegister}/>
                        </div>
                    </div>
                </main>
            </article>
        )
    }
}

export default Register;
