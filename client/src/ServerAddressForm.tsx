import React from 'react';

class ServerAddressForm extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event: any) {
        event.preventDefault();
        this.props.onChange(event.target.value);
    }

    handleSubmit(event: any) {
        console.log("Calling Submit");
        event.preventDefault();
        if(event.currentTarget.value === 'doc')
        {
            this.props.onSubmit(1);
        }
        else if(event.currentTarget.value === 'ppt')
        {
            this.props.onSubmit(2);
        }
        else if(event.currentTarget.value === 'excel')
        {
            this.props.onSubmit(3);
        }
        else {
            this.props.onSubmit(4);
        }

    }

    render() {
        return (
            <>
            <label htmlFor="collabora-online-server">
            Collabora Online Server:
            <input type="text" value={this.props.address} onChange={this.handleChange} />
        </label>
        
        <button id="btn-doc" value="doc" onClick={this.handleSubmit}>Load  doc</button>
        <button id="btn-ppt" value="ppt" onClick={this.handleSubmit}>Load  ppt</button>
        <button id="btn-excel" value="excel" onClick={this.handleSubmit}>Load Excel </button>
        <button id="btn-pdf" value="pdf" onClick={this.handleSubmit}>Load PDF </button>
        </>
        );
    }
}

export default ServerAddressForm;
