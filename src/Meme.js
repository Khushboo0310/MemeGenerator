import React, { Component } from 'react';

class Meme extends Component{
    constructor(props){
        super(props);
        this.state = {
            head : "",
            foot : "",
            randomImg: "https://i.imgflip.com/3vzej.jpg",
            allmemeImg: []
        }
    }

    componentDidMount() {
        this.setState({ loading: true })
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(data => {
                //console.log(data);
                this.setState({ loading: false, allmemeImg: data.data.memes })
                //console.log(this.state.allmemeImg);
            })
    }

    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({
            [name] : value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const randomNum = Math.floor(Math.random() * this.state.allmemeImg.length)
        const randUrl = this.state.allmemeImg[randomNum].url
        console.log(randUrl)
        this.setState({ randomImg: randUrl })
    }

    render(){
        return(
            <div>
                <h1>Meme Generator</h1>

                <form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        value={this.state.head}
                        name="head"
                        placeholder="Header of Meme"
                        onChange={this.handleChange}
                    />
                    &nbsp;&nbsp;
                    <input
                        type="text"
                        value={this.state.foot}
                        name="foot"
                        placeholder="Footer of Meme"
                        onChange={this.handleChange}
                    />
                    &nbsp;&nbsp;
                    <button> Change </button>
                </form>
                <br />
                <div className="Container">
                    <img className="Image" src={this.state.randomImg} alt="MEME" ></img>
                    <h4 className="Top">{this.state.head}</h4>
                    <h4 className="Bottom">{this.state.foot}</h4>
                </div>

            </div>
        );
    }
}

export default Meme;