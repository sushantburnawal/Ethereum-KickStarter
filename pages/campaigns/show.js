import React, {Component} from 'react';
import Layout from '../../components/layout';
import Campaign from '../../ethereum/campaign';
import {Card, Grid, Button} from 'semantic-ui-react';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/ContributeForm';
import {Link} from '../../routes'

class CampaignShow extends Component{

    static async getInitialProps(props){
        const campaign = Campaign(props.query.address);

        const summary = await campaign.methods.getSummary().call();
        

        return{
            address: props.query.address,
            minimumContribution: summary[0],
            balance: summary[1],
            requestCount: summary[2],
            approversCount: summary[3],
            manager: summary[4]
        };
    }

    renderCards() {

        const {
            manager,
            balance,
            minimumContribution,
            requestCount,
            approversCount
        } = this.props;

        const items = [
            {
                header: manager,
                meta: 'Address of the manager',
                description: ' The manager created this campaign and the power to create requests and withdraw money ',
                style:{overflowWrap: 'break-word'}

            },
            {
                header: minimumContribution,
                meta :'Minimum Contribution (ether)',
                description: 'Above is the least amount you need to donate to become a contributer'
            },
            {
                header:requestCount,
                meta: 'Number of Requests',
                description: 'Request tries to withdraw money from the contract. Request must be approved by the approvers  '
            },
            {
                header : approversCount,
                meta: 'Number of approvers',
                description: 'Number of people already donated to this campaign'
            },
            {
                header: web3.utils.fromWei(balance,'ether'),
                meta: 'Campaign Balance (ether)',
                description : 'The balance is the how much money available to spend by the campaign'
            }



        ];
        return <Card.Group items={items} />;
    }

    render() {
        return (
            <Layout>
            <h3>Campaign Details</h3>
            <Grid>
                <Grid.Row>
                <Grid.Column width = {10}>
                    {this.renderCards()}
                    
                </Grid.Column>
                <Grid.Column width = {6}>
                    <ContributeForm address ={this.props.address}/>
                </Grid.Column>
                </Grid.Row>
                    
                <Grid.Row>
                    <Grid.Column>
                    <Link route ={ `/campaigns/${this.props.address}/requests`}>
                        <a>
                            <Button primary>View Request</Button>
                        </a>
                    </Link>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            
            
            </Layout>
        );
    }
}
export default CampaignShow;