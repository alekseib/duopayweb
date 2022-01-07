import React from 'react';
interface TodoProps {
}
interface TodoState {
    input: any
    errors: any
}
class Test1 extends React.Component<TodoProps, TodoState> {
    constructor(props: TodoProps) {
        super(props);
        this.state = {
            input: {},
            errors: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event:any) {
        let input = this.state.input;
        input[event.target.name] = event.target.value;

        this.setState({
            input
        });
    }

    // @ts-ignore
    handleSubmit(event) {
        event.preventDefault();

        if(this.validate()){
            console.log(this.state);

            let input = {};
            // @ts-ignore
            input["name"] = "";
            // @ts-ignore
            input["email"] = "";
            // @ts-ignore
            input["comment"] = "";
            this.setState({input:input});

            alert('Demo Form is submited');
        }
    }

    validate(){
        let input = this.state.input;
        let errors = {};
        let isValid = true;

        if (!input["name"]) {
            isValid = false;
            errors = {"name":"Please enter your name."}
        }

        if (!input["email"]) {
            isValid = false;
            errors = {"email":"Please enter your email Address."}
        }

        if (typeof input["email"] !== "undefined") {

            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(input["email"])) {
                isValid = false;
                // @ts-ignore
                errors["email"] = "Please enter valid email address.";
            }
        }

        if (!input["comment"]) {
            isValid = false;
            // @ts-ignore
            errors["comment"] = "Please enter your comment.";
        }

        this.setState({
            errors: errors
        });

        return isValid;
    }


    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>

                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={this.state.input.name}
                            onChange={this.handleChange}
                            className="form-control"
                            placeholder="Enter name"
                            id="name"/>

                        <div className="text-danger">{this.state.errors.name}</div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email Address:</label>
                        <input
                            type="text"
                            name="email"
                            value={this.state.input.email}
                            onChange={this.handleChange}
                            className="form-control"
                            placeholder="Enter email"
                            id="email"/>

                        <div className="text-danger">{this.state.errors.email}</div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="comment">Comment:</label>
                        <textarea
                            name="comment"
                            value={this.state.input.comment}
                            onChange={this.handleChange}
                            placeholder="Enter comment"
                            className="form-control"/>

                        <div className="text-danger">{this.state.errors.comment}</div>
                    </div>

                    <input type="submit" value="Submit" className="btn btn-success"/>
                </form>
            </div>
        );
    }
}
export default Test1;
