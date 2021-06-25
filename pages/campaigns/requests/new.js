import React, {Component} from 'react';
import {Form, Button, Message, Input} from 'semantic-ui-react';
import Campaign from '../../../ethereum/campaign';
import web3 from '../../../ethereum/web3';
import {Link, Router} from '../../../routes';
import Layout from '../../../components/layout';


class RequestNew extends Component{

    state = {
        value:'',
        description:'',
        recipent:'',
        errorMessage:'',
        loading: false
    };

    static async getInitialProps(props){
        const {address} = props.query;

        return {address};
    }

    onSubmit = async event =>{
        event.preventDefault();

        const campaign = Campaign(this.props.address);
        const {description, value, recipent} = this.state;

        this.setState({loading:true, errorMessage:''})

        try{

            const accounts = await web3.eth.getAccounts();
            await campaign.methods.createRequest(
                description,
                web3.utils.toWei(value, 'ether'),
                recipent
            )
            .send({from:accounts[0]});

        Router.pushRoute(`/campaigns/${this.props.address}/requests`)


        }catch(err){
            this.setState({errorMessage: err.message});
        }
        this.setState({loading:false});
    }    
    render(){

        return (
            <Layout>
                
                <h3> Create a Request</h3>
            <Form onSubmit = {this.onSubmit} error ={!!this.state.errorMessage}>
                <Form.Field>
                    <label>Description</label>
                    <Input 
                        value = {this.state.description}
                        onChange = {event => this.setState({description:event.target.value})}
                    />
                </Form.Field>

                <Form.Field>
                    <label>Value in Ether</label>
                    <Input 
                         value = {this.state.value}
                         onChange = {event => this.setState({value:event.target.value})}
                    />
                </Form.Field>

                <Form.Field>
                    <label>Recipent</label>
                    <Input 
                         value = {this.state.recipent}
                         onChange = {event => this.setState({recipent:event.target.value})}
                    />
                </Form.Field>
                <Message error header="Oops!" content={this.state.errorMessage}/>
                <Button primary loading={this.state.loading}>Create</Button>
            </Form>
            </Layout>
        );
    }
}
export default RequestNew;