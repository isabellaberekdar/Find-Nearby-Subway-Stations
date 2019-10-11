import React from 'react'
import axios from 'axios'


class Form extends React.Component {
    state = {
        title: '',
        content: ''
    }

    handleFormSubmit = (event, requestType, articleID) => {
        //event.preventDefault() // prevent page from reloading when form is submitted
        const title = event.target.elements.title.value
        const content = event.target.elements.content.value

        switch (requestType) {
            case 'post':
                axios.post('http://127.0.0.1:8000/api/', {
                    title: title,
                    content: content
                })
                .then(response => console.log(response))
                .catch(error => console.log(error))

            case 'put':
                axios.put(`http://127.0.0.1:8000/api/${articleID}/`, {
                    title: title,
                    content: content
                })
                .then(response => console.log(response))
                .catch(error => console.log(error))
        }
    }

    handleInput = input => {
        this.setState({
            [input.target.name]: input.target.value
        })
    }

    render() {
        return (
            <form onSubmit={event => this.handleFormSubmit(
                event,
                this.props.requestType,
                this.props.articleID
            )}>
                <label>
                    Title:
                    <input type='text' name='title' value={this.state.title} onChange={(text) => this.handleInput(text)} />
                </label>
                <label>
                    Content:
                    <input type='text' name='content' value={this.state.content} onChange={(text) => this.handleInput(text)} />
                </label>
                <input type='submit' value='Submit' />
            </form>
        )
    }
}

export default Form